
/* IMPORT */

import Addon from './addon';
import ChainableBinGlobal from './chainable_bin_global';
import type {CommandOptions} from '../types';
import type ChainableCommand from './chainable_command';

/* MAIN */

class ChainableBinLocal extends Addon {

  /* API */

  command ( name: string, description: string, options: Omit<CommandOptions, 'name' | 'description'> = {} ): ChainableCommand {

    return new ChainableBinGlobal ( this.bin ).command ( name, description, options );

  }

  run ( argv?: string[] ): Promise<void> {

    return new ChainableBinGlobal ( this.bin ).run ( argv );

  }

}

/* EXPORT */

export default ChainableBinLocal;
