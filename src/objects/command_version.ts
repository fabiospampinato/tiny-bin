
/* IMPORT */

import Command from './command';
import type Bin from './bin';
import type {ParsedArgs} from 'tiny-parse-argv';

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

  async run ( options: ParsedArgs, argv: string[] ): Promise<void> {

    this.stdout.print ( this.bin.metadata.version );

  }

}

/* EXPORT */

export default CommandVersion;
