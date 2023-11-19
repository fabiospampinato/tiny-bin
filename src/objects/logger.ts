
/* IMPORT */

import colors from 'tiny-colors';
import Addon from '~/objects/addon';
import {identity, stripAnsi} from '~/utils';

/* MAIN */

class Logger extends Addon {

  /* VARIABLES */

  protected indentationLevel: number = 0;
  protected indentation: string = '  ';

  /* API */

  indent (): void {

    this.indentationLevel += 1;

  }

  dedent (): void {

    this.indentationLevel -= 1;

  }

  group ( name: string, fn: () => void ): void {

    this.print ( colors.bold ( name.toUpperCase () ) );
    this.indent ();
    this.print ();
    fn ();
    this.print ();
    this.dedent ();

  }

  print ( message: string = '' ): void {

    const colorize = this.bin.metadata.colors ? identity : stripAnsi;

    console.log ( colorize ( `${this.indentation.repeat ( this.indentationLevel )}${message}` ) );

  }

  table ( rows: string[][] ): void {

    const raws = rows.map ( row => row.map ( stripAnsi ) );
    const maxLengths = raws[0].map ( ( _, j ) => Math.max ( ...raws.map ( ( _, i ) => raws[i][j].length ) ) );

    rows.forEach ( ( row, i ) => {

      const line = row.map ( ( value, j ) => {

        const paddingLength = ( j === row.length - 1 ) ? 0 : Math.max ( 0, 1 + maxLengths[j] - raws[i][j].length );
        const padding = ' '.repeat ( paddingLength );

        return `${value}${padding}`;

      }).join ( ' ' );

      this.print ( line );

    });

  }

}

/* EXPORT */

export default Logger;
