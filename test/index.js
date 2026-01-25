
/* IMPORT */

import {describe} from 'fava';
import {execSync} from 'node:child_process';

/* MAIN */

//TODO: Add way more tests

describe ( 'Tiny Bin', it => {

  it ( 'can return the version', t => {

    const output = execSync ( './resources/demo_gitman.js --version', { encoding: 'utf8' } ).trim ();

    t.is ( output.trim (), '1.2.3' );

  });

  it ( 'can return the bin help page', t => {

    const output = execSync ( './resources/demo_bump.js --help', { encoding: 'utf8' } ).trim ();

    t.true ( output.includes ( 'bump' ) );
    t.true ( output.includes ( 'USAGE' ) );
    t.true ( output.includes ( 'ARGUMENTS' ) );
    t.true ( output.includes ( 'GENERAL OPTIONS' ) );
    t.true ( output.includes ( 'SCRIPT OPTIONS' ) );
    t.true ( output.includes ( 'OTHER OPTIONS' ) );
    t.true ( output.includes ( 'PUBLISH COMMANDS' ) );
    t.true ( output.includes ( 'EXTRA COMMANDS' ) );
    t.true ( output.includes ( 'OTHER COMMANDS' ) );

  });

  it ( 'can return the command help page', t => {

    const output = execSync ( './resources/demo_bump.js release --help', { encoding: 'utf8' } ).trim ();

    t.true ( output.includes ( 'bump release' ) );
    t.true ( output.includes ( 'USAGE' ) );
    t.false ( output.includes ( 'ARGUMENTS' ) );
    t.true ( output.includes ( 'GENERAL OPTIONS' ) );
    t.true ( output.includes ( 'SCRIPT OPTIONS' ) );
    t.true ( output.includes ( 'OTHER OPTIONS' ) );
    t.false ( output.includes ( 'PUBLISH COMMANDS' ) );
    t.false ( output.includes ( 'EXTRA COMMANDS' ) );
    t.false ( output.includes ( 'OTHER COMMANDS' ) );

  });

  it ( 'can execute a command', t => {

    const output1 = execSync ( './resources/demo_gitman.js user repo', { encoding: 'utf8' } ).trim ();

    t.true ( output1.includes ( 'Default command executed' ) );

    const output2 = execSync ( './resources/demo_gitman.js clone user repo', { encoding: 'utf8' } ).trim ();

    t.true ( output2.includes ( 'Clone command executed' ) );

  });

});
