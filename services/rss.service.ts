import { Parser } from "xml2js";
import { RSSlinks } from "../enums/rssLinks";

export class BaseRSS {

    private url: string;

    private parser: Parser;

    constructor(url: string) {
        this.url = url;
        this.parser = new Parser({ explicitArray: false });
    }

    getURL() {
        return this.url
    }

    private async getNewsInXMLform(url: string) {
        const response = await fetch(url);
        return response.text();
    }

    private async convertXMLtoReadableForm(xml: string) {
        return await this.parser.parseStringPromise(xml);
    }

    async processNews() {
        
        const newsURL = this.getURL();

        const xml = await this.getNewsInXMLform(newsURL);

        const newsItems = await this.convertXMLtoReadableForm(xml);

        return newsItems.rss.channel.item;
    }


}


export class TechRSS extends BaseRSS {
    constructor(){
        super(RSSlinks.TECH)
    }
}

export class SportRSS extends BaseRSS {
    constructor(){
        super(RSSlinks.SPORT)
    }
}
