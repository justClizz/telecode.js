module.exports = {
  escapeRegex: function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  },
  check: function check(n, theFuncs) {
    return [n].some((v) => theFuncs.indexOf(v) >= 0);
  }
}
