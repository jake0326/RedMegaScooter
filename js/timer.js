"use strict";
	/* Run the function*/
	runClock();
	setInterval("runClock()", 1000);
	/*Funciton to create and run clock*/
	function runClock()
	{
	
	/* Store the current date and time */
	var currentDay = new Date();
	var dateStr = currentDay.toLocaleDateString();
	var timeStr = currentDay.toLocaleTimeString();

	/* Display the current date and time */
	document.getElementById("dateNow").innerHTML =
	dateStr + "<br />" + timeStr;
	
}
