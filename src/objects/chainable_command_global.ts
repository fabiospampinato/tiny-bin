
/* IMPORT */

import Addon from './addon';
import Argument from './argument';
import ChainableCommandLocal from './chainable_command_local';
import Command from './command';
import Option from './option';
import type {ArgumentOptions, CommandHandler, CommandOptions, ConfigOptions, OptionOptions} from '../types';

/* MAIN */

class ChainableCommandGlobal extends Addon {

  /* API */

  config ( options: ConfigOptions ): this {

    this.bin.config.update ( options );

    return this;

  }

  usage ( usage: string ): this {

    this.bin.command.usage.register ( usage );

    return this;

  }

  option ( name: string, description: string, options: Omit<OptionOptions, 'name' | 'description'> = {} ): this {

    const option = new Option ( this.bin, { name, description, ...options } );

    this.bin.command.options.register ( option, !!options.override );

    return this;

  }

  argument ( name: string, description: string, options: Omit<ArgumentOptions, 'name' | 'description'> = {} ): this {

    const argument = new Argument ( this.bin, { name, description, ...options } );

    this.bin.command.arguments.register ( argument );

    return this;

  }

  action ( handler: CommandHandler ): this {

    this.bin.command.handler = handler;

    return this;

  }

  command ( name: string, description: string, options: Omit<CommandOptions, 'name' | 'description'> = {} ): ChainableCommandLocal {

    const command = new Command ( this.bin, { name, description, ...options } );

    this.bin.commands.register ( command );

    return new ChainableCommandLocal ( this.bin, command );

  }

  run ( argv?: string[] ): Promise<void> {

    return this.bin.run ( argv );

  }

}

/* EXPORT */

export default ChainableCommandGlobal;
