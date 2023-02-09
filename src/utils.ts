
/* IMPORT */

import levenshtein from 'tiny-levenshtein';

/* MAIN */

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

const stripAnsi = (() => {

  //URL: https://github.com/chalk/ansi-regex
  //LICENSE: https://github.com/chalk/ansi-regex/blob/main/license

  const re = new RegExp ( '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))', 'g' );

  return ( str: string ): string => {

    return str.replace ( re, '' );

  };

})();

/* EXPORT */

export {getClosest, identity, isUndefined, stripAnsi};
