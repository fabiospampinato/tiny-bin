
/* MAIN */

type ArgumentOptions = {
  name: string,
  description: string
};

type BinOptions = {
  name: string,
  description: string
};

type CommandHandler = {
  ( options: Record<string, any>, args: string[], passthroughArgs: string[] ): void
};

type CommandOptions = {
  name: string,
  description: string,
  section?: string,
  deprecated?: boolean,
  hidden?: boolean
};

type OptionData = {
  type: OptionType,
  alls: string[],
  longs: string[],
  shorts: string[],
  args: string[]
};

type OptionOptions = {
  name: string,
  description: string,
  section?: string,
  deprecated?: boolean,
  eager?: boolean,
  hidden?: boolean,
  incompatible?: string | string[],
  required?: boolean,
  default?: unknown,
  enum?: string[],
  type?: OptionType
};

type OptionType = (
  'boolean' | 'integer' | 'number' | 'string'
);

/* EXPORT */

export type {ArgumentOptions, BinOptions, CommandHandler, CommandOptions, OptionData, OptionOptions, OptionType};
