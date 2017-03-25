package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import database.Statement;

import play.db.Database;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import static play.mvc.Results.ok;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

/**
 * Created by andrfo on 24.02.2017.
 */
public class ProjectController extends Controller {



    private QueryHandler qh;

    //Ijnects the database object generated from the config file.
    @Inject
    public ProjectController(Database db) {
        this.qh = new QueryHandler(db);
    }

    /**
     * Returns all the projects the user has access to.
     * Checks if the UserClass the user is a part of has access, and whether the user is the manager or
     * creator of the Project.
     * @return Result 200 Ok or 401 Unauthorized
     * If 200 OK, the body contains All the relevant project data of the projects.
     */
    public Result getProjectsAccessibleByUser(){
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        return ok(qh.executeQuery(Statement.GET_PROJECTS_ACCESSIBLE_BY_USER, userID, userID, userID));
    }

    /**
     * for testing.
     * @return a simple html view for inserting a new project.
     */
    public Result getNewProjectView(){
        return ok(views.html.newproject.render());
    }


    /**
     * Inserts a new Project with projet metadata in to the database.
     * Called with a POST from client through the routes file.
     * @return Result 200 Ok or 401 Unauthorized
     */
    public Result newProject(){

        //Check if user is logged in
        String username = session("connected");
        if(username == null){
            return unauthorized(views.html.login.render());
        }

        //Gets the http body of the POST and converts it to a map
        final Map<String, String[]> values = request().body().asFormUrlEncoded();

        //Gets the values from the map
        String name = values.get("name")[0];
        String ispublic = values.get("isPublic")[0];
        String securityLevel = values.get("securityLevel")[0];
        String transactionVolume = values.get("transactionVolume")[0];
        String userChannel = values.get("userChannel")[0];
        String deploymentStyle = values.get("deploymentStyle")[0];

        //Inserts a new Project and returns the ID of the project just inserted
        String ID = qh.insertStatementWithReturnID(Statement.INSERT_PROJECT, username, username, name, Integer.parseInt(ispublic));

        //Inserts ProjectMetaData with the project
        qh.insertStatement(Statement.INSERT_PROJECT_META_DATA, Integer.parseInt(ID), securityLevel, transactionVolume, userChannel, deploymentStyle);
        //TODO: Add project metadata and userclasses that have access.
        return ok(views.html.dashboard.render());

    }


    /**
     * Inserts into HasAccess Table. This table specifies the releation between
     * Project and UserClass. Dictates what user classes have access to a project.
     * @return @return Result 200 Ok or 401 Unauthorized
     */
    public Result insertHasAccess(){

        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            //Returns and 200 OK with a JsonNode as Body.
            //return ok(qh.getProjectByProjectID(projectid));
            return unauthorized(views.html.login.render());
        }

        //Gets the http body of the POST and converts it to a map
        final Map<String, String[]> values = request().body().asFormUrlEncoded();

        //Gets the values from the map
        int PID = Integer.parseInt(values.get("PID")[0]);
        int NAME = Integer.parseInt(values.get("NAME")[0]);

        //Gets the project data to get the manager and creator USERNAME
        JsonNode project = qh.executeQuery(Statement.GET_PROJECT_BY_ID, PID);
        String managerID = project.get("managerID").asText();
        String creatorID = project.get("creatorID").asText();

        //Checks if the connected user is the manager or the creator of the project in question.
        if((userID != managerID) && (userID != creatorID)){
            return unauthorized("Only the creator or the manager of this project can edit what userclasses have access");
        }

        //Inserts into the HasAccess table
        qh.insertStatement(Statement.INSERT_HAS_ACCESS, NAME, PID);

        return ok(NAME + " Now has access to the project with projectID " + PID);
    }

    /**
     * Gets all Projects with the isPublic bit set to 1.
     * Any one can read public projects.
     * @return Response 200 OK
     */
    public Result getPublicProjects(){
        return ok(qh.executeQuery(Statement.GET_PUBLIC_PROJECTS));
    }

    /**
     *
     * @param id: String from the GET Request
     * @return Result 200 Ok or 401 Unauthorized
     * If 200 OK the body contains all relevant project data
     */
    public Result getProjectByProjectID(String id){
        //Check if user is logged in
        String projectid = id;
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        return ok(qh.executeQuery(Statement.GET_PROJECT_BY_ID,projectid));
    }


    /**
     *
     * @param id: String from the GET Request
     * @return Result 200 Ok or 401 Unauthorized
     * If 200 OK the body contains all requirements of the specified project
     */
    public Result getProjectRequirements(String id){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        int projectID = Integer.parseInt(id);
        //TODO validate access permition
        JsonNode projectRequirements = qh.executeQuery(Statement.GET_PROJECT_REQUIREMENTS, projectID);
        return ok(projectRequirements);
    }

    /**
     * Function for testing, just a form to POST a new project requirement
     * @return 200 OK with a form to add project requirement
     */
    public Result getProjectRequirementForm(){
        return ok(views.html.getProjectRequirements.render());
    }

    /**
     * Inserts a ProjectRequirement in to the database and connects it with a global requirement.
     * @return Result 200 Ok or 401 Unauthorized
     */
    public Result addReq(){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        //TODO: Check if user has access to project

        //Converts the HTTP POST Request body to a map
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        String PID = values.get("PID")[0];
        String RID = values.get("RID")[0];
        if(qh.executeQuery(Statement.REQUIREMENT_EXISTS, RID).get(0).get("bool").asInt() != 1){
            return unauthorized(RID + " is not a valid requirement ID");
        }
        if(qh.executeQuery(Statement.PROJECT_EXISTS, PID).get(0).get("bool").asInt() != 1){
            return unauthorized(PID + " is not a valid project ID");
        }
        String reqNo = values.get("reqNo")[0];
        String reqCode = values.get("reqCode")[0];
        String comment = values.get("comment")[0];
        String description = values.get("description")[0];

        JsonNode globalReq = qh.executeQuery(Statement.GET_GLOBAL_REQUIREMENT_BY_ID, RID).get(0);

        qh.insertStatement(Statement.INSERT_PROJECT_REQUIREMENT, Integer.parseInt(PID), Integer.parseInt(RID), reqNo, reqCode, comment, description);

        return ok("Project Requirement Inserted");

    }
    //SAME AS getProjectRequirementForm()
    public Result addReqForm(){
        return ok(views.html.addGlobalReqToProject.render());
    }

    //==================================================================== GET CATEGORY ================================================================================================================

    public Result testyTest(){
        return getCategories();
    }

    public Result getCategories(){
        List<Map<String, Object>> categoryList = new ArrayList<>();
        JsonNode categoryData = qh.executeQuery(Statement.GET_CATEGORIES);
        Map<String, Integer> keyMaping = new HashMap<>();
        for(int i = 0; i < categoryData.size(); i++){
            JsonNode content = categoryData.get(i);
            String categoryID = content.get("categoryID").asText();
            if(! keyMaping.containsKey(categoryID)){
                //Make a class object with a couple of strings and a list instead?? and have Map<String, newClassThingy> mainCat = new HashMap<>();
                Map<String, Object> mainCat = new HashMap<>();
                mainCat.put("id", categoryID);
                mainCat.put("name", content.get("categoryName").asText());
                List subcatList = new ArrayList<>();
                Map<String, String> subcategory = new HashMap<>();
                subcategory.put("subcategoryID", content.get("subCategoryID").asText());
                subcategory.put("subcategoryName", content.get("subCategoryName").asText());
                subcatList.add(subcategory);
                mainCat.put("subcategories", subcatList);
                categoryList.add(mainCat);
                keyMaping.put(categoryID, categoryList.size()-1);
            }
            else{
                //should be a list but the cast is required due ot the "Object" definition to have a multi type list
                List subcategories = (List) categoryList.get(keyMaping.get(categoryID)).get("subcategories");
                Map<String, String> subcategory = new HashMap<>();
                subcategory.put("subcategoryID", content.get("subCategoryID").asText());
                subcategory.put("subcategoryName", content.get("subCategoryName").asText());
                subcategories.add(subcategory);
            }
        }
        return ok(Json.toJson(categoryList));
    }
}
