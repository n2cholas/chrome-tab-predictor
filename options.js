var StorageArea = chrome.storage.local;

function blockSites() { //adds list of blocked sites to storage area
    alert("Block Sites activated")
    var text = document.getElementById('myTextArea').value;
    StorageArea.set({'blockedSites': text});
}

function retrain() { //sets the previous retrain date early enough that extension retrains
    alert("Retrain will commence when you close this tab.");
    StorageArea.get('retrainTime', function(retrainTime ) {
	    StorageArea.set({ 'date': Date.now()-retrainTime-1 }, function () {});
    });
}

StorageArea.get('blockedSites', function(blockedSites){
    if (blockedSites == null || blockedSites == "[object Object]") {
        alert("test")
        StorageArea.set({ 'blockedSites': "" }, function () {
        });
    } else {
        alert(blockedSites);
        document.getElementById("myTextArea").value = blockedSites;
    }
});

document.getElementById("blockSitesBtn").addEventListener("click", blockSites);
document.getElementById("retrainBtn").addEventListener("click", retrain);