var modifier = (text) => {
  var original = String(text == null ? "" : text);
  try {
    lcEnsureState();
    lcClearOwnMessage();
    var cfg = lcParseConfig();
    var result = lcHandleCommand(original, cfg);
    if (!result) return { text: original };

    // AI Dungeon currently treats stop:true from onInput as a script failure.
    // Consume local commands through the control-action handshake instead.
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
    lcLog("Input error: " + (e && e.message ? e.message : e));
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
