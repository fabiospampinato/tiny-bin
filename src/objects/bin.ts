
/* IMPORT */

import getCurrentPackage from 'get-current-package';
import process from 'node:process';
import colors from 'tiny-colors';
import CommandDefault from './command_default';
import CommandHelp from './command_help';
import CommandVersion from './command_version';
import Commands from './commands';
import Config from './config';
import Logger from './logger';
import Option from './option';
import {parseArgv} from './utils';
import type {BinOptions} from '../types';
import type Command from './command';

/* MAIN */

class Bin {

  /* VARIABLES */

  stdout: Logger = new Logger ( this, console.log );
  stderr: Logger = new Logger ( this, console.error );
  config: Config = new Config ( this );
  commands: Commands = new Commands ( this );
  command: Command;

  /* CONSTRUCTOR */

  constructor ( options: BinOptions ) {

    this.config.name = options.name ?? this.config.name;
    this.config.description = options.description ?? this.config.description;

    const fallback = new CommandDefault ( this );
    const help = new CommandHelp ( this )
    const version = new CommandVersion ( this );

    this.commands.register ( fallback );
    this.commands.register ( help );
    this.commands.register ( version );

    this.command = fallback;
    this.command.options.register ( new Option ( this, { name: '--help', description: 'Display help for the command' } ) );
    this.command.options.register ( new Option ( this, { name: '--version, -v', description: 'Display the version number' } ) );
    this.command.options.register ( new Option ( this, { name: '--no-color, --no-colors', description: 'Disable colored output', hidden: true } ) );

  }

  /* API */

  fail ( message: string ): never {

    this.stderr.print ();
    this.stderr.indent ();
    this.stderr.print ( colors.red ( message ) );
    this.stderr.dedent ();
    this.stderr.print ();

    process.exit ( 1 );

  }

  async run ( argv: string[] = process.argv.slice ( 2 ) ): Promise<void> {

    if ( !this.config.package || !this.config.version ) {

      const pkg = getCurrentPackage ();

      if ( pkg ) {

        const {name, version} = pkg;

        this.config.package ||= name;
        this.config.version ||= version;

      }

    }

    try {

      const options = parseArgv ( argv );

      await this.commands.run ( this.command.name, options, argv );

      if ( this.config.autoExit ) {

        process.exit ();

      }

    } catch ( error: unknown ) {

      console.error ( error );

      if ( this.config.autoExit ) {

        process.exit ( 1 );

      }

    }

  }

}

/* EXPORT */

export default Bin;
