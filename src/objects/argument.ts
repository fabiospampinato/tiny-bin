
/* IMPORT */

import Addon from '~/objects/addon';
import type Bin from '~/objects/bin';
import type {ArgumentOptions} from '~/types';

/* MAIN */

class Argument extends Addon {

  /* VARIABLES */

  ids: string[];
  name: string;
  description: string;
  required: boolean;
  variadic: boolean;

  /* CONSTRUCTOR */

  constructor ( bin: Bin, options: ArgumentOptions ) {

    super ( bin );

    this.ids = [this.parse ( options.name )];
    this.name = options.name;
    this.description = options.description;
    this.required = ( options.name[0] === '<' );
    this.variadic = options.name.includes ( '...' );


  }

  /* PRIVATE API */

  private parse ( name: string ): string {

    const re = /^\[([^\].]+)(?:\.\.\.)?\]$|^<([^>.]+)(?:\.\.\.)?>$/;

    const match = re.exec ( name );

    if ( !match ) this.bin.fail ( `Invalid argument: "${name}"` );

    const id = match[1] || match[2];

    return id;

  }

}

/* EXPORT */

export default Argument;
