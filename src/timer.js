function Timer(totalMinutes) {
  this.second = 1000;
  this.minute = (this.second * 60);

  this.totalMinutes = totalMinutes;
  this.warningTime = (arguments[1] !== undefined) ? (arguments[1] * this.minute) : (this.minute);
  this.finalWarning = (arguments[2] !== undefined) ? (arguments[2] * this.second) : (this.second * 10);

  this.endCount = this.minute * this.totalMinutes;
  this.remainingTime = this.endCount;
  this.warningInterval;
  this.secondsInterval;
  this.warningTimeout;
  this.endTimeout;
  this.minuteTimeout;
}

Timer.prototype.displayTime = function () {
  var timesUp, minutesLeft, msLeft, secondsLeft;
  timesUp = false;
  if (this.remainingTime < 0) { timesUp = true; }
  minutesLeft = Math.floor(Math.abs(this.remainingTime) / this.minute);
  msLeft = Math.abs(this.remainingTime) - (minutesLeft * this.minute);
  secondsLeft = Math.floor(msLeft / this.second);
  if (timesUp) {
    minutesLeft = "-" + minutesLeft;
  }
  $("#countdownDisplay").text(minutesLeft + ":" + this.pad(secondsLeft, 2));
};

Timer.prototype.startTimer = function () {
  var thisTimer = this;
  this.clearTimerHooks();
  this.secondsInterval = window.setInterval(function () { thisTimer.tick(); }, this.second);
  this.warningTimeout =  window.setTimeout(function () {  thisTimer.setWarning(); }, this.remainingTime - this.finalWarning );
  this.endTimeout = window.setTimeout(function () { thisTimer.setEndOfTime(); }, this.remainingTime );
  this.minuteTimeout =  window.setTimeout(function () { thisTimer.setMinuteWarning(); }, this.remainingTime - this.warningTime );
  this.displayTime();
  };

  Timer.prototype.setMinuteWarning = function () {
	$("#PageContainer").removeClass("KeepTalking").addClass("OneMinuteLeft"); 
  }
  

Timer.prototype.tick = function () {
  this.remainingTime = this.remainingTime - this.second;
  this.displayTime();
};

Timer.prototype.setWarning = function () {
  var countdown = $("#countdownDisplay");
  countdown.addClass("Warning");
  this.warningInterval = window.setInterval(function () {countdown.toggle(); }, 250);
};

Timer.prototype.setEndOfTime = function () {
  $("#PageContainer").removeClass("OneMinuteLeft").addClass("TimeOut");
  window.clearInterval(this.warningInterval);
  $("#countdownDisplay").removeClass("Warning").show();
};

Timer.prototype.pauseTimer = function () {
  var thisTimer = this;
  thisTimer.clearTimerHooks();
  var countdown = $("#countdownDisplay");
  countdown.show();
};

Timer.prototype.clearTimerHooks = function() {
  window.clearInterval(this.secondsInterval);
  window.clearTimeout(this.warningTimeout);
  window.clearTimeout(this.endTimeout);
  window.clearTimeout(this.minuteTimeout);
  window.clearInterval(this.warningInterval);
}

Timer.prototype.pad = function (number, length) {
  var str = number.toString();
  while (str.length < length) {str = '0' + str; }
  return str;
};


