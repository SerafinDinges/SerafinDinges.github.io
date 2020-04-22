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
    },
    dataSets: {
        "total_deaths": "Total deaths",
        "new_deaths": "New deaths",
        "total_cases": "Total cases (in thousands)",
        "new_cases": "New cases",
        "total_cases_per_million": "Total cases (per million inhabitants)",
        "new_cases_per_million": "New cases (per million inhabitants)",
        "total_deaths_per_million": "Total deaths (per million inhabitants)",
        "new_deaths_per_million": "New deaths (per million inhabitants)"
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