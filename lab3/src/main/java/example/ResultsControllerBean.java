package example;

import example.db.DAOFactory;
import example.db.ResultDAO;
import example.entity.ResultEntity;
import example.utils.PointChecker;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.time.ZonedDateTime;
import java.util.*;

import java.io.Serializable;

/**
 * Managed bean for handling results in JSF application.
 * This bean is responsible for managing operations related to result entities.
 */
@Named
@ApplicationScoped
@Data
@Slf4j
public class ResultsControllerBean implements Serializable {
    @Inject
    private XBean xBean;
    @Inject
    private YBean yBean;
    @Inject
    private RBean rBean;

    private ResultDAO resultDAO;
    private ArrayList<ResultEntity> results = new ArrayList<>();

    @PostConstruct
    public void init() {
        resultDAO = DAOFactory.getInstance().getResultDAO();
        var resultsEntities = resultDAO.getAllResults();
        results = new ArrayList<>(resultsEntities);
        Collections.reverse(results);
        log.info("Results initialized with {} entries.", results.size());
    }

    public void addResult(Double x, Double y, Double r) {
        final long startTime = System.nanoTime();

        FacesContext fCtx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) fCtx.getExternalContext().getSession(false);
        String sessionId = session.getId();

        boolean success = PointChecker.isInArea(x, y, r);
        final long endTime = System.nanoTime();
        final long executionTime = (endTime - startTime) / (long) Math.pow(10, 3);

        ResultEntity entity = ResultEntity.builder().x(x).y(y).r(r).success(success).sessionId(sessionId).dateTime(ZonedDateTime.now()).executionTime(executionTime).build();
        results.add(0, entity);

        DAOFactory.getInstance().getResultDAO().addNewResult(entity);
//        log.info("Added new result to the db: X={}, Y={}, R={}", x, y, r);

        String script1 = String.format(Locale.US, "window.saveResult(%f, %f, %f, %b);", x, y, r, success);
        FacesContext.getCurrentInstance().getPartialViewContext().getEvalScripts().add(script1);
        String script2 = String.format(Locale.US, "window.drawResult(%f, %f, %f, %b);", x, y, r, success);
        FacesContext.getCurrentInstance().getPartialViewContext().getEvalScripts().add(script2);
    }

    public void drawResults() {
        for (ResultEntity result: getSessionResults()) {
            String script1 = String.format(Locale.US, "window.drawResult(%f, %f, %f, %b);", result.getX(), result.getY(), result.getR(), result.isSuccess());
            FacesContext.getCurrentInstance().getPartialViewContext().getEvalScripts().add(script1);
        }
    }

    public List<ResultEntity> getSessionResults() {
        FacesContext fCtx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) fCtx.getExternalContext().getSession(false);
        String sessionId = session.getId();

        return results.stream()
                .filter(result -> result.getSessionId().equals(sessionId))
                .toList();
    }

    public void clearSessionResults() {
        FacesContext fCtx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) fCtx.getExternalContext().getSession(false);
        String sessionId = session.getId();

        results.removeIf(result -> result.getSessionId().equals(sessionId));
        System.out.println("removed1");
        resultDAO.clearSessionResults(sessionId);
        System.out.println("removed2");

        String script1 = "window.clearCanvas();";
        FacesContext.getCurrentInstance().getPartialViewContext().getEvalScripts().add(script1);
    }

    public void updateCanvas() {
        String script1 = String.format(Locale.US, "window.updateCanvas(%f);", rBean.getR());
        FacesContext.getCurrentInstance().getPartialViewContext().getEvalScripts().add(script1);

        this.drawResults();
    }
}

