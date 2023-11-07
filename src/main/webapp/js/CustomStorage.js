export default class CustomStorage {
    constructor() {
        this.storage = sessionStorage;
        // this.storage = new Map();
    }

    addResult(result) {
        let previousResults = this.getResults();
        previousResults.push(result);
        this.saveResults(previousResults);
    }

    getResults() {
        const resultsJSON = this.get("results");
        return resultsJSON ? JSON.parse(resultsJSON) : [];
    }

    saveResults(results) {
        const resultsJSON = JSON.stringify(results);
        this.push("results", resultsJSON);
    }

    get(key) {
        return this.storage.getItem(key);
        // return this.storage.get(key);
    }

    push(key, value) {
        this.storage.setItem(key, value);
        // this.storage.set(key, value);
    }

    clear() {
        this.storage.clear();
    }
}