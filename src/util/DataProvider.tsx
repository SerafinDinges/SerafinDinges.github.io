import API from './API'
import getMetaKey from './Dictionary';

class DataProvider {
    API: API;
    constructor() {
        this.API = new API();
    }
    getMetaData(keys) {
        let meta = {};
        keys.forEach((key) => {
            meta[key] = getMetaKey(key);
        });
        return meta;
    }
    async getCasesByCountryAndDataset(countries: Array<String>, dataSets: Array<String>) {
        let cvd19deaths = await this.API.getCVD19CasesByCountry(countries);
        let wrapper: any = {};
        cvd19deaths = cvd19deaths.sort((first, second) => {
            let firstDate = new Date(first.date), secondDate = new Date(second.date);
            return firstDate.getTime() - secondDate.getTime();
        });
        wrapper.data = cvd19deaths;
        wrapper.labels = {
            xAxis: "prettyDate"
        };
        wrapper.labels.dataKeys = [];
        dataSets.forEach(dataKey => {
            countries.forEach(country => {
                wrapper.labels.dataKeys.push(country + "_" + dataKey);
            })
        });
        wrapper.labels.dataKeys.sort();
        wrapper.metaData = this.getMetaData(wrapper.labels.dataKeys);
        return wrapper;
    }
    async getUKDeaths() {
        let wrapper: any = {};
        let cvd19deaths = await this.API.getCVD19CasesByCountry(["GBR"]);
        let respiratoryDeaths = await this.API.getSheet("regular_flu_deaths");
        let helperObjectRespiratoryDeaths: any = {};
        respiratoryDeaths.forEach(element => {
            let date = new Date(element.date);
            helperObjectRespiratoryDeaths[date.getDay() + "-" + date.getMonth()] = element;
        });

        let aggregatedData = cvd19deaths.map((element) => {
            let date = new Date(element.date);
            let time = date.getMonth() + "-" + date.getDay();

            if (helperObjectRespiratoryDeaths[time]) {
                element.uk_total_deaths = helperObjectRespiratoryDeaths[time].uk_total_sum;
                element.uk_respiratory_deaths = helperObjectRespiratoryDeaths[time].uk_respiratory_sum;
            }
            return element;
        });
        console.log(aggregatedData);

        wrapper.data = aggregatedData;
        wrapper.labels = {
            xAxis: "date",
            dataKeys: ["GBRcases", "GBRdeaths", "uk_total_deaths", "uk_respiratory_deaths"]
        };
        return wrapper;
    }
}

export default DataProvider;
