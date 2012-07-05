JsTalkTimer
================================
A simple javascript timer for talks/speeches. Does not require an internet connection. Download and view timer.html in a web browser - controls are at bottom left. 

Shows the time remaining in LARGE numbers, with green background. When the time reaches the warning time, the background changes to yellow, when the time reaches the final warning, the text flashes red, and finally when the time runs out, the backround changes to red.


Defaults to 5 minutes, 1 minute warning, and 10 seconds for final warning.
Timer parameters:
 * length to time, in minutes (required)
 * warningTime, in minutes (optional)
 * finalWarning, in seconds (optional)

Example for full parameter usage: 
Timer(4, 2, 20) - total time is four minutes, warning time is two minutes, and final warning begins twenty seconds before the end.