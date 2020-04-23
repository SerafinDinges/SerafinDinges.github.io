export { getMetaKey as default, getDataSetLabel };
export const dictionary = {
    countries: {
        "DEU": "Germany",
        "GBR": "United Kingdom",
        "AUT": "Austria",
        "USA": "USA",
        "JPN": "Japan",
        "ITA": "Italy",
        "KOR": "South Korea",
        "SWE": "Sweden",
    },
    dataSets: {
        "new_cases": "cases",
        "new_deaths": "deaths",
        "total_cases": "Total cases",
        "total_deaths": "Total deaths",
        // "total_cases_per_million": "Total cases (per million inhabitants)",
        // "new_cases_per_million": "New cases (per million inhabitants)",
        // "total_deaths_per_million": "Total deaths (per million inhabitants)",
        // "new_deaths_per_million": "New deaths (per million inhabitants)"
    },
    comparisons: {
        "GBR_new_respiratory_deaths": "Average respiratory deaths in the UK (pre cvd19)"
    }
};
function getMetaKey(key: string) {
    let country = key.substring(0, 3);
    let dataSet = key.substring(4);
    return `${dictionary.countries[country]}: ${dictionary.dataSets[dataSet]}`
}

function getDataSetLabel(key: string) {
    if (dictionary.dataSets[key]) return dictionary.dataSets[key];
    return "Label not found";
}