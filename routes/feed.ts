import express, { Response, Router } from "express";
import { Parser } from "xml2js";
import { RSSController } from "../controller/rss/rss.controller";
import {
  BaseRSS,
  TechRSS,
  SportRSS,
  WorldRSS,
  BusinessRSS,
  PoliticsRSS,
  HealthRSS,
  ScienceRSS,
  EntertainmentRSS,
  UKRSS,
  EnglandRSS,
  WalesRSS,
  ScotlandRSS,
  NorthernIrelandRSS,
  MagazineRSS,
  EducationRSS,
  InPicturesRSS,
  VideoAndAudioRSS,
  NewsbeatRSS,
  StoriesRSS,
  HaveYourSayRSS,
  WorldAfricaRSS,
  WorldAsiaRSS,
  WorldEuropeRSS,
  WorldLatinAmericaRSS,
  WorldMiddleEastRSS,
  WorldUsCanadaRSS,
  ClimateRSS,
  CoronavirusRSS
} from "../services/rss.service";

const router = express.Router();

const techService = new TechRSS();
const sportService = new SportRSS();
const worldService = new WorldRSS();
const businessService = new BusinessRSS();
const politicsService = new PoliticsRSS();
const healthService = new HealthRSS();
const scienceService = new ScienceRSS();
const entertainmentService = new EntertainmentRSS();
const ukService = new UKRSS();
const englandService = new EnglandRSS();
const walesService = new WalesRSS();
const scotlandService = new ScotlandRSS();
const northernIrelandService = new NorthernIrelandRSS();
const magazineService = new MagazineRSS();
const educationService = new EducationRSS();
const inPicturesService = new InPicturesRSS();
const videoAndAudioService = new VideoAndAudioRSS();
const newsbeatService = new NewsbeatRSS();
const storiesService = new StoriesRSS();
const haveYourSayService = new HaveYourSayRSS();
const worldAfricaService = new WorldAfricaRSS();
const worldAsiaService = new WorldAsiaRSS();
const worldEuropeService = new WorldEuropeRSS();
const worldLatinAmericaService = new WorldLatinAmericaRSS();
const worldMiddleEastService = new WorldMiddleEastRSS();
const worldUsCanadaService = new WorldUsCanadaRSS();
const climateService = new ClimateRSS();
const coronavirusService = new CoronavirusRSS();

const rssController = new RSSController(
  techService,
  sportService,
  worldService,
  businessService,
  politicsService,
  healthService,
  scienceService,
  entertainmentService,
  ukService,
  englandService,
  walesService,
  scotlandService,
  northernIrelandService,
  magazineService,
  educationService,
  inPicturesService,
  videoAndAudioService,
  newsbeatService,
  storiesService,
  haveYourSayService,
  worldAfricaService,
  worldAsiaService,
  worldEuropeService,
  worldLatinAmericaService,
  worldMiddleEastService,
  worldUsCanadaService,
  climateService,
  coronavirusService
);



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
