//quick script to read some bitcoin data on kenfm
const https = require('https');
const moment = require("moment");

https.get('https://api.blockcypher.com/v1/btc/main/addrs/18FpEnH1Dh83GXXGpRNqSoW5TL1z1PZgZK?limit=500', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        // data = JSON.parse(data);
        // console.log(JSON.parse(data));
        let json = JSON.parse(data);
        // console.log(json.txrefs.length)
        json.txrefs.forEach(tx => {
            let value = tx.value + "";
            let neededZeros = 8 - value.length;
            while (neededZeros > 0) {
                value = "0" + value;
                neededZeros--;
            }
            console.log((value / 100000000) + "," + moment(tx.confirmed).format("YYYY-MM-DD"));
        });
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});