
/* IMPORT */

import Addon from './addon';
import Argument from './argument';
import ChainableBinLocal from './chainable_bin_local';
import Option from './option';
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

  option ( name: string, description: string, options: Omit<OptionOptions, 'name' | 'description'> = {} ): this {

    const option = new Option ( this.bin, { name, description, ...options } );

    this.command.options.register ( option, !!options.override );

    return this;

  }

  argument ( name: string, description: string, options: Omit<ArgumentOptions, 'name' | 'description'> = {} ): this {

    const argument = new Argument ( this.bin, { name, description, ...options } );

    this.command.arguments.register ( argument );

    return this;

  }

  action ( handler: CommandHandler ): ChainableBinLocal {

    this.command.handler = handler;

    return new ChainableBinLocal ( this.bin );

  }

}

/* EXPORT */

export default ChainableCommand;
