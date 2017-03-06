package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import models.User;
import play.api.libs.iteratee.Cont;
import play.db.Database;
import play.mvc.Controller;
import play.mvc.Result;
import static play.mvc.Results.ok;
import javax.inject.Inject;
import java.util.Map;

/**
 * Created by Kim Erling on 02.03.2017.
 */
public class RequirementController extends Controller{
    private QueryHandler qh;

    @Inject
    public RequirementController(Database db) {
        this.qh = new QueryHandler(db);
    }

    public Result getRequirementsByCategoryID(String id){
        int categoryid = Integer.parseInt(id);
        //Might as well keep the user check.
        String userID = session("connected");
        if(userID != null){
            //Returns and 200 OK with a JsonNode as Body.
            return ok(qh.getRequirementByCategoryID(categoryid));
        }
        else{
            return unauthorized(views.html.login.render());
        }
    }


    public Result getAllRequirements(){
        //Might as well keep the user check.
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        JsonNode req = qh.getAllRequirements();
        System.out.println(req);
        return ok(req);
    }
    public Result newProjectRequirement(){
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        //TODO: Add relevant category.
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        String projectID = values.get("projectid")[0];
        String name = values.get("name")[0];
        String desc = values.get("desc")[0];
        String ispublic = values.get("ispublic")[0];
        String source = values.get("source")[0];
        String stimulus = values.get("stimulus")[0];
        String artifact = values.get("artifact")[0];
        String response = values.get("response")[0];
        String responsemeasure= values.get("responsemeasure")[0];
        String environment = values.get("environment")[0];
        //TODO: Check if the user is authorized to edit the project. (If the user is part of the project)
        //TODO: Check if the project referenced by projectid actually exists
        qh.createProjectRequirement(projectID, ispublic, name, desc, source, stimulus, artifact, response, responsemeasure, environment);
        return ok();
    }

    public Result getNewRequirementView(){
        return ok(views.html.newrequirement.render());
    }

    public boolean projectRequirementNameExists(String name){
        JsonNode exists = qh.projectRequirementNameExists(name);
        return exists.get(0).get("bool").asInt() == 1;
    }

    public Result getCategories(){
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        JsonNode req = qh.getCategoryNames();
        return ok(req);
    }

    public Result getRequirementsByCategoryName(String name){
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        JsonNode req = qh.getRequirementByCategoryName(name);
        return ok(req);
    }
}
