
/* IMPORT */

import Addon from './addon';
import ChainableCommandGlobal from './chainable_command_global';
import {isObject} from './utils';
import type {CommandOptions} from '../types';
import type ChainableCommandLocal from './chainable_command_local';

/* MAIN */

class ChainableAction extends Addon {

  /* API */

  command ( options: CommandOptions ): ChainableCommandLocal;
  command ( name: string, description: string, options?: Omit<CommandOptions, 'name' | 'description'> ): ChainableCommandLocal;
  command ( name: CommandOptions | string, description?: string, options?: Omit<CommandOptions, 'name' | 'description'> ): ChainableCommandLocal {

    const commandOptions = isObject ( name ) ? name : { name, description, ...options };

    return new ChainableCommandGlobal ( this.bin ).command ( commandOptions );

  }

  run ( argv?: string[] ): Promise<void> {

    return new ChainableCommandGlobal ( this.bin ).run ( argv );

  }

}

/* EXPORT */

export default ChainableAction;
