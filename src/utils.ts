
/* IMPORT */

import stripAnsi from 'ansi-purge';
import levenshtein from 'tiny-levenshtein';

/* MAIN */

const camelCase = (() => {

  const dividerRe = /[_.\s-]+/g;
  const prefixRe = /^[_.\s-]+/g;
  const upperDigitRe = /\d+[\p{Alpha}\p{N}_]/gu;
  const upperDividerRe = /[_.\s-]+[\p{Alpha}\p{N}_]/gu;
  const toUpperCase = ( str: string ): string => str.toUpperCase ();

  return ( str: string ): string => {

    return str.trim ().toLowerCase ().replace ( prefixRe, '' ).replace ( upperDigitRe, toUpperCase ).replace ( upperDividerRe, toUpperCase ).replace ( dividerRe, '' );

  };

})();

const castArray = <T> ( value: T | T[] ): T[] => {

  return Array.isArray ( value ) ? value : [value];

};

const defer = ( fn: () => void ): void => {

  setTimeout ( fn, 0 );

};

const getClosest = ( values: string[], value: string, maxDistance: number = 3 ): string | undefined => {

  if ( !values.length ) return;

  const distances = values.map ( other => levenshtein ( value, other ) );
  const minDistance = Math.min ( ...distances );

  if ( minDistance > maxDistance ) return;

  const minDistanceIndex = distances.indexOf ( minDistance );
  const closest = values[minDistanceIndex];

  return closest;

};

const groupBy = <T, U> ( values: T[], iterator: ( value: T, index: number, values: T[] ) => U ): Map<U, T[]> => {

  const groups = new Map<U, T[]>();

  for ( let i = 0, l = values.length; i < l; i++ ) {

    const value = values[i];
    const key = iterator ( value, i, values );
    const group = groups.get ( key ) || [];

    group.push ( value );
    groups.set ( key, group );

  }

  return groups;

};

const identity = <T> ( value: T ): T => {

  return value;

};

const isArray = ( value: unknown ): value is unknown[] => {

  return Array.isArray ( value );

};

const isUndefined = ( value: unknown ): value is undefined => {

  return value === undefined;

};

const pushBack = <T, U> ( map: Map<T, U>, key: T ): Map<T, U> => {

  const value = map.get ( key );

  if ( isUndefined ( value ) ) return map; //TODO: Technically "undefined" could be a valid key here

  map.delete ( key );

  map.set ( key, value );

  return map;

};

const sum = ( numbers: number[] ): number => {

  return numbers.reduce ( ( acc, value ) => acc + value, 0 );

};

/* EXPORT */

export {camelCase, castArray, defer, getClosest, groupBy, identity, isArray, stripAnsi, pushBack, sum};
