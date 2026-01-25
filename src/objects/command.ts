
/* IMPORT */

import Addon from './addon';
import Arguments from './arguments';
import Options from './options';
import Usage from './usage';
import type Bin from './bin';
import type {CommandHandler, CommandOptions} from '../types';
import type {ParsedArgs} from 'tiny-parse-argv';

/* MAIN */

class Command extends Addon {

  /* VARIABLES */

  ids: string[];
  name: string;
  description: string;
  section: string;
  deprecated: boolean;
  hidden: boolean;
  arguments: Arguments = new Arguments ( this.bin );
  options: Options = new Options ( this.bin );
  usage: Usage = new Usage ( this.bin );
  handler?: CommandHandler;

  /* CONSTRUCTOR */

  constructor ( bin: Bin, options: CommandOptions ) {

    super ( bin );

    this.ids = [this.parse ( options.name )];
    this.name = options.name;
    this.description = options.description;
    this.section = options.section || '';
    this.deprecated = !!options.deprecated;
    this.hidden = !!options.hidden;

  }

  /* PRIVATE API */

  private parse ( name: string ): string {

    const re = /^_?[a-z][a-z-]*$/;

    const isValid = re.test ( name );

    if ( !isValid ) this.bin.fail ( `Invalid command: "${name}"` );

    return name;

  }

  /* API */

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
