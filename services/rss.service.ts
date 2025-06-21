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
    constructor() {
        super(RSSlinks.TECH);
    }
}

export class SportRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.SPORT);
    }
}

export class WorldRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.WORLD);
    }
}

export class BusinessRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.BUSINESS);
    }
}

export class PoliticsRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.POLITICS);
    }
}

export class HealthRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.HEALTH);
    }
}

export class ScienceRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.SCIENCE);
    }
}

export class EntertainmentRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.ENTERTAINMENT);
    }
}

export class UKRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.UK);
    }
}

export class EnglandRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.ENGLAND);
    }
}

export class WalesRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.WALES);
    }
}

export class ScotlandRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.SCOTLAND);
    }
}

export class NorthernIrelandRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.NORTHERN_IRELAND);
    }
}

export class MagazineRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.MAGAZINE);
    }
}

export class EducationRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.EDUCATION);
    }
}

export class InPicturesRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.IN_PICTURES);
    }
}

export class VideoAndAudioRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.VIDEO_AND_AUDIO);
    }
}

export class NewsbeatRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.NEWSBEAT);
    }
}

export class StoriesRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.STORIES);
    }
}

export class HaveYourSayRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.HAVE_YOUR_SAY);
    }
}

export class WorldAfricaRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.WORLD_AFRICA);
    }
}

export class WorldAsiaRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.WORLD_ASIA);
    }
}

export class WorldEuropeRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.WORLD_EUROPE);
    }
}

export class WorldLatinAmericaRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.WORLD_LATIN_AMERICA);
    }
}

export class WorldMiddleEastRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.WORLD_MIDDLE_EAST);
    }
}

export class WorldUsCanadaRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.WORLD_US_CANADA);
    }
}

export class ClimateRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.CLIMATE);
    }
}

export class CoronavirusRSS extends BaseRSS {
    constructor() {
        super(RSSlinks.CORONAVIRUS);
    }
}
