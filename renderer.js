/* NOVEX_SAFE_DOM_PATCH */
window.addEventListener('error', e => console.error('Novex UI error:', e.message));
const urlInput = document.getElementById("urlInput");
const homeSearchInput = document.getElementById("homeSearchInput");

const startPage = document.getElementById("startPage");
const favoritesPanel = document.getElementById("favoritesPanel");
const historyPanel = document.getElementById("historyPanel");
const downloadsPanel = document.getElementById("downloadsPanel");
const gamesPanel = document.getElementById("gamesPanel");
const securityPanel = document.getElementById("securityPanel");
const settingsPanel = document.getElementById("settingsPanel");
const profilePanel = document.getElementById("profilePanel");
const importPanel = document.getElementById("importPanel");
const cookiesPanel = document.getElementById("cookiesPanel");
const menuHubPanel = document.getElementById("menuHubPanel");
const gxControlPanel = document.getElementById("gxControlPanel");
const extremePerformancePanel = document.getElementById("extremePerformancePanel");
const moreMenu = document.getElementById("moreMenu");
const webviewsContainer = document.getElementById("webviewsContainer");

const favoritesList = document.getElementById("favoritesList");
const historyList = document.getElementById("historyList");

const tabbar = document.getElementById("tabbar");
const newTabBtn = document.getElementById("newTabBtn");

const backBtn = document.getElementById("back");
const forwardBtn = document.getElementById("forward");
const reloadBtn = document.getElementById("reload");
const homeBtn = document.getElementById("home");
const goBtn = document.getElementById("go");
const favoriteBtn = document.getElementById("favoriteBtn");

const homeSideBtn = document.getElementById("homeSideBtn");
const favoritesSideBtn = document.getElementById("favoritesSideBtn");
const historySideBtn = document.getElementById("historySideBtn");
const downloadsSideBtn = document.getElementById("downloadsSideBtn");
const whatsappSideBtn = document.getElementById("whatsappSideBtn");
const spotifySideBtn = document.getElementById("spotifySideBtn");
const robloxSideBtn = document.getElementById("robloxSideBtn");
const gamesSideBtn = document.getElementById("gamesSideBtn");
const securitySideBtn = document.getElementById("securitySideBtn");
const settingsSideBtn = document.getElementById("settingsSideBtn");
const profileSideBtn = document.getElementById("profileSideBtn");
const gxControlSideBtn = document.getElementById("gxControlSideBtn");
const extremePerfSideBtn = document.getElementById("extremePerfSideBtn");

const minimizeBtn = document.getElementById("minimizeBtn");
const maximizeBtn = document.getElementById("maximizeBtn");
const closeBtn = document.getElementById("closeBtn");

const menuBtn = document.getElementById("menuBtn");
const menuNewTab = document.getElementById("menuNewTab");
const menuImport = document.getElementById("menuImport");
const menuCookies = document.getElementById("menuCookies");
const menuFavorites = document.getElementById("menuFavorites");
const menuHistory = document.getElementById("menuHistory");
const menuSettings = document.getElementById("menuSettings");
const menuToggleStatusbar = document.getElementById("menuToggleStatusbar");
const menuToggleRamSaver = document.getElementById("menuToggleRamSaver");

const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const clearFavoritesBtn = document.getElementById("clearFavoritesBtn");
const openImportBtnSettings = document.getElementById("openImportBtnSettings");
const openCookiesBtnSettings = document.getElementById("openCookiesBtnSettings");
const settingsMessage = document.getElementById("settingsMessage");
const toggleStatusbarBtn = document.getElementById("toggleStatusbarBtn");
const toggleRamSaverBtn = document.getElementById("toggleRamSaverBtn");

const statusbar = document.getElementById("statusbar");
const hideStatusbarQuick = document.getElementById("hideStatusbarQuick");
const cpuStatus = document.getElementById("cpuStatus");
const ramStatus = document.getElementById("ramStatus");
const appRamStatus = document.getElementById("appRamStatus");
const timeStatus = document.getElementById("timeStatus");
const ramSaverStatus = document.getElementById("ramSaverStatus");

const browserImportSelect = document.getElementById("browserImportSelect");
const importBrowserBtn = document.getElementById("importBrowserBtn");
const importResult = document.getElementById("importResult");

const cookieTotal = document.getElementById("cookieTotal");
const cookieDomains = document.getElementById("cookieDomains");
const refreshCookiesBtn = document.getElementById("refreshCookiesBtn");
const clearCookiesBtn = document.getElementById("clearCookiesBtn");
const clearSiteDataBtn = document.getElementById("clearSiteDataBtn");
const cookiesMessage = document.getElementById("cookiesMessage");

const quickCards = document.querySelectorAll(".quick-card");
const sideButtons = document.querySelectorAll(".side-btn");
const homeCpuStatus = document.getElementById("homeCpuStatus");
const homeRamStatus = document.getElementById("homeRamStatus");
const homeAppRamStatus = document.getElementById("homeAppRamStatus");
const homeGpuStatus = document.getElementById("homeGpuStatus");
const homeTimeStatus = document.getElementById("homeTimeStatus");
const dashboardGxBtn = document.getElementById("dashboardGxBtn");
const homeToggleRamSaverBtn = document.getElementById("homeToggleRamSaverBtn");
const homeToggleBatterySaverBtn = document.getElementById("homeToggleBatterySaverBtn");
const homeToggleStatusbarBtn = document.getElementById("homeToggleStatusbarBtn");
const homeOpenAppsBtn = document.getElementById("homeOpenAppsBtn");

const startUrl = "https://www.google.com";
const logoPath = "assets/novex-logo.png";

let favorites = JSON.parse(localStorage.getItem("novexFavorites")) || [];
let history = JSON.parse(localStorage.getItem("novexHistory")) || [];

let statusbarHidden = localStorage.getItem("novexStatusbarHidden") === "true";
let ramSaverEnabled = localStorage.getItem("novexRamSaver") === "true";
let restoreEnabled = localStorage.getItem("novexRestoreSession") !== "false";

let tabs = [];
let activeTabId = null;
let tabCounter = 1;
let isRestoring = false;

function formatUrl(input) {
  const text = input.trim();

  if (!text) return startUrl;

  if (text.startsWith("http://") || text.startsWith("https://")) return text;

  if (text.includes(".") && !text.includes(" ")) return "https://" + text;

  return "https://www.google.com/search?q=" + encodeURIComponent(text);
}

function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return "0 MB";

  const gb = bytes / (1024 ** 3);
  if (gb >= 1) return gb.toFixed(1) + " GB";

  const mb = bytes / (1024 ** 2);
  return Math.round(mb) + " MB";
}

function formatUTCMinus4() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const utcMinus4 = new Date(utc - 4 * 60 * 60000);

  let hours = utcMinus4.getHours();
  const minutes = String(utcMinus4.getMinutes()).padStart(2, "0");
  const seconds = String(utcMinus4.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${hours}:${minutes}:${seconds} ${ampm}`;
}

function currentTab() {
  return tabs.find(tab => tab.id === activeTabId);
}

function currentWebview() {
  const tab = currentTab();
  return tab ? tab.webview : null;
}

function hidePanels() {
  [startPage, favoritesPanel, historyPanel, downloadsPanel, gamesPanel, securityPanel, settingsPanel, profilePanel, importPanel, cookiesPanel].forEach(panel => {
    if (panel) panel.classList.add("hidden");
  });

  if (moreMenu) moreMenu.classList.add("hidden");
}

function hideAllWebviews() {
  tabs.forEach(tab => tab.webview.classList.add("webview-hidden"));
}

function setActiveSideButton(activeButton) {
  sideButtons.forEach(btn => btn.classList.remove("active"));
  if (activeButton) activeButton.classList.add("active");
}

function getSessionTabsForSave() {
  return tabs.map(tab => ({
    title: tab.title,
    url: tab.url
  })).filter(tab => tab.url && tab.url !== "about:blank");
}

function saveSession() {
  if (!restoreEnabled || isRestoring) return;

  const sessionData = {
    activeIndex: Math.max(0, tabs.findIndex(tab => tab.id === activeTabId)),
    tabs: getSessionTabsForSave()
  };

  localStorage.setItem("novexLastSession", JSON.stringify(sessionData));
}

function restoreSession() {
  const raw = localStorage.getItem("novexLastSession");

  if (!raw) {
    createTab();
    return;
  }

  try {
    const data = JSON.parse(raw);

    if (!data.tabs || !Array.isArray(data.tabs) || data.tabs.length === 0) {
      createTab();
      return;
    }

    isRestoring = true;

    data.tabs.slice(0, 20).forEach(tab => {
      createTab(tab.url);
      const current = currentTab();
      if (current && tab.title) current.title = tab.title;
    });

    isRestoring = false;

    const index = Math.min(data.activeIndex || 0, tabs.length - 1);
    switchToTab(tabs[index].id);
    renderTabs();
  } catch (error) {
    isRestoring = false;
    createTab();
  }
}

function renderTabs() {
  document.querySelectorAll(".tab").forEach(tab => tab.remove());

  if (tabs.length >= 6) tabbar.classList.add("many-tabs");
  else tabbar.classList.remove("many-tabs");

  tabs.forEach(tab => {
    const tabEl = document.createElement("div");
    tabEl.className = "tab" + (tab.id === activeTabId ? " active-tab" : "") + (tab.unloaded ? " ram-unloaded" : "");
    tabEl.dataset.id = tab.id;

    tabEl.innerHTML = `
      <img src="${logoPath}" alt="N" />
      <span class="tab-title">${tab.title || "Nueva pestaña"}</span>
      <button class="tab-close">×</button>
    `;

    tabEl.addEventListener("click", () => switchToTab(tab.id));

    tabEl.addEventListener("auxclick", (event) => {
      if (event.button === 1) closeTab(tab.id);
    });

    tabEl.querySelector(".tab-close").addEventListener("click", (event) => {
      event.stopPropagation();
      closeTab(tab.id);
    });

    tabbar.insertBefore(tabEl, newTabBtn);
  });

  const activeEl = tabbar.querySelector(".active-tab");
  if (activeEl) {
    activeEl.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }
}

function createTab(url = null) {
  const id = "tab-" + tabCounter++;
  const webview = document.createElement("webview");

  webview.className = "webview-hidden";
  webview.setAttribute("allowpopups", "");
  webview.setAttribute("partition", "persist:novex");
  webview.src = url || startUrl;

  const tab = {
    id,
    title: url ? "Cargando..." : "Nueva pestaña",
    url: url || "",
    unloaded: false,
    webview
  };

  tabs.push(tab);
  webviewsContainer.appendChild(webview);

  setupWebviewEvents(tab);
  switchToTab(id);

  if (!url) showStartPageForTab(id);

  renderTabs();
  saveSession();
}

function openMenuHubTab() {
  const existing = tabs.find(tab => tab.url === "novex://todo");
  if (existing) {
    switchToTab(existing.id);
    return;
  }

  createTab();
  const tab = currentTab();
  if (!tab) return;

  tab.url = "novex://todo";
  tab.title = "Todo";
  hidePanels();
  hideAllWebviews();
  if (menuHubPanel) menuHubPanel.classList.remove("hidden");
  urlInput.value = tab.url;
  renderTabs();
  saveSession();
}

function switchToTab(id) {
  activeTabId = id;
  const tab = currentTab();

  hidePanels();
  hideAllWebviews();

  if (tab && tab.url === "novex://todo") {
    if (menuHubPanel) menuHubPanel.classList.remove("hidden");
    urlInput.value = tab.url;
  } else if (tab && tab.url) {
    if (tab.unloaded) {
      tab.webview.src = tab.url;
      tab.unloaded = false;
    }

    tab.webview.classList.remove("webview-hidden");
    urlInput.value = tab.url;
  } else {
    startPage.classList.remove("hidden");
    urlInput.value = "";
  }

  updateFavoriteIcon(urlInput.value);
  setActiveSideButton(homeSideBtn);
  unloadInactiveTabsIfNeeded();
  renderTabs();
  saveSession();
}

function closeTab(id) {
  const tabIndex = tabs.findIndex(tab => tab.id === id);
  if (tabIndex === -1) return;

  const tab = tabs[tabIndex];
  tab.webview.remove();
  tabs.splice(tabIndex, 1);

  if (tabs.length === 0) {
    createTab();
    return;
  }

  if (activeTabId === id) {
    const nextTab = tabs[tabIndex] || tabs[tabIndex - 1];
    switchToTab(nextTab.id);
  }

  renderTabs();
  saveSession();
}

function showStartPageForTab(id = activeTabId) {
  const tab = tabs.find(t => t.id === id);
  if (!tab) return;

  tab.url = "";
  tab.title = "Nueva pestaña";
  tab.unloaded = false;

  hidePanels();
  hideAllWebviews();

  if (id === activeTabId) {
    startPage.classList.remove("hidden");
    urlInput.value = "";
  }

  setActiveSideButton(homeSideBtn);
  renderTabs();
  saveSession();
}

function showBrowser(url) {
  const tab = currentTab();
  if (!tab) return;

  hidePanels();
  hideAllWebviews();

  tab.url = url;
  tab.unloaded = false;
  tab.title = "Cargando...";
  tab.webview.src = url;
  tab.webview.classList.remove("webview-hidden");

  urlInput.value = url;
  renderTabs();
  saveSession();
}

function navigateFromUrlBar() {
  showBrowser(formatUrl(urlInput.value));
}

function navigateFromHomeSearch() {
  const url = formatUrl(homeSearchInput.value);
  homeSearchInput.value = "";
  showBrowser(url);
}

function addToHistory(url, title = url) {
  if (!url || url.startsWith("file://") || url === "about:blank") return;

  const exists = history.find(item => item.url === url);

  if (!exists) {
    history.unshift({
      title,
      url,
      date: new Date().toLocaleString()
    });
  }

  history = history.slice(0, 80);
  localStorage.setItem("novexHistory", JSON.stringify(history));
  renderHistory();
}

function addFavorite() {
  const url = urlInput.value.trim();
  if (!url) return;

  const tab = currentTab();
  const title = tab?.title || url;
  const exists = favorites.find(item => item.url === url);

  if (!exists) {
    favorites.unshift({ title, url });
    favoriteBtn.textContent = "★";
  } else {
    favorites = favorites.filter(item => item.url !== url);
    favoriteBtn.textContent = "☆";
  }

  localStorage.setItem("novexFavorites", JSON.stringify(favorites));
  renderFavorites();
}

function updateFavoriteIcon(url) {
  const exists = favorites.find(item => item.url === url);
  favoriteBtn.textContent = exists ? "★" : "☆";
}

function renderFavorites() {
  favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    favoritesList.innerHTML = `<div class="empty-box">Todavía no tienes favoritos. Puedes importarlos o tocar la estrella ☆.</div>`;
    return;
  }

  favorites.forEach(item => {
    const div = document.createElement("div");
    div.className = "panel-item";
    div.innerHTML = `
      <div class="panel-item-title">${item.title}</div>
      <div class="panel-item-url">${item.url}</div>
    `;

    div.addEventListener("click", () => showBrowser(item.url));
    favoritesList.appendChild(div);
  });
}

function renderHistory() {
  historyList.innerHTML = "";

  if (history.length === 0) {
    historyList.innerHTML = `<div class="empty-box">Todavía no hay historial.</div>`;
    return;
  }

  history.forEach(item => {
    const div = document.createElement("div");
    div.className = "panel-item";
    div.innerHTML = `
      <div class="panel-item-title">${item.title}</div>
      <div class="panel-item-url">${item.url}</div>
      <div class="panel-item-url">${item.date}</div>
    `;

    div.addEventListener("click", () => showBrowser(item.url));
    historyList.appendChild(div);
  });
}

function showFavoritesPanel() {
  hidePanels();
  hideAllWebviews();
  renderFavorites();
  favoritesPanel.classList.remove("hidden");
  urlInput.value = "";
  setActiveSideButton(favoritesSideBtn);
}

function showHistoryPanel() {
  hidePanels();
  hideAllWebviews();
  renderHistory();
  historyPanel.classList.remove("hidden");
  urlInput.value = "";
  setActiveSideButton(historySideBtn);
}

function showDownloadsPanel() {
  hidePanels();
  hideAllWebviews();
  downloadsPanel.classList.remove("hidden");
  urlInput.value = "";
  setActiveSideButton(downloadsSideBtn);
}

function showGamesPanel() {
  hidePanels();
  hideAllWebviews();
  gamesPanel.classList.remove("hidden");
  urlInput.value = "";
  setActiveSideButton(gamesSideBtn);
}

function showSecurityPanel() {
  hidePanels();
  hideAllWebviews();
  securityPanel.classList.remove("hidden");
  urlInput.value = "";
  setActiveSideButton(securitySideBtn);
}

function showSettingsPanel() {
  hidePanels();
  hideAllWebviews();
  settingsPanel.classList.remove("hidden");
  urlInput.value = "";
  setActiveSideButton(settingsSideBtn);
}

function showProfilePanel() {
  hidePanels();
  hideAllWebviews();
  profilePanel.classList.remove("hidden");
  urlInput.value = "";
  setActiveSideButton(profileSideBtn);
}

function showImportPanel() {
  hidePanels();
  hideAllWebviews();
  importPanel.classList.remove("hidden");
  urlInput.value = "";
  setActiveSideButton(null);

  if (importResult) {
    importResult.innerHTML = "Selecciona un navegador y presiona importar.";
  }
}

async function showCookiesPanel() {
  hidePanels();
  hideAllWebviews();
  cookiesPanel.classList.remove("hidden");
  urlInput.value = "";
  setActiveSideButton(null);
  await updateCookieSummary();
}

function toggleMoreMenu() {
  moreMenu.classList.toggle("hidden");
}

function applyStatusbarPreference() {
  if (statusbarHidden) {
    document.body.classList.add("statusbar-hidden");
    if (statusbar) statusbar.classList.add("statusbar-hidden");
    if (menuToggleStatusbar) menuToggleStatusbar.textContent = "Mostrar barra inferior";
    if (toggleStatusbarBtn) toggleStatusbarBtn.textContent = "Mostrar barra inferior";
  } else {
    document.body.classList.remove("statusbar-hidden");
    if (statusbar) statusbar.classList.remove("statusbar-hidden");
    if (menuToggleStatusbar) menuToggleStatusbar.textContent = "Ocultar barra inferior";
    if (toggleStatusbarBtn) toggleStatusbarBtn.textContent = "Ocultar barra inferior";
  }
}

function toggleStatusbar() {
  statusbarHidden = !statusbarHidden;
  localStorage.setItem("novexStatusbarHidden", String(statusbarHidden));
  applyStatusbarPreference();

  if (settingsMessage) {
    settingsMessage.textContent = statusbarHidden
      ? "✅ Barra inferior oculta."
      : "✅ Barra inferior visible.";
  }
}

function applyRamSaverPreference() {
  if (menuToggleRamSaver) {
    menuToggleRamSaver.textContent = ramSaverEnabled ? "Desactivar ahorro de RAM" : "Activar ahorro de RAM";
  }

  if (toggleRamSaverBtn) {
    toggleRamSaverBtn.textContent = ramSaverEnabled ? "Desactivar ahorro de RAM" : "Activar ahorro de RAM";
  }

  if (ramSaverStatus) {
    ramSaverStatus.textContent = ramSaverEnabled ? "RAM ahorro 💤" : "RAM normal";
  }
}

function toggleRamSaver() {
  ramSaverEnabled = !ramSaverEnabled;
  localStorage.setItem("novexRamSaver", String(ramSaverEnabled));
  applyRamSaverPreference();

  if (ramSaverEnabled) {
    unloadInactiveTabsIfNeeded();
    if (settingsMessage) settingsMessage.textContent = "💤 Ahorro de RAM activado.";
  } else {
    tabs.forEach(tab => {
      tab.unloaded = false;
    });
    if (settingsMessage) settingsMessage.textContent = "✅ Ahorro de RAM desactivado.";
  }

  renderTabs();
}

function unloadInactiveTabsIfNeeded() {
  if (!ramSaverEnabled) return;

  tabs.forEach(tab => {
    if (tab.id === activeTabId) return;
    if (!tab.url) return;
    if (tab.unloaded) return;

    tab.webview.src = "about:blank";
    tab.unloaded = true;
  });

  renderTabs();
}

function mergeImportedFavorites(imported) {
  let count = 0;
  const seen = new Set(favorites.map(item => item.url));

  imported.forEach(item => {
    if (!item || !item.url || seen.has(item.url)) return;

    seen.add(item.url);
    favorites.unshift({
      title: item.title || item.url,
      url: item.url
    });

    count++;
  });

  localStorage.setItem("novexFavorites", JSON.stringify(favorites));
  renderFavorites();
  return count;
}

async function importFromSelectedBrowser() {
  const browserKey = browserImportSelect.value;
  const browserName = browserImportSelect.options[browserImportSelect.selectedIndex].textContent;

  importResult.innerHTML = `Buscando favoritos en <b>${browserName}</b>...`;

  try {
    const result = await window.novexImport.browserBookmarks(browserKey);

    if (!result.ok) {
      importResult.innerHTML = `⚠ ${result.message}`;
      return;
    }

    const added = mergeImportedFavorites(result.bookmarks || []);

    importResult.innerHTML = `
      ✅ Importación completada desde <b>${browserName}</b>.<br>
      Favoritos encontrados: <b>${result.bookmarks.length}</b><br>
      Favoritos nuevos agregados: <b>${added}</b>
    `;
  } catch (error) {
    importResult.innerHTML = `❌ No pude importar desde ${browserName}. ${error.message || ""}`;
  }
}

async function updateCookieSummary() {
  try {
    const result = await window.novexCookies.getSummary();

    if (!result.ok) {
      cookiesMessage.textContent = "⚠ " + result.message;
      return;
    }

    cookieTotal.textContent = String(result.totalCookies);
    cookieDomains.textContent = String(result.totalDomains);
    cookiesMessage.textContent = "✅ Conteo de cookies actualizado.";
  } catch (error) {
    cookiesMessage.textContent = "❌ No pude leer las cookies.";
  }
}

async function clearCookies() {
  const result = await window.novexCookies.clearCookies();
  cookiesMessage.textContent = result.ok ? "✅ " + result.message : "❌ " + result.message;
  await updateCookieSummary();
}

async function clearSiteData() {
  const result = await window.novexCookies.clearSiteData();
  cookiesMessage.textContent = result.ok ? "✅ " + result.message : "❌ " + result.message;
  await updateCookieSummary();
}

async function updateSystemStats() {
  try {
    const stats = await window.novexSystem.getStats();

    if (cpuStatus) cpuStatus.textContent = `CPU: ${stats.cpu}%`;
    if (ramStatus) ramStatus.textContent = `RAM: ${formatBytes(stats.ramUsed)} / ${formatBytes(stats.ramTotal)}`;
    if (appRamStatus) appRamStatus.textContent = `Novex: ${formatBytes(stats.appRam)}`;
    if (gxCpuValue) gxCpuValue.textContent = `${stats.cpu}%`;
    if (gxRamValue) gxRamValue.textContent = formatBytes(stats.ramUsed);
    if (gxNetValue) gxNetValue.textContent = "Auto";
    if (homeCpuWidget) homeCpuWidget.textContent = `CPU ${stats.cpu}%`;
    if (homeRamWidget) homeRamWidget.textContent = `RAM ${formatBytes(stats.ramUsed)}`;
    if (homeCpuStatus) homeCpuStatus.textContent = `${stats.cpu}%`;
    if (homeRamStatus) homeRamStatus.textContent = formatBytes(stats.ramUsed);
    if (homeAppRamStatus) homeAppRamStatus.textContent = formatBytes(stats.appRam);
    if (homeGpuStatus) {
      const gpuText = stats.gpuRam && stats.gpuRam > 0
        ? formatBytes(stats.gpuRam)
        : (typeof stats.gpuCpu === "number" && stats.gpuCpu > 0 ? `${stats.gpuCpu}%` : "N/D");
      homeGpuStatus.textContent = gpuText;
    }
  } catch (error) {
    if (cpuStatus) cpuStatus.textContent = "CPU: --%";
  }

  if (timeStatus) {
    timeStatus.textContent = `UTC-4: ${formatUTCMinus4()}`;
  }
  if (homeTimeStatus) {
    homeTimeStatus.textContent = formatUTCMinus4();
  }
}

function setupWebviewEvents(tab) {
  tab.webview.addEventListener("did-navigate", event => {
    if (event.url === "about:blank") return;

    tab.url = event.url;

    if (tab.id === activeTabId) {
      urlInput.value = event.url;
      updateFavoriteIcon(event.url);
    }

    addToHistory(event.url, tab.title);
    renderTabs();
    saveSession();
  });

  tab.webview.addEventListener("did-navigate-in-page", event => {
    if (event.url === "about:blank") return;

    tab.url = event.url;

    if (tab.id === activeTabId) {
      urlInput.value = event.url;
      updateFavoriteIcon(event.url);
    }

    renderTabs();
    saveSession();
  });

  tab.webview.addEventListener("page-title-updated", event => {
    if (tab.unloaded) return;

    tab.title = event.title || "Novex Browser";

    if (tab.id === activeTabId) {
      document.title = tab.title + " - Novex Browser";
    }

    if (tab.url) addToHistory(tab.url, tab.title);

    renderTabs();
    saveSession();
  });
}

tabbar.addEventListener("wheel", (event) => {
  if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
    event.preventDefault();
    tabbar.scrollLeft += event.deltaY;
  }
}, { passive: false });

function toggleToolsGroup() { if (toolsGroupToggleBtn) toolsGroupToggleBtn.click(); }

minimizeBtn.addEventListener("click", () => window.novexWindow.minimize());
maximizeBtn.addEventListener("click", () => window.novexWindow.maximize());
closeBtn.addEventListener("click", () => {
  saveSession();
  window.novexWindow.close();
});

goBtn.addEventListener("click", navigateFromUrlBar);

urlInput.addEventListener("keydown", event => {
  if (event.key === "Enter") navigateFromUrlBar();
});

homeSearchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") navigateFromHomeSearch();
});

backBtn.addEventListener("click", () => {
  const webview = currentWebview();
  if (webview && currentTab()?.url && webview.canGoBack()) webview.goBack();
});

forwardBtn.addEventListener("click", () => {
  const webview = currentWebview();
  if (webview && currentTab()?.url && webview.canGoForward()) webview.goForward();
});

reloadBtn.addEventListener("click", () => {
  const webview = currentWebview();
  if (webview && currentTab()?.url) webview.reload();
});

homeBtn.addEventListener("click", () => showStartPageForTab());
homeSideBtn.addEventListener("click", () => showStartPageForTab());

favoritesSideBtn.addEventListener("click", showFavoritesPanel);
historySideBtn.addEventListener("click", showHistoryPanel);
downloadsSideBtn.addEventListener("click", showDownloadsPanel);
gamesSideBtn.addEventListener("click", showGamesPanel);
securitySideBtn.addEventListener("click", showSecurityPanel);
settingsSideBtn.addEventListener("click", showSettingsPanel);
profileSideBtn.addEventListener("click", showProfilePanel);
if (gxControlSideBtn) gxControlSideBtn.addEventListener("click", showGxControlPanel);
if (extremePerfSideBtn) extremePerfSideBtn.addEventListener("click", showExtremePerformancePanel);

whatsappSideBtn.addEventListener("click", () => showBrowser("https://web.whatsapp.com"));
spotifySideBtn.addEventListener("click", () => showBrowser("https://open.spotify.com"));
robloxSideBtn.addEventListener("click", () => showBrowser("https://www.roblox.com"));

favoriteBtn.addEventListener("click", addFavorite);
newTabBtn.addEventListener("click", () => createTab());

menuBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  if (moreMenu) moreMenu.classList.add("hidden");
  openMenuHubTab();
});

menuNewTab.addEventListener("click", () => {
  moreMenu.classList.add("hidden");
  createTab();
});

menuImport.addEventListener("click", () => {
  moreMenu.classList.add("hidden");
  showImportPanel();
});

menuCookies.addEventListener("click", () => {
  moreMenu.classList.add("hidden");
  showCookiesPanel();
});

menuFavorites.addEventListener("click", showFavoritesPanel);
menuHistory.addEventListener("click", showHistoryPanel);
menuSettings.addEventListener("click", showSettingsPanel);

menuToggleStatusbar.addEventListener("click", () => {
  moreMenu.classList.add("hidden");
  toggleStatusbar();
});

menuToggleRamSaver.addEventListener("click", () => {
  moreMenu.classList.add("hidden");
  toggleRamSaver();
});

if (hideStatusbarQuick) hideStatusbarQuick.addEventListener("click", toggleStatusbar);
if (toggleStatusbarBtn) toggleStatusbarBtn.addEventListener("click", toggleStatusbar);
if (toggleRamSaverBtn) toggleRamSaverBtn.addEventListener("click", toggleRamSaver);

clearHistoryBtn.addEventListener("click", () => {
  history = [];
  localStorage.setItem("novexHistory", JSON.stringify(history));
  renderHistory();
  settingsMessage.textContent = "✅ Historial borrado correctamente.";
});

clearFavoritesBtn.addEventListener("click", () => {
  favorites = [];
  localStorage.setItem("novexFavorites", JSON.stringify(favorites));
  renderFavorites();
  settingsMessage.textContent = "✅ Favoritos borrados correctamente.";
});

openImportBtnSettings.addEventListener("click", showImportPanel);
openCookiesBtnSettings.addEventListener("click", showCookiesPanel);

if (importBrowserBtn) importBrowserBtn.addEventListener("click", importFromSelectedBrowser);
if (refreshCookiesBtn) refreshCookiesBtn.addEventListener("click", updateCookieSummary);
if (clearCookiesBtn) clearCookiesBtn.addEventListener("click", clearCookies);
if (clearSiteDataBtn) clearSiteDataBtn.addEventListener("click", clearSiteData);

document.addEventListener("click", (event) => {
  if (moreMenu && !moreMenu.contains(event.target) && event.target !== menuBtn) {
    moreMenu.classList.add("hidden");
  }
});

document.querySelectorAll(".launch-url").forEach(item => {
  item.addEventListener("click", () => showBrowser(item.dataset.url));
});

quickCards.forEach(card => {
  card.addEventListener("click", () => showBrowser(card.dataset.url));
});

window.addEventListener("beforeunload", saveSession);

restoreSession();
applyStatusbarPreference();
applyRamSaverPreference();
updateSystemStats();
setInterval(updateSystemStats, 2000);
renderFavorites();
renderHistory();


// ================================
// NOVEX PRO IDEAS - funciones nuevas
// ================================
const quickSearchSideBtn = document.getElementById("quickSearchSideBtn");
const tabManagerSideBtn = document.getElementById("tabManagerSideBtn");
const notesSideBtn = document.getElementById("notesSideBtn");
const proFeaturesSideBtn = document.getElementById("proFeaturesSideBtn");

const quickSearchPanel = document.getElementById("quickSearchPanel");
const tabManagerPanel = document.getElementById("tabManagerPanel");
const notesPanel = document.getElementById("notesPanel");
const proFeaturesPanel = document.getElementById("proFeaturesPanel");
const summaryPanel = document.getElementById("summaryPanel");
const screenshotPanel = document.getElementById("screenshotPanel");

const quickSearchInput = document.getElementById("quickSearchInput");
const refreshTabManagerBtn = document.getElementById("refreshTabManagerBtn");
const groupTabsBtn = document.getElementById("groupTabsBtn");
const closeInactiveTabsBtn = document.getElementById("closeInactiveTabsBtn");
const tabManagerList = document.getElementById("tabManagerList");

const quickNotesArea = document.getElementById("quickNotesArea");
const saveNotesBtn = document.getElementById("saveNotesBtn");
const clearNotesBtn = document.getElementById("clearNotesBtn");
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

const featureGrid = document.getElementById("featureGrid");
const summaryResult = document.getElementById("summaryResult");
const screenshotPreview = document.getElementById("screenshotPreview");
const captureAgainBtn = document.getElementById("captureAgainBtn");

const menuReadMode = document.getElementById("menuReadMode");
const menuTranslatePage = document.getElementById("menuTranslatePage");
const menuLocalSummary = document.getElementById("menuLocalSummary");
const menuTemporaryTab = document.getElementById("menuTemporaryTab");
const menuIncognitoTab = document.getElementById("menuIncognitoTab");
const menuTabManager = document.getElementById("menuTabManager");
const menuFocusMode = document.getElementById("menuFocusMode");
const menuMuteTab = document.getElementById("menuMuteTab");
const menuPipVideo = document.getElementById("menuPipVideo");
const menuScreenshot = document.getElementById("menuScreenshot");
const menuProFeatures = document.getElementById("menuProFeatures");

const toggleBatterySaverBtn = document.getElementById("toggleBatterySaverBtn");
const openProFeaturesBtn = document.getElementById("openProFeaturesBtn");
const batterySaverStatus = document.getElementById("batterySaverStatus");

let batterySaverEnabled = localStorage.getItem("novexBatterySaver") === "true";
let focusModeEnabled = localStorage.getItem("novexFocusMode") === "true";
let todos = JSON.parse(localStorage.getItem("novexTodos") || "[]");

function hideNovexProPanels() {
  [quickSearchPanel, tabManagerPanel, notesPanel, proFeaturesPanel, summaryPanel, screenshotPanel].forEach(panel => {
    if (panel) panel.classList.add("hidden");
  });
}

function showNovexPanel(panel, activeButton = null) {
  hidePanels();
  hideAllWebviews();
  hideNovexProPanels();

  if (panel) panel.classList.remove("hidden");
  urlInput.value = "";
  setActiveSideButton(activeButton);
}

function getDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (error) {
    return "Sin dominio";
  }
}

function isSuspiciousUrl(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    const badWords = ["login-", "secure-", "verify-", "account-update", "free-gift", "nitro-free", "robux-free", "whatsapp-security"];
    const fakeBrands = [
      "g00gle",
      "go0gle",
      "y0utube",
      "faceb00k",
      "paypa1",
      "micros0ft",
      "r0blox",
      "whatsappp"
    ];

    if (parsed.protocol !== "https:" && !host.includes("localhost")) return true;
    if (badWords.some(word => host.includes(word))) return true;
    if (fakeBrands.some(word => host.includes(word))) return true;

    return false;
  } catch (error) {
    return false;
  }
}

const originalShowBrowserNovex = showBrowser;
showBrowser = function(url) {
  if (isSuspiciousUrl(url)) {
    const ok = confirm("⚠ Aviso de seguridad Novex: esta web parece sospechosa o no usa HTTPS. ¿Quieres abrirla de todos modos?");
    if (!ok) return;
  }

  originalShowBrowserNovex(url);
};

function runQuickSearch(engine) {
  const q = (quickSearchInput.value || "").trim();
  if (!q) return;

  const encoded = encodeURIComponent(q);
  const urls = {
    google: `https://www.google.com/search?q=${encoded}`,
    youtube: `https://www.youtube.com/results?search_query=${encoded}`,
    wikipedia: `https://es.wikipedia.org/wiki/Special:Search?search=${encoded}`,
    roblox: `https://www.roblox.com/discover/?Keyword=${encoded}`,
    spotify: `https://open.spotify.com/search/${encoded}`
  };

  showBrowser(urls[engine] || urls.google);
}

function renderTabManager(grouped = false) {
  if (!tabManagerList) return;

  tabManagerList.innerHTML = "";

  if (!grouped) {
    tabs.forEach(tab => {
      const div = document.createElement("div");
      div.className = "panel-item";
      div.innerHTML = `
        <div class="panel-item-title">${tab.title || "Nueva pestaña"}</div>
        <div class="panel-item-url">${tab.url || "Inicio"}</div>
        <div class="actions-row">
          <button class="settings-action" data-action="open">Abrir</button>
          <button class="settings-action danger-soft" data-action="close">Cerrar</button>
        </div>
      `;

      div.querySelector('[data-action="open"]').addEventListener("click", (event) => {
        event.stopPropagation();
        switchToTab(tab.id);
      });

      div.querySelector('[data-action="close"]').addEventListener("click", (event) => {
        event.stopPropagation();
        closeTab(tab.id);
        renderTabManager(false);
      });

      tabManagerList.appendChild(div);
    });

    return;
  }

  const groups = {};
  tabs.forEach(tab => {
    const domain = tab.url ? getDomain(tab.url) : "Inicio";
    if (!groups[domain]) groups[domain] = [];
    groups[domain].push(tab);
  });

  Object.entries(groups).forEach(([domain, groupTabs]) => {
    const div = document.createElement("div");
    div.className = "panel-item";
    div.innerHTML = `
      <div class="panel-item-title">📁 ${domain}</div>
      <div class="panel-item-url">${groupTabs.length} pestaña(s)</div>
    `;

    groupTabs.forEach(tab => {
      const item = document.createElement("div");
      item.className = "panel-item-url";
      item.textContent = "• " + (tab.title || tab.url || "Nueva pestaña");
      item.style.cursor = "pointer";
      item.addEventListener("click", () => switchToTab(tab.id));
      div.appendChild(item);
    });

    tabManagerList.appendChild(div);
  });
}

function showTabManager() {
  showNovexPanel(tabManagerPanel, tabManagerSideBtn);
  renderTabManager(false);
}

function closeInactiveTabs() {
  const keepId = activeTabId;
  [...tabs].forEach(tab => {
    if (tab.id !== keepId) closeTab(tab.id);
  });
  renderTabManager(false);
}

function createTemporaryTab() {
  createTab("https://www.google.com");
  const tempId = activeTabId;
  alert("⏳ Pestaña temporal creada. Se cerrará sola en 10 minutos.");

  setTimeout(() => {
    const exists = tabs.some(tab => tab.id === tempId);
    if (exists) closeTab(tempId);
  }, 10 * 60 * 1000);
}

function createIncognitoTab() {
  const id = "tab-" + tabCounter++;
  const webview = document.createElement("webview");

  webview.className = "webview-hidden";
  webview.setAttribute("allowpopups", "");
  webview.setAttribute("partition", "novex-incognito-" + Date.now());
  webview.src = startUrl;

  const tab = {
    id,
    title: "Incógnito",
    url: startUrl,
    unloaded: false,
    webview
  };

  tabs.push(tab);
  webviewsContainer.appendChild(webview);
  setupWebviewEvents(tab);
  switchToTab(id);
  renderTabs();

  alert("🕶 Pestaña incógnita creada. Sus cookies no se guardan en la sesión principal.");
}

function applyReadMode() {
  const tab = currentTab();
  if (!tab || !tab.webview || !tab.url) return;

  const css = `
    body {
      background: #101018 !important;
      color: #f4f4f5 !important;
      font-size: 18px !important;
      line-height: 1.7 !important;
    }
    article, main, #content, .content, .post, .entry-content {
      max-width: 860px !important;
      margin: 40px auto !important;
      padding: 24px !important;
      background: rgba(255,255,255,0.04) !important;
      border-radius: 20px !important;
    }
    aside, nav, footer, header, .ad, [class*="ad"], [id*="ad"], iframe {
      display: none !important;
    }
    img {
      max-width: 100% !important;
      height: auto !important;
      border-radius: 14px !important;
    }
  `;

  tab.webview.insertCSS(css);
  alert("📖 Modo lectura aplicado a esta página.");
}

function translateCurrentPage() {
  const tab = currentTab();
  if (!tab || !tab.url) return;

  const url = "https://translate.google.com/translate?sl=auto&tl=es&u=" + encodeURIComponent(tab.url);
  showBrowser(url);
}

async function summarizeCurrentPage() {
  const tab = currentTab();
  if (!tab || !tab.webview || !tab.url) return;

  showNovexPanel(summaryPanel, null);
  summaryResult.textContent = "Leyendo texto de la página...";

  try {
    const text = await tab.webview.executeJavaScript(`
      (() => {
        const clone = document.body.cloneNode(true);
        clone.querySelectorAll('script,style,nav,footer,aside,iframe').forEach(n => n.remove());
        return clone.innerText.replace(/\\s+/g, ' ').trim().slice(0, 4500);
      })();
    `, true);

    const sentences = String(text).split(/(?<=[.!?])\\s+/).filter(s => s.length > 40).slice(0, 7);
    summaryResult.textContent = sentences.length
      ? "Resumen rápido local:\\n\\n" + sentences.map((s, i) => `${i + 1}. ${s}`).join("\\n\\n")
      : "No encontré suficiente texto para resumir.";
  } catch (error) {
    summaryResult.textContent = "No pude leer esta página.";
  }
}

function toggleFocusMode() {
  focusModeEnabled = !focusModeEnabled;
  localStorage.setItem("novexFocusMode", String(focusModeEnabled));
  document.body.classList.toggle("focus-mode", focusModeEnabled);
}

function toggleBatterySaver() {
  batterySaverEnabled = !batterySaverEnabled;
  localStorage.setItem("novexBatterySaver", String(batterySaverEnabled));
  document.body.classList.toggle("battery-saver", batterySaverEnabled);

  if (batterySaverEnabled && !ramSaverEnabled) {
    toggleRamSaver();
  }

  updateBatterySaverUi();
}

function updateBatterySaverUi() {
  document.body.classList.toggle("battery-saver", batterySaverEnabled);

  if (batterySaverStatus) {
    batterySaverStatus.textContent = batterySaverEnabled ? "Batería: ON" : "Batería: OFF";
  }

  if (toggleBatterySaverBtn) {
    toggleBatterySaverBtn.textContent = batterySaverEnabled ? "Desactivar ahorro de batería" : "Activar ahorro de batería";
  }
}

function toggleMuteCurrentTab() {
  const tab = currentTab();
  if (!tab || !tab.webview) return;

  tab.muted = !tab.muted;

  try {
    tab.webview.setAudioMuted(tab.muted);
    alert(tab.muted ? "🔇 Pestaña silenciada." : "🔊 Sonido activado.");
  } catch (error) {
    alert("No pude cambiar el sonido de esta pestaña.");
  }
}

function requestPictureInPicture() {
  const tab = currentTab();
  if (!tab || !tab.webview) return;

  tab.webview.executeJavaScript(`
    (async () => {
      const video = document.querySelector('video');
      if (!video) return 'No encontré video en esta página.';
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        return 'Video flotante cerrado.';
      }
      await video.requestPictureInPicture();
      return 'Video flotante activado.';
    })();
  `, true).then(message => alert(message)).catch(() => {
    alert("No pude activar video flotante en esta página.");
  });
}

async function captureCurrentPage() {
  const tab = currentTab();
  if (!tab || !tab.webview) return;

  showNovexPanel(screenshotPanel, null);
  if (screenshotPreview) {
    screenshotPreview.style.display = "none";
  }

  try {
    const image = await tab.webview.capturePage();
    if (screenshotPreview) {
      screenshotPreview.src = image.toDataURL();
      screenshotPreview.style.display = "block";
    }
  } catch (error) {
    alert("No pude tomar captura de esta página.");
  }
}

function renderTodos() {
  if (!todoList) return;

  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const div = document.createElement("div");
    div.className = "todo-item" + (todo.done ? " done" : "");
    div.innerHTML = `<span>${todo.text}</span><button>${todo.done ? "Reabrir" : "Hecho"}</button>`;

    div.querySelector("button").addEventListener("click", () => {
      todos[index].done = !todos[index].done;
      localStorage.setItem("novexTodos", JSON.stringify(todos));
      renderTodos();
    });

    todoList.appendChild(div);
  });
}

function loadNotesPanel() {
  if (quickNotesArea) {
    quickNotesArea.value = localStorage.getItem("novexQuickNotes") || "";
  }
  renderTodos();
}

function renderFeatures() {
  if (!featureGrid) return;

  const features = [
    ["Bloqueador de anuncios integrado", "Implementado con bloqueo básico y CSS visual.", "done"],
    ["Bloqueador de rastreadores", "Base incluida en el bloqueador.", "base"],
    ["Modo ahorro de batería", "Reduce animaciones y activa ahorro de RAM.", "done"],
    ["Modo lectura limpio", "Disponible desde el menú de 3 puntos.", "done"],
    ["Traductor automático de páginas", "Abre la página usando Google Translate.", "done"],
    ["Resumidor de páginas con IA", "Resumen local incluido. IA real requiere API.", "base"],
    ["Búsqueda rápida en barra lateral", "Panel lateral agregado.", "done"],
    ["Captura de pantalla con edición", "Captura agregada; edición avanzada pendiente.", "base"],
    ["Administrador de pestañas inteligente", "Panel de pestañas agregado.", "done"],
    ["Agrupar pestañas por temas", "Agrupación por dominio disponible.", "done"],
    ["Pestañas temporales", "Se cierran solas en 10 minutos.", "done"],
    ["Protección contra phishing", "Aviso básico para webs sospechosas.", "base"],
    ["Aviso de webs falsas", "Incluido con detector básico.", "base"],
    ["Escáner de descargas maliciosas", "Pendiente; requiere base de seguridad.", "future"],
    ["Control de permisos por sitio", "Base de permisos incluida.", "base"],
    ["Bloqueo de ventanas emergentes", "Popups externos bloqueados.", "done"],
    ["Múltiples perfiles", "Estructura pendiente.", "future"],
    ["Perfil estudio/trabajo/juegos", "Pendiente como sistema real.", "future"],
    ["Temas personalizables", "Base visual lista; panel completo pendiente.", "base"],
    ["Modo oscuro/claro automático", "Pendiente.", "future"],
    ["Cambiar fuentes y tamaño", "Pendiente.", "future"],
    ["Zoom inteligente por sitio", "Pendiente.", "future"],
    ["Atajos personalizables", "Pendiente.", "future"],
    ["Comandos rápidos internos", "Base con menú y búsqueda rápida.", "base"],
    ["Notas rápidas", "Panel de notas agregado.", "done"],
    ["Lista de tareas", "Panel de tareas agregado.", "done"],
    ["Modo concentrado", "Oculta barra lateral y barra inferior.", "done"],
    ["Silenciar pestañas automáticamente", "Silenciar manual agregado.", "base"],
    ["Video en ventana flotante", "Picture-in-picture agregado.", "done"],
    ["Descargas organizadas", "Pendiente.", "future"],
    ["Reanudar descargas", "Pendiente.", "future"],
    ["Formularios sin pérdida", "Cookies/sesión ayudan; sistema completo pendiente.", "base"],
    ["Historial del portapapeles", "Pendiente por privacidad.", "future"],
    ["Calendario", "Pendiente.", "future"],
    ["Panel de extensiones", "Pendiente.", "future"],
    ["Modo offline", "Pendiente.", "future"],
    ["Pantalla dividida", "Pendiente.", "future"],
    ["Asistente inteligente", "Pendiente; requiere IA/API.", "future"],
    ["Previsualización de pestañas", "Pendiente.", "future"],
    ["Historial visual con miniaturas", "Pendiente.", "future"],
    ["Marcadores inteligentes", "Base de favoritos lista.", "base"],
    ["Sincronización entre dispositivos", "Requiere servidor/cuenta.", "future"],
    ["Gestor de contraseñas", "Pendiente por seguridad.", "future"],
    ["Generador de contraseñas", "Pendiente.", "future"],
    ["Autorrelleno mejorado", "Pendiente.", "future"],
    ["Modo incógnito más privado", "Pestaña incógnita temporal agregada.", "done"]
  ];

  featureGrid.innerHTML = "";
  features.forEach(([title, desc, status]) => {
    const div = document.createElement("div");
    div.className = "feature-card";
    const label = status === "done" ? "Implementado" : status === "base" ? "Base agregada" : "Próximamente";
    div.innerHTML = `<h3>${title}</h3><p>${desc}</p><span class="feature-badge ${status}">${label}</span>`;
    featureGrid.appendChild(div);
  });
}

function showProFeatures() {
  showNovexPanel(proFeaturesPanel, proFeaturesSideBtn);
  renderFeatures();
}

if (quickSearchSideBtn) quickSearchSideBtn.addEventListener("click", () => showNovexPanel(quickSearchPanel, quickSearchSideBtn));
if (tabManagerSideBtn) tabManagerSideBtn.addEventListener("click", showTabManager);
if (notesSideBtn) notesSideBtn.addEventListener("click", () => { showNovexPanel(notesPanel, notesSideBtn); loadNotesPanel(); });
if (proFeaturesSideBtn) proFeaturesSideBtn.addEventListener("click", showProFeatures);

document.querySelectorAll(".quick-search-engine").forEach(btn => {
  btn.addEventListener("click", () => runQuickSearch(btn.dataset.engine));
});

if (quickSearchInput) {
  quickSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") runQuickSearch("google");
  });
}

if (refreshTabManagerBtn) refreshTabManagerBtn.addEventListener("click", () => renderTabManager(false));
if (groupTabsBtn) groupTabsBtn.addEventListener("click", () => renderTabManager(true));
if (closeInactiveTabsBtn) closeInactiveTabsBtn.addEventListener("click", closeInactiveTabs);

if (saveNotesBtn) saveNotesBtn.addEventListener("click", () => {
  localStorage.setItem("novexQuickNotes", quickNotesArea.value || "");
  alert("Notas guardadas.");
});

if (clearNotesBtn) clearNotesBtn.addEventListener("click", () => {
  quickNotesArea.value = "";
  localStorage.removeItem("novexQuickNotes");
});

if (addTodoBtn) addTodoBtn.addEventListener("click", () => {
  const text = (todoInput.value || "").trim();
  if (!text) return;
  todos.push({ text, done: false });
  localStorage.setItem("novexTodos", JSON.stringify(todos));
  todoInput.value = "";
  renderTodos();
});

if (menuReadMode) menuReadMode.addEventListener("click", () => { moreMenu.classList.add("hidden"); applyReadMode(); });
if (menuTranslatePage) menuTranslatePage.addEventListener("click", () => { moreMenu.classList.add("hidden"); translateCurrentPage(); });
if (menuLocalSummary) menuLocalSummary.addEventListener("click", () => { moreMenu.classList.add("hidden"); summarizeCurrentPage(); });
if (menuTemporaryTab) menuTemporaryTab.addEventListener("click", () => { moreMenu.classList.add("hidden"); createTemporaryTab(); });
if (menuIncognitoTab) menuIncognitoTab.addEventListener("click", () => { moreMenu.classList.add("hidden"); createIncognitoTab(); });
if (menuTabManager) menuTabManager.addEventListener("click", () => { moreMenu.classList.add("hidden"); showTabManager(); });
if (menuFocusMode) menuFocusMode.addEventListener("click", () => { moreMenu.classList.add("hidden"); toggleFocusMode(); });
if (menuMuteTab) menuMuteTab.addEventListener("click", () => { moreMenu.classList.add("hidden"); toggleMuteCurrentTab(); });
if (menuPipVideo) menuPipVideo.addEventListener("click", () => { moreMenu.classList.add("hidden"); requestPictureInPicture(); });
if (menuScreenshot) menuScreenshot.addEventListener("click", () => { moreMenu.classList.add("hidden"); captureCurrentPage(); });
if (menuProFeatures) menuProFeatures.addEventListener("click", () => { moreMenu.classList.add("hidden"); showProFeatures(); });

if (toggleBatterySaverBtn) toggleBatterySaverBtn.addEventListener("click", toggleBatterySaver);
if (openProFeaturesBtn) openProFeaturesBtn.addEventListener("click", showProFeatures);
if (captureAgainBtn) captureAgainBtn.addEventListener("click", captureCurrentPage);

if (window.novexEvents) {
  window.novexEvents.onOpenUrlRequest((url) => {
    createTab(url);
  });
}

document.body.classList.toggle("focus-mode", focusModeEnabled);
updateBatterySaverUi();
renderFeatures();


// ================================
// NOVEX 5.0 - Centro Maestro
// ================================
const masterCenterSideBtn = document.getElementById("masterCenterSideBtn");
const menuMasterCenter = document.getElementById("menuMasterCenter");
const masterCenterPanel = document.getElementById("masterCenterPanel");
const masterRoadmapGrid = document.getElementById("masterRoadmapGrid");
const masterSearchInput = document.getElementById("masterSearchInput");
const masterCategorySelect = document.getElementById("masterCategorySelect");
const masterTotalIdeas = document.getElementById("masterTotalIdeas");
const masterCategoriesCount = document.getElementById("masterCategoriesCount");
const masterShowImplementedBtn = document.getElementById("masterShowImplementedBtn");
const masterShowFutureBtn = document.getElementById("masterShowFutureBtn");
const masterExportBtn = document.getElementById("masterExportBtn");

const novexMasterRoadmap = [{"category": "IA y conocimiento", "title": "IA y asistencia", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que resume cualquier web en 1 línea", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que resume en modo lista", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que resume por niveles de detalle", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que explique tecnicismos", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte temas clave", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que compare dos artículos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte contradicciones", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte sesgo", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que sugiera mejores fuentes", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que haga preguntas de repaso", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que convierta texto en audio", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que convierta audio en texto", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que saque conclusiones", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que genere mapas mentales", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que construya glosarios", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que complete ideas incompletas", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte relleno o palabrería", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que cambie el nivel de lectura", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que adapte el contenido al usuario", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que corrija redacción en vivo", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que genere listas de acción", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte prioridades", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que prediga la siguiente tarea", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que cree planes de estudio", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que genere flashcards", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte datos importantes", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que cruce info de muchas webs", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que encuentre patrones", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte noticias relevantes", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que elimine ruido informativo", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que genere resúmenes comparativos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que filtre contenido repetido", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que traduzca con contexto", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que reformule sin perder tono", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte intención del texto", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que sugiera palabras clave", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que analice calidad de fuentes", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que explique gráficos", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que explique tablas", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que haga tutorías paso a paso", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que escriba borradores", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que mejore emails", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que mejore posts", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que mejore mensajes", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte spam", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte clickbait", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte manipulación", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que genere resúmenes para compartir", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que recuerde contexto de sesiones", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que aprenda tus preferencias", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Panel de metas diarias", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Ordenar pestañas por relevancia", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Resumen del día al cerrar", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Silenciar notificaciones por contexto", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Búsqueda dentro de historial", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Historial de enfoque", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Miniaturas en tiempo real", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Agrupar por urgencia", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Convertir pestañas en lista limpia", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Historial visual", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Historial por mapa", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Historial por calendario", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Historial por dominio", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Historial por tema", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Cambiar de contexto con un clic", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Historial autolimpiable", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Protección de credenciales", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Perfil familiar separado", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Personalización y apariencia", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Temas para estudiar", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Espaciado ajustable", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Cambiar estilo de pestañas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Cambiar estilo de marcadores", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Cambiar estilo de menús", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Cambiar estilo de notificaciones", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Vista previa de archivos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Vista previa de PDFs", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Vista previa de imágenes", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Vista previa de videos", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Vista previa de audio", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Guardar versión limpia", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Exportar historial filtrado", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Vista previa al descargar", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Limpiar descargas viejas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "Historial de archivos abiertos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA avanzada (nivel experto)", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte errores lógicos en artículos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que sugiera contraargumentos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que convierta textos en debates", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que analice intención del autor", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte propaganda", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que simplifique leyes o documentos complejos", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que traduzca jerga técnica", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que resuma videos automáticamente", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que analice comentarios de usuarios", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte bots en comentarios", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que clasifique contenido por calidad", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que recomiende mejores explicaciones", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que sugiera ejemplos prácticos", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que convierta teoría en ejercicios", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que adapte contenido a tu edad", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que genere cuestionarios", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte redundancias", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que genere esquemas", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte fuentes originales", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte plagio", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que combine múltiples idiomas", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que traduzca memes 😅", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que explique código", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que optimice código", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que genere snippets útiles", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que cree resúmenes ejecutivos", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que cree resúmenes técnicos", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte tendencias emergentes", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que prediga relevancia futura", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que conecte noticias relacionadas", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que genere timelines", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que analice datos en páginas", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "IA y conocimiento", "title": "IA que detecte errores en tablas", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Productividad y organización", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Panel de metas semanales", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Panel de metas por proyecto", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Temporizador Pomodoro visual", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Temporizador flexible por tarea", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Seguimiento de hábitos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Bloques de enfoque automático", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Modo trabajo profundo", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Modo descanso programado", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Agenda integrada", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Calendario lateral", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Recordatorios por pestaña", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Lista de pendientes por sitio", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Guardado de sesiones por proyecto", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Marcar páginas como “pendiente”", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Recordar dónde dejaste una tarea", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Panel de productividad personal", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Exportar tareas a calendario", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Pestañas, navegación y multitarea", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Agrupar por proyecto", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Favoritos de sesión", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Apertura inteligente de la última sesión", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Continúa sesión por perfil", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Permisos por sesión", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Identidad temporal por sesión", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Colores por proyecto", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Modo descanso visual", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Exportar sesión a informe", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Automatizar tareas repetitivas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Automatizar tareas por horario", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Automatizar tareas por evento", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Automatizar tareas por ubicación", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Automatizar tareas de marketing", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Automatizar tareas complejas encadenadas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Automatizar recordatorios inteligentes", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Automatizar tareas personales", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Automatizar gestión de agenda", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Automatizar tareas laborales", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Recomendaciones según hábitos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Continuar tareas automáticamente", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Ajustar interfaz según tarea", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Reducir pasos en tareas comunes", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Sugerir modo enfoque", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Detectar multitarea excesiva", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Recomendar descanso", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Navegación por tareas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Navegación por proyectos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "UI centrada en tareas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "UI centrada en productividad", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Integración con plataformas de productividad", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Productividad máxima", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Asistente de agenda", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Calendario académico", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Metas educativas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Panel de tareas de equipo", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Calendario de reuniones", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Asignación de tareas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Seguimiento de proyectos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Timeline de proyecto", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Continuar sesión del móvil al PC", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Continuar sesión del PC al móvil", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Productividad", "title": "Centro de productividad", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Ordenar pestañas por prioridad", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Ordenar pestañas por tiempo abierto", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Ordenar pestañas por tema", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Cerrar pestañas duplicadas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Detectar pestañas olvidadas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Vista “todo lo que importa hoy”", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Búsqueda dentro de notas", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Búsqueda dentro de marcadores", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Búsqueda por intención", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Pestañas en mosaico", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Pestañas apiladas por tema", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Abrir enlace en vista dividida", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Abrir enlace en ventana flotante", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Abrir enlace en segundo plano", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Barra lateral de contexto", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Vista “panel maestro”", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Deshacer cierre de pestaña", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Congelar pestañas inactivas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Reanudar pestañas congeladas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Suspensión inteligente de tabs", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Detección de pestañas repetidas", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Unificar pestañas iguales", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Abrir pestañas por lotes", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Guardar lote de pestañas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Restaurar lote de pestañas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Anclar pestañas por prioridad", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Pestañas temporales", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Pestañas que se autodestruyen", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Pestañas de lectura", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Pestañas de trabajo", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Pestañas de entretenimiento", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación por gestos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación por atajos avanzados", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación por voz", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación por comandos rápidos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Reordenar pestañas arrastrando", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Pestañas silenciosas", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Pestañas con audio separado", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Pestañas con prioridad de red", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Pestañas con prioridad de CPU", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Vista compacta extrema", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Sandbox total por pestaña", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación privada reforzada", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Modo navegación segura para menores", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Clima en nueva pestaña", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Exportar pestaña a documento", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Administración de archivos desde pestaña", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Automatizar navegación completa", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación inteligente y contexto", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Barra de búsqueda contextual", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Contexto compartido entre pestañas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Contexto persistente entre sesiones", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Detectar intención de búsqueda", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Detectar objetivo de navegación", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Precargar enlaces probables", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Optimizar navegación automática", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación por objetivos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación asistida", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación predictiva", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación minimalista", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación avanzada", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación por comandos naturales", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación por intención", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación sin escribir", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación por voz contextual", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación híbrida", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación adaptativa", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación inteligente total", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación optimizada al máximo", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación sin límites", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Vista de accesibilidad", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Control remoto de pestañas", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación colaborativa", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación VR completa", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación AR contextual", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación descentralizada avanzada", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación semántica pura", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Pestañas y navegación", "title": "Navegación reinventada", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Bloqueo temporal de webs", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Privacidad y seguridad", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Bloqueo de rastreadores", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Bloqueo de fingerprinting", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Bloqueo de cookies por niveles", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Alertas de phishing", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Bloqueo con PIN", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Bloqueo con biometría", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Bloqueo por inactividad", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Generador de contraseñas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Gestor de contraseñas integrado", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Aviso de contraseñas expuestas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Verificación de certificados simplificada", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "VPN integrada", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Proxy opcional", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "DNS privado", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Bloqueo de pop-ups agresivos", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Limpieza de cookies al salir", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Inspección de privacidad por página", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Puntaje de riesgo por web", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Registro de seguridad local", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Información de seguridad por archivo", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Integración con herramientas de seguridad", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Seguridad web scanner", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Sandbox de pruebas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Proxy debugger", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Seguridad de pagos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Gestión centralizada de seguridad", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Escaneo automático de riesgos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Gestión de certificados", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Reportes de seguridad", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Seguridad total integrada", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Privacidad y seguridad", "title": "Centro de seguridad", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Barras de progreso por objetivo", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo cero interrupciones", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo “retomar donde iba”", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Previsualización al pasar el mouse", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Agrupar por color", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo de múltiples escritorios", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo ultra secreto", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo anti-seguimiento total", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo antisuplantación", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Temas dinámicos", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Temas animados", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Temas minimalistas", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Temas retro", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Temas cyberpunk", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Temas profesionales", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Temas para noche", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Temas para luz intensa", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Temas adaptativos", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Fondos por clima", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Fondos por hora", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Fondos por estado de ánimo", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Tipografías personalizables", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Widgets en inicio", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Barra superior adaptable", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Barra lateral plegable", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo compacto", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo expandido", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo inmersivo", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo ultra limpio", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Colores por categoría", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Colores por estado", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Perfiles visuales", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo lectura elegante", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo gamer", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo oficina", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo creativo", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo académico", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo nocturno automático", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo diurno automático", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Interfaz tipo terminal", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Interfaz tipo móvil", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Interfaz tipo dashboard", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Automatizar seguimiento de precios", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Automatizar seguimiento de cambios", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Automatizar dashboards", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo “qué estaba haciendo”", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Ocultar ruido automáticamente", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Interfaz reactiva en tiempo real", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Interfaz sin botones innecesarios", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Interfaz modular total", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI personalizable por bloques", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI que se adapta al usuario", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI que evoluciona con uso", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI tipo videojuego", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI tipo dashboard profesional", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI tipo minimalista extremo", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI tipo consola", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI tipo asistente", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI tipo sistema operativo", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI híbrida", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI invisible", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI contextual", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI predictiva", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI centrada en contenido", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI centrada en aprendizaje", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI centrada en creatividad", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI adaptable a cada página", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI consistente global", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI simplificada", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI avanzada opcional", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI escalable", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI responsive total", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI para pantallas grandes", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI para móviles", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI para tablets", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI para múltiples monitores", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI para VR", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI para AR", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI accesible", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI inclusiva", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI configurable", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI dinámica", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI inteligente", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI moderna", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI eficiente", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI rápida", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI clara", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI sin fricción", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI perfecta 😏", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "UI definitiva", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Integración con dispositivos móviles", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Sistema de aprendizaje continuo", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Adaptación a cualquier usuario", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Sistema auto-mejorable", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Navegador como sistema operativo", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Fluidez total", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo examen", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Seguimiento de progreso académico", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Seguimiento de errores", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Seguimiento de leads", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Embudo de ventas visual", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Dashboard financiero", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Sistema de reuniones rápidas", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Terminal integrada", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Inspector visual", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Editor DOM visual", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Paletas de color automáticas", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Extractor de colores", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Editor visual de layouts", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Sistema de grids", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Eliminación de fondo", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Gestión de recursos visuales", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Ecosistema y dispositivos", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Sincronización móvil total", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Segundo monitor móvil", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Continuidad entre dispositivos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Modo escritorio remoto", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Seguimiento de expertos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Seguimiento de pedidos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Personalización y UI", "title": "Dashboard de gastos online", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Alertas de descargas raras", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Aviso de descargas peligrosas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Bóveda de archivos privados", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Archivos, descargas y contenido", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Descargas reanudables", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Descargas programadas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Descargas ordenadas por tipo", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Descargas ordenadas por fecha", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Descargas ordenadas por sitio", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Etiquetas en descargas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Carpeta inteligente de descargas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Abrir archivo sin salir del navegador", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Editor básico de PDF", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Editor de capturas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Compresor de archivos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Descompresor integrado", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Convertir web a PDF", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Convertir web a imagen", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Convertir web a texto", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Guardar página completa", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Guardar sólo lo útil", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Guardar versión offline", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Exportar notas a archivo", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Exportar marcadores a CSV", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Archivos recientes visibles", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Abrir carpeta de descargas con un clic", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Autoorganizar descargas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Escaneo de archivos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Archivos temporales controlados", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Backup de descargas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Automatizar organización de archivos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Integración con plataformas de video", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Capturas organizadas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Archivos y contenido", "title": "Compartir archivos instantáneo", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Sesiones de compras", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Alertas de webs falsas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Protección de formularios", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Guardado automático de formularios", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatización total (nivel brutal)", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Crear flujos automáticos sin código", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar investigación completa", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar comparaciones", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar compras inteligentes", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar reservas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar alertas personalizadas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar respuestas en formularios", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar emails simples", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar scraping de datos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar generación de reportes", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar limpieza de datos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar clasificación de contenido", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar envío de documentos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar análisis de páginas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar flujos de trabajo", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar integraciones con apps", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar pruebas web", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar testing de formularios", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar auditorías web", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar monitoreo de webs", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar detección de errores", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar informes de estado", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar pipelines de datos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar análisis SEO", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar optimización web", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar validaciones", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar respuestas inteligentes", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar control financiero", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar gestión de clientes", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar CRM básico", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar ventas simples", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar generación de leads", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatizar procesos completos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Integración con herramientas de automatización", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Integración con herramientas de monitoreo", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatización completa", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Todo automatizado", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Alertas de información desactualizada", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Asistente de compras", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "CRM básico integrado", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Reportes automáticos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Testing automatizado", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Finanzas y compras", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Alertas de descuentos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Alertas de renovaciones", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Alertas de stock", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Monitoreo de compras", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Monitoreo de amenazas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Alertas críticas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Compresión de recursos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Tienda de automatizaciones", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Centro de automatización", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Tu flujo ideal", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Automatización", "title": "Automatización progresiva", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Trabajo y empresa", "title": "Trabajo y empresa", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Trabajo y empresa", "title": "Gestión de clientes", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Trabajo y empresa", "title": "Facturación básica", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Trabajo y empresa", "title": "Gestión de contratos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Trabajo y empresa", "title": "Kanban integrado", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Trabajo y empresa", "title": "Gantt simplificado", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Trabajo y empresa", "title": "Auditoría de actividad", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Trabajo y empresa", "title": "Gestión multiusuario", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Trabajo y empresa", "title": "Espacios por departamento", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Trabajo y empresa", "title": "Espacios por cliente", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Trabajo y empresa", "title": "Auditoría SEO", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Trabajo y empresa", "title": "Panel de auditoría", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Desarrollo y tecnología", "title": "Integración con APIs", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Desarrollo y tecnología", "title": "Integración con herramientas de código", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Desarrollo y tecnología", "title": "Integración con herramientas de testing", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Desarrollo y tecnología", "title": "DevTools avanzadas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Desarrollo y tecnología", "title": "Editor de código lateral", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Desarrollo y tecnología", "title": "Linter integrado", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Desarrollo y tecnología", "title": "Formatter integrado", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Desarrollo y tecnología", "title": "Generador de APIs", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Desarrollo y tecnología", "title": "Análisis de performance web", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Desarrollo y tecnología", "title": "Lighthouse integrado mejorado", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Desarrollo y tecnología", "title": "Editor de CSS en vivo", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Desarrollo y tecnología", "title": "Base de snippets", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Desarrollo y tecnología", "title": "Deploy rápido", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Desarrollo y tecnología", "title": "API pública", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Diseño y creatividad", "title": "Integración con herramientas de diseño", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Diseño y creatividad", "title": "Creatividad aumentada", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Diseño y creatividad", "title": "Diseño y creatividad", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Diseño y creatividad", "title": "Moodboards integrados", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Diseño y creatividad", "title": "Inspector tipográfico", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Diseño y creatividad", "title": "Wireframes rápidos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Diseño y creatividad", "title": "Prototipos básicos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Diseño y creatividad", "title": "Editor de assets", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Diseño y creatividad", "title": "Preview de branding", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Diseño y creatividad", "title": "Biblioteca de iconos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Diseño y creatividad", "title": "Centro de creatividad", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Diseño y creatividad", "title": "Diseño eterno 😄", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con almacenamiento externo", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración total con el mundo digital", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con apps externas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con herramientas de trabajo", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con plataformas educativas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con bases de datos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con servicios cloud", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con wearables", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con smart home", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con coches inteligentes", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con asistentes virtuales", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con herramientas creativas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con plataformas de música", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con plataformas de streaming", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con plataformas de gaming", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con plataformas de negocio", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con plataformas financieras", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con plataformas de salud", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con plataformas legales", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con plataformas de marketing", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con plataformas de datos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con plataformas de analítica", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con herramientas de edición", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con herramientas de colaboración", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con herramientas de desarrollo", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con herramientas de control", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración total universal", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Consola mejorada", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Control desde smartwatch", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con TV", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con consola", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con tablets", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración con e-readers", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Ecosistema e integraciones", "title": "Integración absoluta", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Finanzas y compras", "title": "Asistente financiero", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Finanzas y compras", "title": "Comparador universal de precios", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Finanzas y compras", "title": "Predicción de bajadas de precio", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Finanzas y compras", "title": "Clasificación automática de gastos", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Finanzas y compras", "title": "Presupuestos personales", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Finanzas y compras", "title": "Scoring de tiendas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Finanzas y compras", "title": "Detección de reseñas falsas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Finanzas y compras", "title": "Asistente financiero web", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Optimización automática total", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Navegador como herramienta de vida", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Asistente de programación", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Herramientas fullstack integradas", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Optimización de imágenes", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Motor ultrarrápido", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Gestión inteligente de RAM", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Optimización de CPU", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Aceleración por GPU", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Gestión avanzada de caché", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Suspensión automática", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Startup ultrarrápido", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Perfil gaming", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Perfil batería", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Perfil streaming", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Optimización dinámica", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Performance y sistema", "title": "Framework de vida digital", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Marcar páginas como “urgente”", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Marcar páginas como “favorito útil”", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Permitir webs por horario", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Sincronizar notas con nube", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Perfil privado separado", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Perfil trabajo separado", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Perfil estudio separado", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Limpieza de sesiones al cerrar", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Control parental fino", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Panel modular", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Reanudar subidas interrumpidas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Carga directa a nube", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Arrastrar y soltar para subir", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Biblioteca de contenido guardado", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Ajustar velocidad de carga según prioridad", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Precargar contenido relevante", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Detectar frustración del usuario", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Mostrar solo lo relevante", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Resaltar información clave", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Detectar distracciones", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Detectar sobrecarga informativa", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Simplificar interfaces web", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Adaptar contenido a velocidad de lectura", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Ajustar tamaño de texto dinámicamente", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Mostrar puntos clave primero", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Modularidad completa", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Compatibilidad universal", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Navegador como segunda mente", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Internet optimizado para ti", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Sin barreras", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Todo futuro", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Diccionario contextual", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Desarrollo y tecnología", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Compartir portapapeles universal", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Handoff universal", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Compartir sesiones", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Salas compartidas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Comentarios privados sobre webs", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Listas compartidas", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Marcadores colaborativos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Comparación de productos", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Carga diferida inteligente", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Precarga predictiva", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Futuro extremo", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Web holográfica", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Interacción gestual avanzada", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Interacción ocular", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Interacción biométrica", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Identidad digital universal", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Segunda mente digital", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Capa final producto definitivo", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Marketplace de extensiones premium", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Marketplace de workflows", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Marketplace de perfiles", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "SDK para desarrolladores", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Restauración universal", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Cierre legendario", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Centro personal universal", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Todo modular", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Todo preparado", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Navegador universal", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Navegador modular", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Navegador definitivo", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Plataforma universal", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Asistente universal", "status": "Base IA / requiere API avanzada", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Workspace universal", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Browser OS", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Digital Brain", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Capa universal de internet", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Middleware humano-web", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Expansión modular", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "Visión a largo plazo", "status": "Requiere hardware/servidor", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "Futuro extremo", "title": "El navegador definitivo absoluto 🧠🔥👑", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Notas rápidas flotantes", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Notas vinculadas a páginas", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Listas de lectura inteligentes", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Sesiones de investigación", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Sesiones de estudio", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Sesiones de ocio", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Reabrir último grupo cerrado", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Plan del día al abrir", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Panel de tiempo invertido", "status": "Base local implementable", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Deshacer cierre de grupo", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Recomendaciones según uso", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Control fino de permisos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Permisos por sitio", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Permisos por tiempo", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Aislamiento fuerte entre sitios", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Autodestrucción de datos sensibles", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Monitor de filtraciones", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Aviso de páginas inseguras", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Encriptación local de datos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Reducción de permisos por defecto", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Protección contra scripts invasivos", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Tamaño global ajustable", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Íconos personalizados", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "General", "title": "Sonidos personalizados", "status": "Roadmap", "desc": "Idea importada para NovexBrowser 5.0 desde tu lista de funciones."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegación por estructura semántica de la página", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Mostrar árbol completo del sitio", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegar por breadcrumbs detectados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Detectar páginas relacionadas automáticamente", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Modo “explorar sitio completo”", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Abrir todos los enlaces de una sección", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Filtrar enlaces por tipo", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Filtrar enlaces por relevancia", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Detectar enlaces rotos", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Avisar de enlaces caídos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegación por enlaces visitados/no visitados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Resaltar enlaces nuevos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegar por comentarios destacados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Detectar respuestas útiles en foros", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Saltar directamente a respuestas relevantes", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegación tipo wiki", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Vista previa de enlaces internos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Modo “explorar tema” automático", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegar entre categorías del sitio", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Detectar secciones ocultas", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Detectar navegación duplicada", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Unificar navegación repetitiva", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegar por contenido cronológico", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegar por popularidad", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegar por comentarios recientes", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegar por contenido actualizado", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Ajustes heredados por grupo de sitios", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Detectar tipo de web automáticamente", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Adaptar navegación a ecommerce", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Adaptar navegación a blogs", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Adaptar navegación a foros", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Adaptar navegación a documentación", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Adaptar navegación a redes sociales", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Adaptar navegación a noticias", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Modo investigación profunda", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Modo lectura rápida", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Modo exploración casual", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Modo compras inteligente", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Mostrar lo importante primero", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Ocultar lo irrelevante", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Detectar intención de navegación", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Sugerir acciones útiles", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Acciones rápidas según contexto", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Detectar flujo de navegación", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegación guiada opcional", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Recordar preferencias por sitio", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Adaptar comportamiento automáticamente", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Optimizar navegación diaria", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Limitar almacenamiento por sitio", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Limitar tiempo en sitios", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Alertas de uso", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Centro de navegación", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegador como hub", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Detectar automáticamente índice de una página", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Crear índice lateral navegable", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Botón “saltar a lo más leído”", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Detectar secciones clave automáticamente", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegar por bloques de contenido", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Resaltar enlaces más importantes", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Ir al siguiente enlace relevante", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Saltar banners automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Saltar popups conocidos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegación continua entre páginas de una serie", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Detectar “parte 1, parte 2…”", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Scroll automático configurable", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Scroll por párrafos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Scroll por bloques", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Ir a contenido nuevo en páginas actualizadas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegar por enlaces internos del sitio", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Usar versión ligera del sitio si existe", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Detectar sitios lentos recurrentes", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Preconectar a sitios frecuentes", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Reducir latencia en navegación", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Modo “solo sitios confiables”", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Lista blanca personalizada", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Lista negra personalizada", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Modo navegación segura extrema", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "UI adaptativa por sitio", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Ocultar elementos irrelevantes", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Mostrar estructura del sitio", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Mini mapa de página", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Indicador de progreso de lectura", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Indicador de tiempo estimado", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Modo enfoque por sección", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Vista de tablero de enlaces", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Vista tipo kanban de páginas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Vista tipo lista simple", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Vista tipo galería", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Ordenar por prioridad", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Ordenar por uso", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Reiniciar navegador sin cerrar sesión", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Control total del sistema navegador", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Cierre", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegador que realmente se adapta al usuario sin complicarlo", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Detectar clones de sitios", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Protección contra keylogging web", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Borrar almacenamiento por sitio", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Modo navegación segura obligatoria", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Lista de sitios seguros", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Lista de sitios bloqueados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Marcar contenido nuevo", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Timeline de navegación", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Métricas de navegación", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Estadísticas personales", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Crear rutinas de navegación", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Núcleo modular del navegador", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Centro de archivos web", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Centro de enlaces importantes", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Centro de actividad diaria", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Navegación profunda", "title": "Navegador como hub digital", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial por horas", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial por días", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial por semanas", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Búsqueda rápida en historial", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Limpiar historial selectivo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Exportar historial", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Importar historial", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial privado separado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Navegación sin historial", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial visual", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Marcadores rápidos", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Marcadores inteligentes", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Marcadores automáticos", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Organización automática", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Limpieza automática", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Etiquetas rápidas", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Carpetas dinámicas", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial multimedia", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Favoritos multimedia", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Acceso offline a marcadores", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Navegar por etiquetas del sitio", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Ajustes favoritos fijados", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial de cambios de configuración", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial de rastreo bloqueado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Interfaz que aprende layout favorito", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Reordenar elementos automáticamente", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Mostrar elementos más usados", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Ocultar elementos raramente usados", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Barra adaptable", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Panel de favoritos", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial compartido", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Notas compartidas", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial de productividad", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Métricas de uso", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Comparar días", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Comparar semanas", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Detectar patrones", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial de velocidad por sitio", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial de riesgos por sesión", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Etiquetado rápido con atajos", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Etiquetas por color", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Etiquetas jerárquicas", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Búsqueda por etiquetas", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial multimedia separado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Marcadores grupales", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial de accesos a datos", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Guardar autores favoritos", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial organizado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial por proyecto", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial por categoría", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Archivar automáticamente", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Limpiar automáticamente", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Sugerir organización", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Reorganizar con un clic", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Detectar desorden", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Optimizar estructura", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Historial de cambios compartidos", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Historial y marcadores", "title": "Versionado de sesiones", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel lateral fijo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel lateral dinámico", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel minimalista", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel completo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Widgets integrados", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Widgets externos", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Widgets personalizables", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Widgets movibles", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel multimedia", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de actividad", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de rendimiento", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de seguridad", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de privacidad", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de datos", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de uso", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel total", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Cambio de modo rápido", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de configuración simplificado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel avanzado oculto", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Alternar entre modos fácilmente", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de privacidad central", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de contenido", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de recursos", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de referencias", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de guardados", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de recientes", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de recomendados", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de todo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de flujos", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de productividad", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de eficiencia", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Dashboard de trabajo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de errores", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Notificaciones técnicas", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Modo desarrollador avanzado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Modo usuario básico", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Alternar modos rápido", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel flotante contextual", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Menú contextual enriquecido", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Acciones rápidas al seleccionar texto", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Widgets redimensionables", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel lateral inteligente", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel inferior opcional", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Barra flotante opcional", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de control total", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Resumen del día", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Resumen de la semana", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Resumen de actividad", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel de insights", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Panel multimedia avanzado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Ranking de uso del tiempo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Comparar días productivos", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Detectar patrones", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Paneles, widgets y modos", "title": "Cambio automático de modo", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Control de audio global", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Control de video global", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Control multimedia total", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Biblioteca multimedia", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Reproducción continua", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Reproducción inteligente", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Control de calidad", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Reproducir acciones", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Centro multimedia", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Centro de trabajo", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Centro de estudio", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Centro personal", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Detectar todos los videos en una página", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Lista de reproducción automática", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Saltar partes repetitivas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Ajustar audio por tipo de contenido", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Balancear volumen entre pestañas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Silenciar anuncios automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Mostrar timeline de video mejorado", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Saltar silencios en audio", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Reproducir audio en segundo plano", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Continuar reproducción entre páginas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Detectar podcasts en webs", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Guardar episodios automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Reproducir sin cargar toda la página", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Modo solo audio", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Modo solo video", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Detectar contenido multimedia oculto", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Abrir video en ventana flotante", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Minimizar video automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Control multimedia global", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Detección automática de contenido multimedia", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Clasificar contenido multimedia", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Agrupar videos por tema", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Agrupar audio por tipo", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Control global de reproducción", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Reproducir en segundo plano", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Minimizar automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Evitar reproducir duplicados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Ajustar volumen automático", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Normalizar audio", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Mejorar calidad de audio", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Control de calidad de video", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Adaptar calidad automáticamente", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Saltar partes irrelevantes", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Detectar pausas largas", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Saltar silencios", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Multimedia", "title": "Control inteligente de reproducción", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir rápido", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir seguro", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir privado", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir temporal", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir permanente", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir limpio", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir completo", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir parcial", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir sesión", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir proyecto", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir presets", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir colecciones", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir flujos", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Crear espacios por equipo", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Crear espacios por proyecto", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Invitar usuarios", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Gestionar roles", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir recursos", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir páginas", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir sesiones", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Comentarios en tiempo real", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Edición simultánea", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Restaurar versiones", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Comparar versiones", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Notificaciones en equipo", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Feed de actividad", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Dashboard de equipo", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Migración entre equipos", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir con contraseña", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir con expiración", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir solo lectura", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir editable", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Enviar sesión a grupo", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Recibir sesión de otro usuario", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Fusionar sesiones compartidas", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir capturas editadas", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir fragmentos específicos", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir con contexto incluido", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Exportar para compartir offline", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Crear link temporal", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Crear link permanente", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir sin metadatos", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir versión limpia", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Comparar versiones de contenido", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Importar colecciones", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Espacios compartidos por proyecto", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Espacios privados", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Espacios públicos", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Roles dentro de espacios", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Restaurar versiones anteriores", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Comparar sesiones", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Comentarios por página", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Comentarios por sección", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Notas colaborativas", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Notificaciones en tiempo real", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Integración con equipos", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Compartir dashboards", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Exportar trabajo colaborativo", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Compartir y colaboración", "title": "Centro colaborativo", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil básico", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil avanzado", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil trabajo", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil personal", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil invitado", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil seguro", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil rápido", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil ligero", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil completo", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil portable", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Backup automático", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Backup manual", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Restauración rápida", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Restauración completa", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Restauración parcial", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Exportación total", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Importación total", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Migración fácil", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Clonación de perfil", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Sincronización total", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Sincronización al reconectar", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil automático según contexto", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Permisos por perfil", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil ultra privado", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil equilibrado", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil abierto", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Cambio rápido de perfil", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Layout por perfil", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Sincronizar colecciones", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Vista de biblioteca", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Vista de archivo", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Vista de lista", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Vista de grid", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Vista personalizada", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Clonación de entorno", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Sincronización segura", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Notas sincronizadas en grupo", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Clonar perfil completo", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Restaurar backup", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Configuración por perfil", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil de seguridad configurable", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Migración entre dispositivos", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Backup incremental", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Restauración selectiva", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfil portátil", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Perfiles por contexto", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Perfiles, backup y sincronización", "title": "Reglas por contexto", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Modo offline completo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Modo offline parcial", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Guardado automático offline", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Acceso offline a páginas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Acceso offline a archivos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Acceso offline a notas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Detección de conexión", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Adaptar carga según conexión", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Modo viaje (bajo consumo + offline)", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Modo estudiante", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Modo trabajo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Modo entretenimiento", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Modo investigación", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Modo compras", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Modo lectura", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Modo concentración", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Modo descanso", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Modo nocturno automático", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Modo ahorro total", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Offline y conexión", "title": "Modo rendimiento total", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Ajuste automático", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Configuración por modo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Ajustes automáticos", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Ajustes manuales", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Ajustes dinámicos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Ajustes inteligentes", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Configuración rápida desde cualquier pantalla", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Buscar dentro de los ajustes", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Ajustes recientes visibles", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Restablecer solo una categoría", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Exportar configuración por partes", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Importar configuración parcial", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Configuración por dispositivo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Configuración por red", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Configuración por batería", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Activar ajustes por horario", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Activar ajustes por ubicación", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Activar ajustes por uso", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Ajustes por tipo de página", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Ajustes por dominio", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Vista previa de cambios", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Aplicar cambios sin reiniciar", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Revertir cambios fácilmente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Modo prueba para configuraciones", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Configuración guiada inicial", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Configuración rápida tipo setup", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Guardar presets personalizados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Aplicar presets automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Resaltar cambios en páginas visitadas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Comparar versión antigua vs nueva", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Seguimiento de cambios compartidos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Notificaciones de cambios", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Exportar configuración completa", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Importar configuración", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ajustes y control profundo", "title": "Feed de cambios", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Modo sin cookies total", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Cookies solo esenciales", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Cookies temporales", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Bloqueo de almacenamiento local", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Borrar almacenamiento al salir", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Rotar identificadores web", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Ocultar fingerprint básico", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Ocultar fingerprint avanzado", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Simular fingerprint genérico", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Control de canvas fingerprint", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Control de WebGL fingerprint", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Bloquear APIs sensibles", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Control de permisos en tiempo real", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Revocar permisos activos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Visualizar permisos activos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Limitar duración de permisos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Permisos por sesión", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Permisos por pestaña", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Resumen de privacidad diario", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Control total de privacidad", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Permisos granulares", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Indicador de privacidad en tiempo real", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Simulación de entorno aislado por pestaña", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Bloqueo de APIs sospechosas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Control de WebRTC", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Ocultar IP real automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Rotación de identificadores", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Modo anonimato reforzado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Control de almacenamiento local", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Limitar acceso a almacenamiento", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Optimizar almacenamiento", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Organización total", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Dashboard de organización", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Vista de proyectos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Vista de tareas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Vista de notas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Vista de recursos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Permisos por usuario", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Privacidad avanzada", "title": "Control de acceso granular", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Botones dinámicos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Barra de acciones contextual", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Menú contextual mejorado", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Sugerir siguiente paso", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Ajustar interfaz según uso", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Botones contextuales", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Animaciones suaves opcionales", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Feedback visual inmediato", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Indicadores de estado claros", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI responsive total", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI optimizada por tamaño de pantalla", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI optimizada por resolución", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI adaptable a DPI", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Escalado inteligente", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Modo pantalla pequeña", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Modo pantalla grande", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI compacta", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI expandida", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI personalizable completa", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Layout guardable", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Layout compartible", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Layout dinámico", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Layout por contexto", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI sin distracciones", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI con enfoque", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI con multitarea", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI modular", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI flexible", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI consistente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Seguimiento de progreso", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Coordinación simple", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Arquitectura modular", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Continuidad total", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Acceso universal", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Interfaz unificada", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Cambiar layout según tipo de página", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Botones contextuales según contenido", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Reducir ruido visual", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Simplificar formularios largos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Mostrar campos importantes primero", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Alertas de tiempo perdido", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI que cambia según hora del día", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI que cambia según luz ambiental", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI minimalista automática en lectura", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI compacta en multitarea", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI expandida en pantalla completa", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Animaciones adaptativas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Transiciones suaves configurables", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Botones inteligentes según contenido", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Indicadores visuales de estado", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Barra de progreso contextual", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Feedback visual mejorado", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Modo ultra limpio automático", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI modular por bloques", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Arrastrar y soltar elementos UI", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Personalizar layout libremente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Guardar layouts personalizados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Cambiar layout con un clic", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Modo dashboard personal", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI basada en tarjetas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI tipo lista", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "UI tipo grid", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Seguimiento de uso", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Seguimiento de actividad", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Continuidad entre dispositivos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - UI dinámica y UX", "title": "Transferencia instantánea", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detección de duplicados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Filtros avanzados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Búsqueda avanzada", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar jerarquía de contenido", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Mostrar índice dinámico", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Acceder a contenido expandible automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar contenido útil automáticamente", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Guardar contenido relevante", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Ignorar contenido irrelevante", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Clasificar contenido automáticamente", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Agrupar contenido similar", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar duplicados", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Eliminar duplicados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Consolidar contenido", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Crear colecciones", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Organizar colecciones", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Buscar dentro de colecciones", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Exportar colecciones", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Importar colecciones", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Control total de contenido", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Organización automática", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Versionado de contenido", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Centro de contenido", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Centro de archivos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Datos centralizados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Experiencia integrada", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Unir artículos paginados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar contenido repetido entre webs", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Modo “datos ultra bajos”", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Bloquear imágenes pesadas automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Mostrar qué datos intenta leer una web", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Mostrar solo contenido principal", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Ajustar espaciado automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar tablas en páginas", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Extraer tablas automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Convertir tablas a CSV", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Copiar tablas limpias", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar listas importantes", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Extraer listas automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar precios en páginas", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Comparar precios dentro de la misma web", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar productos similares", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Guardar fichas de productos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Extraer datos estructurados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Exportar datos a archivo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Guardar páginas como dataset", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar emails en páginas", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar teléfonos en páginas", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar direcciones", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Copiar datos estructurados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Agrupar datos por tipo", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Buscar dentro de datos extraídos", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Guardar datos por proyecto", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Organización avanzada", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Carpeta automática por dominio", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Carpeta automática por tema", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Clasificar páginas automáticamente", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Ordenar por fecha", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Ordenar por relevancia manual", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Agrupar por proyecto", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Agrupar por cliente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Recordatorios de trabajo", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Recordatorios de descanso", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Modo jornada laboral", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Modo descanso automático", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Modo enfoque profundo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Aviso de formularios duplicados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar artículos en páginas", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Extraer contenido principal automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Guardar artículos limpios", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar autores de contenido", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar fechas de publicación", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Ordenar contenido por fecha", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar actualizaciones", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar duplicados de artículos", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Unificar contenido similar", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Extraer citas automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Guardar citas en biblioteca", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Exportar citas", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar estadísticas en páginas", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Extraer números clave", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Convertir datos a gráficos simples", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Guardar datasets básicos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar categorías", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Agrupar contenido por tema", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Buscar dentro de contenido guardado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Exportar contenido organizado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Crear colecciones de contenido", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Eliminar duplicados automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Detectar contenido duplicado", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Recordatorios contextuales", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Dashboard de rendimiento", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Contenido y datos", "title": "Centro de contenido guardado", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Continuar flujo automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Crear flujos personalizados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Ejecutar flujos con un clic", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Guardar flujos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Editar flujos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Importar flujos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Automatizar tareas simples", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Repetir acciones", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Grabar acciones", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Programar acciones", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Ejecutar por evento", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Ejecutar por horario", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Ejecutar por contexto", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Biblioteca de flujos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Optimizar flujos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Analizar flujos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Automatización ligera", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Control total del flujo", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Optimizar flujo de trabajo", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Automatizar tareas repetitivas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Ejecutar rutinas con un clic", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Programar rutinas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Activar rutinas por horario", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Flujos y automatización", "title": "Automatización básica", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Detectar objetivos del usuario", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Facilitar tareas repetidas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Mejorar eficiencia", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Medir uso del tiempo", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Medir eficiencia", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Detectar distracciones", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Bloquear distracciones", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Ajustar hábitos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Sugerir mejoras", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Modo trabajo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Modo descanso", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Modo enfoque", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Modo deep work", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Control de hábitos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Optimización personal", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Vista sin distracciones automática", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Agrupar por objetivo", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Archivar páginas automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Limpiar páginas viejas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Medir tiempo por página", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Medir tiempo por tarea", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Medir tiempo por proyecto", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Reporte diario automático", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Reporte semanal", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Objetivos diarios", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Objetivos semanales", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Modo sin distracciones total", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Agrupar todo por objetivo", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Agrupar todo por prioridad", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Agrupar todo por tiempo", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Vista diaria", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Vista semanal", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Vista mensual", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Medir eficiencia real", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Detectar pérdida de tiempo", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Bloquear distracciones automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Modo ultra enfoque", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Temporizador inteligente", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Pausas automáticas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Productividad y hábitos", "title": "Centro de productividad", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Reducir fricción en tareas comunes", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Mostrar consumo de red por pestaña", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Limitar ancho de banda por pestaña", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Priorizar descargas activas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Detectar conexiones lentas", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Comprimir imágenes antes de cargar", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Evitar cargar anuncios pesados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Reintentar carga automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Cambiar servidor CDN automáticamente", "status": "Requiere integración avanzada", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Mostrar tiempo de carga real", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Optimizar DNS automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Cache por dominio frecuente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Evitar recargas innecesarias", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Bloqueo automático de redirecciones múltiples", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Ver scripts externos cargados", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Bloqueo de descargas por tipo", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Confirmación antes de subir archivos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Aviso de formularios largos sospechosos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Limitar uso de redes sociales", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Rendimiento y red", "title": "Reiniciar pestaña sin recargar", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Bloquear acceso a portapapeles", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Avisar si una web copia texto automáticamente", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Control granular de sensores (GPS, etc.)", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Aviso si una web abre nuevas ventanas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Desactivar scripts por origen", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Bloquear trackers invisibles", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Detectar keyloggers web", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Mostrar conexiones externas activas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Alertas de scripts ocultos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Bloqueo de minería web", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Detectar uso de CPU sospechoso", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Protección contra clickjacking", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Bloqueo de overlays invisibles", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Ver elementos ocultos", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Mostrar capas invisibles", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Desactivar capas engañosas", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Auditoría de seguridad rápida", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Seguridad y control", "title": "Reporte de riesgo por sesión", "status": "Roadmap", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Monitor de APIs usadas", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Aviso de uso excesivo de APIs", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Núcleo ligero", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Módulos activables", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Módulos desactivables", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Actualizaciones por módulo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Sistema de plugins", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Compatibilidad controlada", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Monitor del sistema", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Logs detallados", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Diagnóstico automático", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Reparación automática", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Control total del núcleo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Estabilidad garantizada", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Sistema web completo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Ecosistema completo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Modo lectura automática en blogs", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Modo foro optimizado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Modo tienda optimizado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Modo documentación optimizado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Barra lateral contextual", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Monitor de procesos internos", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Control manual de procesos", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Modo seguro (sin extensiones)", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Diagnóstico automático de errores", "status": "Base inteligente", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Reparación automática básica", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Monitor de actividad sospechosa", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Detección de comportamiento anómalo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Monitor de inputs sensibles", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Activar/desactivar módulos", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Actualizar módulos por separado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Sistema de plugins avanzado", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Marketplace de extensiones", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Control de compatibilidad", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Monitor del sistema interno", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Logs avanzados", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Exportar logs", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Analizar errores", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Modo debug", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Modo seguro", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Control total del sistema", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Control total del ecosistema", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Sistema y núcleo", "title": "Modo seguro total", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ecosistema total", "title": "Vista global", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ecosistema total", "title": "Control total", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ecosistema total", "title": "Plataforma central", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ecosistema total", "title": "Centro de vida digital", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ecosistema total", "title": "Centro de información personal", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ecosistema total", "title": "Vista global de todo", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}, {"category": "5.0 Real - Ecosistema total", "title": "Extras potentes", "status": "Base local implementable", "desc": "Idea real agregada a NovexBrowser 5.0 y organizada por categoría."}];

let masterFilterMode = "all";

function showMasterCenterPanel() {
  if (typeof showNovexPanel === "function") {
    showNovexPanel(masterCenterPanel, masterCenterSideBtn);
  } else {
    hidePanels();
    hideAllWebviews();
    if (masterCenterPanel) masterCenterPanel.classList.remove("hidden");
    setActiveSideButton(masterCenterSideBtn);
  }

  setupMasterCenter();
  renderMasterRoadmap();
}

function setupMasterCenter() {
  if (!masterCategorySelect) return;

  const categories = [...new Set(novexMasterRoadmap.map(item => item.category))].sort();

  if (masterCategorySelect.options.length <= 1) {
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      masterCategorySelect.appendChild(option);
    });
  }

  if (masterTotalIdeas) masterTotalIdeas.textContent = novexMasterRoadmap.length;
  if (masterCategoriesCount) masterCategoriesCount.textContent = categories.length;
}

function statusClass(status) {
  if (status.includes("local")) return "base";
  if (status.includes("hardware") || status.includes("servidor")) return "external";
  return "future";
}

function renderMasterRoadmap() {
  if (!masterRoadmapGrid) return;

  const q = (masterSearchInput?.value || "").toLowerCase().trim();
  const cat = masterCategorySelect?.value || "all";

  let items = novexMasterRoadmap.filter(item => {
    const matchesSearch = !q ||
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q);

    const matchesCat = cat === "all" || item.category === cat;

    let matchesMode = true;
    if (masterFilterMode === "base") matchesMode = item.status.includes("local") || item.status.includes("IA");
    if (masterFilterMode === "future") matchesMode = !item.status.includes("local");

    return matchesSearch && matchesCat && matchesMode;
  });

  masterRoadmapGrid.innerHTML = items.slice(0, 220).map(item => `
    <div class="master-roadmap-card">
      <h3>${item.title}</h3>
      <p>Categoría: ${item.category}</p>
      <span class="master-tag ${statusClass(item.status)}">${item.status}</span>
    </div>
  `).join("") || `<div class="empty-box">No encontré ideas con ese filtro.</div>`;
}

function exportMasterRoadmap() {
  const categories = [...new Set(novexMasterRoadmap.map(item => item.category))].sort();
  const text = categories.map(cat => {
    const items = novexMasterRoadmap.filter(item => item.category === cat).slice(0, 40);
    return "# " + cat + "\n" + items.map(item => "- " + item.title + " [" + item.status + "]").join("\n");
  }).join("\n\n");

  navigator.clipboard.writeText(text).then(() => {
    alert("Roadmap copiado al portapapeles.");
  }).catch(() => {
    alert("No pude copiar el roadmap.");
  });
}

if (masterCenterSideBtn) masterCenterSideBtn.addEventListener("click", showMasterCenterPanel);
if (menuMasterCenter) menuMasterCenter.addEventListener("click", () => {
  moreMenu.classList.add("hidden");
  showMasterCenterPanel();
});

if (masterSearchInput) masterSearchInput.addEventListener("input", renderMasterRoadmap);
if (masterCategorySelect) masterCategorySelect.addEventListener("change", renderMasterRoadmap);
if (masterShowImplementedBtn) masterShowImplementedBtn.addEventListener("click", () => {
  masterFilterMode = "base";
  renderMasterRoadmap();
});
if (masterShowFutureBtn) masterShowFutureBtn.addEventListener("click", () => {
  masterFilterMode = "future";
  renderMasterRoadmap();
});
if (masterExportBtn) masterExportBtn.addEventListener("click", exportMasterRoadmap);


// Grupo desplegable de apps y herramientas en la barra lateral
const toolsGroupToggleBtn = document.getElementById("toolsGroupToggleBtn");
const toolsGroupContainer = document.getElementById("toolsGroupContainer");


function toggleSidebarToolsGroup(forceOpen = null) {
  if (typeof openMenuHubTab === "function") openMenuHubTab();
  else showMenuHubPanelDirect();
}


if (toolsGroupToggleBtn) {
  toolsGroupToggleBtn.addEventListener("click", () => openMenuHubTab());
}


// Acciones del Centro rápido
document.querySelectorAll(".menu-hub-action").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    switch (action) {
      case "home":
        showStartPageForTab();
        break;
      case "new-tab":
        createTab();
        break;
      case "favorites":
        showFavoritesPanel();
        break;
      case "history":
        showHistoryPanel();
        break;
      case "downloads":
        showDownloadsPanel();
        break;
      case "whatsapp":
        showBrowser("https://web.whatsapp.com");
        break;
      case "spotify":
        showBrowser("https://open.spotify.com");
        break;
      case "roblox":
        showBrowser("https://www.roblox.com");
        break;
      case "games":
        showGamesPanel();
        break;
      case "quick-search":
        showQuickSearch();
        break;
      case "tab-manager":
        showTabManager();
        break;
      case "notes":
        showNotesPanel();
        break;
      case "pip-video":
        requestPictureInPicture();
        break;
      case "pro-features":
        showProFeatures();
        break;
      case "master-center":
        showMasterCenterPanel();
        break;
      case "import":
        showImportPanel();
        break;
      case "cookies":
        showCookiesPanel();
        break;
      case "security":
        showSecurityPanel();
        break;
      case "settings":
        showSettingsPanel();
        break;
      case "ui-center":
        showUiCenterPanel();
        break;
      case "gx-control":
        showGxControlPanel();
        break;
      case "extreme-performance":
        showExtremePerformancePanel();
        break;
      case "toggle-statusbar":
        toggleStatusbar();
        break;
      case "toggle-ram-saver":
        toggleRamSaver();
        break;
    }
  });
});

function showQuickSearch() { hidePanels(); hideAllWebviews(); if (quickSearchPanel) quickSearchPanel.classList.remove("hidden"); setActiveSideButton(quickSearchSideBtn); }
function showNotesPanel() { hidePanels(); hideAllWebviews(); if (notesPanel) notesPanel.classList.remove("hidden"); setActiveSideButton(notesSideBtn); }


// IDEAS_1501_3000_ADDED


// IDEAS_REALES_CATEGORIZADAS_5_0_ADDED



// ================================
// NOVEX 5.0 - Centro UI · Windows 11 + Opera GX
// ================================
const uiCenterSideBtn = document.getElementById("uiCenterSideBtn");
const uiCenterPanel = document.getElementById("uiCenterPanel");
const uiToggleGlassBtn = document.getElementById("uiToggleGlassBtn");
const uiToggleSidebarBtn = document.getElementById("uiToggleSidebarBtn");
const uiToggleDarkBtn = document.getElementById("uiToggleDarkBtn");
const uiToggleSoundsBtn = document.getElementById("uiToggleSoundsBtn");
const uiOpenGxDashboardBtn = document.getElementById("uiOpenGxDashboardBtn");
const uiScaleRange = document.getElementById("uiScaleRange");
const uiScaleLabel = document.getElementById("uiScaleLabel");
const uiResetBtn = document.getElementById("uiResetBtn");
const uiAccentColor = document.getElementById("uiAccentColor");
const uiAccentHex = document.getElementById("uiAccentHex");
const uiBlurRange = document.getElementById("uiBlurRange");
const uiBlurLabel = document.getElementById("uiBlurLabel");
const uiTransparencyRange = document.getElementById("uiTransparencyRange");
const uiTransparencyLabel = document.getElementById("uiTransparencyLabel");
const uiGlowRange = document.getElementById("uiGlowRange");
const uiGlowLabel = document.getElementById("uiGlowLabel");
const uiDensitySelect = document.getElementById("uiDensitySelect");
const uiAnimationLevel = document.getElementById("uiAnimationLevel");
const uiSwatches = document.querySelectorAll(".ui-swatch");

let novexUiConfig = JSON.parse(localStorage.getItem("novexUiConfig") || '{"theme":"wingx","animationLevel":"soft","glass":true}');
if (!novexUiConfig.theme) novexUiConfig.theme = "wingx";
novexUiConfig = {
  theme: "wingx",
  accent: "#ff2f6d",
  blur: 18,
  transparency: 88,
  glow: 55,
  scale: 100,
  density: "normal",
  animationLevel: "soft",
  glass: true,
  sidebarCollapsed: false,
  darkMode: true,
  sounds: false,
  ...novexUiConfig
};

function saveNovexUiConfig() {
  localStorage.setItem("novexUiConfig", JSON.stringify(novexUiConfig));
}

function hexToRgb(hex) {
  const cleaned = (hex || "").replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) return { r: 255, g: 47, b: 109, hex: "#ff2f6d" };
  return {
    r: parseInt(cleaned.slice(0, 2), 16),
    g: parseInt(cleaned.slice(2, 4), 16),
    b: parseInt(cleaned.slice(4, 6), 16),
    hex: `#${cleaned.toLowerCase()}`
  };
}

function applyNovexUiConfig() {
  const theme = novexUiConfig.theme || "wingx";
  const { r, g, b, hex } = hexToRgb(novexUiConfig.accent || "#ff2f6d");
  const blur = Number(novexUiConfig.blur || 18);
  const transparency = Number(novexUiConfig.transparency || 88);
  const glow = Number(novexUiConfig.glow || 55);
  const density = novexUiConfig.density || "normal";
  const animationLevel = novexUiConfig.animationLevel || "soft";
  const scale = Number(novexUiConfig.scale || 100);

  document.body.classList.remove(
    "ui-theme-wingx", "ui-theme-win11", "ui-theme-gx", "ui-theme-night",
    "ui-density-compact", "ui-density-wide",
    "ui-animations-off", "ui-animations-soft", "ui-animations-full"
  );
  document.body.classList.add(`ui-theme-${theme}`);
  if (density !== "normal") document.body.classList.add(`ui-density-${density}`);
  document.body.classList.add(`ui-animations-${animationLevel}`);
  document.body.classList.toggle("ui-no-glass", novexUiConfig.glass === false);
  document.body.classList.toggle("ui-sidebar-collapsed", !!novexUiConfig.sidebarCollapsed);
  document.body.classList.toggle("light-ui", novexUiConfig.darkMode === false);
  document.body.classList.toggle("ui-sounds-on", !!novexUiConfig.sounds);

  document.documentElement.style.fontSize = scale + "%";
  document.documentElement.style.setProperty("--accent-r", String(r));
  document.documentElement.style.setProperty("--accent-g", String(g));
  document.documentElement.style.setProperty("--accent-b", String(b));
  document.documentElement.style.setProperty("--blur-strength", `${blur}px`);
  document.documentElement.style.setProperty("--panel-alpha", (transparency / 100).toFixed(2));
  document.documentElement.style.setProperty("--glow-strength", (glow / 100).toFixed(2));

  document.querySelectorAll(".ui-theme-option").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.uiTheme === theme);
  });

  if (uiAccentColor) uiAccentColor.value = hex;
  if (uiAccentHex) uiAccentHex.value = hex;
  if (uiBlurRange) uiBlurRange.value = String(blur);
  if (uiBlurLabel) uiBlurLabel.textContent = `${blur}px`;
  if (uiTransparencyRange) uiTransparencyRange.value = String(transparency);
  if (uiTransparencyLabel) uiTransparencyLabel.textContent = `${transparency}%`;
  if (uiGlowRange) uiGlowRange.value = String(glow);
  if (uiGlowLabel) uiGlowLabel.textContent = `${glow}%`;
  if (uiScaleRange) uiScaleRange.value = String(scale);
  if (uiScaleLabel) uiScaleLabel.textContent = `${scale}%`;
  if (uiDensitySelect) uiDensitySelect.value = density;
  if (uiAnimationLevel) uiAnimationLevel.value = animationLevel;

  if (uiToggleGlassBtn) uiToggleGlassBtn.textContent = novexUiConfig.glass === false ? "Activar blur premium" : "Quitar blur premium";
  if (uiToggleSidebarBtn) uiToggleSidebarBtn.textContent = novexUiConfig.sidebarCollapsed ? "Expandir sidebar" : "Sidebar compacta";
  if (uiToggleDarkBtn) uiToggleDarkBtn.textContent = novexUiConfig.darkMode === false ? "Modo oscuro" : "Modo claro";
  if (uiToggleSoundsBtn) uiToggleSoundsBtn.textContent = novexUiConfig.sounds ? "Sonidos UI: ON" : "Sonidos UI: OFF";
}

function showUiCenterPanel() {
  hidePanels();
  hideAllWebviews();
  if (uiCenterPanel) uiCenterPanel.classList.remove("hidden");
  if (typeof setActiveSideButton === "function") setActiveSideButton(uiCenterSideBtn);
  
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
}

function playUiClickSound() {
  if (!novexUiConfig.sounds) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 660;
    gain.gain.value = 0.02;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {}
}

if (uiCenterSideBtn) uiCenterSideBtn.addEventListener("click", showUiCenterPanel);
if (dashboardGxBtn) dashboardGxBtn.addEventListener("click", showUiCenterPanel);
if (uiOpenGxDashboardBtn) uiOpenGxDashboardBtn.addEventListener("click", showUiCenterPanel);

document.querySelectorAll(".ui-theme-option").forEach(btn => {
  btn.addEventListener("click", () => {
    novexUiConfig.theme = btn.dataset.uiTheme;
    saveNovexUiConfig();
    
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
    playUiClickSound();
  });
});

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
});

if (uiAccentHex) uiAccentHex.addEventListener("change", () => {
  const value = uiAccentHex.value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(value)) {
    novexUiConfig.accent = value;
    saveNovexUiConfig();
    
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
  }
});

uiSwatches.forEach(btn => btn.addEventListener("click", () => {
  novexUiConfig.accent = btn.dataset.color;
  saveNovexUiConfig();
  
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
  playUiClickSound();
}));

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
});
if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
});
if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
});
if (uiScaleRange) uiScaleRange.addEventListener("input", () => {
  novexUiConfig.scale = Number(uiScaleRange.value);
  saveNovexUiConfig();
  
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
});
if (uiDensitySelect) uiDensitySelect.addEventListener("change", () => {
  novexUiConfig.density = uiDensitySelect.value;
  saveNovexUiConfig();
  
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
});
if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  saveNovexUiConfig();
  
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
});
if (uiToggleGlassBtn) uiToggleGlassBtn.addEventListener("click", () => {
  novexUiConfig.glass = novexUiConfig.glass === false ? true : false;
  saveNovexUiConfig();
  
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
  playUiClickSound();
});
if (uiToggleSidebarBtn) uiToggleSidebarBtn.addEventListener("click", () => {
  novexUiConfig.sidebarCollapsed = !novexUiConfig.sidebarCollapsed;
  saveNovexUiConfig();
  
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
  playUiClickSound();
});
if (uiToggleDarkBtn) uiToggleDarkBtn.addEventListener("click", () => {
  novexUiConfig.darkMode = !(novexUiConfig.darkMode !== false);
  saveNovexUiConfig();
  
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
  playUiClickSound();
});
if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
  playUiClickSound();
});
if (uiResetBtn) uiResetBtn.addEventListener("click", () => {
  novexUiConfig = {
    theme: "wingx",
    accent: "#ff2f6d",
    blur: 18,
    transparency: 88,
    glow: 55,
    scale: 100,
    density: "normal",
    animationLevel: "soft",
    glass: true,
    sidebarCollapsed: false,
    darkMode: true,
    sounds: false
  };
  saveNovexUiConfig();
  
function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();
});

document.querySelectorAll('.menu-hub-action[data-action="ui-center"]').forEach(btn => {
  btn.addEventListener("click", showUiCenterPanel);
});

if (homeToggleRamSaverBtn) homeToggleRamSaverBtn.addEventListener("click", () => toggleRamSaver());
if (homeToggleBatterySaverBtn) homeToggleBatterySaverBtn.addEventListener("click", () => toggleBatterySaver());
if (homeToggleStatusbarBtn) homeToggleStatusbarBtn.addEventListener("click", () => toggleStatusbar());
if (homeOpenAppsBtn) homeOpenAppsBtn.addEventListener("click", () => { if (typeof openMenuHubTab === "function") openMenuHubTab(); });


function playNovexClick() {
  if (!novexUiConfig.sounds) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 480;
    gain.gain.value = 0.025;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 45);
  } catch {}
}

document.addEventListener("click", event => {
  if (event.target.closest("button")) playNovexClick();
}, true);

if (uiAccentColor) uiAccentColor.addEventListener("input", () => {
  novexUiConfig.accent = uiAccentColor.value;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiGlowRange) uiGlowRange.addEventListener("input", () => {
  novexUiConfig.glow = Number(uiGlowRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiBlurRange) uiBlurRange.addEventListener("input", () => {
  novexUiConfig.blur = Number(uiBlurRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiTransparencyRange) uiTransparencyRange.addEventListener("input", () => {
  novexUiConfig.transparency = Number(uiTransparencyRange.value);
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiAnimationLevel) uiAnimationLevel.addEventListener("change", () => {
  novexUiConfig.animationLevel = uiAnimationLevel.value;
  novexUiConfig.animations = uiAnimationLevel.value !== "off";
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiToggleSoundsBtn) uiToggleSoundsBtn.addEventListener("click", () => {
  novexUiConfig.sounds = !novexUiConfig.sounds;
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiApplyWinGxBtn) uiApplyWinGxBtn.addEventListener("click", () => {
  novexUiConfig = {
    ...novexUiConfig,
    theme: "wingx",
    accent: "#ff2f8a",
    glow: 55,
    blur: 20,
    transparency: 82,
    animationLevel: "soft",
    animations: true,
    glass: true
  };
  saveNovexUiConfig();
  applyNovexUiConfig();
});

if (uiOpenGxBtn) uiOpenGxBtn.addEventListener("click", showGxControlPanel);

applyNovexUiConfig();

document.addEventListener("click", event => {
  const target = event.target.closest("button");
  if (!target) return;
  if (target.classList.contains("window-btn") || target.classList.contains("tool-btn") || target.classList.contains("side-btn") || target.classList.contains("settings-action") || target.classList.contains("ui-theme-option") || target.classList.contains("ui-swatch")) {
    playUiClickSound();
  }
}, true);


// ================================
// NOVEX 5.0 - WinGX / GX Control
// ================================
const gxCpuValue = document.getElementById("gxCpuValue");
const gxRamValue = document.getElementById("gxRamValue");
const gxNetValue = document.getElementById("gxNetValue");
const gxRamCap = document.getElementById("gxRamCap");
const gxCpuCap = document.getElementById("gxCpuCap");
const gxBandCap = document.getElementById("gxBandCap");
const gxRamCapLabel = document.getElementById("gxRamCapLabel");
const gxCpuCapLabel = document.getElementById("gxCpuCapLabel");
const gxBandCapLabel = document.getElementById("gxBandCapLabel");
const gxUltraLatencyBtn = document.getElementById("gxUltraLatencyBtn");
const gxPrioritizeActiveBtn = document.getElementById("gxPrioritizeActiveBtn");
const gxSuspendBackgroundBtn = document.getElementById("gxSuspendBackgroundBtn");
const gxMuteAllBtn = document.getElementById("gxMuteAllBtn");
const gxPipBtn = document.getElementById("gxPipBtn");
const gxPauseVideosBtn = document.getElementById("gxPauseVideosBtn");
const gxMediaList = document.getElementById("gxMediaList");
const gxModeStatus = document.getElementById("gxModeStatus");
const homeCpuWidget = document.getElementById("homeCpuWidget");
const homeRamWidget = document.getElementById("homeRamWidget");
const homeGxModeWidget = document.getElementById("homeGxModeWidget");

function showGxControlPanel() {
  hidePanels();
  hideAllWebviews();
  if (gxControlPanel) gxControlPanel.classList.remove("hidden");
  if (typeof setActiveSideButton === "function") setActiveSideButton(gxControlSideBtn);
  updateGxLabels();
  scanMediaTabs();
}

function updateGxLabels() {
  if (gxRamCapLabel && gxRamCap) gxRamCapLabel.textContent = `${gxRamCap.value} GB`;
  if (gxCpuCapLabel && gxCpuCap) gxCpuCapLabel.textContent = `${gxCpuCap.value}%`;
  if (gxBandCapLabel && gxBandCap) gxBandCapLabel.textContent = `${gxBandCap.value} Mbps`;
}

function setGxMode(mode) {
  localStorage.setItem("novexGxMode", mode);
  if (homeGxModeWidget) homeGxModeWidget.textContent = mode;
  if (gxModeStatus) gxModeStatus.textContent = `Modo activo: ${mode}`;

  if (mode === "gaming") {
    if (!ramSaverEnabled) toggleRamSaver();
    document.body.classList.add("ui-wingx-active");
  }

  if (mode === "battery" && typeof toggleBatterySaver === "function" && !batterySaverEnabled) {
    toggleBatterySaver();
  }

  if (mode === "focus" && typeof toggleFocusMode === "function" && !document.body.classList.contains("focus-mode")) {
    toggleFocusMode();
  }
}

function scanMediaTabs() {
  if (!gxMediaList) return;

  const mediaTabs = tabs.filter(tab => {
    const title = (tab.title || "").toLowerCase();
    const url = (tab.url || "").toLowerCase();
    return title.includes("youtube") || url.includes("youtube") || url.includes("spotify") || url.includes("twitch") || url.includes("netflix");
  });

  gxMediaList.innerHTML = mediaTabs.length
    ? mediaTabs.map(tab => `<div class="mini-item"><strong>${tab.title || "Media"}</strong><br>${tab.url || ""}</div>`).join("")
    : "No detecté pestañas multimedia ahora.";
}

function muteAllTabs() {
  tabs.forEach(tab => {
    if (tab.webview) tab.webview.setAudioMuted(true);
  });
  if (gxMediaList) gxMediaList.innerHTML = `<div class="mini-item">Todas las pestañas fueron silenciadas.</div>`;
}

function pauseVideosAllTabs() {
  tabs.forEach(tab => {
    if (tab.webview && tab.url) {
      tab.webview.executeJavaScript(`
        document.querySelectorAll('video,audio').forEach(media => {
          try { media.pause(); } catch(e) {}
        });
      `, true).catch(() => {});
    }
  });
  if (gxMediaList) gxMediaList.innerHTML = `<div class="mini-item">Videos/audio pausados donde la página lo permitió.</div>`;
}

if (gxRamCap) gxRamCap.addEventListener("input", updateGxLabels);
if (gxCpuCap) gxCpuCap.addEventListener("input", updateGxLabels);
if (gxBandCap) gxBandCap.addEventListener("input", updateGxLabels);
if (gxUltraLatencyBtn) gxUltraLatencyBtn.addEventListener("click", () => setGxMode("ultra low latency"));
if (gxPrioritizeActiveBtn) gxPrioritizeActiveBtn.addEventListener("click", () => setGxMode("prioridad activa"));
if (gxSuspendBackgroundBtn) gxSuspendBackgroundBtn.addEventListener("click", () => {
  if (typeof suspendAllInactive === "function") suspendAllInactive();
  if (gxModeStatus) gxModeStatus.textContent = "Pestañas en background suspendidas.";
});
if (gxMuteAllBtn) gxMuteAllBtn.addEventListener("click", muteAllTabs);
if (gxPipBtn) gxPipBtn.addEventListener("click", () => {
  if (typeof requestPictureInPicture === "function") requestPictureInPicture();
});
if (gxPauseVideosBtn) gxPauseVideosBtn.addEventListener("click", pauseVideosAllTabs);
document.querySelectorAll(".gx-mode-btn").forEach(btn => {
  btn.addEventListener("click", () => setGxMode(btn.dataset.gxMode));
});
updateGxLabels();


// ================================
// NOVEX 5.0 - Rendimiento extremo
// ================================
const extremeModeStatus = document.getElementById("extremeModeStatus");
const extremeFpsValue = document.getElementById("extremeFpsValue");
const extremeDomValue = document.getElementById("extremeDomValue");
const extremeModeBtn = document.getElementById("extremeModeBtn");
const ultraLowPowerBtn = document.getElementById("ultraLowPowerBtn");
const dataMinimumBtn = document.getElementById("dataMinimumBtn");
const visibleOnlyBtn = document.getElementById("visibleOnlyBtn");
const fastReadBtn = document.getElementById("fastReadBtn");
const clearExtremeBtn = document.getElementById("clearExtremeBtn");
const disableHeavyCssToggle = document.getElementById("disableHeavyCssToggle");
const removeAnimationsToggle = document.getElementById("removeAnimationsToggle");
const disableAutoplayToggle = document.getElementById("disableAutoplayToggle");
const lazyImagesToggle = document.getElementById("lazyImagesToggle");
const reduceBackgroundToggle = document.getElementById("reduceBackgroundToggle");
const mobileSitesToggle = document.getElementById("mobileSitesToggle");
const applyManualPerfBtn = document.getElementById("applyManualPerfBtn");
const savePerfRuleBtn = document.getElementById("savePerfRuleBtn");
const runPerfDiagnosticBtn = document.getElementById("runPerfDiagnosticBtn");
const rankHeavyTabsBtn = document.getElementById("rankHeavyTabsBtn");
const applyProgressiveOptBtn = document.getElementById("applyProgressiveOptBtn");
const perfDiagnosticBox = document.getElementById("perfDiagnosticBox");
const perfRulesList = document.getElementById("perfRulesList");

let extremePerfRules = JSON.parse(localStorage.getItem("novexExtremePerfRules") || "{}");
let fpsLastTime = performance.now();
let fpsFrames = 0;
let fpsCurrent = 0;

function showExtremePerformancePanel() {
  hidePanels();
  hideAllWebviews();
  if (extremePerformancePanel) extremePerformancePanel.classList.remove("hidden");
  if (typeof setActiveSideButton === "function") setActiveSideButton(extremePerfSideBtn);
  renderPerfRules();
  updateExtremeDomCount();
}

function currentPerfDomain() {
  try {
    const url = currentTab()?.url || "";
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "inicio";
  }
}

function setExtremeModeStatus(text) {
  if (extremeModeStatus) extremeModeStatus.textContent = text;
}

function buildExtremeScript(options) {
  const opts = JSON.stringify(options);
  return `
    (() => {
      const options = ${opts};
      window.__novexExtremeOptions = options;

      let style = document.getElementById('novex-extreme-performance-style');
      if (!style) {
        style = document.createElement('style');
        style.id = 'novex-extreme-performance-style';
        document.head.appendChild(style);
      }

      const css = [];

      if (options.disableHeavyCss || options.removeAnimations || options.ultra || options.lowPower) {
        css.push(\`
          *, *::before, *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
          [style*="filter"], [style*="backdrop-filter"] {
            filter: none !important;
            backdrop-filter: none !important;
          }
          * {
            text-shadow: none !important;
            box-shadow: none !important;
          }
        \`);
      }

      if (options.visibleOnly || options.dataMinimum) {
        css.push(\`
          iframe:not(:hover) {
            visibility: hidden !important;
          }
          img {
            content-visibility: auto !important;
            contain-intrinsic-size: 320px 180px !important;
          }
          section, article, div {
            content-visibility: auto;
            contain-intrinsic-size: 600px 400px;
          }
        \`);
      }

      if (options.fastRead) {
        css.push(\`
          body {
            line-height: 1.7 !important;
          }
          article, main, [role="main"] {
            max-width: 980px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          aside, nav, footer, header, [class*="ad"], [id*="ad"], iframe {
            display: none !important;
          }
        \`);
      }

      if (options.dataMinimum) {
        css.push(\`
          video, iframe, canvas, svg {
            max-height: 260px !important;
          }
          img {
            filter: saturate(0.85) contrast(0.95) !important;
          }
        \`);
      }

      style.textContent = css.join('\\n');

      if (options.disableAutoplay || options.ultra || options.lowPower) {
        document.querySelectorAll('video,audio').forEach(media => {
          try {
            media.pause();
            media.autoplay = false;
            media.preload = 'none';
          } catch(e) {}
        });
      }

      if (options.lazyImages || options.dataMinimum || options.ultra) {
        document.querySelectorAll('img,iframe').forEach(el => {
          try {
            el.loading = 'lazy';
            el.decoding = 'async';
            el.fetchPriority = 'low';
          } catch(e) {}
        });
      }

      return {
        nodes: document.querySelectorAll('*').length,
        images: document.images.length,
        scripts: document.scripts.length,
        iframes: document.querySelectorAll('iframe').length,
        videos: document.querySelectorAll('video,audio').length
      };
    })();
  `;
}

async function applyExtremeOptions(options, label = "Rendimiento extremo") {
  const tab = currentTab();
  if (!tab || !tab.webview || !tab.url) {
    if (perfDiagnosticBox) perfDiagnosticBox.textContent = "No hay página activa para optimizar.";
    return;
  }

  document.body.classList.add("extreme-performance-active");

  if (options.mobile && tab.webview.setUserAgent) {
    try {
      tab.webview.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1");
      tab.webview.reload();
    } catch {}
  }

  try {
    const result = await tab.webview.executeJavaScript(buildExtremeScript(options), true);
    setExtremeModeStatus(label);
    if (extremeDomValue && result?.nodes) extremeDomValue.textContent = result.nodes;
    if (perfDiagnosticBox) {
      perfDiagnosticBox.textContent =
        `${label} aplicado.\n\n` +
        `Nodos DOM: ${result.nodes}\n` +
        `Imágenes: ${result.images}\n` +
        `Scripts: ${result.scripts}\n` +
        `Iframes: ${result.iframes}\n` +
        `Media: ${result.videos}\n\n` +
        `Consejo: si la página sigue lenta, usa "Datos mínimos" o "Lectura rápida".`;
    }
  } catch (error) {
    if (perfDiagnosticBox) perfDiagnosticBox.textContent = "No pude aplicar la optimización en esta página.";
  }
}

async function clearExtremeOptimizations() {
  const tab = currentTab();
  document.body.classList.remove("extreme-performance-active");

  if (tab?.webview) {
    try {
      await tab.webview.executeJavaScript(`
        document.getElementById('novex-extreme-performance-style')?.remove();
        window.__novexExtremeOptions = null;
      `, true);
    } catch {}
  }

  setExtremeModeStatus("Balanceado");
  if (perfDiagnosticBox) perfDiagnosticBox.textContent = "Optimizaciones quitadas en la pestaña actual.";
}

async function runPerfDiagnostic() {
  const tab = currentTab();
  if (!tab?.webview || !tab.url) {
    if (perfDiagnosticBox) perfDiagnosticBox.textContent = "No hay página activa.";
    return;
  }

  try {
    const result = await tab.webview.executeJavaScript(`
      (() => {
        const nodes = document.querySelectorAll('*').length;
        const images = document.images.length;
        const scripts = document.scripts.length;
        const styles = document.styleSheets.length;
        const iframes = document.querySelectorAll('iframe').length;
        const videos = document.querySelectorAll('video,audio').length;
        const heavy = [];
        if (nodes > 2500) heavy.push('DOM grande');
        if (images > 80) heavy.push('Muchas imágenes');
        if (scripts > 80) heavy.push('Muchos scripts');
        if (iframes > 8) heavy.push('Muchos iframes');
        if (videos > 3) heavy.push('Mucho contenido multimedia');
        return { nodes, images, scripts, styles, iframes, videos, heavy };
      })();
    `, true);

    if (extremeDomValue) extremeDomValue.textContent = result.nodes;
    if (perfDiagnosticBox) {
      perfDiagnosticBox.textContent =
        `Diagnóstico de rendimiento\n\n` +
        `Nodos DOM: ${result.nodes}\n` +
        `Imágenes: ${result.images}\n` +
        `Scripts: ${result.scripts}\n` +
        `Hojas CSS: ${result.styles}\n` +
        `Iframes: ${result.iframes}\n` +
        `Media: ${result.videos}\n\n` +
        `Cuellos detectados: ${result.heavy.length ? result.heavy.join(", ") : "ninguno fuerte"}\n\n` +
        `Recomendación: ${result.heavy.length ? "usa Optimización automática progresiva." : "modo balanceado suficiente."}`;
    }
  } catch {
    if (perfDiagnosticBox) perfDiagnosticBox.textContent = "No pude diagnosticar esta página.";
  }
}

async function rankHeavyTabs() {
  const rows = [];

  for (const tab of tabs) {
    if (!tab.webview || !tab.url || tab.unloaded) {
      rows.push({ title: tab.title || "Pestaña", score: 0, url: tab.url || "Inicio" });
      continue;
    }

    try {
      const r = await tab.webview.executeJavaScript(`
        (() => ({
          nodes: document.querySelectorAll('*').length,
          images: document.images.length,
          scripts: document.scripts.length,
          iframes: document.querySelectorAll('iframe').length,
          media: document.querySelectorAll('video,audio').length
        }))();
      `, true);
      const score = r.nodes + r.images * 15 + r.scripts * 20 + r.iframes * 80 + r.media * 120;
      rows.push({ title: tab.title || "Pestaña", score, url: tab.url });
    } catch {
      rows.push({ title: tab.title || "Pestaña", score: 0, url: tab.url || "" });
    }
  }

  rows.sort((a, b) => b.score - a.score);

  if (perfDiagnosticBox) {
    perfDiagnosticBox.innerHTML =
      `<strong>Ranking de pestañas más pesadas</strong><br><br>` +
      rows.map((row, i) =>
        `${i + 1}. ${row.title}<br>Score: ${row.score}<br><small>${row.url}</small>`
      ).join("<br><br>");
  }
}

function getManualPerfOptions() {
  return {
    disableHeavyCss: !!disableHeavyCssToggle?.checked,
    removeAnimations: !!removeAnimationsToggle?.checked,
    disableAutoplay: !!disableAutoplayToggle?.checked,
    lazyImages: !!lazyImagesToggle?.checked,
    reduceBackground: !!reduceBackgroundToggle?.checked,
    mobile: !!mobileSitesToggle?.checked
  };
}

function savePerfRuleForDomain() {
  const domain = currentPerfDomain();
  extremePerfRules[domain] = getManualPerfOptions();
  localStorage.setItem("novexExtremePerfRules", JSON.stringify(extremePerfRules));
  renderPerfRules();
  if (perfDiagnosticBox) perfDiagnosticBox.textContent = `Regla guardada para ${domain}.`;
}

function renderPerfRules() {
  if (!perfRulesList) return;

  const entries = Object.entries(extremePerfRules);
  if (!entries.length) {
    perfRulesList.innerHTML = "Sin reglas guardadas todavía.";
    return;
  }

  perfRulesList.innerHTML = entries.map(([domain, options]) => `
    <div class="mini-item">
      <strong>${domain}</strong><br>
      ${Object.entries(options).filter(([k,v]) => v).map(([k]) => k).join(", ") || "balanceado"}
    </div>
  `).join("");
}

function applyPerfProfile(profile) {
  const profiles = {
    ultra: { disableHeavyCss: true, removeAnimations: true, disableAutoplay: true, lazyImages: true, reduceBackground: true, ultra: true },
    stable: { disableHeavyCss: true, removeAnimations: true, disableAutoplay: true, lazyImages: true },
    balanced: { disableHeavyCss: false, removeAnimations: true, disableAutoplay: true, lazyImages: true },
    laptop: { disableHeavyCss: true, removeAnimations: true, disableAutoplay: true, lazyImages: true, lowPower: true }
  };

  const labels = {
    ultra: "Ultra rápido",
    stable: "Estable",
    balanced: "Balanceado optimizado",
    laptop: "Optimizado para laptop"
  };

  applyExtremeOptions(profiles[profile] || profiles.balanced, labels[profile] || "Balanceado");
}

function tickFpsMeter(now) {
  fpsFrames++;
  if (now - fpsLastTime >= 1000) {
    fpsCurrent = fpsFrames;
    fpsFrames = 0;
    fpsLastTime = now;
    if (extremeFpsValue) extremeFpsValue.textContent = String(fpsCurrent);
  }
  requestAnimationFrame(tickFpsMeter);
}

function updateExtremeDomCount() {
  const tab = currentTab();
  if (!tab?.webview || !tab.url || !extremeDomValue) return;
  tab.webview.executeJavaScript(`document.querySelectorAll('*').length`, true)
    .then(nodes => { extremeDomValue.textContent = String(nodes); })
    .catch(() => {});
}

if (extremeModeBtn) extremeModeBtn.addEventListener("click", () => applyExtremeOptions({ disableHeavyCss: true, removeAnimations: true, disableAutoplay: true, lazyImages: true }, "Rendimiento extremo"));
if (ultraLowPowerBtn) ultraLowPowerBtn.addEventListener("click", () => applyExtremeOptions({ disableHeavyCss: true, removeAnimations: true, disableAutoplay: true, lazyImages: true, lowPower: true }, "Ultra bajo consumo"));
if (dataMinimumBtn) dataMinimumBtn.addEventListener("click", () => applyExtremeOptions({ disableHeavyCss: true, removeAnimations: true, disableAutoplay: true, lazyImages: true, dataMinimum: true }, "Datos mínimos"));
if (visibleOnlyBtn) visibleOnlyBtn.addEventListener("click", () => applyExtremeOptions({ visibleOnly: true, lazyImages: true, disableAutoplay: true }, "Solo lo visible"));
if (fastReadBtn) fastReadBtn.addEventListener("click", () => applyExtremeOptions({ fastRead: true, removeAnimations: true, disableAutoplay: true }, "Lectura rápida"));
if (clearExtremeBtn) clearExtremeBtn.addEventListener("click", clearExtremeOptimizations);
if (applyManualPerfBtn) applyManualPerfBtn.addEventListener("click", () => applyExtremeOptions(getManualPerfOptions(), "Optimización manual"));
if (savePerfRuleBtn) savePerfRuleBtn.addEventListener("click", savePerfRuleForDomain);
if (runPerfDiagnosticBtn) runPerfDiagnosticBtn.addEventListener("click", runPerfDiagnostic);
if (rankHeavyTabsBtn) rankHeavyTabsBtn.addEventListener("click", rankHeavyTabs);
if (applyProgressiveOptBtn) applyProgressiveOptBtn.addEventListener("click", async () => {
  await runPerfDiagnostic();
  await applyExtremeOptions({ disableHeavyCss: true, removeAnimations: true, disableAutoplay: true, lazyImages: true, visibleOnly: true }, "Optimización progresiva");
});
document.querySelectorAll(".perf-profile-btn").forEach(btn => {
  btn.addEventListener("click", () => applyPerfProfile(btn.dataset.perfProfile));
});
requestAnimationFrame(tickFpsMeter);
renderPerfRules();


function showMenuHubPanelDirect() {
  hidePanels();
  hideAllWebviews();
  if (menuHubPanel) menuHubPanel.classList.remove("hidden");
  if (typeof setActiveSideButton === "function") setActiveSideButton(document.getElementById("toolsGroupToggleBtn"));
}


// NOVEX_UI_POLISH_FINAL_SAFE_EVENTS
document.addEventListener("DOMContentLoaded", () => {
  const appsBtn = document.getElementById("toolsGroupToggleBtn");
  if (appsBtn) {
    appsBtn.onclick = () => {
      if (typeof openMenuHubTab === "function") openMenuHubTab();
      else if (typeof showMenuHubPanelDirect === "function") showMenuHubPanelDirect();
    };
  }

  const homeApps = document.getElementById("homeOpenAppsBtn");
  if (homeApps) {
    homeApps.onclick = () => {
      if (typeof openMenuHubTab === "function") openMenuHubTab();
      else if (typeof showMenuHubPanelDirect === "function") showMenuHubPanelDirect();
    };
  }

  const dashGx = document.getElementById("dashboardGxBtn");
  if (dashGx) {
    dashGx.onclick = () => {
      if (typeof showUiCenterPanel === "function") showUiCenterPanel();
    };
  }
});
