
/* IMPORT */

import Command from './command';
import type {ArgumentsParsed} from '../types';
import type Bin from './bin';

/* MAIN */

class CommandVersion extends Command {

  /* CONSTRUCTOR */

  constructor ( bin: Bin ) {

    super ( bin, {
      name: '_version',
      description: 'Display the version number',
      hidden: true
    });

  }

  /* API */

  async run ( options: ArgumentsParsed, argv: string[] ): Promise<void> {

    this.stdout.print ( this.bin.metadata.version );

  }

}

/* EXPORT */

export default CommandVersion;
