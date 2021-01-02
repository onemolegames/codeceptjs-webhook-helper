const WebHookHelper = require('../index')
const axios = require('axios')
describe("Webhook helper tests", () => {
    let webHookHelper;
    beforeAll(() => {
        webHookHelper = new WebHookHelper()
        webHookHelper._init()
    })
    afterAll(() => {
        webHookHelper._finishTest()
    })

    it('Throws error when no webhook call made', async () => {
        try {
            await webHookHelper.waitForWebhookCall('/test', 1)
        } catch (error) {
            expect(error.toString()).toEqual(`Error: Didn't get any webhook call for path "/test" `)
        }
    })

    it('Does not throws when webhook call made', async () => {
        await axios({
            url: 'http://localhost:54321/test',
            method: 'POST'
        })
        await webHookHelper.waitForWebhookCall('/test', 1)
    })
})
