import { argv } from "node:process";
import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
  // argv length
  const length = argv.length;
  if (length < 3) {
    console.log("No arguments provided");
    return;
  }
  if (length > 3) {
    console.log("Too many arguments provided");
    return;
  }
  console.log(`Starting crawl from ${argv[2]}`);
  const pages = await crawlPage(argv[2]);
  printReport(pages);
}

main();
