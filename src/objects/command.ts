
/* IMPORT */

import Addon from '~/objects/addon';
import Arguments from '~/objects/arguments';
import Options from '~/objects/options';
import Usage from '~/objects/usage';
import type Bin from '~/objects/bin';
import type {CommandHandler, CommandOptions} from '~/types';
import type {ParsedArgs} from 'tiny-parse-argv';

/* MAIN */

class Command extends Addon {

  /* VARIABLES */

  id: string;
  name: string;
  description: string;
  section: string;
  hidden: boolean;
  arguments: Arguments = new Arguments ( this.bin );
  options: Options = new Options ( this.bin );
  usage: Usage = new Usage ( this.bin );
  handler?: CommandHandler;

  /* CONSTRUCTOR */

  constructor ( bin: Bin, options: CommandOptions ) {

    super ( bin );

    this.id = options.name;
    this.name = options.name;
    this.description = options.description;
    this.section = options.section || '';
    this.hidden = !!options.hidden;

    this.parse ( options.name );

  }

  /* API */

  parse ( name: string ): void {

    const re = /^_?[a-z][a-z-]*$/;

    const isValid = re.test ( name );

    if ( !isValid ) this.bin.fail ( `Invalid command: "${name}"` );

  }

  async run ( options: ParsedArgs, argv: string[] ): Promise<void> {

    if ( !this.handler ) {

      this.bin.fail ( `Command handler not defined for command: "${this.name}"` );

    } else {

      return this.handler ( options, options._, options['--'] );

    }

  }

}

/* EXPORT */

export default Command;
