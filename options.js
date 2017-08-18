function blockSites() {
    var text = document.getElementById('myTextArea').value; 
    console.log('test');
    console.log(text);
}

function retrain() { //sets the previous retrain date early enough that extension retrains
    StorageArea.get('retrainTime', function(retrainTime ) {
	    StorageArea.set({ 'time': Date.now()-retrainTime-1 }, function () {});
    });
}