const http = require('http')
const Helper = require('@codeceptjs/helper');

class WebHookHelper extends Helper {
    constructor(config) {
        super(config);
        this.calls = []
        this.options = {
            port: 54321,
            waitForTimeout: 10,
            ...config
        }
    }

    _init() {
        if (!this.server) {
            this.server = http.createServer(this._requestListener.bind(this));
            this.server.listen(this.options.port);
        }
    }

    _finishTest() {
        this.calls = []
        if (this.server) this.server.close()
    }

    _requestListener(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.writeHead(200);
        if (req.method === 'POST') {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', () => {
                this.calls.push({url: req.url, data})
                res.end();
            })
        } else {
            res.end();
        }
    }

    _checkForCall(path, payload, wait = 0) {
        return new Promise(((resolve, reject) => {
            const waitUntil = wait || this.options.waitForTimeout
            let call
            let time = 0
            const interval = setInterval(() => {
                call = this.calls.find(({url}) => {
                    return url === path
                })
                time += 1
                if (call) {
                    clearInterval(interval)
                    return resolve()
                }
                if (time >= waitUntil) {
                    clearInterval(interval)
                    let receivedCalls
                    if (this.calls.length) receivedCalls = this.calls.map(({url}) => path === url)
                    return reject(`Didn't get any webhook call for path "${path}" ${receivedCalls ? `, got calls ${receivedCalls}` : ''}`)
                }
            }, 1000)
        }))
    }

    async waitForWebhookCall(path, waitForTimeout) {
        try {
            await Promise.resolve(this._checkForCall(path, undefined, waitForTimeout))
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = WebHookHelper
