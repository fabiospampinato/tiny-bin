
/* IMPORT */

import Addon from './addon';
import Argument from './argument';
import ChainableAction from './chainable_action';
import ChainableCommandLocal from './chainable_command_local';
import Command from './command';
import Option from './option';
import {isObject} from './utils';
import type {ArgumentOptions, CommandHandler, CommandOptions, ConfigOptions, OptionOptions} from '../types';
import type {OptionInfer} from '../types.infer';

/* MAIN */

class ChainableCommandGlobal<GlobalOptions> extends Addon {

  /* API */

  config ( options: Partial<ConfigOptions> ): this {

    this.bin.config.update ( options );

    return this;

  }

  usage ( usage: string ): this {

    this.bin.command.usage.register ( usage );

    return this;

  }

  option<N extends string, O extends OptionOptions> ( options: O & { name: N } ): ChainableCommandGlobal<GlobalOptions & OptionInfer<N, O>>;
  option<N extends string, O extends Omit<OptionOptions, 'name' | 'description'> = {}> ( name: N, description: string, options?: O ): ChainableCommandGlobal<GlobalOptions & OptionInfer<N, O>>;
  option ( name: OptionOptions | string, description?: string, options?: Omit<OptionOptions, 'name' | 'description'> ): ChainableCommandGlobal<GlobalOptions> {

    const optionOptions = isObject ( name ) ? name : { name, description, ...options };
    const option = new Option ( this.bin, optionOptions );

    this.bin.command.options.register ( option, !!optionOptions.override );

    return this;

  }

  argument ( options: ArgumentOptions ): this;
  argument ( name: string, description: string, options?: Omit<ArgumentOptions, 'name' | 'description'> ): this;
  argument ( name: ArgumentOptions | string, description?: string, options?: Omit<ArgumentOptions, 'name' | 'description'> ): this {

    const argumentOptions = isObject ( name ) ? name : { name, description, ...options };
    const argument = new Argument ( this.bin, argumentOptions );

    this.bin.command.arguments.register ( argument );

    return this;

  }

  action ( handler: CommandHandler<GlobalOptions> ): ChainableAction<GlobalOptions> {

    this.bin.command.handler = handler;

    return new ChainableAction<GlobalOptions> ( this.bin );

  }

  command ( options: CommandOptions ): ChainableCommandLocal<GlobalOptions, {}>;
  command ( name: string, description: string, options?: Omit<CommandOptions, 'name' | 'description'> ): ChainableCommandLocal<GlobalOptions, {}>;
  command ( name: CommandOptions | string, description?: string, options?: Omit<CommandOptions, 'name' | 'description'> ): ChainableCommandLocal<GlobalOptions, {}> {

    const commandOptions = isObject ( name ) ? name : { name, description, ...options };
    const command = new Command ( this.bin, commandOptions );

    this.bin.commands.register ( command );

    return new ChainableCommandLocal ( this.bin, command );

  }

  run ( argv?: string[] ): Promise<void> {

    return this.bin.run ( argv );

  }

}

/* EXPORT */

export default ChainableCommandGlobal;
