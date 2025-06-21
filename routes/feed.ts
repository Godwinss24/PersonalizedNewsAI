import express, { Response, Router } from "express";
import { Parser } from "xml2js";
import { RSSController } from "../controller/rss/rss.controller";
import {  SportRSS, TechRSS } from "../services/rss.service";

const router = express.Router();
const techService = new TechRSS();
const sportService = new SportRSS();

const rssController = new RSSController(techService, sportService);


router.get("/", async (req, res) => {
  const response = await fetch("https://www.bbc.co.uk/news/technology/rss.xml");

  // Get raw XML text
  const xml = await response.text();

  // Parse XML
  const parser = new Parser({ explicitArray: false });
  const parsed = await parser.parseStringPromise(xml);

  // Get news items
  const items = parsed.rss.channel.item;

  res.status(200).json({
    success: true,
    count: items.length,
    data: items.map(
      (item: {
        title: any;
        link: any;
        pubDate: any;
        description: any;
        category: any;
      }) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.description,
        category: item.category,
      })
    ),
  });
});

router.post('/news', rssController.getNews.bind(rssController));


module.exports = router;
