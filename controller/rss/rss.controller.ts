import { Request, Response } from "express";
import { RSSrequest } from "../../interfaces/rss.interface";
import { BaseRSS, SportRSS, TechRSS } from "../../services/rss.service";
import { aResponse } from "../../interfaces/aResponse";
import { AppError } from "../../services/appError";

export class RSSController {
    techService: TechRSS;
    sportService: SportRSS;

    private serviceMap: Record<string, BaseRSS>;

    constructor(techService: TechRSS, sportService: SportRSS) {
        this.techService = techService;
        this.sportService = sportService;

        this.serviceMap = {
            Tech: this.techService,
            Sport: this.sportService
        }
    }

    private responseData: aResponse<null | string | any> = {
        message: '',
        data: null,
        successful: false
    }

    async getNews(req: Request, res: Response) {
        try {

            const service = this.serviceMap[req.body.newsType];

            if (!service) {
                this.responseData.message = 'Invalid news category.';
                this.responseData.successful = false;
                res.status(400).json(this.responseData);
                return;
            }

            const news = await service.processNews();


            this.responseData.data = news;
            this.responseData.successful = true;
            this.responseData.message = 'News Fetched';

            res.status(200).json(this.responseData);
            return

        } catch (error) {

            console.error(error);

            const status = error instanceof AppError ? error.statusCode : 500;

            this.responseData.message = error instanceof AppError ? error.message : 'Internal Server Error';
            this.responseData.successful = false;

            res.status(status).send(this.responseData);
            return;
        }
    }

}