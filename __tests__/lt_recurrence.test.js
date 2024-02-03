import { expect, describe, it } from 'vitest'
import * as recurrence from '../src/js/lt_recurrence'

describe('One-Time Non-Recurring', () => {
  const Once = {
    1: { amount: 100, description: 'Pre-school deposit', type: 'Expense', automatic: false, recurrence: 'Once', recurrenceStart: '04/04/2019' }
  }

  it('is a range before start date', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/03/2019', Once)).toEqual({})
  })

  it('is a range containing no recurrences', () => {
    expect(recurrence.ConfigMatches('04/05/2019', '04/17/2019', Once)).toEqual({})
  })

  it('is a range ending on start date', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/04/2019', Once)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range spanning a start date', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/05/2019', Once)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range closely spanning a start date', () => {
    expect(recurrence.ConfigMatches('04/03/2019', '04/05/2019', Once)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range beginning on a start date', () => {
    expect(recurrence.ConfigMatches('04/04/2019', '04/05/2019', Once)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range beginning and ending on a start date', () => {
    expect(recurrence.ConfigMatches('04/04/2019', '04/04/2019', Once)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  const OnceBroken = {
    1: { amount: 100, description: 'Pre-school deposit', type: 'Expense', automatic: false, recurrence: 'Once', recurrenceStart: 'Something Broken!' }
  }

  it('is an invalid configuration', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/04/2019', OnceBroken)).toEqual({})
  })
})

describe('Yearly Recurrence', () => {
  const Yearly = {
    1: { amount: 119, description: 'Amazon Prime Yearly Membership', type: 'Expense', automatic: true, recurrence: 'Yearly', recurrenceStart: '03/26/2019' }
  }
  it('is a range before start date', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '03/25/2019', Yearly)).toEqual({})
  })

  it('is a range containing no recurrences', () => {
    expect(recurrence.ConfigMatches('03/27/2019', '03/25/2020', Yearly)).toEqual({})
  })

  it('is a range ending on start date', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '03/26/2019', Yearly)).toEqual({ 1: [new Date('03/26/2019')] })
  })

  it('is a range spanning a start date', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/05/2019', Yearly)).toEqual({ 1: [new Date('03/26/2019')] })
  })

  it('is a range closely spanning a start date', () => {
    expect(recurrence.ConfigMatches('03/25/2019', '03/27/2019', Yearly)).toEqual({ 1: [new Date('03/26/2019')] })
  })

  it('is a range beginning on a start date', () => {
    expect(recurrence.ConfigMatches('03/26/2019', '04/05/2019', Yearly)).toEqual({ 1: [new Date('03/26/2019')] })
  })

  it('is a range beginning and ending on a start date', () => {
    expect(recurrence.ConfigMatches('03/26/2019', '03/26/2019', Yearly)).toEqual({ 1: [new Date('03/26/2019')] })
  })

  it('is a range spanning start date & first recurrence', () => {
    expect(recurrence.ConfigMatches('01/01/2018', '12/31/2020', Yearly)).toEqual({ 1: [new Date('03/26/2019'), new Date('03/26/2020')] })
  })

  const YearlyBroken = {
    1: { amount: 119, description: 'Amazon Prime Yearly Membership', type: 'Expense', automatic: true, recurrence: 'Yearly', recurrenceStart: 'Something Broken!' }
  }

  it('is an invalid configuration', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/04/2019', YearlyBroken)).toEqual({})
  })

  const YearlyLeapYears = {
    1: { amount: 119, description: 'Amazon Prime Yearly Membership', type: 'Expense', automatic: true, recurrence: 'Yearly', recurrenceStart: '02/29/2020' }
  }

  it('is a range spanning multiple leap years', () => {
    expect(recurrence.ConfigMatches('03/01/2020', '03/01/2028', YearlyLeapYears)).toEqual({ 1: [new Date('02/29/2024'), new Date('02/29/2028')] })
  })

  it('is a range spanning no leap years', () => {
    expect(recurrence.ConfigMatches('03/01/2020', '03/01/2023', YearlyLeapYears)).toEqual({})
  })
})

describe('Monthly Recurrence', () => {
  const Monthly = {
    1: { amount: 3000.01, description: 'Paycheck', type: 'Income', recurrence: 'Monthly', automatic: true, recurrenceStart: '04/01/2019' }
  }
  it('is a range before start date', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '03/25/2019', Monthly)).toEqual({})
  })

  it('is a range containing no recurrences', () => {
    expect(recurrence.ConfigMatches('03/02/2019', '03/31/2019', Monthly)).toEqual({})
  })

  it('is a range ending on start date', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/01/2019', Monthly)).toEqual({ 1: [new Date('04/01/2019')] })
  })

  it('is a range spanning a start date', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/05/2019', Monthly)).toEqual({ 1: [new Date('04/01/2019')] })
  })

  it('is a range closely spanning a start date', () => {
    expect(recurrence.ConfigMatches('03/31/2019', '04/02/2019', Monthly)).toEqual({ 1: [new Date('04/01/2019')] })
  })

  it('is a range beginning on a start date', () => {
    expect(recurrence.ConfigMatches('04/01/2019', '04/05/2019', Monthly)).toEqual({ 1: [new Date('04/01/2019')] })
  })

  it('is a range beginning and ending on a start date', () => {
    expect(recurrence.ConfigMatches('04/01/2019', '04/01/2019', Monthly)).toEqual({ 1: [new Date('04/01/2019')] })
  })

  it('is a range spanning start date & first recurrence', () => {
    expect(recurrence.ConfigMatches('01/01/2019', '05/02/2019', Monthly)).toEqual({ 1: [new Date('04/01/2019'), new Date('05/01/2019')] })
  })

  const MonthlyBroken = {
    1: { amount: 3000.01, description: 'Paycheck', type: 'Income', recurrence: 'Monthly', automatic: true, recurrenceStart: 'Something Broken!' }
  }

  it('is an invalid configuration', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/04/2019', MonthlyBroken)).toEqual({})
  })

  const MonthlyEdgeDay = {
    1: { amount: 3000.01, description: 'Paycheck', type: 'Income', recurrence: 'Monthly', automatic: true, recurrenceStart: '03/31/2019' }
  }

  it('is a recurrence date greater than the last day of some result months', () => {
    expect(recurrence.ConfigMatches('03/01/2019', '05/01/2019', MonthlyEdgeDay)).toEqual({ 1: [new Date('03/31/2019'), new Date('04/30/2019')] })
  })
})

describe('Bi-weekly Recurrence', () => {
  const BiWeekly = {
    1: { amount: 500, description: 'Paycheck', type: 'Income', automatic: true, recurrence: 'Weekly', weeksRecurrence: 2, recurrenceStart: '04/04/2019' }
  }
  it('is a range before start date', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/03/2019', BiWeekly)).toEqual({})
  })

  it('is a range containing no recurrences', () => {
    expect(recurrence.ConfigMatches('04/05/2019', '04/17/2019', BiWeekly)).toEqual({})
  })

  it('is a range ending on start date', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/04/2019', BiWeekly)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range spanning a start date', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/05/2019', BiWeekly)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range closely spanning a start date', () => {
    expect(recurrence.ConfigMatches('04/03/2019', '04/05/2019', BiWeekly)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range beginning on a start date', () => {
    expect(recurrence.ConfigMatches('04/04/2019', '04/05/2019', BiWeekly)).toEqual({ 1: [new Date('04/04/2019')] })
  })

  it('is a range ending on the first recurrence', () => {
    expect(recurrence.ConfigMatches('04/05/2019', '04/18/2019', BiWeekly)).toEqual({ 1: [new Date('04/18/2019')] })
  })

  it('is a range spanning first recurrence', () => {
    expect(recurrence.ConfigMatches('04/05/2019', '04/19/2019', BiWeekly)).toEqual({ 1: [new Date('04/18/2019')] })
  })

  it('is a range spanning start date & first recurrence', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/20/2019', BiWeekly)).toEqual({ 1: [new Date('04/04/2019'), new Date('04/18/2019')] })
  })

  it('is a range spanning a future recurrence', () => {
    expect(recurrence.ConfigMatches('06/21/2019', '06/30/2019', BiWeekly)).toEqual({ 1: [new Date('06/27/2019')] })
  })

  const BiWeeklyBroken = {
    1: { amount: 500, description: 'Paycheck', type: 'Income', automatic: true, recurrence: 'Weekly', weeksRecurrence: 'a', recurrenceStart: 'Something Broken!' }
  }

  it('is an invalid configuration', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/04/2019', BiWeeklyBroken)).toEqual({})
  })
})

describe('Exceptions to Recurrence', () => {
  const Exceptions = {
    1: { amount: 15, description: 'Tag fee', type: 'Expense', recurrence: 'Yearly', automatic: false, recurrenceStart: '05/01/2019', exceptions: ['05/01/2020', '05/01/2022'] }
  }

  it('is a range whose exceptions wipe out matches', () => {
    expect(recurrence.ConfigMatches('04/30/2020', '05/02/2020', Exceptions)).toEqual({})
  })

  it('is a range excluding exceptions to recurrence', () => {
    expect(recurrence.ConfigMatches('04/30/2019', '05/02/2023', Exceptions)).toEqual({ 1: [new Date('05/01/2019'), new Date('05/01/2021'), new Date('05/01/2023')] })
  })

  const ExceptionsBroken = {
    1: { amount: 15, description: 'Tag fee', type: 'Expense', recurrence: 'Yearly', automatic: false, recurrenceStart: '05/01/2019', exceptions: [new Date('05/01/2020').getTime(), '05/01/2022', 'bob', [], 123, true, {}, { a: true }] }
  }

  it('is a range containing partially invalid exceptions to recurrence', () => {
    expect(recurrence.ConfigMatches('04/30/2019', '05/02/2023', ExceptionsBroken)).toEqual({})
  })

  const ExceptionsInvalid = {
    1: { amount: 15, description: 'Tag fee', type: 'Expense', recurrence: 'Yearly', automatic: false, recurrenceStart: '05/01/2019', exceptions: true }
  }

  it('is a range containing invalid exceptions', () => {
    expect(recurrence.ConfigMatches('04/30/2019', '05/02/2023', ExceptionsInvalid)).toEqual({})
  })
})

describe('Recurrence Matches in Configured Range', () => {
  const RecurrenceParser = {
    1: { amount: 500, description: 'Paycheck', type: 'Income', automatic: true, recurrence: 'Weekly', weeksRecurrence: 2, recurrenceStart: '04/04/2019' },
    id_string: { amount: 100, description: 'Pre-school deposit', type: 'Expense', automatic: false, recurrence: 'Once', recurrenceStart: '04/04/2019' },
    3: { amount: 119, description: 'Amazon Prime Yearly Membership', type: 'Expense', automatic: true, recurrence: 'Yearly', recurrenceStart: '03/26/2019' },
    4: { amount: 3000.01, description: 'Paycheck', type: 'Income', automatic: true, recurrence: 'Monthly', recurrenceStart: '04/01/2019' }
  }

  it('is called with no parameters', () => {
    expect(recurrence.ConfigMatches()).toEqual({})
  })

  it('is called with invalid data types on parameters', () => {
    expect(recurrence.ConfigMatches('not a date', false, 42)).toEqual({})
  })

  it('is a range with an invalid date (2021 is not a leap year)', () => {
    expect(recurrence.ConfigMatches('04/05/2019', '02/29/2021', RecurrenceParser)).toEqual({})
  })

  it('is a range with an invalid short date format', () => {
    expect(recurrence.ConfigMatches('04/05/2019', '2/28/2021', RecurrenceParser)).toEqual({})
  })

  it('is a range with an end date before start date', () => {
    expect(recurrence.ConfigMatches('04/05/2019', '04/03/2019', RecurrenceParser)).toEqual({})
  })

  it('is a range beginning and ending on a start date', () => {
    expect(recurrence.ConfigMatches('04/04/2019', '04/04/2019', RecurrenceParser)).toEqual({ 1: [new Date('04/04/2019')], id_string: [new Date('04/04/2019')] })
  })

  it('is a range ending on start date', () => {
    expect(recurrence.ConfigMatches('03/21/2019', '04/04/2019', RecurrenceParser)).toEqual({ 1: [new Date('04/04/2019')], id_string: [new Date('04/04/2019')], 3: [new Date('03/26/2019')], 4: [new Date('04/01/2019')] })
  })
})

describe('How many days in a given month and year', () => {
  it('is called with no parameters', () => {
    expect(recurrence.DaysInMonth()).toEqual(0)
  })

  it('is called with an invalid negative month number', () => {
    expect(recurrence.DaysInMonth(-12, 2019)).toEqual(0)
  })

  it('is called with an invalid positive month number', () => {
    expect(recurrence.DaysInMonth(12, 2019)).toEqual(0)
  })

  it('is called with an invalid negative year number', () => {
    expect(recurrence.DaysInMonth(11, -1)).toEqual(0)
  })

  it('is the number of days in January', () => {
    expect(recurrence.DaysInMonth(0, 2019)).toEqual(31)
  })

  it('is the number of days in November', () => {
    expect(recurrence.DaysInMonth(10, 2019)).toEqual(30)
  })

  it('is the number of days in a regular non-leap year February', () => {
    expect(recurrence.DaysInMonth(1, 2019)).toEqual(28)
  })

  it('is the number of days in a divisible by 400 leap year February', () => {
    expect(recurrence.DaysInMonth(1, 2000)).toEqual(29)
  })

  it('is the number of days in a divisible by 100, non-divisible by 400 non-leap year February', () => {
    expect(recurrence.DaysInMonth(1, 2100)).toEqual(28)
  })

  it('is the number of days in a regular 4-year leap year February', () => {
    expect(recurrence.DaysInMonth(1, 2020)).toEqual(29)
  })
})

describe('Turn a date object into a string', () => {
  it('is called with no parameters', () => {
    expect(recurrence.DateToString()).toEqual('')
  })

  it('is a zero padded string returned for a date', () => {
    expect(recurrence.DateToString(new Date('04/05/2019'))).toEqual('04/05/2019')
  })
})
