var modifier = (text) => {
  var original = String(text == null ? "" : text);
  try {
    var nextText = lcOutputPass(original);
    if (typeof nextText !== "string" || !nextText.length) nextText = "\u200B";
    return { text: nextText };
  } catch (e) {
    lcLog("Output error: " + (e && e.message ? e.message : e));
    var cleaned = original;
    try {
      cleaned = typeof lcStripDataBlocks === "function" ? lcStripDataBlocks(original) : original;
    } catch (_) {
      cleaned = original;
    }
    cleaned = String(cleaned || "")
      .replace(/<(?:CHRONICLE|LIVING)_CODEX_DATA>[\s\S]*?<\/(?:CHRONICLE|LIVING)_CODEX_DATA>/gi, "")
      .replace(/<(?:CHRONICLE|LIVING)_CODEX_DATA>[\s\S]*$/gi, "")
      .replace(/\[\[?(?:CHRONICLE|LIVING)_CODEX_DATA\]?\][\s\S]*?\[\[?\/(?:CHRONICLE|LIVING)_CODEX_DATA\]?\]/gi, "")
      .replace(/<(?:CHRONICLE|LIVING)_CODEX_COMMAND_ACK\s*\/?\s*>/gi, "")
      .replace(/\s+$/g, "");
    try {
      var lcState = state && (state.chronicleCodex || state.livingCodex);
      if (lcState) {
        lcState.pendingTask = null;
        lcState.commandConsume = null;
      }
    } catch (_) {}
    if (!cleaned.trim()) cleaned = "\u200B";
    return { text: cleaned };
  }
};

modifier(text);
