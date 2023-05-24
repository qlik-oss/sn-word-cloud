const config = {
  reporter: [
    ["list"],
    ["html", { outputFolder: "./__artifacts__/html_report" }],
  ],
  testDir: "./",
  forbidOnly: !!process.env.CI,
  timeout: 60000,
  quiet: true,
  expect: {
    toMatchSnapshot: { threshold: 0.3 },
    timeout: 30000,
  },
  workers: !process.env.CI ? 1 : undefined,
  use: {
    browserName: "chromium",
    actionTimeout: 30000,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
};

module.exports = config;
