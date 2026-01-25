
// This file has been written ~entirely by Claude

/* MAIN - UTILITY TYPES */

// Convert kebab-case to camelCase
type KebabToCamel<S extends string> =
  S extends `${infer First}-${infer Rest}`
    ? `${First}${Capitalize<KebabToCamel<Rest>>}`
    : S;

// Trim leading/trailing whitespace and commas
type TrimLeft<S extends string> =
  S extends ` ${infer Rest}` ? TrimLeft<Rest> :
  S extends `,${infer Rest}` ? TrimLeft<Rest> :
  S;

type TrimRight<S extends string> =
  S extends `${infer Rest} ` ? TrimRight<Rest> :
  S extends `${infer Rest},` ? TrimRight<Rest> :
  S;

type Trim<S extends string> = TrimLeft<TrimRight<S>>;

/* MAIN - OPTION NAME EXTRACTION */

// Check if option has an argument (e.g., "<value>" or "<value...>")
type HasArgument<S extends string> = S extends `${string}<${string}>` ? true : false;

// Check if option is variadic (e.g., "<value...>")
type IsVariadic<S extends string> = S extends `${string}<${string}...>` ? true : false;

// Remove the argument portion from the option string
type RemoveArgument<S extends string> =
  S extends `${infer Before}<${string}>` ? Trim<Before> : S;

// Extract the argument content (what's inside the angle brackets)
type ExtractArgumentContent<S extends string> =
  S extends `${string}<${infer Content}>` ? Content : never;

// Check if argument content contains pipe-separated enum values (e.g., "json|xml|csv")
type IsEnumArg<S extends string> = S extends `${string}|${string}` ? true : false;

// Parse pipe-separated enum values into a union type (recursive, supports any count)
type ParseEnumValues<S extends string> =
  S extends `${infer A}|${infer Rest}`
    ? A | ParseEnumValues<Rest>
    : S;

// Extract inline enum from option string if present
type ExtractInlineEnum<S extends string> =
  HasArgument<S> extends true
    ? ExtractArgumentContent<S> extends infer Content
      ? Content extends string
        ? IsEnumArg<Content> extends true
          ? ParseEnumValues<Content>
          : never
        : never
      : never
    : never;

// Extract longhand name, handling "no-" prefix for boolean flags
type ExtractLong<S extends string, HasArg extends boolean> =
  S extends `--no-${infer Name}` ? (
    HasArg extends true
      ? KebabToCamel<`no-${Name extends `${infer N} ${string}` ? N : Name extends `${infer N},${string}` ? N : Name}`>
      : KebabToCamel<Name extends `${infer N} ${string}` ? N : Name extends `${infer N},${string}` ? N : Name>
  ) :
  S extends `--${infer Name}` ? (
    KebabToCamel<Name extends `${infer N} ${string}` ? N : Name extends `${infer N},${string}` ? N : Name>
  ) : never;

// Extract shorthand name
type ExtractShort<S extends string> =
  S extends `-${infer C}${infer Rest}` ? (
    C extends '-' ? never :
    Rest extends '' ? C :
    Rest extends ` ${string}` ? C :
    Rest extends `,${string}` ? C :
    C
  ) : never;

// Parse a segment (longhand or shorthand) and extract all names
type ParseSegment<S extends string, HasArg extends boolean> =
  S extends `--${string}` ? ExtractLong<S, HasArg> :
  S extends `-${string}` ? ExtractShort<S> :
  never;

// Parse option segments recursively (supports any number of aliases)
// First splits by comma, then by space
type SplitByComma<S extends string, HasArg extends boolean> =
  S extends `${infer A},${infer Rest}`
    ? SplitBySpace<Trim<A>, HasArg> | SplitByComma<Trim<Rest>, HasArg>
    : SplitBySpace<Trim<S>, HasArg>;

type SplitBySpace<S extends string, HasArg extends boolean> =
  S extends `${infer A} ${infer Rest}`
    ? ParseSegment<Trim<A>, HasArg> | SplitBySpace<Trim<Rest>, HasArg>
    : ParseSegment<S, HasArg>;

// Extract all names using recursive splitting
type ExtractNames<S extends string, HasArg extends boolean> = SplitByComma<Trim<S>, HasArg>;

// Extract all option names from a full option string
type ExtractOptionNames<S extends string> =
  ExtractNames<RemoveArgument<S>, HasArgument<S>>;

/* MAIN - OPTION TYPE INFERENCE */

// Infer the value type for an option based on type option, enum, and inline enum from string
type InferValueType<
  S extends string,
  TypeOpt extends string | undefined,
  EnumOpt extends readonly string[] | undefined
> =
  // First check if explicit enum array is provided with literal types
  EnumOpt extends readonly [infer First, ...infer Rest]
    ? First | (Rest extends readonly string[] ? Rest[number] : never)
  // Then check for inline enum in the option string
  : ExtractInlineEnum<S> extends never
    ? TypeOpt extends 'integer' | 'number'
      ? number
      : TypeOpt extends 'string'
        ? string
        : string // default fallback
    : ExtractInlineEnum<S>;

// Determine the full option type based on whether it has an argument and is variadic
// Also handles explicit type option (e.g., type: "boolean" forces boolean even with an argument)
type DetermineOptionType<
  S extends string,
  TypeOpt extends string | undefined = undefined,
  EnumOpt extends readonly string[] | undefined = undefined
> =
  // Explicit boolean type overrides argument detection
  TypeOpt extends 'boolean'
    ? boolean
  // Explicit number/integer type
  : TypeOpt extends 'integer' | 'number'
    ? HasArgument<S> extends true
      ? IsVariadic<S> extends true
        ? number[]
        : number
      : number
  // Explicit string type
  : TypeOpt extends 'string'
    ? HasArgument<S> extends true
      ? IsVariadic<S> extends true
        ? string[]
        : string
      : string
  // Infer from argument presence
  : HasArgument<S> extends true
    ? IsVariadic<S> extends true
      ? InferValueType<S, TypeOpt, EnumOpt>[]
      : InferValueType<S, TypeOpt, EnumOpt>
    : boolean;

/* MAIN - OPTIONS ACCUMULATION */

// Create a record type for a single option
// Handles required options and options with non-undefined defaults
type OptionRecord<
  S extends string,
  TypeOpt extends string | undefined = undefined,
  EnumOpt extends readonly string[] | undefined = undefined,
  IsRequired extends boolean = false,
  HasNonUndefinedDefault extends boolean = false
> = IsRequired extends true
  // Required option: value is always present, no undefined
  ? { [K in ExtractOptionNames<S>]: DetermineOptionType<S, TypeOpt, EnumOpt> }
  : HasNonUndefinedDefault extends true
    // Has default: value is always present (default fills in), no undefined
    ? { [K in ExtractOptionNames<S>]: DetermineOptionType<S, TypeOpt, EnumOpt> }
    // Optional: may be undefined
    : { [K in ExtractOptionNames<S>]?: DetermineOptionType<S, TypeOpt, EnumOpt> };

/* MAIN - OPTIONS OBJECT EXTRACTION */

// Extract properties from an options object passed to .option()
type ExtractType<O> = O extends { type: infer T extends string } ? T : undefined;
type ExtractEnum<O> = O extends { enum: infer E extends readonly string[] } ? E : undefined;
type ExtractRequired<O> = O extends { required: true } ? true : false;
type ExtractHasDefault<O> = O extends { default: undefined } ? false : O extends { default: any } ? true : false;

// Create an OptionRecord from name string and options object
// This encapsulates all the type extraction logic in one place
type OptionRecordFrom<N extends string, O = {}> = OptionRecord<
  N,
  ExtractType<O>,
  ExtractEnum<O>,
  ExtractRequired<O>,
  ExtractHasDefault<O>
>;

// OptionInfer is just an alias for OptionRecordFrom
type OptionInfer<N extends string, O> = OptionRecordFrom<N, O>;

/* EXPORT */

export type {OptionInfer};
