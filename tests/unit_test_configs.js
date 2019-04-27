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
	}, Monthly: {
		amount: 3000.01,
		description: "Paycheck",
		type: "Income",
		recurrence: "Monthly",
		dayOfMonth: 1
	}, BiWeekly: {
		amount: 500,
		description: "Paycheck",
		type: "Income",
		recurrence: "Weekly",
		weeksRecurrence: 2,
		recurrenceStart: "04/04/2019",
		endDate: null
	}, BiWeeklyBroken: {
		amount: 500,
		description: "Paycheck",
		type: "Income",
		recurrence: "Weekly",
		weeksRecurrence: "a",
		recurrenceStart: "Something Broken!",
		endDate: null
	}, RecurrenceParser: {
		1: {
			amount: 500,
			description: "Paycheck",
			type: "Income",
			recurrence: "Weekly",
			weeksRecurrence: 2,
			recurrenceStart: "04/04/2019",
			endDate: null
		}, 2: {
			amount: 100,
			description: "Pre-school deposit",
			type: "Expense",
			recurrence: "Once",
			recurrenceStart: "04/04/2019"
		}
	}
};