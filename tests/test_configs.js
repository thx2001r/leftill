var testConfig = {
	Monthly: {
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
	}, RecurrenceParser: [
		{
			amount: 500,
			description: "Paycheck",
			type: "Income",
			recurrence: "Weekly",
			weeksRecurrence: 2,
			recurrenceStart: "04/04/2019",
			endDate: null
		}
	]
};