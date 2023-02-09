
/* IMPORT */

import colors from 'tiny-colors';
import Collection from '~/objects/collection';
import type Option from '~/objects/option';

/* MAIN */

class Options extends Collection<Option> {

  /* API */

  print (): void {

    const options = this.getAll ();

    if ( !options.length ) return;

    const optionsVisible = options.filter ( option => !option.hidden );

    if ( !optionsVisible.length ) return;

    const table = optionsVisible.map ( option => [
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
    ]);

    this.logger.group ( 'OPTIONS', () => {
      this.logger.table ( table );
    });

  }

}

/* EXPORT */

export default Options;
