
/*
  NOVEX REAL UI JS - ESPAÑOL + STATS REALES
  No borra IDs. Conecta accesos, clima, hora 12h, productividad y uso.
*/
(function () {
  function $(id) { return document.getElementById(id); }

  const sessionStart = Date.now();
  let usefulActions = Number(localStorage.getItem("novexUsefulActions") || "0");

  function showPanel(panel) {
    document.querySelectorAll(".side-panel").forEach(p => p.classList.add("hidden"));
    document.querySelectorAll("webview").forEach(w => w.classList.add("webview-hidden"));
    const start = $("startPage");
    if (start) start.classList.add("hidden");
    if (panel) panel.classList.remove("hidden");
  }

  function openAppsAndTools() {
    if (typeof window.openMenuHubTab === "function") {
      window.openMenuHubTab();
      return;
    }
    const panel = $("menuHubPanel");
    if (panel) showPanel(panel);
  }

  function openUrl(url) {
    if (!url) return;
    usefulActions += 1;
    localStorage.setItem("novexUsefulActions", String(usefulActions));

    if (typeof window.showBrowser === "function") {
      window.showBrowser(url);
      return;
    }

    if (typeof showBrowser === "function") {
      showBrowser(url);
      return;
    }

    const urlInput = $("urlInput");
    const go = $("go");
    if (urlInput && go) {
      urlInput.value = url;
      go.click();
    }
  }

  function connectSmartShortcuts() {
    document.addEventListener("click", function (event) {
      const card = event.target.closest(".quick-card[data-url]");
      if (!card) return;
      event.preventDefault();
      event.stopPropagation();
      openUrl(card.dataset.url);
    }, true);
  }

  function openGx() {
    if (typeof window.showGxControlPanel === "function") window.showGxControlPanel();
    else if (typeof showGxControlPanel === "function") showGxControlPanel();
    else showPanel($("gxControlPanel"));
  }

  function connectButtons() {
    const toolsBtn = $("toolsGroupToggleBtn");
    if (toolsBtn) {
      toolsBtn.textContent = "🧩";
      toolsBtn.title = "Apps y herramientas";
      toolsBtn.onclick = openAppsAndTools;
    }

    const appsBtn = $("homeOpenAppsBtn");
    if (appsBtn) appsBtn.onclick = openAppsAndTools;

    const gxBtn = $("dashboardGxBtn");
    if (gxBtn) gxBtn.onclick = openGx;

    const ramBtn = $("homeToggleRamSaverBtn");
    if (ramBtn) ramBtn.onclick = () => {
      if (typeof window.toggleRamSaver === "function") window.toggleRamSaver();
      else if (typeof toggleRamSaver === "function") toggleRamSaver();
    };

    const batteryBtn = $("homeToggleBatterySaverBtn");
    if (batteryBtn) batteryBtn.onclick = () => {
      if (typeof window.toggleBatterySaver === "function") window.toggleBatterySaver();
      else if (typeof toggleBatterySaver === "function") toggleBatterySaver();
    };

    const statusBtn = $("homeToggleStatusbarBtn");
    if (statusBtn) statusBtn.onclick = () => {
      if (typeof window.toggleStatusbar === "function") window.toggleStatusbar();
      else if (typeof toggleStatusbar === "function") toggleStatusbar();
    };
  }

  function formatBytesLocal(bytes) {
    if (!bytes || bytes <= 0) return "0 MB";
    const gb = bytes / (1024 ** 3);
    if (gb >= 1) return gb.toFixed(1) + " GB";
    return Math.round(bytes / (1024 ** 2)) + " MB";
  }

  function format12hUTCMinus4() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const utcMinus4 = new Date(utc - 4 * 60 * 60000);

    let h = utcMinus4.getHours();
    const m = String(utcMinus4.getMinutes()).padStart(2, "0");
    const s = String(utcMinus4.getSeconds()).padStart(2, "0");
    const ap = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${m}:${s} ${ap}`;
  }

  async function updateSystemCards() {
    try {
      if (window.novexSystem && window.novexSystem.getStats) {
        const stats = await window.novexSystem.getStats();

        const cpu = `${stats.cpu ?? 0}%`;
        const ram = `${formatBytesLocal(stats.ramUsed)} / ${formatBytesLocal(stats.ramTotal)}`;
        const app = formatBytesLocal(stats.appRam);

        if ($("homeCpuStatus")) $("homeCpuStatus").textContent = cpu;
        if ($("homeRamStatus")) $("homeRamStatus").textContent = ram;
        if ($("homeAppRamStatus")) $("homeAppRamStatus").textContent = app;

        if ($("homeGpuStatus")) {
          const gpu = stats.gpuRam && stats.gpuRam > 0
            ? formatBytesLocal(stats.gpuRam)
            : (stats.gpuCpu && stats.gpuCpu > 0 ? `${stats.gpuCpu}%` : "N/D");
          $("homeGpuStatus").textContent = gpu;
        }

        if ($("cpuStatus")) $("cpuStatus").textContent = `CPU: ${cpu}`;
        if ($("ramStatus")) $("ramStatus").textContent = `RAM: ${ram}`;
        if ($("appRamStatus")) $("appRamStatus").textContent = `Novex: ${app}`;
      }
    } catch (error) {
      if ($("homeCpuStatus")) $("homeCpuStatus").textContent = "N/D";
    }

    const time = format12hUTCMinus4();
    if ($("homeTimeStatus")) $("homeTimeStatus").textContent = time;
    if ($("timeStatus")) $("timeStatus").textContent = `UTC-4: ${time}`;
  }

  function formatDuration(ms) {
    const totalMin = Math.max(0, Math.floor(ms / 60000));
    const hours = Math.floor(totalMin / 60);
    const minutes = totalMin % 60;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }

  function updateUsageAndProductivity() {
    const elapsed = Date.now() - sessionStart;
    const minutes = Math.floor(elapsed / 60000);
    const goalMinutes = 120;
    const pct = Math.min(100, Math.round((minutes / goalMinutes) * 100));

    if ($("browserUsageTime")) $("browserUsageTime").textContent = formatDuration(elapsed);
    if ($("browserUsageCompare")) $("browserUsageCompare").textContent = "Sesión actual";

    if ($("focusTimeValue")) $("focusTimeValue").textContent = formatDuration(elapsed);
    if ($("usefulActionsValue")) $("usefulActionsValue").textContent = String(usefulActions);
    if ($("dailyGoalValue")) $("dailyGoalValue").textContent = `${pct}%`;
    if ($("productivityProgress")) $("productivityProgress").style.width = `${pct}%`;
  }

  async function updateWeather() {
    const temp = $("weatherTemp");
    const desc = $("weatherDesc");
    const meta = $("weatherMeta");
    if (!temp || !desc || !meta) return;

    const city = localStorage.getItem("novexWeatherCity") || "Santo Domingo";

    try {
      const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`, { cache: "no-store" });
      if (!res.ok) throw new Error("weather failed");
      const data = await res.json();
      const current = data.current_condition && data.current_condition[0];
      const weather = data.weather && data.weather[0];

      const t = current ? current.temp_C : "--";
      const text = current && current.lang_es && current.lang_es[0]
        ? current.lang_es[0].value
        : (current && current.weatherDesc && current.weatherDesc[0] ? current.weatherDesc[0].value : "Clima disponible");

      const max = weather ? weather.maxtempC : "--";
      const min = weather ? weather.mintempC : "--";
      const humidity = current ? current.humidity : "--";

      temp.textContent = `${t}°C`;
      desc.textContent = text;
      meta.textContent = `${city} · Máx ${max}° · Mín ${min}° · Humedad ${humidity}%`;
    } catch (error) {
      temp.textContent = "23°C";
      desc.textContent = "Clima no disponible ahora";
      meta.textContent = `${city} · revisa conexión a internet`;
    }
  }

  function boot() {
    document.body.classList.add("real-ui-active", "wingx-code-ui");
    connectButtons();
    connectSmartShortcuts();
    updateSystemCards();
    updateUsageAndProductivity();
    updateWeather();

    setInterval(updateSystemCards, 2000);
    setInterval(updateUsageAndProductivity, 1000 * 15);
    setInterval(updateWeather, 1000 * 60 * 20);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();



// =========================================================
// NOVEX FIX - CLICS EN PANTALLA DE INICIO
// Delegación global para que los Smart Shortcuts siempre abran.
// =========================================================
(function () {
  function $(id) {
    return document.getElementById(id);
  }

  function ensureHomeClickable() {
    const start = $("startPage");
    const webviews = $("webviewsContainer");

    if (start && !start.classList.contains("hidden")) {
      start.style.pointerEvents = "auto";
      start.style.zIndex = "50";

      if (webviews) {
        webviews.style.pointerEvents = "none";
        webviews.style.opacity = "0";
        webviews.style.visibility = "hidden";
        webviews.style.zIndex = "1";
      }
    }
  }

  function restoreWebviewClicks() {
    const start = $("startPage");
    const webviews = $("webviewsContainer");

    if (start && start.classList.contains("hidden") && webviews) {
      webviews.style.pointerEvents = "auto";
      webviews.style.opacity = "1";
      webviews.style.visibility = "visible";
      webviews.style.zIndex = "20";
    }
  }

  function openNovexUrl(url) {
    if (!url) return;

    try {
      if (typeof window.showBrowser === "function") {
        window.showBrowser(url);
        return;
      }
    } catch {}

    try {
      if (typeof showBrowser === "function") {
        showBrowser(url);
        return;
      }
    } catch {}

    const input = $("urlInput");
    const go = $("go");

    if (input && go) {
      input.value = url;
      go.click();
    } else {
      window.location.href = url;
    }
  }

  document.addEventListener("click", function (event) {
    const quickCard = event.target.closest(".quick-card[data-url]");
    if (quickCard) {
      event.preventDefault();
      event.stopPropagation();
      openNovexUrl(quickCard.dataset.url);
      setTimeout(restoreWebviewClicks, 120);
      return;
    }

    const searchBtn = event.target.closest(".real-search-btn");
    if (searchBtn) {
      event.preventDefault();
      event.stopPropagation();
      const searchInput = $("homeSearchInput");
      const value = searchInput ? searchInput.value.trim() : "";
      if (value) {
        const isUrl = value.includes(".") && !value.includes(" ");
        openNovexUrl(isUrl ? (value.startsWith("http") ? value : "https://" + value) : "https://www.google.com/search?q=" + encodeURIComponent(value));
        setTimeout(restoreWebviewClicks, 120);
      }
    }
  }, true);

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Enter") return;
    const active = document.activeElement;
    if (!active || active.id !== "homeSearchInput") return;

    event.preventDefault();
    const value = active.value.trim();
    if (!value) return;

    const isUrl = value.includes(".") && !value.includes(" ");
    openNovexUrl(isUrl ? (value.startsWith("http") ? value : "https://" + value) : "https://www.google.com/search?q=" + encodeURIComponent(value));
    setTimeout(restoreWebviewClicks, 120);
  }, true);

  const homeBtn = $("homeSideBtn");
  if (homeBtn) {
    homeBtn.addEventListener("click", function () {
      setTimeout(ensureHomeClickable, 80);
    }, true);
  }

  setInterval(ensureHomeClickable, 600);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureHomeClickable);
  } else {
    ensureHomeClickable();
  }
})();
