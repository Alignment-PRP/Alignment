package controllers;

import javax.inject.Inject;

import com.fasterxml.jackson.databind.JsonNode;
import com.mysql.fabric.Response;
import database.Statement;
import play.db.Database;

import database.QueryHandler;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.Map;

/**
 * Created by Andreas on 05.03.2017.
 */
public class AdminController extends Controller {

    private QueryHandler qh;

    @Inject
    public AdminController(Database db){
        this.qh = new QueryHandler(db);
    }

    //================================  ADD REQUIREMENT ===================================================

    public Result addRequirement(){
        return ok(views.html.addReq.render());
    }

    public Result addReq(){
        //note adds a global requirement
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        String source = values.get("source")[0];
        String stimulus = values.get("stimulus")[0];
        String artifact = values.get("artifact")[0];
        String response = values.get("response")[0];
        String environment  = values.get("environment")[0];

        validateReq(source, stimulus, artifact, response, environment);


        //TODO determine if private global reqs are a thing
        String pub;
        if(values.get("public") != null){
            pub = "1";
        }
        else {
            pub = "0";
        }
        String name = values.get("name")[0];
        String desc = values.get("description")[0];


        qh.addReq(true, pub, name, desc, source, stimulus, artifact, response, environment);
        return ok("added requirement");
    }

    private boolean validateReq(String source, String stimulus, String artifact, String response, String environment){
        return true;
    }

    //==================================== GET REQUIREMENT ===================================================

    public Result getReq(){
        //TODO: validate user is admin (ADMIN DOESN'T EXIST YET)
        JsonNode requirements = qh.executeQuery(Statement.GET_GLOBAL_REQUIREMENTS);
        return ok(requirements);
    }

    //==================================== UPDATE REQUIREMENT ================================================
    public Result updateReq(){
        return ok(views.html.updateReq.render());
    }

    public Result updateRequirement(){
        //TODO: fix duplicates with add req and every local req
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        String id = values.get("id")[0];
        JsonNode exists = qh.executeQuery(Statement.REQUIREMENT_EXISTS, id);
        if(exists.get(0).get("bool").asInt() == 1) {
            String source = values.get("source")[0];
            String stimulus = values.get("stimulus")[0];
            String artifact = values.get("artifact")[0];
            String response = values.get("response")[0];
            String environment = values.get("environment")[0];

            validateReq(source, stimulus, artifact, response, environment);

            String pub;
            if (values.get("public") != null) {
                pub = "1";
            } else {
                pub = "0";
            }
            String name = values.get("name")[0];
            String desc = values.get("description")[0];

            qh.updateReq(true, id, pub, name, desc, source, stimulus, artifact, response, environment);
            return ok("requirement updated");
        }
        return unauthorized("no such requirement");
    }

}
