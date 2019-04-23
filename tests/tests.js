QUnit.test('Bi-weekly Income Recurrence', function( assert ) {
	assert.equal(ltRecurrences.weekly_TEST_ONLY('not a date', false, 42), false, 'Invalid data types on parameters');
	assert.equal(ltRecurrences.weekly_TEST_ONLY(new Date('04/05/2019'), new Date('04/03/2019'), testConfig.BiWeekly), false, 'End date before start date');
	assert.equal(ltRecurrences.weekly_TEST_ONLY(new Date('03/21/2019'), new Date('04/04/2019'), testConfig.BiWeeklyBroken), false, 'Invalid configuration');
	assert.equal(ltRecurrences.weekly_TEST_ONLY(new Date('03/21/2019'), new Date('04/03/2019'), testConfig.BiWeekly), false, 'Range before start date');
	assert.equal(ltRecurrences.weekly_TEST_ONLY(new Date('04/05/2019'), new Date('04/17/2019'), testConfig.BiWeekly), false, 'Range contains no recurrence');
	assert.deepEqual(ltRecurrences.weekly_TEST_ONLY(new Date('03/21/2019'), new Date('04/04/2019'), testConfig.BiWeekly), [new Date('04/04/2019')], 'Range ends on start date');
	assert.deepEqual(ltRecurrences.weekly_TEST_ONLY(new Date('03/21/2019'), new Date('04/05/2019'), testConfig.BiWeekly), [new Date('04/04/2019')], 'Range spans start date');
	assert.deepEqual(ltRecurrences.weekly_TEST_ONLY(new Date('04/04/2019'), new Date('04/05/2019'), testConfig.BiWeekly), [new Date('04/04/2019')], 'Range begins on start date');
	assert.deepEqual(ltRecurrences.weekly_TEST_ONLY(new Date('04/05/2019'), new Date('04/18/2019'), testConfig.BiWeekly), [new Date('04/18/2019')], 'Range ends on first recurrence');
	assert.deepEqual(ltRecurrences.weekly_TEST_ONLY(new Date('04/05/2019'), new Date('04/19/2019'), testConfig.BiWeekly), [new Date('04/18/2019')], 'Range spans first recurrence');
	assert.deepEqual(ltRecurrences.weekly_TEST_ONLY(new Date('03/21/2019'), new Date('04/20/2019'), testConfig.BiWeekly).sort(), [new Date('04/04/2019'), new Date('04/18/2019')], 'Range spans start date & first recurrence');
	assert.deepEqual(ltRecurrences.weekly_TEST_ONLY(new Date('06/21/2019'), new Date('06/30/2019'), testConfig.BiWeekly), [new Date('06/27/2019')], 'Range spans future recurrence');
});

QUnit.test('Recurrence Matches in Configured Range', function ( assert) {
	assert.equal(ltRecurrences.matches(), false, 'Function called with no parameters');
	assert.deepEqual(ltRecurrences.matches('03/21/2019', '04/04/2019', testConfig.RecurrenceParser), [[new Date('04/04/2019')]], 'Range ends on start date');
});