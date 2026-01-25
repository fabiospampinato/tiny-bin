#!/usr/bin/env node

/* IMPORT */

import bin from '../dist/index.js';

/* MAIN */

bin ( 'gitman', 'A simple yet powerful opinionated tool for managing repositories' )
  /* BIN OPTIONS */
  // .config ({ colors: false })
  .config ({ package: '@fabiospampinato/gitman', version: '1.2.3' })
  .config ({ autoExit: false })
  /* GLOBAL COMMAND OPTIONS */
  .option ( '--silent, -s', 'Silence all output' )
  .option ( '--verbose, -V', 'Verbose output' )
  .option ( '--provider, -p <provider>', 'The provider to use', { default: 'github', enum: ['github', 'gitlab'] } )
  .option ( '--token, -t <token>', 'GitHub/GitLab personal access token', { required: true } )
  /* DEFAULT COMMAND ARGUMENTS */
  .argument ( '[user]', 'The name of the user' )
  .argument ( '<repo>', 'The name of the repository' )
  /* DEFAULT COMMAND ACTION */
  .action ( ( options, args, passthroughArgs ) => {
    console.log ( 'Default command executed' );
    console.log ( options );
    console.log ( args );
    console.log ( passthroughArgs );
  })
  /* CUSTOM COMMAND */
  .command ( 'clone', 'Clone a repository' )
  /* CUSTOM COMMAND OPTIONS */
  .option ( '--submodules', 'Clone submodules too' )
  /* CUSTOM COMMAND ARGUMENTS */
  .argument ( '[user]', 'The name of the user' )
  .argument ( '<repo>', 'The name of the repository' )
  /* CUSTOM COMMAND ACTION */
  .action ( ( options, args, passthroughArgs ) => {
    console.log ( 'Clone command executed' );
    console.log ( options );
    console.log ( args );
    console.log ( passthroughArgs );
  })
  /* EXECUTING THE BIN */
  .run ();
