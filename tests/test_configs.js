var testConfig = {
	Monthly: {
		id: 1,
		amount: 3000.01,
		description: "Paycheck",
		type: "Income",
		recurrence: "Monthly",
		dayOfMonth: 1
	}, BiWeekly: {
		id: 2,
		amount: 500,
		description: "Paycheck",
		type: "Income",
		recurrence: "Weekly",
		weeksRecurrence: 2,
		recurrenceStart: "04/04/2019",
		endDate: null
	}, BiWeeklyBroken: {
		id: 2,
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
		}
	}
};