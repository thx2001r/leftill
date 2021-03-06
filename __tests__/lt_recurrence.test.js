const leftill = require('../src/js/lt_recurrence')

describe('One-Time Non-Recurring', () => {
  const Once = {
    1: { amount: 100, description: 'Pre-school deposit', type: 'Expense', recurrence: 'Once', recurrenceStart: '04/04/2019' }
  }
  const OnceBroken = {
    1: { amount: 100, description: 'Pre-school deposit', type: 'Expense', recurrence: 'Once', recurrenceStart: 'Something Broken!' }
  }

  it('is an invalid configuration', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/04/2019', OnceBroken)).toEqual(false)
  })

  it('is a range before start date', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/03/2019', Once)).toEqual(false)
  })

  it('is a range containing no recurrences', () => {
    expect(leftill.ConfigMatches('04/05/2019', '04/17/2019', Once)).toEqual(false)
  })

  it('is a range ending on start date', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/04/2019', Once)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range spanning a start date', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/05/2019', Once)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range closely spannning a start date', () => {
    expect(leftill.ConfigMatches('04/03/2019', '04/05/2019', Once)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range beginning on a start date', () => {
    expect(leftill.ConfigMatches('04/04/2019', '04/05/2019', Once)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range beginning and ending on a start date', () => {
    expect(leftill.ConfigMatches('04/04/2019', '04/04/2019', Once)).toEqual({ 1: [new Date('04/04/2019')] })
  })
})

describe('Yearly Recurrence', () => {
  const Yearly = {
    1: { amount: 119, description: 'Amazon Prime Yearly Membership', type: 'Expense', recurrence: 'Yearly', recurrenceStart: '03/26/2019' }
  }
  const YearlyBroken = {
    1: { amount: 119, description: 'Amazon Prime Yearly Membership', type: 'Expense', recurrence: 'Yearly', recurrenceStart: 'Something Broken!' }
  }

  it('is an invalid configuration', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/04/2019', YearlyBroken)).toEqual(false)
  })

  it('is a range before start date', () => {
    expect(leftill.ConfigMatches('03/21/2019', '03/25/2019', Yearly)).toEqual(false)
  })

  it('is a range containing no recurrences', () => {
    expect(leftill.ConfigMatches('03/27/2019', '03/25/2020', Yearly)).toEqual(false)
  })

  it('is a range ending on start date', () => {
    expect(leftill.ConfigMatches('03/21/2019', '03/26/2019', Yearly)).toEqual({ 1: [new Date('03/26/2019')] })
  })

  it('is a range spanning a start date', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/05/2019', Yearly)).toEqual({ 1: [new Date('03/26/2019')] })
  })

  it('is a range closely spannning a start date', () => {
    expect(leftill.ConfigMatches('03/25/2019', '03/27/2019', Yearly)).toEqual({ 1: [new Date('03/26/2019')] })
  })

  it('is a range beginning on a start date', () => {
    expect(leftill.ConfigMatches('03/26/2019', '04/05/2019', Yearly)).toEqual({ 1: [new Date('03/26/2019')] })
  })

  it('is a range beginning and ending on a start date', () => {
    expect(leftill.ConfigMatches('03/26/2019', '03/26/2019', Yearly)).toEqual({ 1: [new Date('03/26/2019')] })
  })

  it('is a range spanning start date & first recurrence', () => {
    expect(leftill.ConfigMatches('01/01/2018', '12/31/2020', Yearly)).toEqual({ 1: [new Date('03/26/2019'), new Date('03/26/2020')] })
  })
})

describe('Monthly Recurrence', () => {
  const Monthly = {
    1: { amount: 3000.01, description: 'Paycheck', type: 'Income', recurrence: 'Monthly', recurrenceStart: '04/01/2019' }
  }
  const MonthlyBroken = {
    1: { amount: 3000.01, description: 'Paycheck', type: 'Income', recurrence: 'Monthly', recurrenceStart: 'Something Broken!' }
  }
  const MonthlyEdgeDay = {
    1: { amount: 3000.01, description: 'Paycheck', type: 'Income', recurrence: 'Monthly', recurrenceStart: '03/31/2019' }
  }

  it('is an invalid configuration', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/04/2019', MonthlyBroken)).toEqual(false)
  })

  it('is a range before start date', () => {
    expect(leftill.ConfigMatches('03/21/2019', '03/25/2019', Monthly)).toEqual(false)
  })

  it('is a range containing no recurrences', () => {
    expect(leftill.ConfigMatches('03/02/2019', '03/31/2019', Monthly)).toEqual(false)
  })

  it('is a range ending on start date', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/01/2019', Monthly)).toEqual({ 1: [new Date('04/01/2019')] })
  })

  it('is a range spanning a start date', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/05/2019', Monthly)).toEqual({ 1: [new Date('04/01/2019')] })
  })

  it('is a range closely spannning a start date', () => {
    expect(leftill.ConfigMatches('03/31/2019', '04/02/2019', Monthly)).toEqual({ 1: [new Date('04/01/2019')] })
  })

  it('is a range beginning on a start date', () => {
    expect(leftill.ConfigMatches('04/01/2019', '04/05/2019', Monthly)).toEqual({ 1: [new Date('04/01/2019')] })
  })

  it('is a range beginning and ending on a start date', () => {
    expect(leftill.ConfigMatches('04/01/2019', '04/01/2019', Monthly)).toEqual({ 1: [new Date('04/01/2019')] })
  })

  it('is a range spanning start date & first recurrence', () => {
    expect(leftill.ConfigMatches('01/01/2019', '05/02/2019', Monthly)).toEqual({ 1: [new Date('04/01/2019'), new Date('05/01/2019')] })
  })

  it('is a recurrence date greater than the last day of some result months', () => {
    expect(leftill.ConfigMatches('03/01/2019', '05/01/2019', MonthlyEdgeDay)).toEqual({ 1: [new Date('03/31/2019'), new Date('04/30/2019')] })
  })
})

describe('Bi-weekly Recurrence', () => {
  const BiWeekly = {
    1: { amount: 500, description: 'Paycheck', type: 'Income', recurrence: 'Weekly', weeksRecurrence: 2, recurrenceStart: '04/04/2019' }
  }
  const BiWeeklyBroken = {
    1: { amount: 500, description: 'Paycheck', type: 'Income', recurrence: 'Weekly', weeksRecurrence: 'a', recurrenceStart: 'Something Broken!' }
  }

  it('is an invalid configuration', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/04/2019', BiWeeklyBroken)).toEqual(false)
  })

  it('is a range before start date', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/03/2019', BiWeekly)).toEqual(false)
  })

  it('is a range containing no recurrences', () => {
    expect(leftill.ConfigMatches('04/05/2019', '04/17/2019', BiWeekly)).toEqual(false)
  })

  it('is a range ending on start date', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/04/2019', BiWeekly)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range spanning a start date', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/05/2019', BiWeekly)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range closely spannning a start date', () => {
    expect(leftill.ConfigMatches('04/03/2019', '04/05/2019', BiWeekly)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range beginning on a start date', () => {
    expect(leftill.ConfigMatches('04/04/2019', '04/05/2019', BiWeekly)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range ending on the first recurrence', () => {
    expect(leftill.ConfigMatches('04/05/2019', '04/18/2019', BiWeekly)).toEqual({ 1: [new Date('04/18/2019')] })
  })

  it('is a range spanning first recurrence', () => {
    expect(leftill.ConfigMatches('04/05/2019', '04/19/2019', BiWeekly)).toEqual({ 1: [new Date('04/18/2019')] })
  })

  it('is a range spanning start date & first recurrence', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/20/2019', BiWeekly)).toEqual({ 1: [new Date('04/04/2019'), new Date('04/18/2019')] })
  })

  it('is a range spanning a future recurrence', () => {
    expect(leftill.ConfigMatches('06/21/2019', '06/30/2019', BiWeekly)).toEqual({ 1: [new Date('06/27/2019')] })
  })
})

describe('Exceptions to Recurrence', () => {
  const Exceptions = {
    1: { amount: 15, description: 'Tag fee', type: 'Expense', recurrence: 'Yearly', recurrenceStart: '05/01/2019', exceptions: ['05/01/2020', '05/01/2022'] }
  }

  it('is a range whose execptions wipe out matches', () => {
    expect(leftill.ConfigMatches('04/30/2020', '05/02/2020', Exceptions)).toEqual(false)
  })

  it('is a range containing exceptions to recurrence', () => {
    expect(leftill.ConfigMatches('04/30/2019', '05/02/2023', Exceptions)).toEqual({ 1: [new Date('05/01/2019'), new Date('05/01/2021'), new Date('05/01/2023')] })
  })
})

describe('Recurrence Matches in Configured Range', () => {
  const RecurrenceParser = {
    1: { amount: 500, description: 'Paycheck', type: 'Income', recurrence: 'Weekly', weeksRecurrence: 2, recurrenceStart: '04/04/2019' },
    2: { amount: 100, description: 'Pre-school deposit', type: 'Expense', recurrence: 'Once', recurrenceStart: '04/04/2019' },
    3: { amount: 119, description: 'Amazon Prime Yearly Membership', type: 'Expense', recurrence: 'Yearly', recurrenceStart: '03/26/2019' },
    4: { amount: 3000.01, description: 'Paycheck', type: 'Income', recurrence: 'Monthly', recurrenceStart: '04/01/2019' }
  }

  it('is called with no parameters', () => {
    expect(leftill.ConfigMatches()).toEqual(false)
  })

  it('is called with invalid data types on parameters', () => {
    expect(leftill.ConfigMatches('not a date', false, 42)).toEqual(false)
  })

  it('is a range with an end date before start date', () => {
    expect(leftill.ConfigMatches('04/05/2019', '04/03/2019', RecurrenceParser)).toEqual(false)
  })

  it('is a range beginning and ending on a start date', () => {
    expect(leftill.ConfigMatches('04/04/2019', '04/04/2019', RecurrenceParser)).toEqual({ 1: [new Date('04/04/2019')], 2: [new Date('04/04/2019')] })
  })

  it('is a range ending on start date', () => {
    expect(leftill.ConfigMatches('03/21/2019', '04/04/2019', RecurrenceParser)).toEqual({ 1: [new Date('04/04/2019')], 2: [new Date('04/04/2019')], 3: [new Date('03/26/2019')], 4: [new Date('04/01/2019')] })
  })
})

describe('How many days in a given month and year', () => {
  it('is called with no parameters', () => {
    expect(leftill.DaysInMonth()).toEqual(false)
  })

  it('is the number of days in November', () => {
    expect(leftill.DaysInMonth(10, 2019)).toEqual(30)
  })

  it('is the number of days in a regular non-leap year February', () => {
    expect(leftill.DaysInMonth(1, 2019)).toEqual(28)
  })

  it('is the number of days in a divisible by 400 leap year February', () => {
    expect(leftill.DaysInMonth(1, 2000)).toEqual(29)
  })

  it('is the number of days in a divisible by 100, non-divisible by 400 non-leap year February', () => {
    expect(leftill.DaysInMonth(1, 2100)).toEqual(28)
  })

  it('is the number of days in a regular 4-year leap year February', () => {
    expect(leftill.DaysInMonth(1, 2020)).toEqual(29)
  })
})

describe('Turn a date object into a string', () => {
  it('is called with no parameters', () => {
    expect(leftill.DateToString()).toEqual(false)
  })

  it('is a zero padded string returned for a date', () => {
    expect(leftill.DateToString(new Date('04/05/2019'))).toEqual('04/05/2019')
  })
})
