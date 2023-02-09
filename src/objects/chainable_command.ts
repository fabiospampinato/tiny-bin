
/* IMPORT */

import Addon from '~/objects/addon';
import Argument from '~/objects/argument';
import ChainableBinLocal from '~/objects/chainable_bin_local';
import Option from '~/objects/option';
import type Bin from '~/objects/bin';
import type Command from '~/objects/command';
import type {ArgumentOptions, CommandHandler, OptionOptions} from '~/types';

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

    this.command.options.register ( option );

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
