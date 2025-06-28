# leftill
A simple way to track how much money is left until your next paycheck.

## Short-term goals:
* (DONE) Configuration of planned/recurring income and expenses
* (DONE) Parsing of recurrences that occur within a date range (pay period until next paycheck)
* (DONE) Parsing of overrides to planned income and expenses
* Figuring out a current cleared balance at a point in time, akin to a "T" account in accounting terms
  * This is based on planned/recurring income and expenses as well as unplanned spending

## Long-term goals:
* Create a configuration UI for recurrences
* Create a UI to log cleared planned/recurring income and expenses
* Create a UI to override recurring/planned income and expenses (when paycheck or bills vary per pay period)
* Create a UI to log current bank account balance

## Recurrence configuration data:
The structure of the recurrence configuration data is:
```
configurationID: {            (configuration IDs are unique keys)
  amount: decimal,            (amount of each recurrence)
  description: string,        (description of the recurring transaction)
  type: string,               ("Income" or "Expense")
  automatic: boolean,         (Automated income or payment)
  recurrence: string,         (this is the recurrence parser to use)
  recurrenceStart: string,    (short date format: "MM/DD/YYYY" zero padded MM and DD)
  weeksRecurrence: integer,   (optional, for weekly parser: default is every 1 week)
  exceptions: array           (optional array of short date strings to exclude from matches)
}
```

## Prerequisites:
* [Node.js](https://nodejs.org/) to be able to use the Node Package Manager (NPM)
* [Git](https://git-scm.com/) distributed version control system

## Getting started:
1. Open a terminal/command prompt
1. `cd` to the path you want to clone this repo into
1. Clone this repo via:
    * HTTPS: `git clone https://github.com/thx2001r/leftill.git`
    * SSH: `git clone git@github.com:thx2001r/leftill.git`
1. `cd leftill`
1. Download and install packages `npm install` or `yarn install`

## NPM Scripts:
They are run in the terminal (PowerShell in Windows) from the repo directory or in your IDE:
*  `npm run watch` watches for changes and runs unit tests stored in the `./__tests__/` directory
*  `npm run test` runs [ESLint](https://eslint.org/) and unit tests once
*  `npm run clean` cleans the `./dist/` directory
*  `npm run minify` minifies and uglifies `./src/js/*.js` and prepends banner into `./dist/leftill.min.js`
*  `npm run build` runs test, clean, and minify scripts