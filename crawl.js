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

function onSameDomain(url1, url2) {
  const urlObj1 = new URL(url1);
  const urlObj2 = new URL(url2);
  return urlObj1.host === urlObj2.host;
}

async function fetchURL(url) {
  console.log(`Fetching ${url}`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`Failed to fetch ${url}`);
      return;
    }
    if (!response.headers.get("content-type").includes("text/html")) {
      console.log(`Skipping non-HTML page ${url}`);
      return;
    }
    const htmlBody = await response.text();
    return htmlBody;
  } catch (error) {
    console.error(`Error fetching or processing ${url}:`, error);
  }
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  if (!onSameDomain(baseURL, currentURL)) {
    return pages;
  }

  const currentURLNormalized = normalizeURL(currentURL);

  if (pages[currentURLNormalized]) {
    pages[currentURLNormalized] += 1;
    return pages;
  }

  pages[currentURLNormalized] = 1;

  try {
    const htmlBody = await fetchURL(currentURL);
    if (!htmlBody) {
      return pages;
    }
    const urls = getURLsFromHTML(htmlBody, baseURL);
    for (const url of urls) {
      await crawlPage(baseURL, url, pages);
    }
  } catch (error) {
    console.error(`Error crawling ${currentURL}:`, error);
  }

  return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
