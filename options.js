var StorageArea = chrome.storage.local;

function blockSites() { //adds list of blocked sites to storage area
    var text = document.getElementById('myTextArea').value; 
    StorageArea.set({'blockedSites': text});
}

function setBlockedSitesArea() { //returns list of blocked sites
    StorageArea.get('blockedSites', function(blockedSites){
        document.getElementById("myTextarea").value = blockedSites;
    })
}

function retrain() { //sets the previous retrain date early enough that extension retrains
    StorageArea.get('retrainTime', function(retrainTime ) {
	    StorageArea.set({ 'time': Date.now()-retrainTime-1 }, function () {});
    });
}