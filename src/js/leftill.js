/*-------------------------------------------------------------------------+
|  Leftill recurrence module                                               |
+-------------------------------------------------------------------------*/

var ltRecurrences = (function () {

	/*---------------------------------------------------------------------+
	|  Recurrence module public functions                                  |
	+---------------------------------------------------------------------*/

	// Parse each config item for matches within a date range
	function ConfigMatches(start, end, config) {
		var rangeStart = new Date(start);
		var rangeEnd = new Date(end);

		if (rangeStart > 0 && rangeEnd > 0 && rangeStart <= rangeEnd && isObject(config)) {
			var configMatches = {},
				keys = Object.keys(config);

			// Loop through possible matching configurations
			for (var i = 0; i < keys.length; i++) {

				// Parse config if required parameters present
				if (new Date(config[keys[i]].recurrenceStart) > 0) {
					var configMatch = [];

					// Route configuration to appropriate configuration parser
					switch (config[keys[i]].recurrence) {
						case "Once":
							configMatch = OnceParser(rangeStart, rangeEnd, config[keys[i]]);
							break;
						case "Yearly":
							configMatch = YearlyParser(rangeStart, rangeEnd, config[keys[i]]);
							break;
						case "Monthly":
							configMatch = MonthlyParser(rangeStart, rangeEnd, config[keys[i]]);
							break;
						case "Weekly":
							configMatch = WeeklyParser(rangeStart, rangeEnd, config[keys[i]]);
							break;
					}

					// Add any matching dates for the configuration 
					if (configMatch.length > 0) configMatches[keys[i]] = configMatch;
				}
			}
			return Object.keys(configMatches).length > 0 ? configMatches : false;
		}
		return false;
	}

	// Determine how many days in a given month/year
	function DaysInMonth (month, year) {
		var daysInMonth = [
			31,
			year % 4 == 0 && !(year % 100 == 0 && year % 400 != 0) ? 29 : 28,
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
		];
		return (month && year) ? daysInMonth[month] : false;
	}

	/*---------------------------------------------------------------------+
	|  Recurrence pattern parsers - private functions                      |
	+---------------------------------------------------------------------*/

	// Parse a one-time date for matches within a date range
	function OnceParser(rangeStart, rangeEnd, config) {
		var recurrenceStart = new Date(config.recurrenceStart);

		if (rangeStart <= recurrenceStart && rangeEnd >= recurrenceStart) {
			// Add matching recurrence
			return [recurrenceStart];
		}
		return false;
	}

	// Parse yearly recurrences for matches within a date range
	function YearlyParser(rangeStart, rangeEnd, config) {
		var recurrenceStart = new Date(config.recurrenceStart);

		if (rangeEnd >= recurrenceStart) {
			var recurrenceMatches = [],
				recurrenceStartYear = recurrenceStart.getFullYear(),
				rangeStartYear = rangeStart.getFullYear(),
				candidateBaseString = (recurrenceStart.getMonth() + 1) + "/" + recurrenceStart.getDate() + "/";

			// Loop through possible matches in range -- Feb 29th should be handled upstream in configuration
			for (
				var i = rangeStartYear <= recurrenceStartYear ? recurrenceStartYear : rangeStartYear;
				i <= rangeEnd.getFullYear();
				i++
			) {
				var recurrenceCandidate = new Date(candidateBaseString + i);

				if (rangeStart <= recurrenceCandidate && rangeEnd >= recurrenceCandidate) {
					// Add any matching recurrences
					recurrenceMatches.push(recurrenceCandidate);
				}
			}
			return recurrenceMatches;
		}
		return false;
	}

	// Parse monthly recurrences for matches within a date range
	function MonthlyParser(rangeStart, rangeEnd, config) {
		var recurrenceStart = new Date(config.recurrenceStart);

		if (rangeEnd >= recurrenceStart) {
			var recurrenceMatches = [],
				recurrenceDate = recurrenceStart.getDate(),
				rangeBeforeStart = rangeStart <= recurrenceStart;

			// Loop through possible matches in range
			for (
				var i = rangeBeforeStart ? recurrenceStart.getMonth() + 1 : rangeStart.getMonth() + 2,
					candidateYear = rangeBeforeStart ? recurrenceStart.getFullYear() : rangeStart.getFullYear(); ;
				i++
			) {
				if (i > 12) {
					// Roll over candidate month to January of the next year
					i = 1;
					candidateYear++;
				}

				// Use last day of month if recurrence date is more than days in month
				var daysInCandidateMonth = DaysInMonth(i - 1, candidateYear);
				var candidateDate = recurrenceDate > daysInCandidateMonth ? daysInCandidateMonth : recurrenceDate;
				var recurrenceCandidate = new Date(i + "/" + candidateDate + "/" + candidateYear);

				if (rangeEnd >= recurrenceCandidate) {
					// Add any matching recurrences
					recurrenceMatches.push(recurrenceCandidate);
				} else {
					break;
				}
			}
			return recurrenceMatches;
		}
		return false;
	}

	// Parse weekly recurrences for matches within a date range
	function WeeklyParser(rangeStart, rangeEnd, config) {
		var recurrenceStart = new Date(config.recurrenceStart),
			recurrenceMilliseconds = (Math.floor(config.weeksRecurrence) > 0 ? config.weeksRecurrence : 1) * 6048e5,
			recurrencesToRangeStart = (rangeStart - recurrenceStart) / recurrenceMilliseconds,
			recurrencesToRangeEnd = (rangeEnd - recurrenceStart) / recurrenceMilliseconds,
			rangeStartMatch = recurrencesToRangeStart === Math.floor(recurrencesToRangeStart),
			rangeEndMatch = recurrencesToRangeEnd === Math.floor(recurrencesToRangeEnd),
			spanningMatch = (Math.floor(recurrencesToRangeEnd) - Math.floor(recurrencesToRangeStart) > 0);

		if (recurrencesToRangeEnd >= 0 && (rangeStartMatch || rangeEndMatch || spanningMatch)) {
			var recurrenceMatches = [];

			// Loop through possible matches in range, on or after the configured recurrence start date
			for (
				var i = recurrencesToRangeStart <= 0 ? 0 : rangeStartMatch ? recurrencesToRangeStart : Math.ceil(recurrencesToRangeStart);
				i <= (rangeEndMatch ? recurrencesToRangeEnd : Math.floor(recurrencesToRangeEnd));
				i++
			) {
				// Add any matching recurrences
				recurrenceMatches.push(new Date(recurrenceStart.getTime() + (i * recurrenceMilliseconds)));
			}
			return recurrenceMatches;
		}
		return false;
	}

	/*---------------------------------------------------------------------+
	|  Return public functions                                             |
	+---------------------------------------------------------------------*/

	return {
		matches: ConfigMatches,
		daysInMonth: DaysInMonth
	};
})();