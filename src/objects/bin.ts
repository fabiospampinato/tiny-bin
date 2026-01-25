
/* IMPORT */

import getCurrentPackage from 'get-current-package';
import process from 'node:process';
import colors from 'tiny-colors';
import CommandDefault from './command_default';
import CommandHelp from './command_help';
import CommandVersion from './command_version';
import Commands from './commands';
import Logger from './logger';
import Metadata from './metadata';
import Option from './option';
import {parseArgv} from './utils';
import type {BinOptions} from '../types';
import type Command from './command';

/* MAIN */

class Bin {

  /* VARIABLES */

  stdout: Logger = new Logger ( this, console.log );
  stderr: Logger = new Logger ( this, console.error );
  metadata: Metadata = new Metadata ( this );
  commands: Commands = new Commands ( this );
  command: Command;

  /* CONSTRUCTOR */

  constructor ( options: BinOptions ) {

    this.metadata.name = options.name;
    this.metadata.description = options.description;

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

    // process.title = this.metadata.name; //FIXME: It seems useless inside VSCODE, and not working as expected inside Terminal.app, so...

    if ( !this.metadata.package ) {

      const pkg = getCurrentPackage ();

      if ( pkg ) {

        const {name, version} = pkg;

        this.metadata.package = name;
        this.metadata.version = version;

      }

    }

    try {

      const options = parseArgv ( argv );

      await this.commands.run ( this.command.name, options, argv );

      if ( this.metadata.exiter ) {

        process.exit ();

      }

    } catch ( error: unknown ) {

      console.error ( error );

      if ( this.metadata.exiter ) {

        process.exit ( 1 );

      }

    }

  }

}

/* EXPORT */

export default Bin;
