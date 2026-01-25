#!/usr/bin/env node

/* IMPORT */

import bin from '../dist/index.js';

/* MAIN */

bin ( 'basic', 'Basic infer tests' )
  /* BOOLEAN OPTIONS */
  .option ( '--verbose', 'Enable verbose output' )
  .option ( '--debug, -d', 'Enable debug mode' )
  .option ( '--quiet -Q', 'Suppress output' )
  .option ( '--no-cache', 'Disable caching' )
  .option ( '--no-color, -C', 'Disable colored output' )
  /* STRING OPTIONS */
  .option ( '--output <path>', 'Output file path' )
  .option ( '--input, -i <file>', 'Input file' )
  .option ( '--files <path...>', 'Multiple file paths' )
  .option ( '--plugins, -p <name...>', 'Plugin names to load' )
  .option ( '--separator, -S <sep>', 'Separator character' )
  /* INLINE ENUM OPTIONS */
  .option ( '--format <json|xml|csv>', 'Output format' )
  .option ( '--formats <json|xml|csv...>', 'Output format' )
  .option ( '--log-level <debug|info|warn|error|fatal>', 'Logging level' )
  /* EXPLICIT ENUM OPTION */
  .option ( '--env <name>', 'Environment', { enum: ['development', 'staging', 'production'] } )
  /* EXPLICIT TYPE OPTIONS */
  .option ( '--port <num>', 'Port number', { type: 'integer' } )
  .option ( '--threshold <value>', 'Threshold value', { type: 'number' } )
  .option ( '--feature <level>', 'Feature toggle (forced boolean)', { type: 'boolean' } )
  .option ( '--name <n>', 'Name value', { type: 'string' } )
  /* DEFAULT OPTIONS */
  .option ( '--timeout <ms>', 'Timeout in milliseconds', { type: 'integer', default: 5000 } )
  .option ( '--host <name>', 'Host name', { default: 'localhost' } )
  .option ( '--optional-host <name>', 'Optional host', { default: undefined } )
  /* REQUIRED OPTION */
  .option ( '--config <path>', 'Config file (required)', { required: true } )
  /* OBJECT OPTIONS */
  .option ({ name: '--object-bool', description: 'Dummy boolean object flag' })
  .option ({ name: '--object-string <foo>', description: 'Dummy string object flag' })
  /* MANY ALIASES (NO LIMIT) */
  .option ( '--aa, -a, --bb, -b, --cc, -c, --dd, --ee, --ff, -f, --gg, --hh', 'Option with 12 aliases' )
  /* MANY ENUMS (NO LIMIT) */
  .option ( '--status <a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p>', 'Status with 12 values' )
  /* DEFAULT COMMAND */
  .argument ( '[targets...]', 'Target files or directories' )
  .action ( options => {
    options;
    options.objectBool;
    options.objectString;
    options.objectSubstring;
  })
  /* BUILD COMMAND */
  .command ( 'build', 'Build the project' )
  .option ( '--minify, -m', 'Minify output' )
  .option ( '--sourcemap', 'Generate sourcemaps' )
  .option ( '--outdir <path>', 'Output directory', { default: 'dist' } )
  .option ({ name: '--object-substring <foo>', description: 'Dummy substring object flag' })
  .action ( options => {
    options;
    options.objectBool;
    options.objectString;
    options.objectSubstring;
  })
  /* SERVE COMMAND */
  .command ( 'serve', 'Start development server' )
  .option ( '--open, -o', 'Open browser automatically' )
  .option ( '--https', 'Use HTTPS' )
  .option ( '--cors', 'Enable CORS' )
  .action ( options => {
    options;
    options.objectBool;
    options.objectString;
    options.objectSubstring;
  });

bin ( 'edge', 'Edge-case infer tests' )
  .option ( '--spaced-enum <a | b | c>', 'Enum with spaces around pipes' )
  .option ( '--tab-sep,	-t', 'Tab between aliases' )
  .option ( '--multi-space   -M', 'Multiple spaces' )
  .option ( '-s, --short-first', 'Shorthand listed first' )
  .option ( '-x', 'Only shorthand, no longhand' )
  .option ( '--deep.nested', 'Dotted option path' )
  .option ( '--a', 'Single char longhand' )
  .option ( '--option2', 'Numeric suffix' )
  .option ( '--no-no-double', 'Double no- prefix' )
  .option ( '--trailing,', 'Trailing comma' )
  .option ( ', --leading', 'Leading comma' )
  .option ( '--special <va$lue>', 'Special chars in arg name' )
  .option ( '--this-is-a-very-long-option-name-with-many-kebab-segments', 'Long name' )
  .option ( '--var-enum <a|b|c...>', 'Variadic enum (dots inside)' )
  .option ( '--single-enum <onlyOne>', 'Single value in brackets' )
  .option ( '--empty-enum <a||c>', 'Empty middle enum value' )
  .option ( '--unicode-enum <日本語|中文|한국어>', 'Unicode enum values' )
  .action ( options => {
    options;
  });
