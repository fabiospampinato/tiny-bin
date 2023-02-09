
/* IMPORT */

import Addon from '~/objects/addon';
import Argument from '~/objects/argument';
import ChainableCommand from '~/objects/chainable_command';
import Command from '~/objects/command';
import Option from '~/objects/option';
import type {ArgumentOptions, CommandHandler, CommandOptions, OptionOptions} from '~/types';

/* MAIN */

class ChainableBin extends Addon {

  /* API */

  colors ( colors: boolean ): this {

    this.bin.metadata.colors = colors;

    return this;

  }

  autoExit ( exiter: boolean ): this {

    this.bin.metadata.exiter = exiter;

    return this;

  }

  autoUpdateNotifier ( updater: boolean ): this {

    this.bin.metadata.updater = updater;

    return this;

  }

  usage ( usage: string ): this {

    this.bin.command.usage.register ( usage );

    return this;

  }

  option ( name: string, description: string, options: Omit<OptionOptions, 'name' | 'description'> = {} ): this {

    const option = new Option ( this.bin, { name, description, ...options } );

    this.bin.command.options.register ( option );

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

  command ( name: string, description: string, options: Omit<CommandOptions, 'name' | 'description'> = {} ): ChainableCommand {

    const command = new Command ( this.bin, { name, description, ...options } );

    this.bin.commands.register ( command );

    return new ChainableCommand ( this.bin, command );

  }

  run ( argv: string[] ): Promise<void> {

    return this.bin.run ( argv );

  }

}

/* EXPORT */

export default ChainableBin;
