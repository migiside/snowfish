import {Parser} from "./parser/Parser";
import {MelonbooksParser} from "./parser/MelonbooksParser";
import {ToranoanaParser} from "./parser/ToranoanaParser";
import {GoodsInfo} from "./parser/GoodsInfo";


export class Scraper {
    private parsers: Parser[] = [new MelonbooksParser(), new ToranoanaParser()];

    constructor() {
    }

    scrape(url: string): Promise<GoodsInfo> | null {
        let parser = this.parsers.filter(parser => parser.isParsable(url)).shift();
        if (parser != null) {
            return parser.parseFromUrl(url);
        }
        return null;
    }

}

