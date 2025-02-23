
/* IMPORT */

import Addon from '~/objects/addon';
import {getClosest} from '~/utils';

/* MAIN */

class Collection<T extends { ids: string[] }> extends Addon {

  /* VARIABLES */

  private list: T[] = [];
  private map: Map<string, T> = new Map ();

  /* API */

  getAll (): readonly T[] {

    return this.list;

  }

  getById ( id: string ): T | undefined {

    return this.getByIds ([ id ])?.value;

  }

  getByIdOrFail ( id: string ): T {

    const value = this.getById ( id );

    if ( value ) return value;

    const ids = Array.from ( this.map.keys () );
    const closest = getClosest ( ids, id, 3, true );

    this.bin.fail ( `Not found "${id}"${closest ? `. Did you mean "${closest}"?` : ''}` );

  }

  getByIds ( ids: string[] ): { id: string, value: T } | undefined {

    for ( const id of ids ) {

      const value = this.map.get ( id );

      if ( value ) return { id, value };

    }

  }

  register ( value: T, override: boolean = false ): void {

    const existing = this.getByIds ( value.ids );

    if ( existing && override ) {

      const index = this.list.indexOf ( existing.value );

      existing.value.ids.forEach ( id => this.map.delete ( id ) );
      value.ids.forEach ( id => this.map.set ( id, value ) );
      this.list.splice ( index, 1, value );

    } else {

      value.ids.forEach ( id => this.map.set ( id, value ) );
      this.list.push ( value );

    }

  }

}

/* EXPORT */

export default Collection;
