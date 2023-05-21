console.log(`PA@D extension loaded.`)

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(`New tab detected.`);
    function verifyLink() {
        const links = document.querySelectorAll('a');
        links.forEach((link) => {
            if (   link.href.includes('@') === true
                && (link.textContent.includes('.zip') === true || link.textContent.includes('.mov') === true)
                && link.textContent.includes("Link potentially dangerous -") === false) {
                link.textContent = `Link potentially dangerous - ${link.textContent}`;
                link.style.color = `red`;
            }
        });
    }

    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: verifyLink,
    }).then(() => console.log('Verified links in page.'));
});