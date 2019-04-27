/*-------------------------------------------------------------------------+
|  Recurrence functions                                                    |
+-------------------------------------------------------------------------*/

var ltRecurrences = (function () {

	// Parse each config item for matches within a date range
	function Matches(rangeStart, rangeEnd, config) {
		rangeStart = new Date(rangeStart);
		rangeEnd = new Date(rangeEnd);

		if (rangeStart > 0 && rangeEnd > 0 && rangeStart <= rangeEnd && isObject(config)) {
			var configMatches = {},
				keys = Object.keys(config);

			// Loop through possible matching configurations
			for (var i = 0; i < keys.length; i++) {
				var configMatch = Weekly(rangeStart, rangeEnd, config[keys[i]]);

				// Add matching dates for the configuration 
				if (configMatch) configMatches[keys[i]] = configMatch;
			}
			return Object.keys(configMatches).length > 0 ? configMatches : false;
		}
		return false;
	}

	// (private) - Parse weekly recurrences for matches within a date range
	function Weekly(rangeStart, rangeEnd, config) {
		if (new Date(config.recurrenceStart) > 0) {
			var recurrenceStart = new Date(config.recurrenceStart),
				recurrenceMilliseconds = (Math.floor(config.weeksRecurrence) > 0 ? config.weeksRecurrence : 1) * 6048e5,
				recurrencesToRangeStart = (rangeStart - recurrenceStart) / recurrenceMilliseconds,
				recurrencesToRangeEnd = (rangeEnd - recurrenceStart) / recurrenceMilliseconds,
				rangeStartMatch = recurrencesToRangeStart === Math.floor(recurrencesToRangeStart),
				rangeEndMatch = recurrencesToRangeEnd == Math.floor(recurrencesToRangeEnd),
				spanningMatch = (Math.floor(recurrencesToRangeEnd) - Math.floor(recurrencesToRangeStart) > 0);

			if (recurrencesToRangeEnd >= 0 && (rangeStartMatch || rangeEndMatch || spanningMatch)) {
				var recurrenceMatches = [];

				// Loop through possible matches in range, on or after the configured recurrence start date
				for (
					var i = recurrencesToRangeStart <= 0 ? 0 : rangeStartMatch ? recurrencesToRangeStart : Math.ceil(recurrencesToRangeStart);
					i <= (rangeEndMatch ? recurrencesToRangeEnd : Math.floor(recurrencesToRangeEnd));
					i++
				) {
					// Add matching recurrences
					recurrenceMatches.push(new Date(recurrenceStart.getTime() + (i * recurrenceMilliseconds)));
				}
				return recurrenceMatches;
			}
		}
		return false;
	}

	return {
		/* BEGIN: Test-Only Code to Strip During Deployment */
		weekly_TEST_ONLY: Weekly,
		/* END: Test-Only Code to Strip During Deployment */
		matches: Matches
	};
})();