
/* IMPORT */

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

  /* API */

  async run ( options: ParsedArgs, argv: string[] ): Promise<void> {

    const [arg1, arg2] = options._;
    const name = ( arg1 === 'help' ) ? arg2 || ( options['help'] ? arg1 : '' ) : arg1;

    if ( name ) {

      const command = this.bin.commands.getOrFail ( name );

      this.logger.indent ();
      this.logger.print ();
      this.bin.metadata.print ();
      command.usage.print ( command );
      command.arguments.print ();
      this.bin.command.options.print ();
      command.options.print ();
      this.logger.dedent ();

    } else {

      //TODO: Printing multiple options groups with the same name feel a bit wrong, though the separation seems good

      this.logger.indent ();
      this.logger.print ();
      this.bin.metadata.print ();
      this.bin.command.usage.print ( this.bin.command );
      this.bin.command.arguments.print ();
      this.bin.command.options.print ();

      if ( this.bin.commands.getLength () > 3 ) { // There are some custom commands registered
        this.bin.commands.print ();
      }

      this.logger.dedent ();

    }

  }

}

/* EXPORT */

export default CommandHelp;
