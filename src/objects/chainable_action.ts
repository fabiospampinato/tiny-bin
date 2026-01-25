
/* IMPORT */

import Addon from './addon';
import ChainableCommandGlobal from './chainable_command_global';
import type {CommandOptions} from '../types';
import type ChainableCommandLocal from './chainable_command_local';

/* MAIN */

class ChainableAction extends Addon {

  /* API */

  command ( name: string, description: string, options: Omit<CommandOptions, 'name' | 'description'> = {} ): ChainableCommandLocal {

    return new ChainableCommandGlobal ( this.bin ).command ( name, description, options );

  }

  run ( argv?: string[] ): Promise<void> {

    return new ChainableCommandGlobal ( this.bin ).run ( argv );

  }

}

/* EXPORT */

export default ChainableAction;
