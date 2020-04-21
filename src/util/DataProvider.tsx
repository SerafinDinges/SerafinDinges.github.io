import API from './API'

class DataProvider {
    API: API;
    constructor() {
        this.API = new API();
    }
    async getCasesByCountry(countries: Array<String>) {
        let cvd19deaths = await this.API.getCVD19CasesByCountry(countries);
        let wrapper: any = {};
        cvd19deaths = cvd19deaths.sort((first, second) => {
            let firstDate = new Date(first.date), secondDate = new Date(second.date);
            return firstDate.getTime() - secondDate.getTime();
        });
        wrapper.data = cvd19deaths;
        let keys: Array<String> = [];
        countries.forEach(country => {
            // keys.push(country + "_cases");
            keys.push(country + "_deaths");
        });
        wrapper.labels = {
            xAxis: "date",
            dataKeys: keys
        };
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
