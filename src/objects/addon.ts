
/* IMPORT */

import type Bin from '~/objects/bin';
import type Logger from '~/objects/logger';

/* MAIN */

class Addon {

  /* VARIABLES */

  protected bin: Bin;
  protected stdout: Logger;
  protected stderr: Logger;

  /* CONSTRUCTOR */

  constructor ( bin: Bin ) {

    this.bin = bin;
    this.stdout = bin.stdout;
    this.stderr = bin.stderr;

  }

}

/* EXPORT */

export default Addon;
