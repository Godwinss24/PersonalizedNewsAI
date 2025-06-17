# 📰 PersonalizedNewsAI

> Your personalized AI-powered news digest — short, smart, and tailored.

PersonalizedNewsAI is a Node.js-based project that fetches news from RSS feeds (starting with BBC), scrapes the full article, and uses a Large Language Model (LLM) to generate concise, categorized summaries based on the user’s subscribed interests.

---

## 🚀 Features

- ✅ Parses BBC RSS feeds
- ✅ Scrapes full articles from the original news link
- ✅ Summarizes articles using LLM (e.g., OpenAI GPT)
- ✅ Categorizes news into custom user-defined interests
- ✅ Outputs digest in an easy-to-read format (e.g., JSON or Markdown)

---

## 🧠 How It Works

1. **RSS Fetching**: Pulls articles using RSS (BBC to start).
2. **Web Scraping**: Extracts article content using `cheerio`.
3. **LLM Summarization**: Sends content to an LLM API to generate TL;DR-style summaries.
4. **Categorization**: Uses LLM or keyword matching to sort articles into subscribed categories.
5. **Output**: Returns a clean summary feed (terminal, API, or file output).

---

## 📦 Tech Stack

- **Node.js**
- **Cheerio** – for scraping
- **OpenAI** – for summarization & categorization
- **RSS Parser** – to read feed entries
- **dotenv** – to manage secrets



