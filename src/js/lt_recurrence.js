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
  const rangeStart = new Date(start)
  const rangeEnd = new Date(end)

  if (rangeStart > 0 && rangeEnd > 0 && rangeStart <= rangeEnd && typeof config === 'object') {
    const configMatches = {}
    const keys = Object.keys(config)

    // Loop through possible matching configurations
    for (let i = 0; i < keys.length; i++) {
      // Parse config if required parameters present
      if (new Date(config[keys[i]].recurrenceStart) > 0) {
        let configMatch = []

        // Route configuration to appropriate configuration parser
        switch (config[keys[i]].recurrence) {
          case 'Once':
            configMatch = OnceParser(rangeStart, rangeEnd, config[keys[i]])
            break
          case 'Yearly':
            configMatch = YearlyParser(rangeStart, rangeEnd, config[keys[i]])
            break
          case 'Monthly':
            configMatch = MonthlyParser(rangeStart, rangeEnd, config[keys[i]])
            break
          case 'Weekly':
            configMatch = WeeklyParser(rangeStart, rangeEnd, config[keys[i]])
            break
        }

        if (configMatch.length > 0) {
          // Parse any exceptions defined in the configuration
          if (config[keys[i]].exceptions) configMatch = ExceptionsParser(configMatch, config[keys[i]])

          // Add any remaining matching dates for the configuration
          if (configMatch.length > 0) configMatches[keys[i]] = configMatch
        }
      }
    }
    return Object.keys(configMatches).length > 0 ? configMatches : false
  }
  return false
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
  return (month && year) ? daysInMonth[month] : false
}

// Return a JavaScript date as a string: MM/DD/YYYY (zero padded)
function DateToString (dateObject) {
  if (typeof dateObject === 'object') {
    return [('00' + (dateObject.getMonth() + 1)).slice(-2), ('00' + dateObject.getDate()).slice(-2), dateObject.getFullYear()].join('/')
  }
  return false
}

/* ---------------------------------------------------------------------+
|  Recurrence pattern parsers                                           |
+--------------------------------------------------------------------- */

// Parse a one-time date for matches within a date range
function OnceParser (rangeStart, rangeEnd, config) {
  const recurrenceStart = new Date(config.recurrenceStart)

  if (rangeStart <= recurrenceStart && rangeEnd >= recurrenceStart) {
    // Add matching recurrence
    return [recurrenceStart]
  }
  return false
}

// Parse yearly recurrences for matches within a date range
function YearlyParser (rangeStart, rangeEnd, config) {
  const recurrenceStart = new Date(config.recurrenceStart)

  if (rangeEnd >= recurrenceStart) {
    const recurrenceMatches = []
    const recurrenceStartYear = recurrenceStart.getFullYear()
    const rangeStartYear = rangeStart.getFullYear()
    const candidateMonth = recurrenceStart.getMonth()
    const candidateDate = recurrenceStart.getDate()

    // Loop through possible matches in range -- Feb 29th should be handled upstream in configuration
    for (
      let candidateYear = rangeStartYear <= recurrenceStartYear ? recurrenceStartYear : rangeStartYear;
      candidateYear <= rangeEnd.getFullYear();
      candidateYear++
    ) {
      const recurrenceCandidate = new Date(candidateYear, candidateMonth, candidateDate)

      if (rangeStart <= recurrenceCandidate && rangeEnd >= recurrenceCandidate) {
        // Add any matching recurrences
        recurrenceMatches.push(recurrenceCandidate)
      }
    }
    return recurrenceMatches
  }
  return false
}

// Parse monthly recurrences for matches within a date range
function MonthlyParser (rangeStart, rangeEnd, config) {
  const recurrenceStart = new Date(config.recurrenceStart)

  if (rangeEnd >= recurrenceStart) {
    const recurrenceMatches = []
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
    return recurrenceMatches
  }
  return false
}

// Parse weekly recurrences for matches within a date range
function WeeklyParser (rangeStart, rangeEnd, config) {
  const recurrenceStart = new Date(config.recurrenceStart)
  const recurrenceMilliseconds = (Math.floor(config.weeksRecurrence) > 0 ? config.weeksRecurrence : 1) * 6048e5
  const recurrencesToRangeStart = (rangeStart - recurrenceStart) / recurrenceMilliseconds
  const recurrencesToRangeEnd = (rangeEnd - recurrenceStart) / recurrenceMilliseconds
  const rangeStartMatch = recurrencesToRangeStart === Math.floor(recurrencesToRangeStart)
  const rangeEndMatch = recurrencesToRangeEnd === Math.floor(recurrencesToRangeEnd)
  const spanningMatch = (Math.floor(recurrencesToRangeEnd) - Math.floor(recurrencesToRangeStart) > 0)

  if (recurrencesToRangeEnd >= 0 && (rangeStartMatch || rangeEndMatch || spanningMatch)) {
    const recurrenceMatches = []

    // Loop through possible matches in range, on or after the configured recurrence start date
    for (
      let i = recurrencesToRangeStart <= 0 ? 0 : rangeStartMatch ? recurrencesToRangeStart : Math.ceil(recurrencesToRangeStart);
      i <= (rangeEndMatch ? recurrencesToRangeEnd : Math.floor(recurrencesToRangeEnd));
      i++
    ) {
      // Add any matching recurrences
      recurrenceMatches.push(new Date(recurrenceStart.getTime() + (i * recurrenceMilliseconds)))
    }
    return recurrenceMatches
  }
  return false
}

// Parse exceptions to a config for a given date range
function ExceptionsParser (matches, config) {
  const remainingMatches = []

  // Loop through matches and exclude exceptions from matches
  for (let i = 0; i < matches.length; i++) {
    if (config.exceptions.indexOf(DateToString(matches[i])) === -1) {
      // Add matches without an exception
      remainingMatches.push(matches[i])
    }
  }
  return remainingMatches
}

/* ---------------------------------------------------------------------+
|  Exports                                                              |
+--------------------------------------------------------------------- */

if (typeof exports !== 'undefined') {
  module.exports = {
    ConfigMatches: ConfigMatches,
    DaysInMonth: DaysInMonth,
    DateToString: DateToString
  }
}
