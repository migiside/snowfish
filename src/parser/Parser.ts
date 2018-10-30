import {GoodsInfo} from "./GoodsInfo";

export interface Parser {
    isParsable(url: string): boolean;

    parseFromUrl(url: string): Promise<GoodsInfo>;

    parseFromFile(file: string): Promise<GoodsInfo>;
}
