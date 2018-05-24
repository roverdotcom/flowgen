/**
 * Flowtype definitions for commander
 * Generated by Flowgen from a Typescript Definition
 * Flowgen v1.0.0
 * Author: [Joar Wilk](http://twitter.com/joarwilk)
 * Repo: http://github.com/joarwilk/flowgen
 */

declare interface commander$ICommandStatic {
  /**
   * Initialize a new `Command`.
   * @param
   * @api  public
   */
  new(name?: string): commander$ICommand;
}

/**
 * Yes comment
 */
declare function whap(): void;

declare type commander$ICommand = {
  args: string[],
  _args: {
    required: boolean,
    name: string,
  }[],

  /**
     * Add command `name`.
     *
    The `.action()` callback is invoked when the
    command `name` is specified via __ARGV__,
    and the remaining arguments are applied to the
    function for access.

    When the `name` is "" an un-matched command
    will be passed as the first arg, followed by
    the rest of __ARGV__ remaining.

    Examples:

          program
            .version('0.0.1')
            .option('-C, --chdir <path>', 'change the working directory')
            .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
            .option('-T, --no-tests', 'ignore test hook')

          program
            .command('setup')
            .description('run remote setup commands')
            .action(function(){
              console.log('setup');
            });

          program
            .command('exec <cmd>')
            .description('run the given remote command')
            .action(function(cmd){
              console.log('exec "%s"', cmd);
            });

          program
            .command('')
            .description('deploy the given env')
            .action(function(env){
              console.log('deploying "%s"', env);
            });

          program.parse(process.argv);
     * @param
     * @param  *
     * @param  *
     * @return  the new command
     * @api  public
    */
  command(name: string, desc?: string, opts?: any): commander$ICommand,

  /**
   * Add an implicit `help [cmd]` subcommand
   * which invokes `--help` for the given command.
   * @api  private
   */
  addImplicitHelpCommand(): void,

  /**
     * Parse expected `args`.
     *
    For example `["[type]"]` becomes `[{ required: false, name: 'type' }]`.
     * @param
     * @return  for chaining
     * @api  public
    */
  parseExpectedArgs(args: string[]): commander$ICommand,

  /**
     * Register callback `fn` for the command.
     *
    Examples:

          program
            .command('help')
            .description('display verbose help')
            .action(function(){
               // output help here
            });
     * @param
     * @return  for chaining
     * @api  public
    */
  action(fn: (...args: any[]) => void): commander$ICommand,

  /**
     * Define option with `flags`, `description` and optional
     * coercion `fn`.

    The `flags` string should contain both the short and long flags,
    separated by comma, a pipe or space. The following are all valid
    all will output this way when `--help` is used.

        "-p, --pepper"
        "-p|--pepper"
        "-p --pepper"

    Examples:

         // simple boolean defaulting to false
         program.option('-p, --pepper', 'add pepper');

         --pepper
         program.pepper
         // => Boolean

         // simple boolean defaulting to true
         program.option('-C, --no-cheese', 'remove cheese');

         program.cheese
         // => true

         --no-cheese
         program.cheese
         // => false

         // required argument
         program.option('-C, --chdir <path>', 'change the working directory');

         --chdir /tmp
         program.chdir
         // => "/tmp"

         // optional argument
         program.option('-c, --cheese [type]', 'add cheese [marble]');
     * @param
     * @param
     * @param  or default
     * @param
     * @return  for chaining
     * @api  public
    */
  option(
    flags: string,
    description?: string,
    fn?: ((arg1: any, arg2: any) => void) | RegExp,
    defaultValue?: any,
  ): commander$ICommand,
  option(
    flags: string,
    description?: string,
    defaultValue?: any,
  ): commander$ICommand,

  /**
     * Allow unknown options on the command line.
     * @param  if `true` or omitted, no error will be thrown
    for unknown options.
     * @api  public
    */
  allowUnknownOption(arg?: boolean): commander$ICommand,

  /**
   * Parse `argv`, settings options and invoking commands when defined.
   * @param
   * @return  for chaining
   * @api  public
   */
  parse(argv: string[]): commander$ICommand,

  /**
   * Execute a sub-command executable.
   * @param
   * @param
   * @param
   * @api  private
   */
  executeSubCommand(argv: string[], args: string[], unknown: string[]): any,

  /**
     * Normalize `args`, splitting joined short flags. For example
     * the arg "-abc" is equivalent to "-a -b -c".
    This also normalizes equal sign and splits "--abc=def" into "--abc def".
     * @param
     * @return  *
     * @api  private
    */
  normalize(args: string[]): string[],

  /**
     * Parse command `args`.
     *
    When listener(s) are available those
    callbacks are invoked, otherwise the ""
    event is emitted and those actions are invoked.
     * @param
     * @return  for chaining
     * @api  private
    */
  parseArgs(args: string[], unknown: string[]): commander$ICommand,

  /**
   * Return an option matching `arg` if any.
   * @param
   * @return  *
   * @api  private
   */
  optionFor(arg: string): commander$IOption,

  /**
   * Parse options from `argv` returning `argv`
   * void of these options.
   * @param
   * @return  *
   * @api  public
   */
  parseOptions(
    argv: string[],
  ): {
    args: string[],
    unknown: string[],
  },

  /**
   * Return an object containing options as key-value pairs
   * @return  *
   * @api  public
   */
  opts(): any,

  /**
   * Argument `name` is missing.
   * @param
   * @api  private
   */
  missingArgument(name: string): void,

  /**
   * `Option` is missing an argument, but received `flag` or nothing.
   * @param
   * @param
   * @api  private
   */
  optionMissingArgument(
    option: {
      flags: string,
    },
    flag?: string,
  ): void,

  /**
   * Unknown option `flag`.
   * @param
   * @api  private
   */
  unknownOption(flag: string): void,

  /**
     * Set the program version to `str`.
     *
    This method auto-registers the "-V, --version" flag
    which will print the version number when passed.
     * @param
     * @param
     * @return  for chaining
     * @api  public
    */
  version(str: string, flags?: string): commander$ICommand,

  /**
   * Set the description to `str`.
   * @param
   * @return  *
   * @api  public
   */
  description(str: string): commander$ICommand,
  description(): string,

  /**
   * Set an alias for the command
   * @param
   * @return  *
   * @api  public
   */
  alias(alias: string): commander$ICommand,
  alias(): string,

  /**
   * Set / get the command usage `str`.
   * @param
   * @return  *
   * @api  public
   */
  usage(str: string): commander$ICommand,
  usage(): string,

  /**
   * Get the name of the command
   * @param
   * @return  *
   * @api  public
   */
  name(): string,

  /**
   * Return the largest option length.
   * @return  *
   * @api  private
   */
  largestOptionLength(): number,

  /**
   * Return help for options.
   * @return  *
   * @api  private
   */
  optionHelp(): string,

  /**
   * Return command help documentation.
   * @return  *
   * @api  private
   */
  commandHelp(): string,

  /**
   * Return program help documentation.
   * @return  *
   * @api  private
   */
  helpInformation(): string,

  /**
   * Output help information for this command
   * @api  public
   */
  outputHelp(): void,

  /**
   * Output help information and exit.
   * @api  public
   */
  help(): void,
};

declare interface commander$IOptionStatic {
  /**
   * Initialize a new `Option` with the given `flags` and `description`.
   * @param
   * @param
   * @api  public
   */
  new(flags: string, description?: string): commander$IOption;
}

declare interface commander$IOption {
  flags: string;
  required: boolean;
  optional: boolean;
  bool: boolean;
  short?: string;
  long: string;
  description: string;

  /**
   * Return option name.
   * @return  *
   * @api  private
   */
  name(): string;

  /**
   * Check if `arg` matches the short or long flag.
   * @param
   * @return  *
   * @api  private
   */
  is(arg: string): boolean;
}

declare type commander$IExportedCommand = {
  Command: commander$ICommandStatic,
  Option: commander$IOptionStatic,
} & commander$ICommand;

declare module "commander" {
  declare module.exports: commander$IExportedCommand;
}
