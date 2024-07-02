function sortPages(pages) {
    return Object.entries(pages)
        .sort((a, b) => b[1] - a[1])
        .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
}

function printReport(pages) {
    console.log("Crawl complete");
    sortPages(pages)
    Object.entries(pages).forEach(([url, count]) => {
      let occurenceStr;
      occurenceStr = count === 1 ? "occurrence" : "occurrences";
      console.log(`Found ${count} ${occurenceStr} of ${url}`);
    });
}

export { printReport };