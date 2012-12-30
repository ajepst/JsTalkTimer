var Timer = function (totalMinutes) {
  this.second = 1000;
  this.totalMinutes = totalMinutes;
  this.minute = (this.second * 60);

  this.warningTime = (arguments[1] !== undefined) ? (arguments[1] * this.minute) : (this.minute);
  this.finalWarning = (arguments[2] !== undefined) ? (arguments[2] * this.second) : (this.second * 10);

  this.endCount = this.minute * this.totalMinutes;
  this.remainingTime = this.endCount;
};

Timer.prototype = function ($) {

  var displayTime = function (thisTimer) {
    var timesUp, minutesLeft, msLeft, secondsLeft;
    timesUp = false;
    if (thisTimer.remainingTime < 0) { timesUp = true; }
    minutesLeft = Math.floor(Math.abs(thisTimer.remainingTime) / thisTimer.minute);
    msLeft = Math.abs(thisTimer.remainingTime) - (minutesLeft * thisTimer.minute);
    secondsLeft = Math.floor(msLeft / thisTimer.second);
    if (timesUp) {
      minutesLeft = "-" + minutesLeft;
    }
    $("#countdownDisplay").text(minutesLeft + ":" + pad(secondsLeft, 2));
  };

  var startTimer = function () {
    var thisTimer = this;
    this.clearTimerHooks();
    this.secondsInterval = window.setInterval(function () { tick(thisTimer); }, this.second);
    this.warningTimeout =  window.setTimeout(function () {  setWarning(thisTimer); }, this.remainingTime - this.finalWarning );
    this.endTimeout = window.setTimeout(function () { setEndOfTime(thisTimer); }, this.remainingTime );
    this.minuteTimeout =  window.setTimeout(function () { setMinuteWarning(thisTimer); }, this.remainingTime - this.warningTime );
    displayTime(thisTimer);
    };

  var tick = function (thisTimer) {
    thisTimer.remainingTime = thisTimer.remainingTime - thisTimer.second;
    displayTime(thisTimer);
  };

 var setMinuteWarning = function (thisTimer) {
	$("#PageContainer").removeClass("KeepTalking").addClass("OneMinuteLeft"); 
  }
  

  var setWarning = function (thisTimer) {
    var countdown = $("#countdownDisplay");
    countdown.addClass("Warning");
    thisTimer.warningInterval = window.setInterval(function () {countdown.toggle(); }, 250);
  };

  var setEndOfTime = function (thisTimer) {
    $("#PageContainer").removeClass("OneMinuteLeft").addClass("TimeOut");
    window.clearInterval(thisTimer.warningInterval);
    $("#countdownDisplay").removeClass("Warning").show();
  };


  var pauseTimer = function (thisTimer) {
    thisTimer.clearTimerHooks();
    var countdown = $("#countdownDisplay");
    countdown.show();
  };

  var clearTimerHooks = function() {
    window.clearInterval(this.secondsInterval);
    window.clearTimeout(this.warningTimeout);
    window.clearTimeout(this.endTimeout);
    window.clearTimeout(this.minuteTimeout);
    window.clearInterval(this.warningInterval);
  }

  var pad = function (number, length) {
    var str = number.toString();
    while (str.length < length) {str = '0' + str; }
    return str;
  };

  return {
    startTimer: startTimer,
    pauseTimer: pauseTimer,
    clearTimerHooks: clearTimerHooks
  };
}(jQuery);







