export default class CustomStorage {
    storage = localStorage;

    constructor() {
        
    }

    getResults() {
        const resultsJSON = this.storage.getItem("results");
        return resultsJSON ? JSON.parse(resultsJSON) : [];
    }

    saveResults(results) {
        const resultsJSON = JSON.stringify(results);
        this.storage.setItem("results", resultsJSON);
    }

    addResult(result) {
        let previousResults = this.getResults();
        previousResults.push(result);
        this.saveResults(previousResults);
    }

    clear() {
        this.storage.clear();
    }
}