var Timer = function (totalMinutes) {
  this.second = 1000;
  this.minute = (this.second * 60);

  this.warningTime = (arguments[1] !== undefined) ? (arguments[1] * this.minute) : (this.minute);
  this.finalWarning = (arguments[2] !== undefined) ? (arguments[2] * this.second) : (this.second * 10);
  this.setTimeLength(totalMinutes);
};

Timer.prototype = function ($) {

  var setTimeLength = function (mins) {
    this.totalMinutes = mins;
    this.endCount = this.minute * this.totalMinutes;
    this.remainingTime = this.endCount;
  };

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
    clearTimerHooks(this);
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


  var pauseTimer = function () {
    clearTimerHooks(this);
    var countdown = $("#countdownDisplay");
    countdown.show();
  };

  var resetTimer = function () {
    this.pauseTimer();
    this.remainingTime = this.endCount;
    //this.setTimeLength($("totalTime").value());
    displayTime(this);
    $("#PageContainer").removeClass().addClass("KeepTalking"); 
  };

  var clearTimerHooks = function(thisTimer) {
    window.clearInterval(thisTimer.secondsInterval);
    window.clearTimeout(thisTimer.warningTimeout);
    window.clearTimeout(thisTimer.endTimeout);
    window.clearTimeout(thisTimer.minuteTimeout);
    window.clearInterval(thisTimer.warningInterval);
  }

  var pad = function (number, length) {
    var str = number.toString();
    while (str.length < length) {str = '0' + str; }
    return str;
  };

  return {
    startTimer: startTimer,
    pauseTimer: pauseTimer,
    resetTimer: resetTimer,
    setTimeLength: setTimeLength
  };
}(jQuery);


var sizeTime = function() {
  var foo = $(window).width();
  $("#countdownDisplay").css('font-size', foo/2);
}
$(document).ready(sizeTime);

$(window).resize(sizeTime);

$("#buttonHoverOverlay").hover(
  function () {
    $("#controls").hide();
  }, 
  function () {
    $("#controls").show();
  }
);
