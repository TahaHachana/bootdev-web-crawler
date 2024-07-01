import { JSDOM } from "jsdom";

function normalizeURL(url) {
  const urlObj = new URL(url);
  return urlObj.host + urlObj.pathname.replace(/\/$/, "");
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const urls = Array.from(dom.window.document.querySelectorAll("a")).map(
    (a) => a.href
  );
  return urls.map((url) => new URL(url, baseURL).href);
}

export { normalizeURL, getURLsFromHTML };
