
/* IMPORT */

import bin from '../dist/index.js';

/* MAIN */

bin ( 'gitman', 'A simple yet powerful opinionated tool for managing repositories' )
  /* BIN OPTIONS */
  // .colors ( false ) // Turn off colored output
  .autoExit ( false ) // Turn off the automatic process.exit call after action execution
  .autoUpdateNotifier ( false ) // Turn off the automatic update notifier
  /* GLOBAL COMMAND OPTIONS */
  .option ( '--silent, -s', 'Silence all output' )
  .option ( '--verbose, -V', 'Verbose output' )
  .option ( '--token, -t <token>', 'GitHub personal access token', { required: true } )
  /* DEFAULT COMMAND ARGUMENTS */
  .argument ( '[user]', 'The name of the github user' )
  .argument ( '<repo>', 'The name of the github repository' )
  /* DEFAULT COMMAND ACTION */
  .action ( ( options, args, passthroughArgs ) => {
    console.log ( 'Default command executed' );
  })
  /* CUSTOM COMMAND */
  .command ( 'clone', 'Clone a repository' )
  /* CUSTOM COMMAND OPTIONS */
  .option ( '--submodules', 'Clone submodules too' )
  /* CUSTOM COMMAND ARGUMENTS */
  .argument ( '[user]', 'The name of the github user' )
  .argument ( '<repo>', 'The name of the github repository' )
  /* CUSTOM COMMAND ACTION */
  .action ( ( options, args, passthroughArgs ) => {
    console.log ( 'Clone command executed' );
  })
  /* EXECUTING THE BIN */
  .run ();
