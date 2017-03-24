package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import database.Statement;
import play.db.Database;
import play.mvc.Controller;
import play.mvc.Result;
import static play.mvc.Results.ok;
import javax.inject.Inject;
import java.sql.SQLException;
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


    /**
     * Gets The requirements that are a part of the specified category.
     * @param id: String. The ID of the category
     * @return 200 OK, or 401 Unauthorized.
     * If 200 OK, The body contains the Relevant requirements and accompanying MetaData and Structure.
     */
    public Result getRequirementsByCategoryID(String id){
        int categoryid = Integer.parseInt(id);
        //Checks if the user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        return ok(qh.executeQuery(Statement.GET_REQUIREMENTS_BY_CATEGORY_ID,categoryid));
    }


    /**
     * Gets all the Global Requirements. These are the ones that only the admin can edit and create.
     * For now any one can read them.
     * @return 200 OK, or 401 Unauthorized.
     * If 200 OK, The body contains the Relevant requirements and accompanying MetaData and Structure.
     */
    public Result getGlobalRequirements(){
        //Checks if the user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        JsonNode req = qh.executeQuery(Statement.GET_GLOBAL_REQUIREMENTS);
        return ok(req);
    }

    @Deprecated //Use the one in projectcontroller
    public Result InsertProjectRequirement(){
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

        qh.insertStatement(Statement.INSERT_PROJECT_REQUIREMENT, projectID, ispublic, name, desc, source, stimulus, artifact, response, responsemeasure, environment);

        return ok();
    }

    /**
     * Returns a HTML form to insert a requirement. For testing.
     * @return 200 OK  with the form as body.
     */
    public Result getNewRequirementView(){
        return ok(views.html.newrequirement.render());
    }


    /**
     * Gets all the category names and IDs.
     * @return 200 OK, or 401 Unauthorized.
     */
    public Result getCategories() {
        //Checks if the user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        JsonNode req = qh.executeQuery(Statement.GET_CATEGORIES);
        return ok(req);

    }

    /*
        //Checks if the user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        JsonNode req = qh.executeQuery(Statement.GET_CATEGORY_NAMES);
        return ok(req);
    }*/


    @Deprecated //need to use ID to get categories now.
    public Result getRequirementsByCategoryName(String name){
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        //JsonNode req = qh.getRequirementByCategoryName(name);
        JsonNode req = qh.executeQuery(Statement.GET_REQUIREMENTS_BY_CATEGORY_ID,name);
        return ok(req);
    }
}
