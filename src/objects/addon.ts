
/* IMPORT */

import type Bin from '~/objects/bin';
import type Logger from '~/objects/logger';

/* MAIN */

class Addon {

  /* VARIABLES */

  protected bin: Bin;
  protected logger: Logger;

  /* CONSTRUCTOR */

  constructor ( bin: Bin ) {

    this.bin = bin;
    this.logger = bin.logger;

  }

}

/* EXPORT */

export default Addon;
