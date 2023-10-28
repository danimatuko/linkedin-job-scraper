# 🔍 LinkedIn Jobs Scraper

LinkedIn Jobs Scraper is a Node.js script that utilizes Puppeteer to scrape job postings from LinkedIn. This tool provides an easy way to collect job data, such as job titles, companies, locations, and more, directly from LinkedIn job listings.

![LinkedIn Page](screenshot.png)

## 🔧 Features

- **📋 Scrapes job postings** from LinkedIn based on a specified search term.
- **📊 Collects information** about job titles, companies, locations, and job descriptions.
- **📁 Exports the scraped data** to a CSV file for further analysis.

## 📋 Prerequisites

Before using this script, make sure you have the following prerequisites:

- **⚙️ Node.js installed** on your system.
- 📦 The necessary dependencies installed by running the following command in your project directory:

```
npm install
```

## 💻 Technologies

This project is built using the following technologies:

- :rocket: **Node.js (v14.x)**
- :scissors: **Puppeteer (v5.x)**

## 🚀 Usage

1. Clone or download this repository to your local machine.

2. Navigate to the project directory:

```
cd linkedin-jobs-scraper
```

3. Open the `linkedin_scraper.js` file in a text editor.

4. Customize your job search criteria:

```javascript
const searchTerm = "Web Developer";
```

5. Run the script:

```
npm start
```

6. The script will start scraping job postings based on your search criteria and store the results in a CSV file named `jobsData.csv`.

## ⭐ Star the Repo

If you find this project useful, please consider starring it on GitHub to show your support. :star:

[![GitHub stars](https://img.shields.io/github/stars/danimatuko/linkedin-jobs-scraper?style=social)](https://github.com/danimatuko/linkedin-jobs-scraper/stargazers)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is for educational and research purposes only. It is important to respect LinkedIn's terms of service and avoid excessive scraping to avoid being blocked by their platform.

## 🙏🏿 Acknowledgments

- This project was inspired by the need to collect job data for research and analysis.
- Thanks to the creators of Puppeteer for simplifying web scraping in Node.js.

Feel free to contribute to this project, report issues, or suggest improvements. Happy job hunting! :tada:
