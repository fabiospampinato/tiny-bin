
/* IMPORT */

import Addon from '~/objects/addon';
import ChainableBin from '~/objects/chainable_bin_global';
import type ChainableCommand from '~/objects/chainable_command';
import type {CommandOptions} from '~/types';

/* MAIN */

class ChainableBinAfterCustomCommand extends Addon {

  /* API */

  command ( name: string, description: string, options: Omit<CommandOptions, 'name' | 'description'> = {} ): ChainableCommand {

    return new ChainableBin ( this.bin ).command ( name, description, options );

  }

  run ( argv: string[] ): Promise<void> {

    return new ChainableBin ( this.bin ).run ( argv );

  }

}

/* EXPORT */

export default ChainableBinAfterCustomCommand;
