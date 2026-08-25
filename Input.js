var modifier = (text) => {
  var original = String(text == null ? "" : text);
  try {
    lcBeginPass();
    lcEnsureState();
    lcClearOwnMessage();
    var cfg = lcParseConfig();
    var result = lcHandleCommand(original, cfg);
    if (!result) return { text: original };

    // AI Dungeon does not reliably support stop:true for this use case. Local
    // commands therefore use a one-generation control handshake instead.
    if (result.stop) {
      var lc = lcEnsureState();
      lc.commandConsume = { actionCount: lcCurrentActionCount() };
      lc.pendingTask = null;
      lc.forcedTask = null;
      try { lcEnsureStatusCard(cfg); } catch (_) {}
      return { text: LC_CONTROL_REQUEST };
    }

    var nextText = result.text == null ? original : String(result.text);
    return { text: nextText || original };
  } catch (e) {
    try { lcLog("Input error: " + (e && e.message ? e.message : e)); } catch (_) {}
    try {
      var lcState = state && (state.chronicleCodex || state.livingCodex);
      if (lcState) {
        lcState.forcedTask = null;
        lcState.pendingTask = null;
        lcState.commandConsume = null;
      }
    } catch (_) {}
    return { text: original };
  }
};

modifier(text);
