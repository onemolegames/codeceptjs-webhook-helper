# codeceptjs-webhook-helper

codeceptjs-webhook-helper is a [CodeceptJS](https://codecept.io) helper to be able to test webhook calls during the tests.

## How it works
This helper creates a simple http server with nodejs's request library, with a given port on the localhost.
Before using, you need to set your webhook urls to the `http://localhost:<given_port_in_the_config>/**` 

## Installation

```
npm i codeceptjs-webhook-helper --save
```

## Configuration

`codecept.conf.js`

```
helpers: {
    WebHookHelper: {
        require: 'codeceptjs-webhook-helper',
        port: 9999,
        waitForTimeout: 10
    }
},
```

Options:
- `port`: The port to start the webhook server. Default is 5431
- `waitForTimeout`: Indicates for how many seconds to wait 
  for verifying the given webhook called or 
  not during `I.waitForWebHookCall()`. 
  Default is 10 seconds

## Usage
```javascript
// Wait for a webhook call: "/testing/with/codecept"
I.waitForWebHookCall('/testing/with/codecept')

// Wait for a webhook call: "/testing/with/codecept" 
// with overriding the wait timeout in the options. 
// This will wait for 20 seconds
I.waitForWebHookCall('/testing/with/codecept', 20) 
```
## Todos:

- [ ] Add a new method waitForWebHookCallWithPayload
- [ ] Improve documentation
