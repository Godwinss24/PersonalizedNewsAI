import { CreateUserRequest, LoginUserRequest } from "../../interfaces/user/create-user.interface";
import { UserService } from "../../services/user/user.service";
import { Request, Response } from "express";
import { aResponse } from "../../interfaces/aResponse";
import { AppError } from "../../services/appError";
import { User } from "../../models";
import dotenv from 'dotenv';
import { CustomRequest } from "../../middleware/auth";
import { createResponse } from "../../utilities/createResponse";
import { UserCategory } from "../../enums/categories.enum";
import { BaseRSS, BusinessRSS, ClimateRSS, CoronavirusRSS, EducationRSS, EnglandRSS, EntertainmentRSS, HaveYourSayRSS, HealthRSS, InPicturesRSS, MagazineRSS, NewsbeatRSS, NorthernIrelandRSS, PoliticsRSS, ScienceRSS, ScotlandRSS, SportRSS, StoriesRSS, TechRSS, UKRSS, VideoAndAudioRSS, WalesRSS, WorldAfricaRSS, WorldAsiaRSS, WorldEuropeRSS, WorldLatinAmericaRSS, WorldMiddleEastRSS, WorldRSS, WorldUsCanadaRSS } from "../../services/rss.service";
import { formatNewsAsHTML } from "../../services/newsFormatter";
import { sendEmail } from "../../services/emailService";
import { GeminiAI } from "../../services/gemini.service";
import { extractBBCArticle } from "../../services/scraper";
dotenv.config();


export class UserController {
    private userService: UserService;
    constructor(userServicee: UserService) {
        this.userService = userServicee
    }
    private responseData: aResponse<null | string> = {
        message: '',
        data: null,
        successful: false
    }
    async registerUserControl(req: CreateUserRequest, res: Response) {
        try {
            await this.userService.registerUser(req.body);

            this.responseData.data = null;
            this.responseData.successful = true;
            this.responseData.message = 'User Created';
            res.status(200).json(this.responseData);
            return
        } catch (error) {
            console.error(error);

            const status = error instanceof AppError ? error.statusCode : 500;

            this.responseData.data = null;
            this.responseData.message = error instanceof AppError ? error.message : 'Internal Server Error';
            this.responseData.successful = false;

            res.status(status).send(this.responseData);
            return;
        }
    }

    async loginUserControl(req: LoginUserRequest, res: Response) {
        try {
            const jwt = await this.userService.loginUser(req.body.email, req.body.password);
            this.responseData.successful = true;
            this.responseData.message = 'Login Successful';
            this.responseData.data = jwt;
            res.status(200).json(this.responseData);
            return
        } catch (error) {
            console.error(error);
            const status = error instanceof AppError ? error.statusCode : 500;
            this.responseData.data = null;
            this.responseData.message = error instanceof AppError ? error.message : 'Internal Server Error';
            this.responseData.successful = false;

            res.status(status).send(this.responseData);

            return;
        }
    }

    async getMyLatest(req: CustomRequest, res: Response) {
        try {
            const email = req.user?.email;

            if (!email) {
                throw new AppError('Invalid JWT', 400);
            }

            const categories = await this.userService.getUsersNewsCategories(email);

            console.log(categories);

            if (!categories || categories.length === 0) {
                res.status(200).json({
                    successful: true,
                    message: "No subscribed categories",
                    data: [],
                });
                return;
            }

            // Map of user categories to RSS services
            const rssServiceMap: Record<UserCategory, BaseRSS> = {
                [UserCategory.SPORT]: new SportRSS(),
                [UserCategory.TECH]: new TechRSS(),
                [UserCategory.WORLD]: new WorldRSS(),
                [UserCategory.BUSINESS]: new BusinessRSS(),
                [UserCategory.POLITICS]: new PoliticsRSS(),
                [UserCategory.HEALTH]: new HealthRSS(),
                [UserCategory.SCIENCE]: new ScienceRSS(),
                [UserCategory.ENTERTAINMENT]: new EntertainmentRSS(),
                [UserCategory.UK]: new UKRSS(),
                [UserCategory.ENGLAND]: new EnglandRSS(),
                [UserCategory.WALES]: new WalesRSS(),
                [UserCategory.SCOTLAND]: new ScotlandRSS(),
                [UserCategory.NORTHERN_IRELAND]: new NorthernIrelandRSS(),
                [UserCategory.MAGAZINE]: new MagazineRSS(),
                [UserCategory.EDUCATION]: new EducationRSS(),
                [UserCategory.IN_PICTURES]: new InPicturesRSS(),
                [UserCategory.VIDEO_AND_AUDIO]: new VideoAndAudioRSS(),
                [UserCategory.NEWSBEAT]: new NewsbeatRSS(),
                [UserCategory.STORIES]: new StoriesRSS(),
                [UserCategory.HAVE_YOUR_SAY]: new HaveYourSayRSS(),
                [UserCategory.WORLD_AFRICA]: new WorldAfricaRSS(),
                [UserCategory.WORLD_ASIA]: new WorldAsiaRSS(),
                [UserCategory.WORLD_EUROPE]: new WorldEuropeRSS(),
                [UserCategory.WORLD_LATIN_AMERICA]: new WorldLatinAmericaRSS(),
                [UserCategory.WORLD_MIDDLE_EAST]: new WorldMiddleEastRSS(),
                [UserCategory.WORLD_US_CANADA]: new WorldUsCanadaRSS(),
                [UserCategory.CLIMATE]: new ClimateRSS(),
                [UserCategory.CORONAVIRUS]: new CoronavirusRSS(),
            };
            
            const gemini = new GeminiAI();
            
            const newsPromises = categories
              .filter(category => rssServiceMap[category])
              .map(async (category) => {
                try {
                  const rssService = rssServiceMap[category];
                  const items = await rssService.processNews();
            
                  // Pick top 1–2 articles to summarize (to avoid rate/token limits)
                //   const topItems = items.slice(0, 2);
            
                  const processedItems = await Promise.all(
                    items.map(async (item:any) => {
                      const url = item.link;
            
                      let articleContent = await extractBBCArticle(url);
                      if (!articleContent) {
                        articleContent = item.description || '';
                      }
            
                      const summary = await gemini.summarize(articleContent);
            
                      return {
                        title: item.title,
                        link: item.link,
                        ai_summary: summary || 'Could not summarize the article.',
                        published: item.pubDate,
                      };
                    })
                  );
            
                  return { category, items: processedItems };
                } catch (err: any) {
                  console.error(`Error fetching/parsing feed for ${category}:`, err.message);
                  return { category, items: [] }; // fail gracefully
                }
              });
            


            const newsResults = await Promise.all(newsPromises);

            const data = newsResults.map(({ category, items }) => ({
                category,
                latest: items.slice(0, 5), // return only latest 5 per category
            }));

            // Build the HTML
            // const htmlContent = formatNewsAsHTML(data);

            // // Send the email
            // await sendEmail({
            //     to: email,
            //     subject: "📰 Your News Digest",
            //     html: htmlContent,
            // });

            res.status(200).json({
                successful: true,
                message: "Fetched latest news successfully",
                data,
            });

        } catch (error) {
            console.error(error);
            const status = error instanceof AppError ? error.statusCode : 500;

            this.responseData.message = error instanceof AppError ? error.message : 'Internal Server Error';
            this.responseData.successful = false;

            res.status(status).send(this.responseData);
        }
    }


}