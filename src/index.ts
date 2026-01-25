
/* IMPORT */

import Bin from './objects/bin';
import ChainableBinGlobal from './objects/chainable_bin_global';

/* MAIN */

const bin = ( name: string, description: string ): ChainableBinGlobal => {

  const bin = new Bin ({ name, description });
  const chainable = new ChainableBinGlobal ( bin );

  return chainable;

};

/* EXPORT */

export default bin;
