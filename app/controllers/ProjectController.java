package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import models.User;

import play.db.Database;
import play.mvc.Controller;
import play.mvc.Result;
import static play.mvc.Results.ok;
import javax.inject.Inject;


/**
 * Created by andrfo on 24.02.2017.
 */
public class ProjectController extends Controller {



    private QueryHandler qh;

    @Inject
    public ProjectController(Database db) {
        this.qh = new QueryHandler(db);
    }


    public Result getUserRelatedProjects(){
        String userID = session("connected");
        if(userID != null){
            //Returns and 200 OK with a JsonNode as Body.
            return ok(qh.getProjectRelatedToUser(userID));
        }
        else{
            return unauthorized(views.html.login.render());
        }
    }

    public Result newProject(){

        return ok();
    }

    public Result getPublicProjects(){
        return ok(qh.getPublicProjects());
    }
    

}
