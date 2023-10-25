import puppeteer from "puppeteer";

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();
  const searchTerm = "Web devloper";

  // Go to LinkedIn job search page
  await page.goto(
    `https://www.linkedin.com/jobs/search/?keywords=${searchTerm}`
  );

  // Wait for the job listings to load
  await page.waitForSelector(".jobs-search__results-list li", {
    visible: true,
  });

  // Extract job details
  const jobList = await page.evaluate(() => {
    const jobElements = document.querySelectorAll(
      ".jobs-search__results-list li"
    );

    const jobs = [];

    for (const jobElement of jobElements) {
      const job = {};
      job.title = jobElement
        .querySelector(".base-search-card__title")
        .textContent.trim();

      job.company = jobElement
        .querySelector(".base-search-card__subtitle")
        .textContent.trim();

      job.location = jobElement
        .querySelector(".job-search-card__location")
        .textContent.trim();

      jobs.push(job);
    }

    return jobs;
  });

  console.log(jobList);

  // Close the browser.
  await browser.close();
})();
