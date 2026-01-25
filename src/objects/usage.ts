
/* IMPORT */

import colors from 'tiny-colors';
import Addon from './addon';
import {identity} from './utils';
import type Command from './command';

/* MAIN */

class Usage extends Addon {

  /* VARIABLES */

  protected usages: Set<string> = new Set ();

  /* API */

  print ( command: Command ): void {

    this.stdout.group ( 'USAGE', () => {

      if ( this.usages.size ) {

        //TODO: Maybe automatically colorize these

        this.usages.forEach ( usage => {
          this.stdout.print ( usage );
        });

      } else {

        //TODO: List required options too

        const isCommandDefault = ( command === this.bin.command );
        const binName = this.bin.config.name;
        const commandName = isCommandDefault ? '' : command.name;
        const name = [binName, commandName].filter ( identity ).join ( ' ' );
        const commands = isCommandDefault && !command.handler ? colors.magenta ( '[command]' ) : '';
        const args = command.arguments.getAll ().map ( arg => colors.yellow ( arg.name ) ).join ( ' ' );
        const line = [name, commands, args].filter ( identity ).join ( ' ' );

        this.stdout.print ( line );

      }

    });

  }

  register ( usage: string ): void {

    this.usages.add ( usage );

  }

}

/* EXPORT */

export default Usage;
