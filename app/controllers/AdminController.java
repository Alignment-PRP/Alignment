package controllers;

import javax.inject.Inject;

import com.fasterxml.jackson.databind.JsonNode;
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

    @Inject //Injects the database object generated from the config file
    public AdminController(Database db){
        this.qh = new QueryHandler(db);
    }


    //================================  ADD REQUIREMENT ===================================================

    /**
     * Inserts into the Structure table
     * @param type String one of [Source, Stimulus, Artifact,...]
     * @param content the associated text.
     * @return Response 200 OK wiht body "Structure added"
     */
    public Result insertStructure(String type, String content){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        qh.insertStatementWithReturnID(Statement.INSERT_REQUIREMENT_STRUCTURE, type , content);
        return ok("Structure added");
    }

    /**
     * Inserts into the relational table HasStructure
     * @param rid requirementID
     * @param sid structureID
     */
    private void insertHasStructure(String rid, String sid){
        qh.insertStatement(Statement.INSERT_REQUIREMENT_HAS_STRUCTURE, Integer.parseInt(rid), Integer.parseInt(sid));
    }

    /**
     * A form for testing
     * @return 200 OK with a body cointaining the form to add a requirement
     */
    public Result addRequirement(){
        return ok(views.html.addReq.render());
    }

    /**
     * Inserts a GlobalRequirement into the database along with the structure and the metadata
     * @return 200 OK or 401 Unauthorized
     */
    public Result addReq(){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        //TODO: Validate user class

        //Converts the POST data to a map
        final Map<String, String[]> values = request().body().asFormUrlEncoded();

        //Adds the strucutre values to a list
        //List<String> structures = new ArrayList<String>();
        //structures.add(values.get("source")[0]);
        //structures.add(values.get("stimulus")[0]);
        //structures.add(values.get("artifact")[0]);
        //structures.add(values.get("response")[0]);
        //structures.add(values.get("responsemeasure")[0]);
        //structures.add(values.get("environment")[0]);

        //Gets the meta data values
        String subCatID = values.get("subCatID")[0];
        String reqResponsible = values.get("reqResponsible")[0];
        String description = values.get("description")[0];
        String comment = values.get("comment")[0];
        String reqCode = values.get("reqCode")[0];
        String reqNo = values.get("reqNo")[0];
        String name = values.get("name")[0];
        //TODO determine and create correct validation for requirements
        //validateReq(source, stimulus, artifact, response, responsemeasure, environment);


        //TODO determine if private global reqs are a thing
        //Checks if isPublic
        int pub;
        if(values.get("public") != null){
            pub = 1;
        }
        else {
            pub = 0;
        }

        //Inserts a new requirement and returns the requirement ID.
        String ID = qh.insertStatementWithReturnID(Statement.INSERT_REQUIREMENT);

        //Inserts a new row in RequirementMetaData using the requirement ID as PK
        qh.insertStatement(Statement.INSERT_REQUIREMENT_META_DATA, Integer.parseInt(ID), reqResponsible, description, comment, reqCode, reqNo, name);

        qh.insertStatement(Statement.INSERT_HAS_SUBCATEGORY, Integer.parseInt(ID), Integer.parseInt(subCatID));
        //Inserts all the structures
        /*for (String SID: structures){
            if(SID != null){
                insertHasStructure(ID, SID);
            }
        }
        */
        return ok("added requirement");

    }

    private boolean validateReq(String source, String stimulus, String artifact, String response, String responsemeasure, String environment){
        //TODO
        return true;
    }

    public Result getRequirementUsage(){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        return ok(qh.executeQuery(Statement.GET_PROJECTS_PER_REQUIREMENT));
    }
    //==================================== GET REQUIREMENT ===================================================

    /**
     * A method to get all the global requirements
     * @return 200 OK or 401 Unauthorized
     * If 200 OK, the body contains all global requirements with metadata and category
     * TODO: Get structure as well?
     */
    public Result getReq(){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //TODO: validate user is admin (ADMIN DOESN'T EXIST YET)
        JsonNode requirements = qh.executeQuery(Statement.GET_GLOBAL_REQUIREMENTS);
        return ok(requirements);
    }

    //==================================== UPDATE REQUIREMENT ================================================

    /**
     * A form for testing input
     * @return 200 OK with a form for updating a requirement as body
     */
    public Result updateReq(){
        return ok(views.html.updateReq.render());
    }

    /**
     * Updates an existing global requirement with new data.
     * @return
     */
    public Result updateRequirement(){
        //TODO: fix duplicates with add req and every local req

        //Converts the POST data to a map
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        int id = Integer.parseInt(values.get("id")[0]);

        //Checks if the requirement exists, if not: returns 401 Unauthorized
        JsonNode exists = qh.executeQuery(Statement.REQUIREMENT_EXISTS, id);
        if(exists.get(0).get("bool").asInt() != 1) {
            return unauthorized("no such requirement");
        }

        //Gets the values from the map
        String source = values.get("source")[0];
        String stimulus = values.get("stimulus")[0];
        String artifact = values.get("artifact")[0];
        String response = values.get("response")[0];
        String responsemeasure = values.get("responsemeasure")[0];
        String environment = values.get("environment")[0];

        //TODO duplicate of addReq
        validateReq(source, stimulus, artifact, response, responsemeasure, environment);

        //Checks if isPublic
        int pub;
        if (values.get("public") != null) {
            pub = 1;
        } else {
            pub = 0;
        }
        String name = values.get("name")[0];
        String desc = values.get("description")[0];

        //Executes the update statement
        qh.insertStatement(Statement.UPDATE_GLOBAL_REQUIREMENT, pub, name, desc, source, stimulus, artifact, response, responsemeasure, environment, id);

        return ok(views.html.dashboard.render());


    }


    //================================ CREATE CATEGORY ================================================

    public Result addCategory(){
        return( ok(views.html.addCategroy.render()));
    }
/*
    public Result createCategory(){
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        String name = values.get("name")[0];
        if(qh.executeQuery(Statement.CATEGORY_NAME_EXISTS, name).get(0).get("bool").asInt() == 1){
            return unauthorized("category name is allready taken do you wish to update it instead?");
        }
        String description = values.get("description")[0];

        qh.insertStatement(Statement.INSERT_CATEGORY, name, description);

        return ok();
    }
*/
    //=========================== ADD SUBCATEGORY =======================================

    /**
     * 
     * @return
     */
    public Result addSubcategory(){
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        String parent = values.get("parent")[0];
        String child = values.get("child")[0];
        //note: this should also cover the case of parent = child (returns 1 but not 2)
        JsonNode exists = qh.executeQuery(Statement.CATEGORY_EXISTS);
        System.out.println(exists);
        if(exists.get(0).get("bool").asInt() != 2){
            return unauthorized("one or more of the selected categories do not exist");
        }
        qh.addTableRelation(Statement.INSERT_SUBCATEGORY, Integer.parseInt(parent), Integer.parseInt(child));
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
            qh.addTableRelation(Statement.INSERT_CATEGORY, requirement, category);
            return ok("added requirementCategory");
        }
        return unauthorized("category or requirement does not exist");
    }

    public Result addCategeroyToRequirement(){
        return ok(views.html.addRequirementCategory.render());
    }

    //================================ DELETE =======================================

    public Result deleteRequirement(){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        final JsonNode values = request().body().asJson();
        Integer RID = values.get("RID").asInt();

        JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID);
        String className = userClass.get(0).get("NAME").asText();

        //Checks if the connected user has permission to delete
        if(className != "Admin"){
            return unauthorized("You do not have permission to delete requirements.");
        }

        qh.executeUpdate(Statement.DELETE_HAS_STRUCTURE, RID);
        qh.executeUpdate(Statement.DELETE_REQUIREMENT_METADATA, RID);
        qh.executeUpdate(Statement.DELETE_HAS_SUB_CATEGORY, RID);
        qh.executeUpdate(Statement.DELETE_PROJECT_REQUIREMENTS_BY_RID, RID);//TODO: This is unfortunate.
        qh.executeUpdate(Statement.DELETE_GLOBAL_REQUIREMENT, RID);


        return ok("Global Requirement and all related data deleted");
    }

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
