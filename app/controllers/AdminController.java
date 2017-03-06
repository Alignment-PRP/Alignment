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


    //================================ CREATE CATEGORY ================================================

    public Result addCategory(){
        return( ok(views.html.addCategroy.render()));
    }

    public Result createCategory(){
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        String name = values.get("name")[0];
        if(qh.executeQuery(Statement.CATEGORY_NAME_EXISTS, name).get(0).get("bool").asInt() == 1){
            return unauthorized("category name is allready taken do you wish to update it instead?");
        }
        String description = values.get("description")[0];
        qh.insertCategory(Statement.CREATE_CATEGORY, name, description);
        return ok();
    }

    //=========================== ADD SUBCATEGORY =======================================

    public Result addSubcategory(){
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        String parent = values.get("parent")[0];
        String child = values.get("child")[0];
        //note: this should also cover the case of parent = child (returns 1 but not 2)
        JsonNode exists = qh.executeQuery(Statement.CATEGORIES_EXISTS, parent, child);
        System.out.println(exists);
        if(exists.get(0).get("bool").asInt() != 2){
            return unauthorized("one or more of the selected categories do not exist");
        }
        qh.addTableRelation(Statement.ADD_SUBCATEGORY, Integer.parseInt(parent), Integer.parseInt(child));
        return ok("new parent/child relationship established");
    }

    //================================= ADD CATEGORY TO (GLOBAL) REQUIREMENT ==========================================

    public Result insertRequirementCategory(){
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        int requirement = Integer.parseInt(values.get("requirementid")[0]);
        int category = Integer.parseInt(values.get("categoryid")[0]);

        int reqExists = qh.executeQuery(Statement.REQUIREMENT_EXISTS, requirement).get(0).get("bool").asInt();
        int categoryExists = qh.executeQuery(Statement.CATEGORY_EXISTS, category).get(0).get("bool").asInt();
        System.out.println(reqExists);
        System.out.println(categoryExists);

        if(reqExists == 1 && categoryExists == 1){
            qh.addTableRelation(Statement.ADD_REQUIREMENT_CATEGORY, requirement, category);
            return ok("added requirementCategory");
        }
        return unauthorized("category or requirement does not exist");
    }

    public Result addCategeroyToRequirement(){
        return ok(views.html.addRequirementCategory.render());
    }

    //================================ DELETE PROJECT =======================================
    /*public Result deleteProjects(){
        return ok(views.html.deleteProject.render());
    }

    public Result deleteProject(){
        //SERIOUSLY BE CAREFULL WITH THIS SHIT LATER
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        int id = Integer.parseInt(values.get("id")[0]);
        qh.deleteProject(Statement.DELETE_PROJECT, id);
        return ok();
    }*/

}
