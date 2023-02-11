
/* IMPORT */

import Addon from '~/objects/addon';
import type Bin from '~/objects/bin';
import type {ArgumentOptions} from '~/types';

/* MAIN */

class Argument extends Addon {

  /* VARIABLES */

  id: string;
  name: string;
  description: string;
  required: boolean;
  variadic: boolean;

  /* CONSTRUCTOR */

  constructor ( bin: Bin, options: ArgumentOptions ) {

    super ( bin );

    this.id = options.name;
    this.name = options.name;
    this.description = options.description;
    this.required = ( options.name[0] === '<' );
    this.variadic = options.name.includes ( '...' );

    this.parse ( options.name );

  }

  /* API */

  parse ( name: string ): void {

    const re = /^\[[^\].]+(?:\.\.\.)?\]$|^<[^>.]+(?:\.\.\.)?>$/;

    const isValid = re.test ( name );

    if ( !isValid ) this.bin.fail ( `Invalid argument: "${name}"` );

  }

}

/* EXPORT */

export default Argument;
