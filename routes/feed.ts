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
import authenticateToken from "../middleware/auth";
import { GeminiAI } from "../services/gemini.service";

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
  const text = 'The BBC is threatening to take legal action against an artificial intelligence (AI) firm whose chatbot the corporation says is reproducing BBC content "verbatim" without its permission.The BBC has written to Perplexity, which is based in the US, demanding it immediately stops using BBC content, deletes any it holds, and proposes financial compensation for the material it has already used.It is the first time that the BBC - one of the world\'s largest news organisations - has taken such action against an AI company.In a statement, Perplexity said: "The BBC\'s claims are just one more part of the overwhelming evidence that the BBC will do anything to preserve Google\'s illegal monopoly."'
  const gemini = new GeminiAI();
  const summary = await gemini.summarize(text);
  console.log(summary);
  res.status(200).json({"message": "hello"});
});

/**
 * @swagger
 * /feed/news:
 *   post:
 *     summary: Fetch news from a specific category
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newsType
 *             properties:
 *               newsType:
 *                 type: string
 *                 enum:
 *                   - SPORT
 *                   - TECH
 *                   - WORLD
 *                   - BUSINESS
 *                   - POLITICS
 *                   - HEALTH
 *                   - SCIENCE
 *                   - ENTERTAINMENT
 *                   - UK
 *                   - ENGLAND
 *                   - WALES
 *                   - SCOTLAND
 *                   - NORTHERN_IRELAND
 *                   - MAGAZINE
 *                   - EDUCATION
 *                   - IN_PICTURES
 *                   - VIDEO_AND_AUDIO
 *                   - NEWSBEAT
 *                   - STORIES
 *                   - HAVE_YOUR_SAY
 *                   - WORLD_AFRICA
 *                   - WORLD_ASIA
 *                   - WORLD_EUROPE
 *                   - WORLD_LATIN_AMERICA
 *                   - WORLD_MIDDLE_EAST
 *                   - WORLD_US_CANADA
 *                   - CLIMATE
 *                   - CORONAVIRUS
 *     responses:
 *       200:
 *         description: News fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       link:
 *                         type: string
 *                       pubDate:
 *                         type: string
 *       400:
 *         description: Invalid category provided
 *       500:
 *         description: Internal server error
 */

router.post('/news', rssController.getNews.bind(rssController));


module.exports = router;
