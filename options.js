var retrainTime = 6.048e+8; //num of milliseconds in a week

function blockSites() { //adds list of blocked sites to storage area
	//var StorageArea = chrome.storage.local;
    var text = document.getElementById('myTextArea').value;
	console.log(text);
	chrome.runtime.sendMessage({origin:'blockSites',sites:text}, function(response) {});
    //StorageArea.set({'blockedSites': text});
}

function retrain() { //sets the previous retrain date early enough that extension retrains
	//var StorageArea = chrome.storage.local;
    console.log("Retrain will commence when you close this tab.");
	chrome.runtime.sendMessage({origin:'retrain',date:Date.now()-retrainTime-1}, function(response) {});
	/*
    StorageArea.get('retrainTime', function(retrainTime ) {
	    StorageArea.set({ 'date': Date.now()-retrainTime-1 }, function () {});
    });
	*/
}

function load() {
		/*
	var StorageArea = chrome.storage.local;
	StorageArea.get('blockedSites', function(blockedSites){
		if (blockedSites == null || blockedSites == "[object Object]") {
			StorageArea.set({ 'blockedSites': "" }, function () {
			});
		} else {
			alert(blockedSites);
			console.log(blockedSites);
			document.getElementById("myTextArea").value = blockedSites;
		}
	});
	*/
	chrome.runtime.sendMessage({origin:'load'}, function(response) {
		console.log(response.blockedSites);
		document.getElementById("myTextArea").value = response.blockedSites;
	});
	document.getElementById("blockSitesBtn").addEventListener("click", blockSites);
	document.getElementById("retrainBtn").addEventListener("click", retrain);
}

window.onload = load;