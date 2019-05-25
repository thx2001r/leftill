# LefTill
A simple way to track how much money is left until your next paycheck.

## Short-term goals:
* Configuration of recurring income, planned expenses, and unplanned spending
* Parsing of recurrences that within a date range (pay period until next pay period)
* Figuring out a current cleared balance at a point in time, akin to a "T" account in accounting terms

## Long-term goals:
* Create a configuration UI for recurrences
* Create a UI to log cleared income and planned expenses
* Create a UI to override planned income/expenses (when paycheck or bills vary per pay period)
* Create a UI to log current bank account balance

## Pre-requisities:
* Install [Node.js](https://nodejs.org/)
* Install the [Grunt](https://gruntjs.com/) command-line interface (no `sudo` necessary on Windows)
  * In the terminal: `sudo npm install -g grunt-cli`
* Install [Git](https://git-scm.com/)

## Getting started:
1. Open the terminal (no `sudo` necessary on Windows for the commands below)
2. `cd` to the path you want to clone the repo
3. `git clone https://github.com/thx2001r/leftill.git`
4. `cd leftill`
5. `sudo npm install`
   * NOTE: Testing requires puppeteer and with it a headless Chromium browser.  This can be tricky to install in Linux and Mac OS.  Please [take a look at this guide](https://github.com/GoogleChrome/puppeteer/issues/3443) if you have any trouble with this step.

## Available Grunt tasks (run from the repo directory that contains `Gruntfile.js`):
* `grunt` runs lint on the source and the unit tests
* `grunt watch` watches for changes and runs unit tests in the javascript (useful for TDD) `./src/js/` files as well as test configs `./test/`
* `grunt build` runs lint, tests, cleans up, minifies, and creates finished files in `./dist/` directory
* `grunt clean` cleans the `./dist/` directory