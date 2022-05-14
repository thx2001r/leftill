/* ---------------------------------------------------------------------+
|  Leftill recurrence module                                            |
+--------------------------------------------------------------------- */

// Parse each config item for matches within a date range
function ConfigMatches (start, end, config) {
  /*
    Note on string date formats: JavaScript Short Dates (MM/DD/YYYY -- zero padded)
    convert to midnight on the date in the current time zone.  Other string date
    formats, including ISO 8601, add a time offset from GMT when converted to date
    objects and should be avoided.
  */
  const configMatches = {}
  const rangeStart = new Date(start)
  const rangeEnd = new Date(end)

  if (rangeStart.getTime() > 0 && rangeEnd.getTime() > 0 && rangeStart <= rangeEnd && typeof config === 'object') {
    const keys = Object.keys(config)

    // Loop through possible matching configurations
    for (let i = 0; i < keys.length; i++) {
      // Parse config if required parameters present
      if (new Date(config[keys[i]].recurrenceStart).getTime() > 0) {
        let configMatch = []

        // Route configuration to appropriate recurrence pattern parser
        switch (config[keys[i]].recurrence) {
          case 'Once':
            configMatch = OnceParser(
              rangeStart,
              rangeEnd,
              new Date(config[keys[i]].recurrenceStart)
            )
            break
          case 'Yearly':
            configMatch = YearlyParser(
              rangeStart,
              rangeEnd,
              new Date(config[keys[i]].recurrenceStart)
            )
            break
          case 'Monthly':
            configMatch = MonthlyParser(
              rangeStart,
              rangeEnd,
              new Date(config[keys[i]].recurrenceStart)
            )
            break
          case 'Weekly':
            configMatch = WeeklyParser(
              rangeStart,
              rangeEnd,
              new Date(config[keys[i]].recurrenceStart),
              Math.floor(config[keys[i]].weeksRecurrence)
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

  /* ---------------------------------------------------------------------+
  |  Recurrence pattern parsers                                           |
  +--------------------------------------------------------------------- */

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

// Return a JavaScript date as a string: MM/DD/YYYY (zero padded)
function DateToString (dateObject) {
  return (dateObject && dateObject.getTime() > 0 && typeof dateObject === 'object')
    ? [('00' + (dateObject.getMonth() + 1)).slice(-2), ('00' + dateObject.getDate()).slice(-2), dateObject.getFullYear()].join('/')
    : ''
}

/* ---------------------------------------------------------------------+
|  Exports                                                              |
+--------------------------------------------------------------------- */

export { ConfigMatches, DaysInMonth, DateToString }
