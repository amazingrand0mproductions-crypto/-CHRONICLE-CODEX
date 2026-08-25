var modifier = (text) => {
  var original = String(text == null ? "" : text);
  try {
    var nextText = lcContextPass(original);
    return { text: typeof nextText === "string" && nextText.length ? nextText : original };
  } catch (e) {
    try { lcLog("Context error: " + (e && e.message ? e.message : e)); } catch (_) {}
    try {
      var lcState = state && (state.chronicleCodex || state.livingCodex);
      if (lcState) {
        lcState.pendingTask = null;
        lcState.forcedTask = null;
        lcState.commandConsume = null;
      }
      var cfg = lcParseConfig();
      lcApplyMemoryOverrides(cfg);
      lcEnsureMemoryMirror(cfg);
    } catch (_) {}
    // Never sacrifice the normal model context because maintenance failed.
    return { text: original };
  }
};

modifier(text);
