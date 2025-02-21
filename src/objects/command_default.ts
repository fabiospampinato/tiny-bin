
/* IMPORT */

import parseArgv from 'tiny-parse-argv';
import Command from '~/objects/command';
import {camelCase, castArray, getClosest, isArray, sum} from '~/utils';
import type Bin from '~/objects/bin';
import type {OptionValidator} from '~/types';
import type {ParsedArgs} from 'tiny-parse-argv';

/* MAIN */

class CommandDefault extends Command {

  /* CONSTRUCTOR */

  constructor ( bin: Bin ) {

    super ( bin, {
      name: '_default',
      description: 'Execute the default action',
      hidden: true
    });

  }

  /* API */

  async run ( options: ParsedArgs, argv: string[] ): Promise<void> {

    const name = this.bin.commands.getById ( options._[0] ) ? options._[0] : this.name;

    if ( options['help'] || name === 'help' ) {

      return this.bin.commands.run ( 'help', options, argv );

    } else if ( options['version'] || options['v'] ) {

      return this.bin.commands.run ( '_version', options, argv );

    } else {

      //TODO: Detect conflicting options

      const isDefault = ( name === this.name );

      if ( isDefault && !this.handler ) {

        this.bin.fail ( 'Command handler not defined for default command' );

      }

      const command = this.bin.commands.getByIdOrFail ( name );
      const options = [...this.bin.command.options.getAll (), ...command.options.getAll ()];
      const minArgs = command.arguments.getAll ().filter ( arg => arg.required ).length;
      const maxArgs = sum ( command.arguments.getAll ().map ( arg => arg.variadic ? Infinity : 1 ) );

      const parseArgvOptions = {
        known: <string[]> [],
        boolean: <string[]> [],
        integer: <string[]> [],
        number: <string[]> [],
        string: <string[]> [],
        eager: <string[]> [],
        required: <string[]> [],
        unary: <string[]> [],
        variadic: <string[]> [],
        alias: <Partial<Record<string, string[]>>> {},
        default: <Partial<Record<string, any>>> {},
        incompatible: <Partial<Record<string, string[]>>> {},
        validators: <Partial<Record<string, OptionValidator>>> {},
        onIncompatible: ( options: [string, string][] ): void => {
          this.bin.fail ( `Incompatible options: "${options[0][0]}" and "${options[0][1]}" cannot be used together` );
        },
        onInvalid: ( options: string[] ): void => {
          this.bin.fail ( `Invalid value for "${options[0]}" option` );
        },
        onMissing: ( options: string[] ): void => {
          this.bin.fail ( `Missing required option: "${options[0]}"` );
        },
        onUnknown: ( options: string[] ): void => {
          const closest = getClosest ( parseArgvOptions.known, options[0], 3, true );
          this.bin.fail ( `Unknown option: "${options[0]}"${closest ? `. Did you mean "${closest}"?` : ''}` );
        }
      };

      options.forEach ( option => {
        parseArgvOptions.known.push ( ...option.data.alls );
        if ( option.data.type === 'boolean' ) {
          parseArgvOptions.boolean.push ( ...option.data.alls );
        }
        if ( option.data.type === 'integer' ) {
          parseArgvOptions.integer.push ( ...option.data.alls );
        }
        if ( option.data.type === 'number' ) {
          parseArgvOptions.number.push ( ...option.data.alls );
        }
        if ( option.data.type === 'string' ) {
          parseArgvOptions.string.push ( ...option.data.alls );
        }
        if ( option.eager ) {
          parseArgvOptions.eager.push ( ...option.data.alls );
        }
        if ( option.incompatible ) {
          const incompatible = ( parseArgvOptions.incompatible[option.data.alls[0]] ||= [] );
          incompatible.push ( ...option.incompatible );
        }
        if ( option.required ) {
          parseArgvOptions.required.push ( ...option.data.alls );
        }
        if ( !option.variadic ) {
          parseArgvOptions.unary.push ( ...option.data.alls );
        }
        if ( option.variadic ) {
          parseArgvOptions.variadic.push ( ...option.data.alls );
        }
        if ( option.validate ) {
          parseArgvOptions.validators[option.data.alls[0]] = option.validate;
        }
        if ( 'default' in option ) {
          parseArgvOptions.default[option.data.alls[0]] = option.default;
        }
        const [first, ...rest] = option.data.alls;
        parseArgvOptions.alias[first] = rest;
      });

      const parsed = parseArgv ( argv, parseArgvOptions );

      options.forEach ( option => {
        if ( option.data.type !== 'string' ) return;
        const name = option.data.alls[0];
        const value = parsed[name];
        if ( !value ) return;
        const enums = option.enum;
        if ( !enums ) return;
        const values = castArray ( value );
        values.forEach ( value => {
          if ( enums.includes ( value ) ) return;
          this.bin.fail ( `Invalid value for "${option.data.alls[0]}" option, received "${value}" but only ${enums.map ( e => `"${e}"` ).join ( ', ' )} are supported` );
        });
      });

      options.forEach ( option => {
        const name = option.data.alls[0];
        const value = parsed[name];
        if ( !isArray ( value ) ) return;
        if ( value.length < 2 ) return;
        if ( option.variadic ) return;
        this.bin.fail ( `Expected 1 value for "${option.data.alls[0]}" option, but received "${value.length}" values` );
      });

      Object.keys ( parsed ).forEach ( key => {
        const camelKey = camelCase ( key );
        if ( camelKey === key ) return;
        parsed[camelKey] = parsed[key];
      });

      if ( !isDefault ) {
        parsed._.shift ();
      }

      const actualArgs = parsed._.length;

      if ( actualArgs < minArgs || actualArgs > maxArgs ) {
        if ( minArgs === maxArgs ) {
          this.bin.fail ( `Expected ${minArgs} arguments, but received ${actualArgs} arguments` );
        } else {
          this.bin.fail ( `Expected between ${minArgs} and ${maxArgs} arguments, but received ${actualArgs} arguments` );
        }
      }

      if ( isDefault ) {

        return this.handler! ( parsed, parsed._, parsed['--'] ); //TSC

      } else {

        return command.run ( parsed, argv );

      }

    }

  }

}

/* EXPORT */

export default CommandDefault;
