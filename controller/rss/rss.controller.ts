import { Request, Response } from "express";
import { RSSrequest } from "../../interfaces/rss.interface";
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
} from "../../services/rss.service";
import { aResponse } from "../../interfaces/aResponse";
import { AppError } from "../../services/appError";

export class RSSController {
    techService: TechRSS;
    sportService: SportRSS;
    worldService: WorldRSS;
    businessService: BusinessRSS;
    politicsService: PoliticsRSS;
    healthService: HealthRSS;
    scienceService: ScienceRSS;
    entertainmentService: EntertainmentRSS;
    ukService: UKRSS;
    englandService: EnglandRSS;
    walesService: WalesRSS;
    scotlandService: ScotlandRSS;
    northernIrelandService: NorthernIrelandRSS;
    magazineService: MagazineRSS;
    educationService: EducationRSS;
    inPicturesService: InPicturesRSS;
    videoAndAudioService: VideoAndAudioRSS;
    newsbeatService: NewsbeatRSS;
    storiesService: StoriesRSS;
    haveYourSayService: HaveYourSayRSS;
    worldAfricaService: WorldAfricaRSS;
    worldAsiaService: WorldAsiaRSS;
    worldEuropeService: WorldEuropeRSS;
    worldLatinAmericaService: WorldLatinAmericaRSS;
    worldMiddleEastService: WorldMiddleEastRSS;
    worldUsCanadaService: WorldUsCanadaRSS;
    climateService: ClimateRSS;
    coronavirusService: CoronavirusRSS;
    
    private serviceMap: Record<string, BaseRSS>;

    constructor(
        techService: TechRSS,
        sportService: SportRSS,
        worldService: WorldRSS,
        businessService: BusinessRSS,
        politicsService: PoliticsRSS,
        healthService: HealthRSS,
        scienceService: ScienceRSS,
        entertainmentService: EntertainmentRSS,
        ukService: UKRSS,
        englandService: EnglandRSS,
        walesService: WalesRSS,
        scotlandService: ScotlandRSS,
        northernIrelandService: NorthernIrelandRSS,
        magazineService: MagazineRSS,
        educationService: EducationRSS,
        inPicturesService: InPicturesRSS,
        videoAndAudioService: VideoAndAudioRSS,
        newsbeatService: NewsbeatRSS,
        storiesService: StoriesRSS,
        haveYourSayService: HaveYourSayRSS,
        worldAfricaService: WorldAfricaRSS,
        worldAsiaService: WorldAsiaRSS,
        worldEuropeService: WorldEuropeRSS,
        worldLatinAmericaService: WorldLatinAmericaRSS,
        worldMiddleEastService: WorldMiddleEastRSS,
        worldUsCanadaService: WorldUsCanadaRSS,
        climateService: ClimateRSS,
        coronavirusService: CoronavirusRSS
    ) {
        this.techService = techService;
        this.sportService = sportService;
        this.worldService = worldService;
        this.businessService = businessService;
        this.politicsService = politicsService;
        this.healthService = healthService;
        this.scienceService = scienceService;
        this.entertainmentService = entertainmentService;
        this.ukService = ukService;
        this.englandService = englandService;
        this.walesService = walesService;
        this.scotlandService = scotlandService;
        this.northernIrelandService = northernIrelandService;
        this.magazineService = magazineService;
        this.educationService = educationService;
        this.inPicturesService = inPicturesService;
        this.videoAndAudioService = videoAndAudioService;
        this.newsbeatService = newsbeatService;
        this.storiesService = storiesService;
        this.haveYourSayService = haveYourSayService;
        this.worldAfricaService = worldAfricaService;
        this.worldAsiaService = worldAsiaService;
        this.worldEuropeService = worldEuropeService;
        this.worldLatinAmericaService = worldLatinAmericaService;
        this.worldMiddleEastService = worldMiddleEastService;
        this.worldUsCanadaService = worldUsCanadaService;
        this.climateService = climateService;
        this.coronavirusService = coronavirusService;

        this.serviceMap = {
            Tech: this.techService,
            Sport: this.sportService,
            World: this.worldService,
            Business: this.businessService,
            Politics: this.politicsService,
            Health: this.healthService,
            Science: this.scienceService,
            Entertainment: this.entertainmentService,
            UK: this.ukService,
            England: this.englandService,
            Wales: this.walesService,
            Scotland: this.scotlandService,
            NorthernIreland: this.northernIrelandService,
            Magazine: this.magazineService,
            Education: this.educationService,
            InPictures: this.inPicturesService,
            VideoAndAudio: this.videoAndAudioService,
            Newsbeat: this.newsbeatService,
            Stories: this.storiesService,
            HaveYourSay: this.haveYourSayService,
            WorldAfrica: this.worldAfricaService,
            WorldAsia: this.worldAsiaService,
            WorldEurope: this.worldEuropeService,
            WorldLatinAmerica: this.worldLatinAmericaService,
            WorldMiddleEast: this.worldMiddleEastService,
            WorldUsCanada: this.worldUsCanadaService,
            Climate: this.climateService,
            Coronavirus: this.coronavirusService
        };
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