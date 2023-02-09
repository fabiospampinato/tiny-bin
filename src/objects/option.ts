
/* IMPORT */

import {match, or, plus, validate} from 'grammex';
import Addon from '~/objects/addon';
import type Bin from '~/objects/bin';
import type {OptionData, OptionOptions} from '~/types';

/* MAIN */

class Option extends Addon {

  /* VARIABLES */

  id: string;
  name: string;
  description: string;
  hidden: boolean;
  required: boolean;
  default: unknown;
  data: OptionData;

  /* CONSTRUCTOR */

  constructor ( bin: Bin, options: OptionOptions ) {

    super ( bin );

    this.id = options.name;
    this.name = options.name;
    this.description = options.description;
    this.hidden = !!options.hidden;
    this.required = !!options.required;
    this.default = options.default;
    this.data = this.parse ( options.name );

  }

  /* API */

  parse ( name: string ): OptionData {

    const longs: string[] = [];
    const shorts: string[] = [];
    const args: string[] = [];

    const GRAMMAR = plus ( or ([
      /* LONDHAND */
      match ( /--([a-z0-9-]+)/, ( _, name ) => longs.push ( name ) ),
      /* SHORTHAND */
      match ( /-([a-zA-Z])/, ( _, name ) => shorts.push ( name ) ),
      /* ARGUMENT */
      match ( /<([^>.]+(?:\.\.\.)?)>/, ( _, name ) => args.push ( name ) ),
      /* SPACER */
      match ( /[\s,]/ )
    ]));

    const isValid = validate ( name, GRAMMAR, {} );

    if ( !isValid ) this.bin.fail ( `Invalid option: "${name}"` );

    if ( !longs.length && !shorts.length ) this.bin.fail ( `Option must define at least a longhand or a shorthand: "${name}"` );

    if ( args.length > 1 ) this.bin.fail ( `Option can define at most one argument: "${name}"` );

    const type = args.length ? 'string' : 'boolean';
    const alls = [...longs, ...shorts];
    const data: OptionData = { type, alls, longs, shorts, args };

    return data;

  }

}

/* EXPORT */

export default Option;
