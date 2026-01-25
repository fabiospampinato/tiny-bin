
/* IMPORT */

import Addon from './addon';
import Argument from './argument';
import ChainableAction from './chainable_action';
import Option from './option';
import {isObject} from './utils';
import type {ArgumentOptions, CommandHandler, OptionOptions} from '../types';
import type {OptionInfer} from '../types.infer';
import type Bin from './bin';
import type Command from './command';

/* MAIN */

class ChainableCommandLocal<GlobalOptions, LocalOptions> extends Addon {

  /* VARIABLES */

  protected command: Command;

  /* CONSTRUCTOR */

  constructor ( bin: Bin, command: Command ) {

    super ( bin );

    this.command = command;

  }

  /* API */

  usage ( usage: string ): this {

    this.command.usage.register ( usage );

    return this;

  }

  option<N extends string, O extends OptionOptions> ( options: O & { name: N } ): ChainableCommandLocal<GlobalOptions, LocalOptions & OptionInfer<N, O>>;
  option<N extends string, O extends Omit<OptionOptions, 'name' | 'description'> = {}> ( name: N, description: string, options?: O ): ChainableCommandLocal<GlobalOptions, LocalOptions & OptionInfer<N, O>>;
  option ( name: OptionOptions | string, description?: string, options?: Omit<OptionOptions, 'name' | 'description'> ): ChainableCommandLocal<GlobalOptions, LocalOptions> {

    const optionOptions = isObject ( name ) ? name : { name, description, ...options };
    const option = new Option ( this.bin, optionOptions );

    this.command.options.register ( option, !!optionOptions.override );

    return this;

  }

  argument ( options: ArgumentOptions ): this;
  argument ( name: string, description: string, options?: Omit<ArgumentOptions, 'name' | 'description'> ): this;
  argument ( name: ArgumentOptions | string, description?: string, options?: Omit<ArgumentOptions, 'name' | 'description'> ): this {

    const argumentOptions = isObject ( name ) ? name : { name, description, ...options };
    const argument = new Argument ( this.bin, argumentOptions );

    this.command.arguments.register ( argument );

    return this;

  }

  action ( handler: CommandHandler<GlobalOptions & LocalOptions> ): ChainableAction<GlobalOptions> {

    this.command.handler = handler;

    return new ChainableAction<GlobalOptions> ( this.bin );

  }

}

/* EXPORT */

export default ChainableCommandLocal;
