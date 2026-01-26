
/* IMPORT */

import colors from 'tiny-colors';
import Addon from './addon';
import {identity, isUndefined} from './utils';
import type Command from './command';
import type Option from './option';

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

        const isCommandDefault = ( command === this.bin.command );
        const binName = this.bin.config.name;
        const commandName = isCommandDefault ? '' : command.name;
        const name = [binName, commandName].filter ( identity ).join ( ' ' );
        const commands = isCommandDefault && !command.handler ? colors.magenta ( '[command]' ) : '';
        const args = command.arguments.getAll ().map ( arg => colors.yellow ( arg.name ) ).join ( ' ' );

        const isOptionRequired = ( option: Option ) => option.required && isUndefined ( option.default ) && !option.hidden;
        const optionsGlobalRequired = !isCommandDefault ? this.bin.command.options.getAll ().filter ( isOptionRequired ) : [];
        const optionsLocalRequired = command.options.getAll ().filter ( isOptionRequired );
        const optionsRequired = [...optionsGlobalRequired, ...optionsLocalRequired];
        const options = optionsRequired.map ( option => {
          const flagName = option.data.longs[0] || option.data.shorts[0];
          const flag = colors.green ( `--${flagName}` );
          const argName = option.data.args[0];
          const argVariadic = option.variadic ? '...' : '';
          const arg = argName ? colors.blue ( `<${argName}${argVariadic}>` ) : '';
          return [flag, arg].filter ( identity ).join ( ' ' );
        }).join ( ' ' );

        const line = [name, commands, options, args].filter ( identity ).join ( ' ' );

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
