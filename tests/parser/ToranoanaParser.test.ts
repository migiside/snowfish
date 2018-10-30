import {ToranoanaParser} from "../../src/parser/ToranoanaParser";
import fs from "fs";

describe("ToranoanaParser", () => {
    it("Parse", async () => {
        const parser = new ToranoanaParser();
        const info = await parser.paserFromHtml(fs.promises.readFile("tests/resources/toranoana_adult.html", {encoding: "utf8"}));

        expect(info.title).toBe("Test Title");
        expect(info.price).toBe(1234);
        expect(info.circle).toBe("Test Circle");
        expect(info.author).toBe("Test Author");
        expect(info.release_date).toBe("Test Release Date");
        expect(info.genre).toBe("Test Genre");
    });
});
