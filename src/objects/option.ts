
/* IMPORT */

import Addon from './addon';
import {castArray} from './utils';
import type Bin from './bin';
import type {OptionData, OptionOptions, OptionType, OptionValidator} from '../types';

/* MAIN */

class Option extends Addon {

  /* VARIABLES */

  data: OptionData;
  ids: string[];
  name: string;
  description: string;
  section: string;
  deprecated: boolean;
  eager: boolean;
  hidden: boolean;
  incompatible: string[];
  required: boolean;
  variadic: boolean;
  default: unknown;
  enum?: string[];
  validate?: OptionValidator;

  /* CONSTRUCTOR */

  constructor ( bin: Bin, options: OptionOptions ) {

    super ( bin );

    this.data = this.parse ( options.name, options.type );
    this.ids = this.data.alls;
    this.name = options.name;
    this.description = options.description;
    this.section = options.section || '';
    this.deprecated = !!options.deprecated;
    this.eager = !!options.eager;
    this.hidden = !!options.hidden;
    this.incompatible = castArray ( options.incompatible || [] );
    this.required = !!options.required;
    this.variadic = options.name.includes ( '...' );
    this.default = options.default;
    this.enum = options.enum;
    this.validate = options.validate;

    if ( this.eager && !this.data.args.length ) {
      this.bin.fail ( `Eager option must not be boolean: "${this.name}"` );
    }

    if ( this.eager && !this.variadic ) {
      this.bin.fail ( `Eager option must be variadic: "${this.name}"` );
    }

  }

  /* PRIVATE API */

  private parse ( name: string, forceType?: OptionType ): OptionData {

    const longsPositive: string[] = [];
    const longs: string[] = [];
    const shorts: string[] = [];
    const args: string[] = [];

    const re = /--([a-z0-9-\.]+)|-([a-zA-Z\.])|<([^>.]+(?:\.\.\.)?)>|([\s,])|([^])/g;

    name.replace ( re, ( _, long, short, arg, spacer, invalid ): string => {
      if ( long && long.startsWith ( 'no-' ) ) longsPositive.push ( long.slice ( 3 ) );
      if ( long ) longs.push ( long );
      if ( short ) shorts.push ( short );
      if ( arg ) args.push ( arg );
      if ( invalid ) this.bin.fail ( `Invalid option: "${name}"` );
      return _;
    });

    if ( !longs.length && !shorts.length ) this.bin.fail ( `Option must define at least a longhand or a shorthand: "${name}"` );

    if ( args.length > 1 ) this.bin.fail ( `Option can define at most one argument: "${name}"` );

    const type = forceType || ( args.length ? 'string' : 'boolean' );
    const alls = [...longsPositive, ...longs, ...shorts];
    const data: OptionData = { type, alls, longs, shorts, args };

    return data;

  }

}

/* EXPORT */

export default Option;
