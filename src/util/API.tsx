
import Tabletop from 'tabletop';
const csv = require('csvtojson/v2');


class API {
    tabletop: Tabletop;
    worldData: any;
    constructor() {
        this.tabletop = Tabletop.init({
            key: '1sAXPISlxdaxPIUAkua6Dxdd5DeWlUQ3fzx6Q9aGzfxY',
            simpleSheet: false
        });
        this.worldData = false;
    }
    async getSheet(name) {
        return this.tabletop.then((data, tabletop: Tabletop) => {
            let entries = data[name].elements;
            return entries;
        });
    }
    async getCVD19CasesByCountry(countries: Array<String>) { // ISO CODES: "GBR", "DEU", "USA"
        // iso_code,location,date,total_cases,new_cases,total_deaths,new_deaths,total_cases_per_million,new_cases_per_million,total_deaths_per_million,new_deaths_per_million,total_tests,new_tests,total_tests_per_thousand,new_tests_per_thousand,tests_units
        if (!this.worldData)
            this.worldData = fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv')
                .then(response => response.text());
        return this.worldData.then(response => {
            return csv()
                .fromString(response)
                .then((worldDataRaw) => {
                    worldDataRaw = worldDataRaw.filter(line => {
                        if (line.total_cases > 999) return true; // only return data where total cases
                        return false;
                    })
                    let totalCases = {};
                    worldDataRaw.forEach(line => {
                        if (countries.includes(line.iso_code)) {
                            let lineDate = new Date(line.date);
                            let lineDateKey = `${lineDate.getFullYear()}-${lineDate.getMonth() + 1}-${lineDate.getDate()}`
                            if (!totalCases[lineDateKey]) {
                                totalCases[lineDateKey] = { date: lineDateKey };
                            }
                            totalCases[lineDateKey][line.iso_code + "_total_cases"] = line.total_cases / 1000; // -> total cases in magnitudes of 1000
                            totalCases[lineDateKey][line.iso_code + "_total_deaths"] = (line.total_deaths / 1); // -> total deaths in magnitudes of 1
                            totalCases[lineDateKey][line.iso_code + "_new_deaths"] = (line.new_deaths / 1); // -> total deaths in magnitudes of 1
                            totalCases[lineDateKey][line.iso_code + "_new_cases"] = (line.new_cases / 1); // -> total deaths in magnitudes of 1
                            totalCases[lineDateKey][line.iso_code + "_total_cases_per_million"] = (line.total_cases_per_million / 1).toFixed(); // -> total deaths in magnitudes of 100
                            totalCases[lineDateKey][line.iso_code + "_new_cases_per_million"] = (line.new_cases_per_million / 1).toFixed(); // -> total deaths in magnitudes of 100
                            totalCases[lineDateKey][line.iso_code + "_total_deaths_per_million"] = (line.total_deaths_per_million / 1).toFixed(); // -> total deaths in magnitudes of 100
                            totalCases[lineDateKey][line.iso_code + "_new_deaths_per_million"] = (line.new_deaths_per_million / 1).toFixed(); // -> total deaths in magnitudes of 100
                            totalCases[lineDateKey].prettyDate = `${lineDate.getMonth() + 1}-${lineDate.getDate()}`;
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
