/*-------------------------------------------------------------------------+
|  Recurrence functions                                                    |
+-------------------------------------------------------------------------*/

var ltRecurrences = (function() {
	// (private) - Parse weekly recurrences for matches within a range
	function Weekly(rangeStart, rangeEnd, config) {
		if (new Date(rangeStart) > 0 && new Date(rangeEnd) > 0 && new Date(config.recurrenceStart) > 0) { // Required parameters can be parsed as a date
			var recurrenceStart = new Date(config.recurrenceStart),
				recurrenceMilliseconds = (Math.floor(config.weeksRecurrence) > 0 ? config.weeksRecurrence : 1) * 6048e5,
				recurrencesUntilRangeStart = (new Date(rangeStart) - recurrenceStart) / recurrenceMilliseconds,
				recurrencesUntilRangeEnd = (new Date(rangeEnd) - recurrenceStart) / recurrenceMilliseconds;
			if (
				recurrencesUntilRangeEnd >= 0 // End of range must be on or after the recurrence start
				&& (
					recurrencesUntilRangeStart == Math.floor(recurrencesUntilRangeStart) // rangeStart is an exact recurrence
					|| recurrencesUntilRangeEnd == Math.floor(recurrencesUntilRangeEnd) // -OR- rangeEnd is an exact recurrence
					|| Math.floor(recurrencesUntilRangeEnd) - Math.floor(recurrencesUntilRangeStart) > 0 // -OR- a future recurrence is spanned
					|| recurrencesUntilRangeStart < 0 // -OR- range spans the recurrenceStart
				)
			) {
				var recurrenceMatches = [];
				for (
					var i = recurrencesUntilRangeStart == Math.floor(recurrencesUntilRangeStart) ? recurrencesUntilRangeStart : Math.ceil(recurrencesUntilRangeStart);
					i <= (recurrencesUntilRangeEnd == Math.floor(recurrencesUntilRangeEnd) ? recurrencesUntilRangeEnd : Math.floor(recurrencesUntilRangeEnd));
					i++
				) {
					if (i >= 0) {
						recurrenceMatches.push(new Date(recurrenceStart.getTime() + (i * recurrenceMilliseconds))); // Push matches to array
					}
				}
				return(recurrenceMatches); // Return an array of date objects
			}
		}
		return(false);
	}

	return {
		/* BEGIN: Test-Only Code to Strip During Deployment */
		weekly_TEST_ONLY: Weekly
		/* END: Test-Only Code to Strip During Deployment */
	};

})();