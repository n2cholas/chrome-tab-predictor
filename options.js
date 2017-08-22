function blockSites() { //adds list of blocked sites to storage area
	var StorageArea = chrome.storage.local;
    console.log("Block Sites activated")
    var text = document.getElementById('myTextArea').value;
    StorageArea.set({'blockedSites': text});
}

function retrain() { //sets the previous retrain date early enough that extension retrains
	var StorageArea = chrome.storage.local;
    console.log("Retrain will commence when you close this tab.");
    StorageArea.get('retrainTime', function(retrainTime ) {
	    StorageArea.set({ 'date': Date.now()-retrainTime-1 }, function () {});
    });
}

function load() {
	var StorageArea = chrome.storage.local;
	console.log("test")
	StorageArea.get('blockedSites', function(blockedSites){
		if (blockedSites == null || blockedSites == "[object Object]") {
			StorageArea.set({ 'blockedSites': "" }, function () {
			});
		} else {
			alert(blockedSites);
			document.getElementById("myTextArea").value = blockedSites;
		}
	});
	document.getElementById("blockSitesBtn").addEventListener("click", blockSites);
	document.getElementById("retrainBtn").addEventListener("click", retrain);
}

window.onload = load;