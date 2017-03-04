package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import models.User;

import play.db.Database;
import play.mvc.Controller;
import play.mvc.Result;
import static play.mvc.Results.ok;
import javax.inject.Inject;
import java.util.Map;


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
        //TODO checkAuthenticity();   HERE?
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        return ok(qh.getProjectRelatedToUser(userID));
    }

    /**
     * for testing.
     * @return a simple html view for inserting a new project.
     */
    public Result getNewProjectView(){
        return ok(views.html.newproject.render());
    }
    public Result newProject(){
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        final Map<String, String[]> values = request().body().asFormUrlEncoded();

        String name = values.get("name")[0];
        String desc = values.get("desc")[0];
        String ispublic = values.get("ispublic")[0];
        if(projectNameExists(name)) {
            //TODO determine a good http response for "recource is ok and all but needs a different value"
            return status(200, "Project name is taken");
        }
        qh.createProject(name, desc, ispublic, userID, userID);
        return ok();
    }

    public Result getPublicProjects(){
        return ok(qh.getPublicProjects());
    }
    public boolean projectNameExists(String name){
        JsonNode exists = qh.projectNameExists(name);
        //System.out.println(exists.get(0).get("bool"));
        //System.out.println(exists.get(0).get("bool").asInt() == 1);
        return exists.get(0).get("bool").asInt() == 1;
    }


}
