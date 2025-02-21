
/* IMPORT */

import colors from 'tiny-colors';
import Collection from '~/objects/collection';
import {groupBy, identity, pushBack} from '~/utils';
import type Command from '~/objects/command';
import type {ParsedArgs} from 'tiny-parse-argv';

/* MAIN */

class Commands extends Collection<Command> {

  /* API */

  print ( mode?: 'line' | 'lines' ): void {

    const commands = this.getAll ();

    if ( !commands.length ) return;

    const commandsVisible = commands.filter ( command => !command.hidden );

    if ( !commandsVisible.length ) return;

    const withoutOther = ( section: string ) => section.toLowerCase () !== 'other' ? section : '';
    const commandsBySection = pushBack ( groupBy ( commandsVisible, command => withoutOther ( command.section.toLowerCase () ) ), '' );

    commandsBySection.forEach ( ( commands, section ) => {

      if ( !commands.length ) return;

      const title = section ? `${section.toUpperCase ()} COMMANDS` : ( commandsBySection.size > 1 ? 'OTHER COMMANDS' : 'COMMANDS' );

      const table = commands.map ( command => {

        const withDeprecated: ( arg: string ) => string = command.deprecated ? colors.dim : identity;

        return [
          [
            colors.magenta ( command.name ),
            ...command.arguments.getAll ().map ( arg => colors.yellow ( arg.name ) )
          ].join ( ' ' ),
          command.description
        ].map ( withDeprecated );

      });

      this.stdout.group ( title, () => {
        this.stdout.table ( table, mode );
      });

    });

  }

  run ( name: string, options: ParsedArgs, argv: string[] ): Promise<void> {

    const command = this.getByIdOrFail ( name );

    return command.run ( options, argv );

  }

}

/* EXPORT */

export default Commands;
