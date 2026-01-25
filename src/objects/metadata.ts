
/* IMPORT */

import colors from 'tiny-colors';
import Addon from './addon';

/* MAIN */

class Metadata extends Addon {

  /* VARIABLES */

  name: string = 'bin';
  description: string = '';
  package: string = '';
  version: string = '0.0.0';
  colors: boolean = true;
  exiter: boolean = true;

  /* API */

  print (): void {

    this.stdout.print ( `${colors.cyan ( this.name )} ${colors.dim ( this.version )}` );
    this.stdout.print ();

  }

}

/* EXPORT */

export default Metadata;
