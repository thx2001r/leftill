# leftill
A simple way to track how much money is left until your next paycheck.

## Short-term goals:
* Configuration of planned/recurring income and expenses
* Parsing of recurrences that occur within a date range (pay period until next paycheck)
* Parsing of overrides to planned income and expenses
* Figuring out a current cleared balance at a point in time, akin to a "T" account in accounting terms
  * This is based on planned/recurring income and expenses as well as unplanned spending

## Long-term goals:
* Create a configuration UI for recurrences
* Create a UI to log cleared planned/recurring income and expenses
* Create a UI to override recurring/planned income and expenses (when paycheck or bills vary per pay period)
* Create a UI to log current bank account balance

## Pre-requisities:
* [Node.js](https://nodejs.org/) to be able to use the Node Package Manager (NPM)
* [Grunt](https://gruntjs.com/) task runner command-line interface (no `sudo` necessary on Windows)
  * In the terminal: `sudo npm install -g grunt-cli`
* [Git](https://git-scm.com/) distributed version control system

## Getting started:
1. Open the terminal (no `sudo` necessary on Windows for the commands below)
2. `cd` to the path you want to clone this repo into
3. Clone this repo `git clone https://github.com/thx2001r/leftill.git`
4. `cd leftill`
5. Download and install related packages `sudo npm install`
   * NOTE: Testing requires puppeteer and a headless Chromium browser.  This can be tricky to install in Linux and Mac OS.  Please [take a look at this guide](https://github.com/GoogleChrome/puppeteer/issues/3443) if you have any trouble with this step.

## Available Grunt tasks:
These are run in the terminal (or from your IDE) from the repo directory that contains `Gruntfile.js`:
* `grunt` runs [JSHint](https://jshint.com/) on the source and the unit tests
* `grunt watch` useful for TDD, watches for changes and runs JSHint and unit tests on the javascript `./src/js/` files and unit tests `./test/`
* `grunt build` runs JSHint, unit tests, cleans up `./dist/`, minifies source, and creates finished files in the `./dist/` directory
* `grunt clean` cleans the `./dist/` directory

NOTE: If you are running unit tests in Docker or other similar containers (such as Linux on DeX), you can append the following option to your grunt tasks in the commandline if Chromium won't work: `--noSandbox=true`
