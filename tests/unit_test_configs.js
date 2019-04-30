var testConfig = {
	Once: {
		amount: 100,
		description: "Pre-school deposit",
		type: "Expense",
		recurrence: "Once",
		recurrenceStart: "04/04/2019"
	}, OnceBroken: {
		amount: 100,
		description: "Pre-school deposit",
		type: "Expense",
		recurrence: "Once",
		recurrenceStart: "Something Broken!"
	}, Yearly: {
		amount: 119,
		description: "Amazon Prime Yearly Membership",
		type: "Expense",
		recurrence: "Yearly",
		recurrenceStart: "03/26/2019"
	}, YearlyBroken: {
		amount: 119,
		description: "Amazon Prime Yearly Membership",
		type: "Expense",
		recurrence: "Yearly",
		recurrenceStart: "Something Broken!"
	}, Monthly: {
		amount: 3000.01,
		description: "Paycheck",
		type: "Income",
		recurrence: "Monthly",
		recurrenceStart: "04/01/2019"
	}, MonthlyBroken: {
		amount: 3000.01,
		description: "Paycheck",
		type: "Income",
		recurrence: "Monthly",
		recurrenceStart: "Something Broken!"
	}, BiWeekly: {
		amount: 500,
		description: "Paycheck",
		type: "Income",
		recurrence: "Weekly",
		weeksRecurrence: 2,
		recurrenceStart: "04/04/2019"
	}, BiWeeklyBroken: {
		amount: 500,
		description: "Paycheck",
		type: "Income",
		recurrence: "Weekly",
		weeksRecurrence: "a",
		recurrenceStart: "Something Broken!"
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