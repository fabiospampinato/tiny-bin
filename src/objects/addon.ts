
/* IMPORT */

import type Bin from './bin';
import type Logger from './logger';

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
