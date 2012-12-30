//jasmine jasmine.getFixtures().fixturesPath = '/spec/HtmlFixture.html';

describe("Timer that is not started", function() {
  var timer;

  beforeEach(function() {
    timer = new Timer(5);
	loadFixtures('HtmlFixture.html');
  });
  
  it("should have the full remaining time", function() {
    expect(timer.remainingTime).toEqual(timer.endCount);
  });  
  
  it("should display blank time", function() {
    expect($('#countdownDisplay')).toHaveText('')
  }); 
  
      it("should have KeepTalking", function() {
    expect($("#PageContainer")).toHaveClass('KeepTalking');
  });
});

describe("Timer that is a half second", function() {
  var timer;
  beforeEach(function() {
    loadFixtures('HtmlFixture.html');
    jasmine.Clock.useMock();
    jasmine.Clock.reset();
    timer = new Timer(5);
	timer.startTimer();
	jasmine.Clock.tick(500);
  });
  
  it("should have the full time left", function() {
    expect(timer.remainingTime).toBe(timer.endCount);
  });
  
    it("should display full time", function() {
    expect($("#countdownDisplay")).toHaveText('5:00')
  });
  
    it("should have KeepTalking", function() {
    expect($("#PageContainer")).toHaveClass('KeepTalking');
  });
  
});

describe("Timer that is started one second", function() {
  var timer;
  beforeEach(function() {
    loadFixtures('HtmlFixture.html');
    timer = new Timer(5);
	jasmine.Clock.useMock();
        jasmine.Clock.reset();
	timer.startTimer();
	jasmine.Clock.tick(1200);
  });
  
  it("should have one second take off", function() {
    expect(timer.remainingTime).toBe(timer.endCount - timer.second);
  });
  
    it("should display time minus one second", function() {
    expect($("#countdownDisplay")).toHaveText('4:59')
  });
  
});

describe("Timer that is 3:59", function() {
  var timer;
  beforeEach(function() {
    loadFixtures('HtmlFixture.html');
    timer = new Timer(5);
	jasmine.Clock.useMock();
        jasmine.Clock.reset();
	timer.startTimer();
	jasmine.Clock.tick(timer.minute*4-timer.second);
  });
  
  it("should display 1:01", function() {
    expect($("#countdownDisplay")).toHaveText('1:01');
  });
  
  it("should have KeepTalking", function() {
    expect($("#PageContainer")).toHaveClass('KeepTalking');
  });
  
});


describe("Timer that is 4:00", function() {
  var timer;
  beforeEach(function() {
    loadFixtures('HtmlFixture.html');
    timer = new Timer(5);
	jasmine.Clock.useMock();
        jasmine.Clock.reset();
	timer.startTimer();
	jasmine.Clock.tick(timer.minute*4);
  });
  
  it("should display 1:00", function() {
    expect($("#countdownDisplay")).toHaveText('1:00');
  });
  
  it("should not have KeepTalking", function() {
    expect($("#PageContainer")).not.toHaveClass('KeepTalking');
  });
  
  it("should have OneMinuteLeft", function() {
    expect($("#PageContainer")).toHaveClass('OneMinuteLeft');
  });
  
});

describe("Timer that is 0:11", function() {
  var timer;
  beforeEach(function() {
    loadFixtures('HtmlFixture.html');
    timer = new Timer(5);
	jasmine.Clock.useMock();
        jasmine.Clock.reset();
	timer.startTimer();
	jasmine.Clock.tick(timer.minute*4+timer.second*50-timer.second);
  });
  
  it("should display 0:11", function() {
    expect($("#countdownDisplay")).toHaveText('0:11');
  });
  
  it("should not have KeepTalking", function() {
    expect($("#PageContainer")).not.toHaveClass('KeepTalking');
  });
  
  it("should have OneMinuteLeft", function() {
    expect($("#PageContainer")).toHaveClass('OneMinuteLeft');
  });
  
    it("should not have Warning", function() {
    expect($("#PageContainer")).not.toHaveClass('Warning');
  });
 });
 
describe("Timer that is 0:10", function() {
  var timer;
  beforeEach(function() {
    loadFixtures('HtmlFixture.html');
    timer = new Timer(5);
	jasmine.Clock.useMock();
        jasmine.Clock.reset();
	timer.startTimer();
	jasmine.Clock.tick(timer.minute*4+timer.second*50+300);
  });
  
  it("should display 0:10", function() {
    expect($("#countdownDisplay")).toHaveText('0:10');
  });
  
  it("should not have KeepTalking", function() {
    expect($("#PageContainer")).not.toHaveClass('KeepTalking');
  });
  
  it("should have OneMinuteLeft", function() {
    expect($("#PageContainer")).toHaveClass('OneMinuteLeft');
  });
  
    it("should have Warning", function() {
    expect($("#countdownDisplay")).toHaveClass('Warning');
  });
});

describe("Timer that is 0:01", function() {
  var timer;
  beforeEach(function() {
    loadFixtures('HtmlFixture.html');
    timer = new Timer(5);
	jasmine.Clock.useMock();
        jasmine.Clock.reset();
	timer.startTimer();
	jasmine.Clock.tick(timer.minute*5-timer.second);
  });
  
  it("should display 0:01", function() {
    expect($("#countdownDisplay")).toHaveText('0:01');
  });
  
  it("should not have KeepTalking", function() {
    expect($("#PageContainer")).not.toHaveClass('KeepTalking');
  });
  
  it("should have OneMinuteLeft", function() {
    expect($("#PageContainer")).toHaveClass('OneMinuteLeft');
  });
  
    it("should have Warning", function() {
    expect($("#countdownDisplay")).toHaveClass('Warning');
  });
});

describe("Timer that is 0:00", function() {
  var timer;
  beforeEach(function() {
    loadFixtures('HtmlFixture.html');
    timer = new Timer(5);
	jasmine.Clock.useMock();
        jasmine.Clock.reset();
	timer.startTimer();
	jasmine.Clock.tick(timer.minute*5);
  });
  
  it("should display 0:00", function() {
    expect($("#countdownDisplay")).toHaveText('0:00');
  });
  
  it("should not have KeepTalking", function() {
    expect($("#PageContainer")).not.toHaveClass('KeepTalking');
  });
  
  it("should have TimeOut", function() {
    expect($("#PageContainer")).toHaveClass('TimeOut');
  });
  
    it("should not have Warning", function() {
    expect($("#countdownDisplay")).not.toHaveClass('Warning');
  });
});

describe("Timer that is -0:01", function() {
  var timer;
  beforeEach(function() {
    loadFixtures('HtmlFixture.html');
    timer = new Timer(5);
	jasmine.Clock.useMock();
        jasmine.Clock.reset();
	timer.startTimer();
	jasmine.Clock.tick(timer.minute*5 + timer.second);
  });
  
  it("should display -0:01", function() {
    expect($("#countdownDisplay")).toHaveText('-0:01');
  });
  
  it("should not have KeepTalking", function() {
    expect($("#PageContainer")).not.toHaveClass('KeepTalking');
  });
  
  it("should have TimeOut", function() {
    expect($("#PageContainer")).toHaveClass('TimeOut');
  });
  
    it("should not have Warning", function() {
    expect($("#countdownDisplay")).not.toHaveClass('Warning');
  });
});

describe("Timer that is -1:00", function() {
  var timer;
  beforeEach(function() {
    loadFixtures('HtmlFixture.html');
    timer = new Timer(5);
	jasmine.Clock.useMock();
        jasmine.Clock.reset();
	timer.startTimer();
	jasmine.Clock.tick(timer.minute*5 + timer.minute);
  });
  
  
  it("should display -1:00", function() {
    expect($("#countdownDisplay")).toHaveText('-1:00');
  });
  
  it("should not have KeepTalking", function() {
    expect($("#PageContainer")).not.toHaveClass('KeepTalking');
  });
  
  it("should have TimeOut", function() {
    expect($("#PageContainer")).toHaveClass('TimeOut');
  });
  
    it("should not have Warning", function() {
    expect($("#countdownDisplay")).not.toHaveClass('Warning');
  });
});
