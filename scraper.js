import puppeteer from "puppeteer";
import fs from "fs/promises";

const scrapeJobDetails = async (page, jobLink) => {
  const selectors = {
    title: "h1.topcard__title",
    company: "[href^='https://www.linkedin.com/company/']",
    location: ".topcard__flavor.topcard__flavor--bullet",
    description: "section.show-more-less-html",
  };

  // Navigate to the job's page
  await page.goto(jobLink, { waitUntil: "domcontentloaded" });

  // Wait for a certain period to ensure details are loaded
  await page.waitForTimeout(5000);

  // Extract job details
  const title = await page.$eval(selectors.title, (el) => el.textContent.trim());
  const company = await page.$eval(selectors.company, (el) => el.textContent.trim());
  const location = await page.$eval(selectors.location, (el) => el.textContent.trim());
  const description = await page.$eval(selectors.description, (el) =>
    el.textContent
      .replace(/\s+/g, " ")
      .replace(/\b(Show more|Show less)\b/g, "")
      .trim()
  );

  return {
    title,
    company,
    location,
    description,
  };
};

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const searchTerm = "Web Developer";

  // Navigate to the LinkedIn job search page with the specified search term
  await page.goto(`https://www.linkedin.com/jobs/search/?keywords=${searchTerm}`);

  // Extract job links from the starting page
  const jobLinks = await page.$$eval("a.base-card__full-link", (links) => links.map((a) => a.href));

  // Array to store job listing details
  const jobDetails = [];

  // Iterate through job links and scrape details
  for (const jobLink of jobLinks) {
    const details = await scrapeJobDetails(page, jobLink);
    jobDetails.push(details);
  }

  // Close the browser
  await browser.close();

  // Save the scraped job data to a JSON file
  try {
    // Convert jobDetails to JSON and write it to "jobData.json" asynchronously
    await fs.writeFile("jobData.json", JSON.stringify(jobDetails, null, 2, "utf-8"));
    console.log("Data scraped and saved to jobData.json");
  } catch (error) {
    console.error(`Error writing to jobData.json: ${error}`);
  }
  console.log("Data scraped and saved to jobData.json");
})();
