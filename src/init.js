chrome.tabs.query({}, (chromeTabs) => {
	const openTab = chromeTabs.find((tab) => { return tab.title === 'Chrome Tab Manager' });

	if (openTab) {
		chrome.tabs.update(openTab.id, { active: true });
		chrome.windows.update(openTab.windowId,{ focused: true });
	} else {
		chrome.tabs.create({ url:'lib/index.html' });
	}
});
