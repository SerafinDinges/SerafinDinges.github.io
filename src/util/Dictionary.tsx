export { getMetaKey as default, getDataSetLabel };
export const dictionary = {
    countries: {
        "GBR": "UK",
        "DEU": "Germany",
        "AUT": "Austria",
        "USA": "USA",
        "JPN": "Japan",
        "ITA": "Italy",
        "KOR": "South Korea",
        "SWE": "Sweden",
    },
    dataSets: {
        "new_deaths": "New deaths",
        "new_cases": "New cases",
        "total_deaths": "Total deaths",
        "total_cases": "Total cases",
        // "total_cases_per_million": "Total cases (per million inhabitants)",
        // "new_cases_per_million": "New cases (per million inhabitants)",
        // "total_deaths_per_million": "Total deaths (per million inhabitants)",
        // "new_deaths_per_million": "New deaths (per million inhabitants)"
    },
    comparisons: {
        "GBR_new_respiratory_deaths": "Weekly new respiratory deaths* in England and Wales (five year average)",
        "GBR_new_overall_deaths": "Weekly new overall deaths in England and Wales (five year average)",
    }
};
function getMetaKey(key: string) {
    let country = key.substring(0, 3);
    let dataSet = key.substring(4);
    let perMillion = "";
    if (dataSet.includes("_per_million")) {
        dataSet = dataSet.replace("_per_million", "");
        perMillion = " (per million)"
    }
    let dataSetKey = false;
    if (dictionary.comparisons[key]) dataSetKey = dictionary.comparisons[key];
    else dataSetKey = dictionary.dataSets[dataSet];
    return `${dictionary.countries[country]} - ${dataSetKey}${perMillion}`
}

function getDataSetLabel(key: string) {
    if (dictionary.dataSets[key]) return dictionary.dataSets[key];
    return "Label not found";
}