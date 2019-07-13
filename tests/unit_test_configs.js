/*
	The top level objects below are named test scenarios data.

	The structure of the recurrence configuration data is:
		configurationID: {				(configuration IDs are unique, integer keys)
			amount: decimal,			(amount of each recurrence)
			description: string,		(description of the recurring transaction)
			type: string,				("Income" or "Expense")
			recurrence: string,			(this is the recurrence parser to use)
			recurenceStart: string,		(short date format: "MM/DD/YYYY" zero padded MM and DD)
			weeksRecurrence: integer,	(optional, for weekly parser: default is every week ... 2 is every 2 weeks, etc.)
		}
*/

testConfig = {
	Once: {
		1: {
			amount: 100,
			description: "Pre-school deposit",
			type: "Expense",
			recurrence: "Once",
			recurrenceStart: "04/04/2019"
		}
	}, OnceBroken: {
		1: {
			amount: 100,
			description: "Pre-school deposit",
			type: "Expense",
			recurrence: "Once",
			recurrenceStart: "Something Broken!"
		}
	}, Yearly: {
		1: {
			amount: 119,
			description: "Amazon Prime Yearly Membership",
			type: "Expense",
			recurrence: "Yearly",
			recurrenceStart: "03/26/2019"
		}
	}, YearlyBroken: {
		1: {
			amount: 119,
			description: "Amazon Prime Yearly Membership",
			type: "Expense",
			recurrence: "Yearly",
			recurrenceStart: "Something Broken!"
		}
	}, Monthly: {
		1: {
			amount: 3000.01,
			description: "Paycheck",
			type: "Income",
			recurrence: "Monthly",
			recurrenceStart: "04/01/2019"
		}
	}, MonthlyEdgeDay: {
		1: {
			amount: 3000.01,
			description: "Paycheck",
			type: "Income",
			recurrence: "Monthly",
			recurrenceStart: "03/31/2019"
		}
	}, MonthlyBroken: {
		1: {
			amount: 3000.01,
			description: "Paycheck",
			type: "Income",
			recurrence: "Monthly",
			recurrenceStart: "Something Broken!"
		}
	}, BiWeekly: {
		1: {
			amount: 500,
			description: "Paycheck",
			type: "Income",
			recurrence: "Weekly",
			weeksRecurrence: 2,
			recurrenceStart: "04/04/2019"
		}
	}, BiWeeklyBroken: {
		1: {
			amount: 500,
			description: "Paycheck",
			type: "Income",
			recurrence: "Weekly",
			weeksRecurrence: "a",
			recurrenceStart: "Something Broken!"
		}
	}, RecurrenceParser: {
		1: {
			amount: 500,
			description: "Paycheck",
			type: "Income",
			recurrence: "Weekly",
			weeksRecurrence: 2,
			recurrenceStart: "04/04/2019"
		}, 2: {
			amount: 100,
			description: "Pre-school deposit",
			type: "Expense",
			recurrence: "Once",
			recurrenceStart: "04/04/2019"
		}, 3: {
			amount: 119,
			description: "Amazon Prime Yearly Membership",
			type: "Expense",
			recurrence: "Yearly",
			recurrenceStart: "03/26/2019"
		}, 4: {
			amount: 3000.01,
			description: "Paycheck",
			type: "Income",
			recurrence: "Monthly",
			recurrenceStart: "04/01/2019"
		}
	}
};


/*
	Indicate if there was a one-time override of a configured recurrence (not necessarily cleared).

	The top level objects below are named test scenarios data.  Within the scenarios, you'd find them this way:
		if (1 in testDateOverrides && "04/04/2019" in testDateOverrides[1]) { ... }
	
	The structure of the recurrence date overrides data is:
		configurationID: {			(recurrence configruation IDs are unique, integer keys)
			recurrenceDate: {		(unique string key, in short date format: "MM/DD/YYYY" zero padded MM and DD)
				newDate: string,	(short date format: "MM/DD/YYYY" zero padded MM and DD)
				amount: decimal,	(optional, if the configured value is overriden)
				description: string	(optional, if the configured value is overriden)
			}
		}
*/

testDateOverrides = {
	2: {
		"04/04/2019": {
			newDate: "04/03/2019",
			amount: 102.50,
			description: "Pre-school deposit paid early"
		}
	} 
};


/*
	Indicate cleared transactions.

	The top level objects below are named test scenarios data.

	The structure of the cleared transactions data is:
		date: {						(unique string key, in short date format: "MM/DD/YYYY" zero padded MM and DD)
			configurationID: true	(configuration IDs are unique for the date, integer keys)
		}
*/

testCleared = {
	"04/03/2019": {
		1: true
	}
};
