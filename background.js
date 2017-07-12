var retrainTime = 7;

function trainOnInstall () {
	chrome.history.search({text: '', startTime: 0 }, function(data) { //starttime should be "milliseconds since the epoch whatever that means
		data.forEach(function(page) {
			chrome.history.getVisits({url: 'page.url'}, function(visits) {
				data.forEach(function(visit) {
					//create training data idk
				});
			});
		});
	});
	//not sure where to start training, since all these are asynchronous
}

function retrain() {
	//idk how this is going to work
}

function timeElapsed() {
	//read from text file and determine time difference
}

function openTabs() {
	//get number of links
	var num = 3;
	for (var i = 0; i<num; i++) {
		chrome.tabs.create(()); //nothing else needed because gotoLink will handle opening sites
	}
}

function gotoLink() {
	//get top link
	var link = "https://www.facebook.com/";
	chrome.tabs.update({ url: link }); //find a way to highlight bar
}

chrome.runtime.onInstalled.addListener(
  function(details) {
	  trainOnInstall();
  });
  
chrome.runtime.onStartup.addListener(
  function() {
	  openTabs();
	  if (timeElapsed()>retrainTime) {
		  retrain();
	  }
  });
 
chrome.tabs.onCreated.addListener(
  function() {
	  gotoLink();
  });