
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
                    .then((worldDataRaw) => {
                        worldDataRaw = worldDataRaw.filter(line => {
                            if (line.total_cases > 99) return true;
                            return false;
                        })
                        let totalCases = {};
                        worldDataRaw.forEach(line => {
                            if (line.iso_code === "DEU" || line.iso_code === "GBR") {
                                if (!totalCases[line.date]) totalCases[line.date] = { date: line.date };
                                totalCases[line.date][line.iso_code + "cases"] = line.total_cases;
                                totalCases[line.date][line.iso_code + "deaths"] = line.total_deaths;
                            }
                        });
                        let arr = [] as any;
                        Object.keys(totalCases).forEach((key) => {
                            arr.push(totalCases[key]);
                        });
                        return arr;
                    });
            });

    }
}

export default API;
