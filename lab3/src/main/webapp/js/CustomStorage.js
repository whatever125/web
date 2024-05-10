export default class CustomStorage {
    constructor() {
        this.storage = {};
        // this.storage = sessionStorage;
    }

    addResult(result) {
        let previousResults = this.getResults();
        previousResults.push(result);
        this.setResults(previousResults);
    }

    getResults() {
        const resultsJSON = this.get("results");
        return resultsJSON ? JSON.parse(resultsJSON) : [];
    }

    setResults(results) {
        const resultsJSON = JSON.stringify(results);
        this.push("results", resultsJSON);
    }

    get(key) {
        // return this.storage.getItem(key);
        // return this.storage.get(key);
        return this.storage[key];
    }

    push(key, value) {
        // this.storage.setItem(key, value);
        // this.storage.set(key, value);
        this.storage[key] = value;
    }

    clear() {
        // this.storage.clear();
        this.storage = {};
    }
}