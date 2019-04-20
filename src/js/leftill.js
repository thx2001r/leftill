/*-------------------------------------------------------------------------+
|   _       __ _   _ _ _                                                   |
|  | | ___ / _| |_(_) | |                                                  |
|  | |/ _ \ |_| __| | | |                                                  |
|  | |  __/  _| |_| | | |                                                  |
|  |_|\___|_|  \__|_|_|_|                                                  |
|                                                                          |
+------------------------------------------------------*/ ltVersion = 0.1 /*
|  Copyright (c) 2019 Joseph Reiter                                        |
|                                                                          |
|  Permission is hereby granted, free of charge, to any person obtaining a |
|  copy of this software and associated documentation files (the           |
|  "Software"), to deal in the Software without restriction, including     |
|  without limitation the rights to use, copy, modify, merge, publish,     |
|  distribute, sublicense, and/or sell copies of the Software, and to      |
|  permit persons to whom the Software is furnished to do so, subject to   |
|  the following conditions:                                               |
|                                                                          |
|  The above copyright notice and this permission notice shall be included |
|  in all copies or substantial portions of the Software.                  |
|                                                                          |
|  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS |
|  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF              |
|  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  |
|  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY    |
|  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,    |
|  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE       |
|  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.                  |
|                                                                          |
|  https://opensource.org/licenses/MIT                                     |
+-------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------+
|  Leftill functions                                                       |
+-------------------------------------------------------------------------*/

var ltRecurrences = (function() {

	// Sample public function
	function Echo() {
		return('hello world');
	}

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
		/* test-code */
		weekly_TEST_ONLY: Weekly,
		/* end-test-code */
		echo: Echo // Public function
	};

})();