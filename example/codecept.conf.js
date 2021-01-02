const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
    tests: './*.test.js',
    output: './output',
    timeout: 10000,
    helpers: {
        Playwright: {
            url: 'https://www.google.com/',
            show: false
        },
        WebHookHelper: {
            require: '../index',
        }
    },
    bootstrap: null,
    mocha: {},
    name: 'codeceptjs-rphelper',
    plugins: {
        retryFailedStep: {
            enabled: false
        },
        screenshotOnFail: {
            enabled: true
        }
    }
}
