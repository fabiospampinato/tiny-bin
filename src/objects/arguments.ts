
/* IMPORT */

import colors from 'tiny-colors';
import Collection from '~/objects/collection';
import type Argument from '~/objects/argument';

/* MAIN */

class Arguments extends Collection<Argument> {

  /* API */

  print ( mode?: 'line' | 'lines' ): void {

    const args = this.getAll ();

    if ( !args.length ) return;

    const table = args.map ( arg => [
      colors.yellow ( arg.name ),
      arg.description
    ]);

    this.logger.group ( 'ARGUMENTS', () => {
      this.logger.table ( table, mode );
    });

  }

}

/* EXPORT */

export default Arguments;
