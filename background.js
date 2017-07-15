var retrainTime = 7*2400*1000; //num of milliseconds in a week

function trainOnInstall () {
	chrome.storage.sync.set({'count': 0}, function() {
		chrome.history.search({text: '', startTime: 0 }, function(data) { //starttime should be "milliseconds since the epoch whatever that means
			data.forEach(function(page) {
				chrome.history.getVisits({url: page.url}, function(visits) {
					data.forEach(function(visit) {
						//create training data idk
						chrome.storage.sync.get({'count'}, function(count) {
							chrome.storage.sync.set({'id': count, count+'.url': page.url, count+'.time': page.visitTime}, function() {
							});
						});
					});
				});
			});
		});
	});
	//not sure where to start training, since all these are asynchronous
	//do some training
	//snippet of code that writes thetas
	var thetas = [0,0,0];
	chrome.storage.sync.set({'thetas': thetas}, function() {
	});
	//set date
	var today = new Date();
	var dateString = today.getFullYear()+'/'+today.getMonth()+'/'+today.getDate();
	chrome.storage.sync.set({'date': dateString}, function() {
	});
}

function retrain() {
	//idk how this is going to work
}

function timeElapsed() {
	return chrome.storage.sync.get({'date'}, function (date) {
		var parseDate = date.split('/');
		var lastDate = new Date(number(parseDate[0]),number(parseDate[1]),number(parseDate[2]));
		var today = new Date();
		return lastDate.getTime()-today.getTime();
	});
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