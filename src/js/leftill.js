/*-------------------------------------------------------------------------+
|  Recurrence functions                                                    |
+-------------------------------------------------------------------------*/

var ltRecurrences = (function () {

	// Parse each config item for matches within a date range
	function ConfigMatches(rangeStart, rangeEnd, config) {
		rangeStart = new Date(rangeStart);
		rangeEnd = new Date(rangeEnd);

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

	// (private) - Parse a one-time date for matches within a date range
	function OnceParser(rangeStart, rangeEnd, config) {
		var oneTimeDate = new Date(config.recurrenceStart);

		if (rangeStart <= oneTimeDate && rangeEnd >= oneTimeDate) {
			// Add matching recurrence
			return [oneTimeDate];
		}
		return false;
	}

	// (private) - Parse weekly recurrences for matches within a date range
	function WeeklyParser(rangeStart, rangeEnd, config) {
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
					// Add any matching recurrences
					recurrenceMatches.push(new Date(recurrenceStart.getTime() + (i * recurrenceMilliseconds)));
				}
				return recurrenceMatches;
			}
		}
		return false;
	}

	return {
		/* BEGIN: Test-Only Code to Strip During Deployment */
		once_TEST_ONLY: OnceParser,
		weekly_TEST_ONLY: WeeklyParser,
		/* END: Test-Only Code to Strip During Deployment */
		matches: ConfigMatches
	};
})();