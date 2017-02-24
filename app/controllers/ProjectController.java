package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import models.User;
import play.db.Database;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

import static play.mvc.Results.ok;

/**
 * Created by andrfo on 23.02.2017.
 */
public class ProjectController extends Controller {

    private QueryHandler qh;

    @Inject
    public ProjectController(Database db) {
        this.qh = new QueryHandler(db);
    }

    public Result getRelatedProjects(){
        return ok(qh.getRelatedProjectsByID(session("connected")));
    }
}
