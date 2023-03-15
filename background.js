chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        var crux = document.getElementById('crux');

        // handles copy event from content script
        if (request.event == "copy") {
            var clipboardAccessor = document.getElementById('clip');

            // FEATURE: keeping record of previous paste to prevent accidentally copying the same piece of text twice
            var previousPaste = clipboardAccessor.value;
            clipboardAccessor.value = "";

            // records clipboard contents inside clipboardAccessor by placing focus on it, and then executing the paste command
            clipboardAccessor.focus();
            document.execCommand('paste');
            var copiedText = clipboardAccessor.value;

            // currently copied text is same as previously copied text, return
            if (copiedText.localeCompare(previousPaste) == 0) {
                return true;
            }

            // update the crux
            crux.value += (copiedText + "\n");
        }

        sendResponse({});
    }
);

