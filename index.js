var crux = document.getElementById('crux');
crux.value = chrome.extension.getBackgroundPage().document.getElementById('crux').value;

document.getElementById("download-button").addEventListener("click", function () {
    chrome.downloads.setShelfEnabled(false);
    var blob = new Blob([crux.value], { type: "application/pdf" });
    var url = URL.createObjectURL(blob);
    chrome.downloads.download({
        url: url,
        filename: 'notes',
        conflictAction: "uniquify"
    });
});



// either download was successful or was interrupted
chrome.downloads.onChanged.addListener(function (downloadDelta) {
    // enables the download shelf for future downloads
    chrome.downloads.setShelfEnabled(true);

    // download has completed successfully
    if (downloadDelta.state.current == "complete") {
        // clear the crux value stored in the background page
        chrome.extension.getBackgroundPage().document.getElementById('crux').value = '';

        // clears the crux and shuts the popup window
        crux.value = '';
        win.close();
    }
});

// crux change event sends a message to background script to record manual changes to crux by the user
crux.addEventListener('change', function () {
    chrome.extension.sendMessage({ event: "cruxChange", data: crux.value });
});
