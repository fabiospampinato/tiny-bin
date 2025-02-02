
/* IMPORT */

import stringWidth from 'fast-string-width';
import colors from 'tiny-colors';
import Addon from '~/objects/addon';
import {identity, stripAnsi} from '~/utils';
import type Bin from '~/objects/bin';
import type {LoggerHandler} from '~/types';

/* MAIN */

class Logger extends Addon {

  /* VARIABLES */

  protected handler: LoggerHandler;
  protected indentationLevel: number = 0;
  protected indentation: string = '  ';

  /* CONSTRUCTOR */

  constructor ( bin: Bin, handler: LoggerHandler ) {

    super ( bin );

    this.handler = handler;

  }

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

    this.handler ( colorize ( `${this.indentation.repeat ( this.indentationLevel )}${message}` ) );

  }

  table ( rows: string[][], mode: 'lines' | 'line' = 'line' ): void {

    const rowsLengths = rows.map ( row => row.map ( cell => stringWidth ( cell ) ) );
    const maxLengths = rowsLengths[0].map ( ( _, j ) => Math.max ( ...rowsLengths.map ( ( _, i ) => rowsLengths[i][j] ) ) );

    if ( mode === 'lines' && maxLengths.length === 2 ) { //TODO: Generalize this, even though it's not needed yet

      const COLUMN = 30; //TODO: Make this customizable
      const PADDING = 4;

      rows.forEach ( ( [left, right], i ) => {

        const leftNedded = stringWidth ( left ) + PADDING;
        const leftAvailable = COLUMN - leftNedded;
        const leftShortEnough = ( leftAvailable >= 2 );
        const rightLines = right.trim ().split ( /\r?\n|\r/g );

        const line = [left, rightLines.map ( ( line, i ) => ( leftShortEnough && !i ) ? `${' '.repeat ( leftAvailable )}${line}` : `${i ? '' : '\n'}${' '.repeat ( COLUMN )}${line}` ).join ( '\n' )].join ( '' );

        this.print ( line );

      });

    } else if ( mode === 'line' ) {

      rows.forEach ( ( row, i ) => {

        const line = row.map ( ( value, j ) => {

          const paddingLength = ( j === row.length - 1 ) ? 0 : Math.max ( 0, 1 + maxLengths[j] - rowsLengths[i][j] );
          const padding = ' '.repeat ( paddingLength );

          return `${value}${padding}`;

        }).join ( ' ' );

        this.print ( line );

      });

    } else {

      throw new Error ( 'Unsupported printing mode' );

    }

  }

}

/* EXPORT */

export default Logger;
