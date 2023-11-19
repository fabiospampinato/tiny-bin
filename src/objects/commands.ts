
/* IMPORT */

import colors from 'tiny-colors';
import Collection from '~/objects/collection';
import {groupBy, pushBack} from '~/utils';
import type Command from '~/objects/command';
import type {ParsedArgs} from 'tiny-parse-argv';

/* MAIN */

class Commands extends Collection<Command> {

  /* API */

  print (): void {

    const commands = this.getAll ();

    if ( !commands.length ) return;

    const commandsVisible = commands.filter ( command => !command.hidden );

    if ( !commandsVisible.length ) return;

    const commandsBySection = pushBack ( groupBy ( commandsVisible, command => command.section.toLowerCase () ), '' );

    commandsBySection.forEach ( ( commands, section ) => {

      if ( !commands.length ) return;

      const title = section ? `${section.toUpperCase ()} COMMANDS` : ( commandsBySection.size > 1 ? 'OTHER COMMANDS' : 'COMMANDS' );

      const table = commands.map ( command => [
        [
          colors.magenta ( command.name ),
          ...command.arguments.getAll ().map ( arg => colors.yellow ( arg.name ) )
        ].join ( ' ' ),
        command.description
      ]);

      this.logger.group ( title, () => {
        this.logger.table ( table );
      });

    });

  }

  run ( name: string, options: ParsedArgs, argv: string[] ): Promise<void> {

    const command = this.getOrFail ( name );

    return command.run ( options, argv );

  }

}

/* EXPORT */

export default Commands;
