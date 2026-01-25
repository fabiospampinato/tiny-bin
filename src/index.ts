
/* IMPORT */

import Bin from './objects/bin';
import ChainableCommandGlobal from './objects/chainable_command_global';

/* MAIN */

const bin = ( name: string, description: string ): ChainableCommandGlobal => {

  const bin = new Bin ({ name, description });
  const command = new ChainableCommandGlobal ( bin );

  return command;

};

/* EXPORT */

export default bin;
