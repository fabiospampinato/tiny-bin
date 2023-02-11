
/* IMPORT */

import stripAnsi from 'ansi-purge';
import levenshtein from 'tiny-levenshtein';

/* MAIN */

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

const identity = <T> ( value: T ): T => {

  return value;

};

const isUndefined = ( value: unknown ): value is undefined => {

  return value === undefined;

};

const sum = ( numbers: number[] ): number => {

  return numbers.reduce ( ( acc, value ) => acc + value, 0 );

};

/* EXPORT */

export {castArray, defer, getClosest, identity, isUndefined, stripAnsi, sum};
