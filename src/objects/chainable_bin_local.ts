
/* IMPORT */

import Addon from './addon';
import ChainableBin from './chainable_bin_global';
import type ChainableCommand from './chainable_command';
import type {CommandOptions} from '../types';

/* MAIN */

class ChainableBinAfterCustomCommand extends Addon {

  /* API */

  command ( name: string, description: string, options: Omit<CommandOptions, 'name' | 'description'> = {} ): ChainableCommand {

    return new ChainableBin ( this.bin ).command ( name, description, options );

  }

  run ( argv?: string[] ): Promise<void> {

    return new ChainableBin ( this.bin ).run ( argv );

  }

}

/* EXPORT */

export default ChainableBinAfterCustomCommand;
