import API from './API'
const moment = require('moment');

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
    reduceDataSetToInterval(arr, intervalStartDay, intervalDuration) {
        console.log("transform to weekly", arr.slice());
        for (let index = 0; index < arr.length; index++) { // delete data until first incrementation
            if (moment(arr[index].date).dayOfYear() === (intervalStartDay - intervalDuration + 1)) { // start at the beginning of first duration of interval
                console.log(moment(arr[index].date).dayOfYear(), intervalStartDay, intervalDuration);
                arr.splice(0, index);
                break;
            }
        }
        let metaArray: Array<Array<any>> = [];
        while (arr.length) {
            metaArray.push(arr.splice(0, intervalDuration));
        }
        // console.log(metaArray);
        let finalArray = [] as any;
        metaArray.forEach(oneWeek => {
            finalArray.push(oneWeek.reduce((newDay, sum) => {
                Object.keys(newDay).forEach(key => {
                    if (key.includes("new")) {
                        sum[key] += parseInt(newDay[key]);
                    }
                });
                return sum;
            }));
        });
        console.log("fin", finalArray);
        return finalArray;
    }
    async getComparisonData(comparisons: Array<string>, wrapper: any) {
        let mainData = await this.API.getSheet("main_data");
        console.log(comparisons, wrapper, mainData);
        let comparedData: Array<any> = [];

        // get interval of comparison data
        let intervalStart = moment(mainData[0].date).dayOfYear();
        let intervalDuration = moment(mainData[1].date).dayOfYear() - intervalStart;

        let baseData = this.reduceDataSetToInterval(wrapper.data, intervalStart, intervalDuration);
        mainData.forEach(element => {
            let date = moment(element.date);
            let dataIndex: number = -1;
            baseData.forEach((value, index) => {
                if (moment(value.date).dayOfYear() === date.dayOfYear()) {
                    dataIndex = index;
                    return;
                }
            });

            if (dataIndex > -1) {
                comparisons.forEach(comparison => {
                    baseData[dataIndex][comparison] = element[comparison];
                });
                comparedData.push(baseData[dataIndex]);
            }
        });
        console.log("FINAL COMPARED", comparedData);

        wrapper.data = comparedData;
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
