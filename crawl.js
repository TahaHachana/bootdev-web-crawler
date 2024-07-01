function normalizeURL(url) {
  const urlObj = new URL(url);
  return urlObj.host + urlObj.pathname.replace(/\/$/, "");
}

export { normalizeURL };
