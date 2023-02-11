
/* IMPORT */

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
  enum?: string[];
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
    this.enum = options.enum;
    this.data = this.parse ( options.name );

  }

  /* API */

  parse ( name: string ): OptionData {

    const longs: string[] = [];
    const shorts: string[] = [];
    const args: string[] = [];

    const re = /--([a-z0-9-]+)|-([a-zA-Z])|<([^>.]+(?:\.\.\.)?)>|([\s,])|([^])/g;

    name.replace ( re, ( _, long, short, arg, spacer, invalid ): string => {
      if ( long ) longs.push ( long );
      if ( short ) shorts.push ( short );
      if ( arg ) args.push ( arg );
      if ( invalid ) this.bin.fail ( `Invalid option: "${name}"` );
      return _;
    });

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
