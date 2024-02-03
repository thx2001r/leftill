/* ---------------------------------------------------------------------+
|  Leftill recurrence module                                            |
+--------------------------------------------------------------------- */

// Parse each config item for matches within a date range
function ConfigMatches (start, end, config) {
  /*
    Only JavaScript Short Dates (MM/DD/YYYY -- zero padded) are permitted as
    inputs to this function for the most reliable international date handling.
  */
  const configMatches = {}
  const rangeStart = ValidateShortDate(start) ? new Date(start) : false
  const rangeEnd = ValidateShortDate(end) ? new Date(end) : false
  const isValidRange = rangeStart && rangeEnd && rangeStart <= rangeEnd

  if (isValidRange && typeof config === 'object') {
    const keys = Object.keys(config)

    // Loop through possible matching configurations
    for (let i = 0; i < keys.length; i++) {
      const isValidConfig = ValidateConfig(config[keys[i]])

      // Parse valid configs
      if (isValidConfig) {
        let configMatch = []
        const recurrenceStart = new Date(config[keys[i]].recurrenceStart)

        // Route configuration to appropriate recurrence pattern parser
        switch (config[keys[i]].recurrence) {
          case 'Once':
            configMatch = OnceParser(
              rangeStart,
              rangeEnd,
              recurrenceStart
            )
            break
          case 'Yearly':
            configMatch = YearlyParser(
              rangeStart,
              rangeEnd,
              recurrenceStart
            )
            break
          case 'Monthly':
            configMatch = MonthlyParser(
              rangeStart,
              rangeEnd,
              recurrenceStart
            )
            break
          case 'Weekly':
            configMatch = WeeklyParser(
              rangeStart,
              rangeEnd,
              recurrenceStart,
              config[keys[i]].weeksRecurrence
            )
            break
        }

        if (configMatch.length > 0) {
          // Parse any exceptions defined in the configuration
          if (config[keys[i]].exceptions) configMatch = ExceptionsParser(configMatch, config[keys[i]].exceptions)

          // Add any remaining matching dates for the configuration
          if (configMatch.length > 0) configMatches[keys[i]] = configMatch
        }
      }
    }
  }
  return configMatches

  // Validate configuration for recurrence matching
  function ValidateConfig (config) {
    return config &&
      typeof config.amount === 'number' &&
      typeof config.description === 'string' &&
      typeof config.type === 'string' &&
      config.type.match(/^(Income|Expense)$/) &&
      typeof config.automatic === 'boolean' &&
      typeof config.recurrence === 'string' &&
      config.recurrence.match(/^(Once|Yearly|Monthly|Weekly)$/) &&
      typeof config.recurrenceStart === 'string' &&
      ValidateShortDate(config.recurrenceStart) &&
      (
        !config.weeksRecurrence ||
        Number.isInteger(config.weeksRecurrence)
      ) &&
      (
        !config.exceptions ||
        (
          Array.isArray(config.exceptions) &&
          config.exceptions.length > 0 &&
          config.exceptions.every(a =>
            typeof a === 'string' &&
            ValidateShortDate(a)
          )
        )
      )
  }

  // Validate short date string format MM/DD/YYYY
  function ValidateShortDate (shortDate) {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
    const checked = shortDate ? shortDate.match(dateRegex) : false
    return checked &&
      typeof shortDate === 'string' &&
      parseInt(checked[1]) > 0 &&
      parseInt(checked[1]) <= 12 &&
      parseInt(checked[2]) > 0 &&
      parseInt(checked[2]) <= DaysInMonth(
        parseInt(checked[1]) - 1,
        parseInt(checked[3])
      ) &&
      new Date(shortDate).getTime() > 0
  }

  /* -------------------------------------------------------------------+
  |  Recurrence pattern parsers                                         |
  +------------------------------------------------------------------- */

  // Parse a one-time date for matches within a date range
  function OnceParser (rangeStart, rangeEnd, recurrenceStart) {
    const recurrenceMatches = []

    if (rangeStart <= recurrenceStart && rangeEnd >= recurrenceStart) {
    // Add matching recurrence
      recurrenceMatches.push(recurrenceStart)
    }
    return recurrenceMatches
  }

  // Parse yearly recurrences for matches within a date range
  function YearlyParser (rangeStart, rangeEnd, recurrenceStart) {
    const recurrenceMatches = []

    if (rangeEnd >= recurrenceStart) {
      const recurrenceStartYear = recurrenceStart.getFullYear()
      const rangeStartYear = rangeStart.getFullYear()
      const candidateMonth = recurrenceStart.getMonth()
      const candidateDate = recurrenceStart.getDate()

      // Loop through possible matches in range
      for (
        let candidateYear = rangeStartYear <= recurrenceStartYear ? recurrenceStartYear : rangeStartYear;
        candidateYear <= rangeEnd.getFullYear();
        candidateYear++
      ) {
        const recurrenceCandidate = new Date(candidateYear, candidateMonth, candidateDate)
        const daysInCandidateMonth = DaysInMonth(candidateMonth, candidateYear)

        if (rangeStart <= recurrenceCandidate && rangeEnd >= recurrenceCandidate && candidateDate <= daysInCandidateMonth) {
        // Add any matching recurrences
          recurrenceMatches.push(recurrenceCandidate)
        }
      }
    }
    return recurrenceMatches
  }

  // Parse monthly recurrences for matches within a date range
  function MonthlyParser (rangeStart, rangeEnd, recurrenceStart) {
    const recurrenceMatches = []

    if (rangeEnd >= recurrenceStart) {
      const recurrenceDate = recurrenceStart.getDate()
      const rangeBeforeStart = rangeStart <= recurrenceStart

      // Loop through possible matches in range
      for (
        let candidateMonth = rangeBeforeStart ? recurrenceStart.getMonth() : rangeStart.getMonth() + 1,
          candidateYear = rangeBeforeStart ? recurrenceStart.getFullYear() : rangeStart.getFullYear(); ;
        candidateMonth++
      ) {
        if (candidateMonth > 11) {
        // Roll over candidate month to January of the next year
          candidateMonth = 0
          candidateYear++
        }

        // Use last day of month if recurrence date is more than days in month
        const daysInCandidateMonth = DaysInMonth(candidateMonth, candidateYear)
        const candidateDate = recurrenceDate > daysInCandidateMonth ? daysInCandidateMonth : recurrenceDate
        const recurrenceCandidate = new Date(candidateYear, candidateMonth, candidateDate)

        if (rangeEnd >= recurrenceCandidate) {
        // Add any matching recurrences
          recurrenceMatches.push(recurrenceCandidate)
        } else {
          break
        }
      }
    }
    return recurrenceMatches
  }

  // Parse weekly recurrences for matches within a date range
  function WeeklyParser (rangeStart, rangeEnd, recurrenceStart, weeksRecurrence) {
    const recurrenceMatches = []
    const recurrenceMilliseconds = (weeksRecurrence > 0 ? weeksRecurrence : 1) * 6048e5
    const recurrencesToRangeStart = (rangeStart.getTime() - recurrenceStart.getTime()) / recurrenceMilliseconds
    const recurrencesToRangeEnd = (rangeEnd.getTime() - recurrenceStart.getTime()) / recurrenceMilliseconds
    const rangeStartMatch = recurrencesToRangeStart === Math.floor(recurrencesToRangeStart)
    const rangeEndMatch = recurrencesToRangeEnd === Math.floor(recurrencesToRangeEnd)
    const spanningMatch = (Math.floor(recurrencesToRangeEnd) - Math.floor(recurrencesToRangeStart) > 0)

    if (recurrencesToRangeEnd >= 0 && (rangeStartMatch || rangeEndMatch || spanningMatch)) {
    // Loop through possible matches in range, on or after the configured recurrence start date
      for (
        let i = recurrencesToRangeStart <= 0 ? 0 : rangeStartMatch ? recurrencesToRangeStart : Math.ceil(recurrencesToRangeStart);
        i <= (rangeEndMatch ? recurrencesToRangeEnd : Math.floor(recurrencesToRangeEnd));
        i++
      ) {
      // Add any matching recurrences
        recurrenceMatches.push(new Date(recurrenceStart.getTime() + (i * recurrenceMilliseconds)))
      }
    }
    return recurrenceMatches
  }

  // Parse exceptions to a config for a given date range
  function ExceptionsParser (matches, exceptions) {
    const remainingMatches = []

    // Loop through matches and exclude exceptions from matches
    for (let i = 0; i < matches.length; i++) {
      if (exceptions.indexOf(DateToString(matches[i])) === -1) {
      // Add matches without an exception
        remainingMatches.push(matches[i])
      }
    }
    return remainingMatches
  }
}

/* ---------------------------------------------------------------------+
|  Date Related Functions                                               |
+--------------------------------------------------------------------- */

// Determine how many days in a given month/year
function DaysInMonth (month, year) {
  const daysInMonth = [
    31,
    year % 4 === 0 && !(year % 100 === 0 && year % 400 !== 0) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ]

  return (month >= 0 && month <= 11 && Number.isInteger(month) && year >= 0 && Number.isInteger(year))
    ? daysInMonth[month]
    : 0
}

// Return a JavaScript date as a short date string: MM/DD/YYYY format (zero padded)
function DateToString (dateObject) {
  return (dateObject && dateObject.getTime() > 0)
    ? dateObject.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    : ''
}

/* ---------------------------------------------------------------------+
|  Exports                                                              |
+--------------------------------------------------------------------- */

export { ConfigMatches, DaysInMonth, DateToString }
