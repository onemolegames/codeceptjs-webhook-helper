Feature('Webhook helper tests');

Scenario('Expect for webhook call on "localhost:54321/test"', ({I}) => {
    I.amOnPage('/');
    I.waitForWebhookCall('/test')
});
