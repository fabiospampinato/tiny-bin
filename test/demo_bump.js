
/* IMPORT */

import bin from '../dist/index.js';

/* MAIN */

//TODO: Write automated tests also

bin ( 'bump', 'Update a project\'s version number' )
  // .colors ( false )
  // .package ( '@fabiospampinato/bump', '1.2.3' )
  // .autoExit ( false )
  // .usage ( 'Custom usage string' )
  // .usage ( 'Other usage string' )
  .option ( '--config, -c, -d <path|object>', 'Path to configuration file or plain JSON object' )
  .option ( '-f, --force', 'Force the command without prompting the user' )
  .option ( '--force', 'Force the command without prompting the user' )
  .option ( '--silent <hi...>', 'Minimize the amount of logs' )
  .option ( '--no-scripts', 'Disable scripts' )
  .option ( '--hidden', 'Very hidden', { hidden: true } )
  .option ( '--prebump <script>', 'Script to execute before bumping the version' )
  .option ( '--prechangelog <script>', 'Script to execute before updating the changelog' )
  .option ( '--precommit <script>', 'Script to execute before making the commit' )
  .option ( '--pretag <script>', 'Script to execute before takking the commit' )
  .option ( '--prerelease <script>', 'Script to execute before releasing' )
  .option ( '--postbump <script>', 'Script to execute after bumping the version' )
  .option ( '--postchangelog <script>', 'Script to execute after updating the changelog' )
  .option ( '--postcommit <script>', 'Script to execute after making the commit' )
  .option ( '--posttag <script>', 'Script to execute after tagging the commit' )
  .option ( '--postrelease <script>', 'Script to execute after releasing' )
  // .argument ( '<version...>', 'asd' )
  // .argument ( '[foo]', 'asdasdasdasdasdasd' )
  // .argument ( '[version|foo]', 'asdasdasdasdasdasd' )
  .action ( ( ...args ) => console.log(args) )
  .command ( 'version', 'Only bump the version number' )
  .argument ( '[version|increment]', 'Something' )
  .action ( () => console.log ( 'version' ) )
  .command ( 'changelog', 'Only update the changelog' )
  .option ( '--length <number>', 'Script to execute after releasing', { required: true } )
  .option ( '--some-thing <name>', 'asd' )
  .option ( '--fallback <asd>', 'Some fallback value', { default: 123 } )
  // .argument ( '<foo...>', 'Something' )
  // .argument ( '[bar]', 'Something else' )
  .action ( (...args) => console.log ( 'changelog', args ) )
  .command ( 'commit', 'Only make the commit' )
  .action ( () => console.log ( 'commit' ) )
  .command ( 'tag', 'Only tag the commit' )
  .action ( () => console.log ( 'tag' ) )
  .command ( 'release', 'Only make the release' )
  .action ( () => console.log ( 'release' ) )
  .command ( 'wait', 'Wait a bit' )
  .action ( () => new Promise ( res => setTimeout ( res, 1000 ) ) )
  .run ();
