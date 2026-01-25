
/* IMPORT */

import Addon from './addon';
import ChainableCommandGlobal from './chainable_command_global';
import {isObject} from './utils';
import type {CommandOptions} from '../types';
import type ChainableCommandLocal from './chainable_command_local';

/* MAIN */

class ChainableAction<GlobalOptions> extends Addon {

  /* API */

  command ( options: CommandOptions ): ChainableCommandLocal<GlobalOptions, {}>;
  command ( name: string, description: string, options?: Omit<CommandOptions, 'name' | 'description'> ): ChainableCommandLocal<GlobalOptions, {}>;
  command ( name: CommandOptions | string, description?: string, options?: Omit<CommandOptions, 'name' | 'description'> ): ChainableCommandLocal<GlobalOptions, {}> {

    const commandOptions = isObject ( name ) ? name : { name, description, ...options };

    return new ChainableCommandGlobal<GlobalOptions> ( this.bin ).command ( commandOptions );

  }

  run ( argv?: string[] ): Promise<void> {

    return new ChainableCommandGlobal ( this.bin ).run ( argv );

  }

}

/* EXPORT */

export default ChainableAction;
