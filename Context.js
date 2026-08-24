var modifier = (text) => {
  var original = String(text == null ? "" : text);
  try {
    var nextText = lcContextPass(original);
    if (typeof nextText !== "string" || !nextText.length) return { text: original };
    return { text: nextText };
  } catch (e) {
    lcLog("Context error: " + (e && e.message ? e.message : e));
    try {
      var cfg = lcParseConfig();
      var lcState = state && (state.chronicleCodex || state.livingCodex);
      if (lcState) lcState.pendingTask = null;
      lcApplyMemoryOverrides(cfg);
      lcEnsureMemoryMirror(cfg);
    } catch (_) {}
    return { text: original };
  }
};

modifier(text);
