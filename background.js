var retrainTime = 7;

function trainOnInstall () {
	chrome.history.search({text: '', startTime: 0 }, function(data) { //starttime should be "milliseconds since the epoch whatever that means
		data.forEach(function(page) {
			//create training data idk
		});
		//train
	});
}

function retrain() {
	//idk how this is going to work
}

function timeElapsed() {
	//read from text file and determine time difference
}

function openTabs() {
	//get top links
	var links = ["https://www.facebook.com/", "https://www.reddit.com/"
	links.forEach(function(link) {
		properties = {
			string: link
		}
		chrome.tabs.create(properties); //find a way to highlight bar
	});
}

function gotoLink() {
	//get top link
	var link = "https://www.facebook.com/";
	properties = {
		string: link
	}
	chrome.tabs.create(properties); //find a way to highlight bar
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