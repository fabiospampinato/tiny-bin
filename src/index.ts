
/* IMPORT */

import Bin from './objects/bin';
import ChainableCommandGlobal from './objects/chainable_command_global';
import {isObject} from './objects/utils';
import type {BinOptions} from './types';

/* MAIN */

function bin (): ChainableCommandGlobal<{}>;
function bin ( options: BinOptions ): ChainableCommandGlobal<{}>;
function bin ( name: string, description: string ): ChainableCommandGlobal<{}>;
function bin ( name?: BinOptions | string, description?: string ): ChainableCommandGlobal<{}> {

  const binOptions = isObject ( name ) ? name : { name, description };
  const bin = new Bin ( binOptions );
  const command = new ChainableCommandGlobal<{}> ( bin );

  return command;

}

/* EXPORT */

export default bin;
