
/* IMPORT */

import {ENABLED} from 'tiny-colors';
import colors from 'tiny-colors';
import Addon from './addon';
import type {ConfigOptions} from '../types';

/* MAIN */

class Config extends Addon {

  /* VARIABLES */

  name: string = 'bin';
  description: string = '';
  package: string = '';
  version: string = '';
  colors: boolean = ENABLED;
  autoExit: boolean = true;

  /* API */

  print (): void {

    this.stdout.print ( `${colors.cyan ( this.name )} ${colors.dim ( this.version )}` );
    this.stdout.print ();

  }

  update ( options: Partial<ConfigOptions> ): void {

    Object.assign ( this, options );

  }

}

/* EXPORT */

export default Config;
