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

## Recurrence configuration data:
The structure of the recurrence configuration data is:

	configurationID: {			(configuration IDs are unique, integer keys)
		amount: decimal,		(amount of each recurrence)
		description: string,		(description of the recurring transaction)
		type: string,			("Income" or "Expense")
		recurrence: string,		(this is the recurrence parser to use)
		recurenceStart: string,		(short date format: "MM/DD/YYYY" zero padded MM and DD)
		weeksRecurrence: integer,	(optional, for weekly parser: default is every week ... 2 is every 2 weeks, etc.)
	}
## Pre-requisities:
* [Node.js](https://nodejs.org/) to be able to use the Node Package Manager (NPM)
* [Git](https://git-scm.com/) distributed version control system

## Getting started:
1. Open the terminal
2. `cd` to the path you want to clone this repo into
3. Clone this repo via:
    * HTTPS: `git clone https://github.com/thx2001r/leftill.git`
    * SSH: `git clone git@github.com:thx2001r/leftill.git`
4. `cd leftill`
5. Download and install related packages `npm install`

## NPM Scripts:
The are run in the terminal from the repo directory or in your IDE:
*  `npm run watch` watches for changes and runs unit tests stored in the `./__tests__/` directory
*  `npm run test` runs [ESLint](https://eslint.org/) and unit tests once