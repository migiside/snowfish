import {Cookie} from "tough-cookie";
import {CookieJar, FromFileOptions, FromUrlOptions, JSDOM} from "jsdom";
import {Parser} from "./Parser";
import {ToranoanaGoodsInfo} from "./ToranoanaGoodsInfo";

export class ToranoanaParser implements Parser {

    constructor() {
    }

    private getAdultContentsAllowCookie(): CookieJar {
        let cookie = new Cookie({key: "adflg", value: "0"});
        let cookiejar = new CookieJar();
        cookiejar.setCookie(cookie, "https://ec.toranoana.jp", () => {
        });
        return cookiejar;
    }

    paserFromHtml(html: Promise<string>): Promise<ToranoanaGoodsInfo> {
        return this.parseFromJSDOM(html.then(content => new JSDOM(content)));
    }

    parseFromFile(file: string, options?: FromFileOptions): Promise<ToranoanaGoodsInfo> {
        return this.parseFromJSDOM(JSDOM.fromFile(file, options));
    }

    parseFromUrl(url: string, options?: FromUrlOptions): Promise<ToranoanaGoodsInfo> {
        return this.parseFromJSDOM(JSDOM.fromURL(url, Object.assign({cookieJar: this.getAdultContentsAllowCookie()}, options)));
    }

    parseFromJSDOM(dom: Promise<JSDOM>): Promise<ToranoanaGoodsInfo> {
        return dom.then(_dom => {
            let doc = _dom.window.document;
            return new ToranoanaGoodsInfo(
                this.getTitle(doc),
                this.getPrice(doc),
                this.getCircle(doc),
                this.getAuthor(doc),
                this.getReleaseDate(doc),
                this.getGenre(doc));
        });
    }

    public hogehoge(hgoe: string) {
        console.log("iiyokoiyo");
    }

    private getTitle(doc: Document): string {
        let element = doc.querySelector(".product-info > h1 > span");
        if (element != null) {
            let txt = element.firstChild;
            if (txt != null && txt.textContent != null) {
                return txt.textContent;
            }
        }
        throw new Error("unable to parseFromJSDOM title");
    }

    private getPrice(doc: Document): number {
        let element = doc.querySelector(".price > .normal");
        if (element != null) {
            let txt = element.firstChild;
            if (txt != null && txt.textContent != null) {
                return Number(txt.textContent.trim().replace("円（＋税）", "").replace(",", ""));
            }
        }
        throw new Error("unable to parseFromJSDOM price");
    }

    private getCircle(doc: Document): string {
        let element = doc.querySelector(".detail4-spec > tbody > tr:nth-child(1) > td:nth-child(2) > span > a > span");
        if (element != null) {
            let txt = element.firstChild;
            if (txt != null && txt.textContent != null) {
                return txt.textContent;
            }
        }
        throw new Error("unable to parseFromJSDOM circle");
    }

    private getAuthor(doc: Document): string {
        let element = doc.querySelector(".detail4-spec > tbody > tr:nth-child(2) > td:nth-child(2) > span > a > span");
        if (element != null) {
            let txt = element.firstChild;
            if (txt != null && txt.textContent != null) {
                return txt.textContent;
            }
        }
        throw new Error("unable to parseFromJSDOM author");
    }

    private getReleaseDate(doc: Document): string {
        let element = doc.querySelector(".detail4-spec > tbody > tr:nth-child(4) > td:nth-child(2) > span > a > span");
        if (element != null) {
            let txt = element.firstChild;
            if (txt != null && txt.textContent != null) {
                return txt.textContent;
            }
        }
        throw new Error("unable to parseFromJSDOM release date");
    }

    private getGenre(doc: Document): string {
        let element = doc.querySelector(".detail4-spec > tbody > tr:nth-child(3) > td:nth-child(2) > span > a > span");
        if (element != null) {
            let txt = element.firstChild;
            if (txt != null && txt.textContent != null) {
                return txt.textContent;
            }
        }
        throw new Error("unable to parseFromJSDOM genre");
    }

    isParsable(url: string): boolean {
        return url.match("^https://ec.toranoana.jp/") != null;
    }

}
