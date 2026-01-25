
/* IMPORT */

import colors from 'tiny-colors';
import Collection from './collection';
import {groupBy, identity, pushBack} from './utils';
import type Option from './option';

/* MAIN */

class Options extends Collection<Option> {

  /* API */

  print ( mode?: 'line' | 'lines' ): void {

    const options = this.getAll ();

    if ( !options.length ) return;

    const optionsVisible = options.filter ( option => !option.hidden );

    if ( !optionsVisible.length ) return;

    const withoutOther = ( section: string ) => section.toLowerCase () !== 'other' ? section : '';
    const optionsBySection = pushBack ( groupBy ( optionsVisible, option => withoutOther ( option.section.toLowerCase () ) ), '' );

    optionsBySection.forEach ( ( options, section ) => {

      if ( !options.length ) return;

      const title = section ? `${section.toUpperCase ()} OPTIONS` : ( optionsBySection.size > 1 ? 'OTHER OPTIONS' : 'OPTIONS' );

      const table = options.map ( option => {

        const withDeprecated: ( arg: string ) => string = option.deprecated ? colors.dim : identity;

        return [
          [
            [
              ...option.data.longs.sort ().map ( long => colors.green ( `--${long}` ) ),
              ...option.data.shorts.sort ().map ( short => colors.green ( `-${short}` ) ),
            ].join ( ', ' ),
            [
              ...option.data.args.sort ().map ( arg => colors.blue ( `<${arg}>` ) )
            ].join ( ' ' ),
          ].join ( ' ' ),
          option.description
        ].map ( withDeprecated );

      });

      this.stdout.group ( title, () => {
        this.stdout.table ( table, mode );
      });

    });

  }

}

/* EXPORT */

export default Options;
