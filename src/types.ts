
/* IMPORT */

import type {ParsedArgs} from 'tiny-parse-argv';

/* MAIN */

type ArgumentOptions = {
  name: string,
  description: string
};

type ArgumentsParsed = ParsedArgs;

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

type ConfigOptions = {
  name: string,
  description: string,
  package: string,
  version: string,
  colors: boolean,
  autoExit: boolean
};

type LoggerHandler = {
  ( ...args: unknown[] ): void
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
  override?: boolean,
  required?: boolean,
  default?: unknown,
  enum?: string[],
  type?: OptionType,
  validate?: OptionValidator
};

type OptionType = (
  'boolean' | 'integer' | 'number' | 'string'
);

type OptionValidator = (
  ( value: string ) => boolean
);

/* EXPORT */

export type {ArgumentOptions, ArgumentsParsed, BinOptions, CommandHandler, CommandOptions, ConfigOptions, LoggerHandler, OptionData, OptionOptions, OptionType, OptionValidator};
