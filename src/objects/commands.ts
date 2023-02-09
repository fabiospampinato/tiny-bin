
/* IMPORT */

import colors from 'tiny-colors';
import Collection from '~/objects/collection';
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

    const table = commandsVisible.map ( command => [
      [
        colors.magenta ( command.name ),
        ...command.arguments.getAll ().map ( arg => colors.yellow ( arg.name ) )
      ].join ( ' ' ),
      command.description
    ]);

    this.logger.group ( 'COMMANDS', () => {
      this.logger.table ( table );
    });

  }

  run ( name: string, options: ParsedArgs, argv: string[] ): Promise<void> {

    const command = this.getOrFail ( name );

    return command.run ( options, argv );

  }

}

/* EXPORT */

export default Commands;
