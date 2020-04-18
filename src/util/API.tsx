
import Tabletop from 'tabletop';

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
}

export default API;
