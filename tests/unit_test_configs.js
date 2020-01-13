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
	}, Exceptions: {
		1: {
			amount: 15,
			description: "Tag fee",
			type: "Expense",
			recurrence: "Yearly",
			recurrenceStart: "05/01/2019",
			exceptions: [
				"05/01/2020",
				"05/01/2022"
			]
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
