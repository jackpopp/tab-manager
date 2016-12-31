export const getAllWindows = async (browser) => {
  return await new Promise((resolve) => {
    browser.windows.getAll({ populate: true, windowTypes: ['normal'] }, (windows) => {
      resolve(windows);
    });
  });
}

export const getWindow = async (windowId, browser) => {
  return await new Promise((resolve) => {
    browser.windows.get(windowId, { populate: true, windowTypes: ['normal'] }, (windows) => {
      resolve(windows);
    });
  });
}

export const getTab = async (tabId, browser) => {
  return await new Promise((resolve) => {
    browser.tabs.get(tabId, (windows) => {
      resolve(windows);
    });
  });
}
