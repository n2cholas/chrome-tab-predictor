var retrainTime = 7*2400*1000; //num of milliseconds in a week
var historyTime = 30*2400*1000; //num of milliseconds in a month
var maxUrlNumber = 25; //most possible urls to open

var contains = function(needle) { //ripped off stackoverflow
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

function trainOnInstall () {
	/*
	chrome.storage.sync.set({'count': 0}, function() {
		chrome.history.search({text: '', startTime: Date.now()-historyTime }, function(data) { //starttime should be "milliseconds since the epoch whatever that means
			data.forEach(function(page) {
				chrome.history.getVisits({url: page.url}, function(visits) {
					data.forEach(function(visit) {
						//create training data idk
						chrome.storage.sync.get({'count'}, function(count) {
							chrome.storage.sync.set({count + '.id': count, count + '.url': page.url, count+'.time': page.visitTime}, function() {
								chrome.storage.sync.get({'count'}, function(count) {
									chrome.storage.sync.set({'count': count + 1}, function(count) {});
								});
							});
						});
					});
				});
			});
		});
	});
	*/
	//not sure where to start training, since all these are asynchronous
	//read in all data and sort/parse urls
	var list = {};
	chrome.storage.sync.get({'count'}, function(count) {
		for (int i = 0; i<count; i++) {
			chrome.storage.sync.get({i + '.url'}, function (url) {
				if (url in list)
					list[url] = list[url]+1;
				else
					list[url] = 0;
			});
		}
	});
	//still don't know how to do things at the end of async functions
	keysSorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]}).slice(maxUrlNumber); //array of urls
	chrome.storage.sync.get({'count'}, function(count) { //extremely inefficient probably
		for (int i = 0; i<count; i++) {
			chrome.storage.sync.get({i + '.url'}, function (url) {
				if (contains.call(keysSorted,url)) {
					//get date, time etc for training
				}
			});
		}
	});
	//do some training
	//snippet of code that writes thetas
	var thetas = [0,0,0];
	chrome.storage.sync.set({'thetas': thetas}, function() {
	});
	//set date
	chrome.storage.sync.set({'time': Date.now()}, function() {
	});
}

function retrain() {
	//idk how this is going to work
}

function timeElapsed() {
	/*
	return chrome.storage.sync.get({'date'}, function (date) {
		return Date.now()-date;
	});
	*/
}

function openTabs() {
	//get number of links
	/*
	var num = 3;
	for (var i = 0; i<num; i++) {
		chrome.tabs.create(()); //nothing else needed because gotoLink will handle opening sites
	}
	*/
	gotoLink();
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