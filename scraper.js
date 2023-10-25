import puppeteer from "puppeteer";
import fs from "fs";

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  // Create a page
  const page = await browser.newPage();
  const searchTerm = "Web developer";

  try {
    // Go to LinkedIn job search page
    await page.goto(
      `https://www.linkedin.com/jobs/search/?keywords=${searchTerm}`
    );

    // Wait for the job listings to load
    await page.waitForSelector("a.base-card__full-link");

    // Extract job details
    const jobList = await page.evaluate(async () => {
      const jobElements = document.querySelectorAll("a.base-card__full-link");
      const jobs = [];

      for (const jobElement of jobElements) {
        jobElement.click();
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for details to load

        const job = {};
        job.title =
          document
            .querySelector("h2.top-card-layout__title")
            ?.textContent.trim() || "N/A";
        job.company =
          document
            .querySelector(".topcard__org-name-link")
            ?.textContent.trim() || "N/A";
        job.location =
          document
            .querySelector(".topcard__flavor topcard__flavor--bullet")
            ?.textContent.trim() || "N/A";
        job.description =
          document
            .querySelector(".show-more-less-html__markup")
            ?.textContent.trim() || "N/A";

        jobs.push(job);
        // window.history.back(); // Go back to the search results
      }

      return jobs;
    });

    // Write the job data to a JSON file
    fs.writeFileSync("jobs.json", JSON.stringify(jobList, null, 2));
    console.log("Job data saved to jobs.json");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
})();
