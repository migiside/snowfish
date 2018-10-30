import {Parser} from "./Parser";
import {CookieJar, FromFileOptions, FromUrlOptions, JSDOM} from "jsdom";
import {MelonBooksGoodsInfo} from "./MelonBooksGoodsInfo";
import {Cookie} from "tough-cookie";

export class MelonbooksParser implements Parser {

    constructor() {
    }

    private getAdultContentsAllowCookie(): CookieJar {
        let cookie = new Cookie({key: "AUTH_ADULT", value: "1"});
        let cookiejar = new CookieJar();
        cookiejar.setCookie(cookie, "https://www.melonbooks.co.jp", () => {
        });
        return cookiejar;
    }

    paserFromHtml(html: Promise<string>): Promise<MelonBooksGoodsInfo> {
        return this.parseFromJSDOM(html.then(content => new JSDOM(content)));
    }

    parseFromUrl(url: string, options?: FromUrlOptions): Promise<MelonBooksGoodsInfo> {
        return this.parseFromJSDOM(JSDOM.fromURL(url, Object.assign({cookieJar: this.getAdultContentsAllowCookie()}, options)));
    }

    parseFromFile(file: string, options?: FromFileOptions): Promise<MelonBooksGoodsInfo> {
        return this.parseFromJSDOM(JSDOM.fromFile(file, options));
    }

    parseFromJSDOM(dom: Promise<JSDOM>): Promise<MelonBooksGoodsInfo> {
        return dom.then(_dom => {
            let doc = _dom.window.document;

            return new MelonBooksGoodsInfo(
                this.getTitle(doc),
                this.getPrice(doc),
                this.getCircle(doc),
                this.getAuthor(doc),
                this.getReleaseDate(doc),
                this.getGenre(doc));
        });
    }

    private getTitle(doc: Document): string {
        let element = doc.querySelector("#description > table > tbody > tr > td");
        if (element != null) {
            let txt = element.firstChild;
            if (txt != null && txt.textContent != null) {
                return txt.textContent;
            }
        }
        throw new Error("unable to parseFromJSDOM title");
    }

    private getPrice(doc: Document): number {
        let element = doc.querySelector(".price");
        if (element != null) {
            let txt = element.firstChild;
            if (txt != null && txt.textContent != null) {
                return Number(txt.textContent.replace("¥", "").replace(",", ""));
            }
        }
        throw new Error("unable to parseFromJSDOM price");
    }

    private getCircle(doc: Document): string {
        let element = doc.querySelector("#description > table > tbody > tr:nth-child(2) > td > a");
        if (element != null) {
            let txt = element.firstChild;
            if (txt != null && txt.textContent != null) {
                return txt.textContent;
            }
        }
        throw new Error("unable to parseFromJSDOM circle");
    }

    private getAuthor(doc: Document): string {
        let element = doc.querySelector("#description > table > tbody > tr:nth-child(3) > td > a");
        if (element != null) {
            let txt = element.firstChild;
            if (txt != null && txt.textContent != null) {
                return txt.textContent;
            }
        }
        throw new Error("unable to parseFromJSDOM circle");
    }

    private getReleaseDate(doc: Document): string {
        let element = doc.querySelector("#description > table > tbody > tr:nth-child(5) > td");
        if (element != null) {
            let txt = element.firstChild;
            if (txt != null && txt.textContent != null) {
                return txt.textContent;
            }
        }
        throw new Error("unable to parseFromJSDOM release date");
    }

    private getGenre(doc: Document): string {
        let element = doc.querySelector("#description > table > tbody > tr:nth-child(4) > td > a");
        if (element != null) {
            let txt = element.firstChild;
            if (txt != null && txt.textContent != null) {
                return txt.textContent;
            }
        }
        throw new Error("unable to parseFromJSDOM genre");
    }

    isParsable(url: string): boolean {
        return url.match("^https://www.melonbooks.co.jp/") != null;
    }
}
