
/* IMPORT */

import getCurrentPackage from 'get-current-package';
import process from 'node:process';
import colors from 'tiny-colors';
import parseArgv from 'tiny-parse-argv';
import updater from 'tiny-updater';
import Logger from '~/objects/logger';
import Metadata from '~/objects/metadata';
import Commands from '~/objects/commands';
import CommandDefault from '~/objects/command_default';
import CommandHelp from '~/objects/command_help';
import CommandVersion from '~/objects/command_version';
import Option from '~/objects/option';
import {defer} from '~/utils';
import type Command from '~/objects/command';
import type {BinOptions} from '~/types';

/* MAIN */

class Bin {

  /* VARIABLES */

  logger: Logger = new Logger ( this );
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

    this.logger.print ();
    this.logger.indent ();
    this.logger.print ( colors.red ( message ) );
    this.logger.dedent ();
    this.logger.print ();

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

    if ( this.metadata.package && this.metadata.updater ) {

      defer ( () => {

        updater ({
          name: this.metadata.package,
          version: this.metadata.version
         });

      });

    }

    try {

      const options = parseArgv ( argv );

      await this.commands.run ( this.command.name, options, argv );

      if ( this.metadata.exiter ) {

        process.exit ( 0 );

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
