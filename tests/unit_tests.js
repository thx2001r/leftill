QUnit.test('One-Time Non-Recurring', function (assert) {
	assert.equal(ltRecurrences.matches('03/21/2019', '04/04/2019', testConfig.OnceBroken), false, 'Invalid configuration');
	assert.equal(ltRecurrences.matches('03/21/2019', '04/03/2019', testConfig.Once), false, 'Range before start date');
	assert.equal(ltRecurrences.matches('04/05/2019', '04/17/2019', testConfig.Once), false, 'Range contains no recurrence');
	assert.deepEqual(ltRecurrences.matches('03/21/2019', '04/04/2019', testConfig.Once), { 1: [new Date('04/04/2019')] }, 'Range ends on start date');
	assert.deepEqual(ltRecurrences.matches('03/21/2019', '04/05/2019', testConfig.Once), { 1: [new Date('04/04/2019')] }, 'Range spans start date');
	assert.deepEqual(ltRecurrences.matches('04/03/2019', '04/05/2019', testConfig.Once), { 1: [new Date('04/04/2019')] }, 'Range closely spans start date');
	assert.deepEqual(ltRecurrences.matches('04/04/2019', '04/05/2019', testConfig.Once), { 1: [new Date('04/04/2019')] }, 'Range begins on start date');
	assert.deepEqual(ltRecurrences.matches('04/04/2019', '04/04/2019', testConfig.Once), { 1: [new Date('04/04/2019')] }, 'Range begins and ends on start date');
});

QUnit.test('Yearly Recurrence', function (assert) {
	assert.equal(ltRecurrences.matches('03/21/2019', '04/04/2019', testConfig.YearlyBroken), false, 'Invalid configuration');
	assert.equal(ltRecurrences.matches('03/21/2019', '03/25/2019', testConfig.Yearly), false, 'Range before start date');
	assert.equal(ltRecurrences.matches('03/27/2019', '03/25/2020', testConfig.Yearly), false, 'Range contains no recurrence');
	assert.deepEqual(ltRecurrences.matches('03/21/2019', '03/26/2019', testConfig.Yearly), { 1: [new Date('03/26/2019')] }, 'Range ends on start date');
	assert.deepEqual(ltRecurrences.matches('03/21/2019', '04/05/2019', testConfig.Yearly), { 1: [new Date('03/26/2019')] }, 'Range spans start date');
	assert.deepEqual(ltRecurrences.matches('03/25/2019', '03/27/2019', testConfig.Yearly), { 1: [new Date('03/26/2019')] }, 'Range closely spans start date');
	assert.deepEqual(ltRecurrences.matches('03/26/2019', '04/05/2019', testConfig.Yearly), { 1: [new Date('03/26/2019')] }, 'Range begins on start date');
	assert.deepEqual(ltRecurrences.matches('03/26/2019', '03/26/2019', testConfig.Yearly), { 1: [new Date('03/26/2019')] }, 'Range begins and ends on start date');
	assert.deepEqual(ltRecurrences.matches('01/01/2018', '12/31/2020', testConfig.Yearly), { 1: [new Date('03/26/2019'), new Date('03/26/2020')] }, 'Range spans start date & first recurrence');
});

QUnit.test('Monthly Recurrence', function (assert) {
	assert.equal(ltRecurrences.matches('03/21/2019', '04/04/2019', testConfig.MonthlyBroken), false, 'Invalid configuration');
	assert.equal(ltRecurrences.matches('03/21/2019', '03/25/2019', testConfig.Monthly), false, 'Range before start date');
	assert.equal(ltRecurrences.matches('03/02/2019', '03/31/2019', testConfig.Monthly), false, 'Range contains no recurrence');
	assert.deepEqual(ltRecurrences.matches('03/21/2019', '04/01/2019', testConfig.Monthly), { 1: [new Date('04/01/2019')] }, 'Range ends on start date');
	assert.deepEqual(ltRecurrences.matches('03/21/2019', '04/05/2019', testConfig.Monthly), { 1: [new Date('04/01/2019')] }, 'Range spans start date');
	assert.deepEqual(ltRecurrences.matches('03/31/2019', '04/02/2019', testConfig.Monthly), { 1: [new Date('04/01/2019')] }, 'Range closely spans start date');
	assert.deepEqual(ltRecurrences.matches('04/01/2019', '04/05/2019', testConfig.Monthly), { 1: [new Date('04/01/2019')] }, 'Range begins on start date');
	assert.deepEqual(ltRecurrences.matches('04/01/2019', '04/01/2019', testConfig.Monthly), { 1: [new Date('04/01/2019')] }, 'Range begins and ends on start date');
	assert.deepEqual(ltRecurrences.matches('01/01/2019', '05/02/2019', testConfig.Monthly), { 1: [new Date('04/01/2019'), new Date('05/01/2019')] }, 'Range spans start date & first recurrence');
	assert.deepEqual(ltRecurrences.matches('03/01/2019', '05/01/2019', testConfig.MonthlyEdgeDay), { 1: [new Date('03/31/2019'), new Date('04/30/2019')] }, 'Recurrence date greater than last day of some result months');
});

QUnit.test('Bi-weekly Income Recurrence', function (assert) {
	assert.equal(ltRecurrences.matches('03/21/2019', '04/04/2019', testConfig.BiWeeklyBroken), false, 'Invalid configuration');
	assert.equal(ltRecurrences.matches('03/21/2019', '04/03/2019', testConfig.BiWeekly), false, 'Range before start date');
	assert.equal(ltRecurrences.matches('04/05/2019', '04/17/2019', testConfig.BiWeekly), false, 'Range contains no recurrence');
	assert.deepEqual(ltRecurrences.matches('03/21/2019', '04/04/2019', testConfig.BiWeekly), { 1: [new Date('04/04/2019')] }, 'Range ends on start date');
	assert.deepEqual(ltRecurrences.matches('03/21/2019', '04/05/2019', testConfig.BiWeekly), { 1: [new Date('04/04/2019')] }, 'Range spans start date');
	assert.deepEqual(ltRecurrences.matches('04/03/2019', '04/05/2019', testConfig.BiWeekly), { 1: [new Date('04/04/2019')] }, 'Range closely spans start date');
	assert.deepEqual(ltRecurrences.matches('04/04/2019', '04/05/2019', testConfig.BiWeekly), { 1: [new Date('04/04/2019')] }, 'Range begins on start date');
	assert.deepEqual(ltRecurrences.matches('04/05/2019', '04/18/2019', testConfig.BiWeekly), { 1: [new Date('04/18/2019')] }, 'Range ends on first recurrence');
	assert.deepEqual(ltRecurrences.matches('04/05/2019', '04/19/2019', testConfig.BiWeekly), { 1: [new Date('04/18/2019')] }, 'Range spans first recurrence');
	assert.deepEqual(ltRecurrences.matches('03/21/2019', '04/20/2019', testConfig.BiWeekly), { 1: [new Date('04/04/2019'), new Date('04/18/2019')] }, 'Range spans start date & first recurrence');
	assert.deepEqual(ltRecurrences.matches('06/21/2019', '06/30/2019', testConfig.BiWeekly), { 1: [new Date('06/27/2019')] }, 'Range spans future recurrence');
});

QUnit.test('Recurrence Matches in Configured Range', function (assert) {
	assert.equal(ltRecurrences.matches(), false, 'Function called with no parameters');
	assert.equal(ltRecurrences.matches('not a date', false, 42), false, 'Invalid data types on parameters');
	assert.equal(ltRecurrences.matches('04/05/2019', '04/03/2019', testConfig.RecurrenceParser), false, 'End date before start date');
	assert.deepEqual(ltRecurrences.matches('04/04/2019', '04/04/2019', testConfig.RecurrenceParser), { 1: [new Date('04/04/2019')], 2: [new Date('04/04/2019')] }, 'Range begins and ends on start date');
	assert.deepEqual(ltRecurrences.matches('03/21/2019', '04/04/2019', testConfig.RecurrenceParser), { 1: [new Date('04/04/2019')], 2: [new Date('04/04/2019')], 3: [new Date('03/26/2019')], 4: [new Date('04/01/2019')] }, 'Range ends on start date');
});

QUnit.test('How many days in a given month and year', function (assert) {
	assert.equal(ltRecurrences.daysInMonth(), false, 'Function called with no parameters');
	assert.equal(ltRecurrences.daysInMonth(10,2019), 30, 'Days in November');
	assert.equal(ltRecurrences.daysInMonth(1,2019), 28, 'Days in a regular non-leap year February');
	assert.equal(ltRecurrences.daysInMonth(1,2000), 29, 'Days in a divisible by 400 leap year February');
	assert.equal(ltRecurrences.daysInMonth(1,2100), 28, 'Days in a divisible by 100, non-divisible by 400 non-leap year February');
	assert.equal(ltRecurrences.daysInMonth(1,2020), 29, 'Days in a regular 4-year leap year February');
});

QUnit.test('Turn a date object into a string', function (assert) {
	assert.equal(dateToString(), false, 'Function called with no parameters');
	assert.notEqual(dateToString(new Date('04/05/2019')), '4/5/2019', 'Date returned will be zero padded string');
	assert.equal(dateToString(new Date('04/05/2019')), '04/05/2019', 'Convert date to zero padded string');
});
