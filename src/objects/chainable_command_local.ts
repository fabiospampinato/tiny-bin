
/* IMPORT */

import Addon from './addon';
import Argument from './argument';
import ChainableAction from './chainable_action';
import Option from './option';
import {isObject} from './utils';
import type {ArgumentOptions, CommandHandler, OptionOptions} from '../types';
import type Bin from './bin';
import type Command from './command';

/* MAIN */

class ChainableCommand extends Addon {

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

  option ( options: OptionOptions ): this;
  option ( name: string, description: string, options?: Omit<OptionOptions, 'name' | 'description'> ): this;
  option ( name: OptionOptions | string, description?: string, options?: Omit<OptionOptions, 'name' | 'description'> ): this {

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

  action ( handler: CommandHandler ): ChainableAction {

    this.command.handler = handler;

    return new ChainableAction ( this.bin );

  }

}

/* EXPORT */

export default ChainableCommand;
