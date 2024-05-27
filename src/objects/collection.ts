
/* IMPORT */

import Addon from '~/objects/addon';
import {getClosest} from '~/utils';

/* MAIN */

class Collection<T extends { id: string }> extends Addon {

  /* VARIABLES */

  protected collection: Map<string, T> = new Map ();

  /* API */

  get ( id: string ): T | undefined {

    return this.collection.get ( id );

  }

  getAll (): T[] {

    return Array.from ( this.collection.values () );

  }

  getIds (): string[] {

    return Array.from ( this.collection.keys () );

  }

  getClosest ( id: string ): string | undefined {

    return getClosest ( this.getIds (), id, 3, true );

  }

  getLength (): number {

    return this.collection.size;

  }

  getOrFail ( id: string ): T {

    const value = this.get ( id );

    if ( value ) return value;

    const closest = this.getClosest ( id );

    this.bin.fail ( `Not found "${id}"${closest ? `. Did you mean "${closest}"?` : ''}` );

  }

  has ( id: string ): boolean {

    return this.collection.has ( id );

  }

  register ( value: T ): void {

    if ( this.has ( value.id ) ) {

      this.bin.fail ( `Duplicate "${value.id}"` );

    } else {

      this.collection.set ( value.id, value );

    }

  }

}

/* EXPORT */

export default Collection;
