
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
  hidden?: boolean
};

type OptionData = {
  type: 'string' | 'boolean',
  alls: string[],
  longs: string[],
  shorts: string[],
  args: string[]
};

type OptionOptions = {
  name: string,
  description: string,
  eager?: boolean,
  hidden?: boolean,
  required?: boolean,
  default?: unknown,
  enum?: string[]
};

/* EXPORT */

export type {ArgumentOptions, BinOptions, CommandHandler, CommandOptions, OptionData, OptionOptions};
