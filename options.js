var retrainTime = 6.048e+8; //num of milliseconds in a week

function blockSites() { //adds list of blocked sites to storage area
    var text = document.getElementById('myTextArea').value;
	chrome.runtime.sendMessage({origin:'blockSites',sites:text}, function(response) {});
}

function retrain() { //sets the previous retrain date early enough that extension retrains
    console.log("Retrain will commence when you close this tab.");
	chrome.runtime.sendMessage({origin:'retrain',date:Date.now()-retrainTime-1}, function(response) {});
}

function load() { //set options text area to the list of blocked sites
	chrome.runtime.sendMessage({origin:'load'}, function(response) {
		console.log(response.blockedSites);
		document.getElementById("myTextArea").value = response.blockedSites;
	});
	document.getElementById("blockSitesBtn").addEventListener("click", blockSites);
	document.getElementById("retrainBtn").addEventListener("click", retrain);
}

window.onload = load;