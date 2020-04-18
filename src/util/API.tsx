
import Tabletop from 'tabletop';
const csv = require('csvtojson/v2');


class API {
    tabletop: Tabletop;
    constructor() {
        this.tabletop = Tabletop.init({
            key: '1sAXPISlxdaxPIUAkua6Dxdd5DeWlUQ3fzx6Q9aGzfxY',
            simpleSheet: false
        });
    }
    async getSheet(name) {
        return this.tabletop.then((data, tabletop: Tabletop) => {
            let entries = data[name].elements;
            return entries;
        });
    }
    async getWorldData() {
        return fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv')
            .then(response => response.text())
            .then(response => {
                return csv()
                    .fromString(response)
                    .then((jsonObj) => {
                        jsonObj = jsonObj.filter(line => {
                            if(line.iso_code === "DEU") return true;
                            return false;
                        })
                        return jsonObj;
                    });
            });

    }
}

export default API;
