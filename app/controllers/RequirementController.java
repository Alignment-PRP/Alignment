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

/**
 * Created by Kim Erling on 02.03.2017.
 */
public class RequirementController extends Controller{
    private QueryHandler qh;

    @Inject
    public RequirementController(Database db) {
        this.qh = new QueryHandler(db);
    }

    public Result getRequirementsByCategoryID(){
        //int categoryid = getCategoryID();
        //Might as well keep the user check.
        String userID = session("connected");
        if(userID != null){
            //Returns and 200 OK with a JsonNode as Body.
            //return ok(qh.getRequirementByCategoryID(categoryid));
            return ok();
        }
        else{
            return unauthorized(views.html.login.render());
        }
    }


    public Result getAllRequirements(){
        //Might as well keep the user check.
        String userID = session("connected");
        if(userID != null){
            //Returns and 200 OK with a JsonNode as Body.
            JsonNode req = qh.getAllRequirements();
            System.out.println(req);
            return ok(req);
        }
        else{
            return unauthorized(views.html.login.render());
        }
    }
}
