
/* IMPORT */

import Collection from '~/objects/collection';
import Command from '~/objects/command';
import Argument from '~/objects/argument';
import type Bin from '~/objects/bin';
import type {ParsedArgs} from 'tiny-parse-argv';

/* MAIN */

class CommandHelp extends Command {

  /* CONSTRUCTOR */

  constructor ( bin: Bin ) {

    super ( bin, {
      name: 'help',
      description: 'Display help for the command'
    });

    this.arguments.register ( new Argument ( bin, { name: '[command]', description: 'The command to display help for' } ) );

  }

  /* PRIVATE API */

  private getPrintMode ( collections: Collection<{ id: string, description: string }>[] ): 'line' | 'lines' {

    return collections.some ( collection => collection.getAll ().some ( item => item.description.includes ( '\n' ) ) ) ? 'lines' : 'line';

  }

  /* API */

  async run ( options: ParsedArgs, argv: string[] ): Promise<void> {

    const [arg1, arg2] = options._;
    const hasCustomCommands = ( this.bin.commands.getLength () > 3 );
    const name = ( arg1 === 'help' ) ? arg2 || ( options['help'] ? arg1 : '' ) : ( hasCustomCommands ? arg1 : '' );

    if ( name ) {

      const command = this.bin.commands.getOrFail ( name );
      const mode = this.getPrintMode ([ command.arguments, command.options, this.bin.command.options ]);

      this.logger.indent ();
      this.logger.print ();
      this.bin.metadata.print ();
      command.usage.print ( command );
      command.arguments.print ( mode );
      this.bin.command.options.print ( mode );
      command.options.print ( mode );
      this.logger.dedent ();

    } else {

      const mode = this.getPrintMode ([ this.bin.command.arguments, this.bin.command.options, this.bin.commands ]);

      //TODO: Printing multiple options groups with the same name feel a bit wrong, though the separation seems good

      this.logger.indent ();
      this.logger.print ();
      this.bin.metadata.print ();
      this.bin.command.usage.print ( this.bin.command );
      this.bin.command.arguments.print ( mode );
      this.bin.command.options.print ( mode );

      if ( hasCustomCommands ) {
        this.bin.commands.print ( mode );
      }

      this.logger.dedent ();

    }

  }

}

/* EXPORT */

export default CommandHelp;
