package beans;

import java.io.Serializable;
import java.util.LinkedList;

public class ResultsList implements Serializable {
    private LinkedList<Result> results;

    public ResultsList() {
        this.results = new LinkedList<>();
    }

    public void add(Result result) {
        this.results.add(result);
    }

    public LinkedList<Result> getResults() {
        return results;
    }

    public void setResults(LinkedList<Result> results) {
        this.results = results;
    }
}