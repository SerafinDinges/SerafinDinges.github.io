import API from './API'

class DataProvider {
    API: API;
    constructor() {
        this.API = new API();
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
        wrapper.labels.comparisons = [];
        return wrapper;
    }
    async getComparisonData(comparisons: Array<string>, wrapper: any) {
        let mainData = await this.API.getSheet("main_data");
        console.log(comparisons, wrapper, mainData);
        mainData.forEach(element => {
            let date = new Date(element.date);
            date.setFullYear(2020); // pretend this data is from 2020 for comparison in similar time
            let dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            // console.log(dateKey, element);
            let dataIndex: number = -1;
            wrapper.data.forEach((value, index) => {
                if (value.date === dateKey) {
                    dataIndex = index;
                    return;
                }
            });

            if (dataIndex > -1) {
                comparisons.forEach(comparison => {
                    wrapper.data[dataIndex][comparison] = element[comparison];
                });
            }
        });
        wrapper.labels.comparisons = comparisons;

        // let wrapper: any = {};
        // let respiratoryDeaths = await this.API.getSheet("regular_flu_deaths");
        // let helperObjectRespiratoryDeaths: any = {};
        // respiratoryDeaths.forEach(element => {
        //     let date = new Date(element.date);
        //     helperObjectRespiratoryDeaths[date.getDay() + "-" + date.getMonth()] = element;
        // });

        // let aggregatedData = cvd19deaths.map((element) => {
        //     let date = new Date(element.date);
        //     let time = date.getMonth() + "-" + date.getDay();

        //     if (helperObjectRespiratoryDeaths[time]) {
        //         element.uk_total_deaths = helperObjectRespiratoryDeaths[time].uk_total_sum;
        //         element.uk_respiratory_deaths = helperObjectRespiratoryDeaths[time].uk_respiratory_sum;
        //     }
        //     return element;
        // });
        // console.log(aggregatedData);

        // wrapper.data = aggregatedData;
        // wrapper.labels = {
        //     xAxis: "date",
        //     dataKeys: ["GBRcases", "GBRdeaths", "uk_total_deaths", "uk_respiratory_deaths"]
        // };
        return wrapper;
    }
}

export default DataProvider;
