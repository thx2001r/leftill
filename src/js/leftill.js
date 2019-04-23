/*-------------------------------------------------------------------------+
|  Recurrence functions                                                    |
+-------------------------------------------------------------------------*/

var ltRecurrences = (function() {
	// Parse each config item for matches within a date range
	function Matches(rangeStart, rangeEnd, config) {
		if (new Date(rangeStart) > 0 && new Date(rangeEnd) > 0 && isObject(config) > 0) { // Required parameters
			var configMatches = [];
			for (var i = 0; i < config.length; i++) {
				configMatches.push(Weekly(new Date(rangeStart), new Date(rangeEnd), config[i]));
			}
			return(configMatches);
		}
		return(false);
	}

	// (private) - Parse weekly recurrences for matches within a date range
	function Weekly(rangeStart, rangeEnd, config) {
		if (new Date(config.recurrenceStart) > 0) { // Required parameter can be parsed as a date
			var recurrenceStart = new Date(config.recurrenceStart),
				recurrenceMilliseconds = (Math.floor(config.weeksRecurrence) > 0 ? config.weeksRecurrence : 1) * 6048e5,
				recurrencesToRangeStart = (rangeStart - recurrenceStart) / recurrenceMilliseconds,
				recurrencesToRangeEnd = (rangeEnd - recurrenceStart) / recurrenceMilliseconds,
				rangeStartMatch = recurrencesToRangeStart === Math.floor(recurrencesToRangeStart),
				rangeEndMatch = recurrencesToRangeEnd == Math.floor(recurrencesToRangeEnd),
				spanningMatch = (Math.floor(recurrencesToRangeEnd) - Math.floor(recurrencesToRangeStart) > 0);
			if (recurrencesToRangeEnd >= 0 && (rangeStartMatch || rangeEndMatch || spanningMatch || recurrencesToRangeStart < 0)) {
				var recurrenceMatches = [];
				for (
					var i = rangeStartMatch ? recurrencesToRangeStart : Math.ceil(recurrencesToRangeStart);
					i <= (rangeEndMatch ? recurrencesToRangeEnd : Math.floor(recurrencesToRangeEnd));
					i++
				) {
					if (i >= 0) {
						recurrenceMatches.push(new Date(recurrenceStart.getTime() + (i * recurrenceMilliseconds))); // Push match to array
					}
				}
				return(recurrenceMatches); // Return an array of date objects
			}
		}
		return(false);
	}

	return {
		/* BEGIN: Test-Only Code to Strip During Deployment */
		weekly_TEST_ONLY: Weekly,
		/* END: Test-Only Code to Strip During Deployment */
		matches: Matches
	};
})();