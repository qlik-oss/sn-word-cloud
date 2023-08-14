import fs from "fs";
import path from "path";
import serve from "@nebula.js/cli-serve";
import { test, expect, chromium } from "@playwright/test";
import createNebulaRoutes from "../utils/routes";

const paths = {
  artifacts: path.join(__dirname, "__artifacts__"),
  fixtures: path.join(__dirname, "__fixtures__"),
};

test.describe("Rendering", () => {
  let s;
  let route;
  let page;

  test.beforeAll(async () => {
    s = await serve({
      entry: path.resolve(__dirname, "../../"),
      type: "sn-word-cloud",
      open: false,
      build: false,
      fixturePath: "test/rendering/__fixtures__",
    });

    route = createNebulaRoutes(s.url);

    const browser = await chromium.launch();
    const context = await browser.newContext();

    page = await context.newPage();
  });

  test.afterAll(async () => {
    await s.close();
  });

  test.describe("rendering", () => {
    fs.readdirSync(paths.fixtures).forEach((file) => {
      const name = file.replace(".fix.js", "");
      const fixturePath = `./${file}`;

      test(name, async () => {
        const renderUrl = await route.renderFixture(fixturePath);

        await page.goto(renderUrl, { waitUntil: "networkidle" });

        const element = await page.waitForSelector(
          '.njs-viz[data-render-count="1"]',
          {
            visible: true,
            timeout: 10000,
          }
        );

        const screenshot = await page.screenshot({
          clip: await element.boundingBox(),
        });

        expect(screenshot).toMatchSnapshot(`${name}.png`);
      });
    });
  });
});
