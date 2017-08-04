//--------------------------------------Neural Network Stuff
var input = new synaptic.Layer(24+7); // the 24 inputs for hour, 7 inputs for day
var hidden = new synaptic.Layer(30); // hidden layer with 3 elements
var output = new synaptic.Layer(20); // twenty outputs i.e. twenty sites to choose from

var retrainTime = 7*2400*1000; //num of milliseconds in a week
var historyTime = 30*2400*1000; //num of milliseconds in a month
var maxUrlNumber = 25; //most possible urls to open

//
var siteList = ['']; //array of top website names

var contains = function(needle) { //ripped off stackoverflow
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1;
			var index = -1;

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
						chrome.storage.sync.get('count', function(count) {
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
	chrome.storage.sync.get('count', function(count) {
		for (var i = 0; i<count; i++) {
			chrome.storage.sync.get(i + '.url', function (url) {
				if (url in list)
					list[url] = list[url]+1;
				else
					list[url] = 0;
			});
		}
	});
	//still don't know how to do things at the end of async functions
	keysSorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]}).slice(maxUrlNumber); //array of urls
	chrome.storage.sync.get('count', function(count) { //extremely inefficient probably
		for (var i = 0; i<count; i++) {
			chrome.storage.sync.get(i + '.url', function (url) {
				if (contains.call(keysSorted,url)) {
					//get date, time etc for training
				}
			});
		}
	});
	//do some training

	input.project(hidden); //fully connects input to hidden layer
	hidden.project(output); //full connects hidden layer to output

	//we need some training data in this format: 
	/*
		var trainingData = [
    		{input: [1, 0], output: [1, 0, 0]}, // Clap -> Sit
    		{input: [0, 1], output: [0, 1, 0]}, // Whistle -> Run
    		{input: [1, 1], output: [0, 0, 1]}, // Clap+Whistle -> Jump
		];
		So in this example, there are 2 inputs and 3 outputs (ours has (24+7) inputs and 20 outputs atm)
	*/

	//snippet of code that writes thetas
	var thetas = [0,0,0];
	chrome.storage.sync.set({'thetas': thetas}, function() {
	});
	//set date
	chrome.storage.sync.set({'time': Date.now()}, function() {
	});
}

function retrain(trainingData) {
	//idk how this is going to work
	var learningRate = 0.4;
 
	for(var i = 0; i < trainingData.length; i++) {
		input.activate(trainingData[i]["input"]);
		output.activate();
		output.propagate(learningRate, trainingData[i]["output"]);
	}
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

	//Code below uses current day and time to get an output from neural network
	//I can condense the below code but for now leave it verbose just in case
	var curTime = new Date(); //stores current datetime
	var curHour = curTime.getHours(); //current hour (0 to 23)
	var curDay = curTime.getDay(); //current day of week (0 to 6)

	var inputArray = new Array(24+7).fill(0); //input data placeholder
	inputArray[curHour] = 1; //fill in hour of day into input array
	inputArray[curDay + 24] = 1; //fill in day of week
	input.activate(inputArray); //inputs data into neural network
	var result = output.activate(); //gets the output of the neural network (probabilities)

	//need to get current tabs, and choose output so there are no duplicate tabs

	gotoLink(siteList[result]);
}

function gotoLink(link) {
	//get top link
	//var link = "https://www.facebook.com/";
	chrome.tabs.update({ url: link }); 
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
	  gotoLink(); // @Lawrence Not sure if this is right, but I replaced the gotoLink with openTabs // i intended opentabs to be for multiple tabs on startup sorry the naming is confusing
  });