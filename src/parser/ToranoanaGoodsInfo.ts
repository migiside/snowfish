import {GoodsInfo} from "./GoodsInfo";

export class ToranoanaGoodsInfo implements GoodsInfo {
    constructor(public title: string,
                public price: number,
                public circle: string,
                public author: string,
                public release_date: string,
                public genre: string
    ) {
    }

}
