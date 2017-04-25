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
import java.util.HashMap;
import java.util.Map;

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

    //===================================TESTING========================================================================

    /**
     * Function for testing, just a form to POST a new project requirement
     * @return 200 OK with a form to add project requirement
     */
    public Result getProjectRequirementForm(){
        return ok(views.html.getProjectRequirements.render());
    }

    //SAME AS getProjectRequirementForm()
    public Result addReqForm(){
        return ok(views.html.addGlobalReqToProject.render());
    }

    /**
     * for testing.
     * @return a simple html view for inserting a new project.
     */
    public Result getNewProjectView(){
        return ok(views.html.newproject.render());
    }


    //===================================PROJECTS========================================================================


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
        final JsonNode values = request().body().asJson();

        //Gets the values from the map
        String name = values.get("name").asText();
        String description = values.get("description").asText();
        int securityLevel = values.get("securityLevel").asInt();
        String transactionVolume = values.get("transactionVolume").asText();
        String userChannel = values.get("userChannel").asText();
        String deploymentStyle = values.get("deploymentStyle").asText();
        int ispublic = values.has("isPublic") && values.get("isPublic").asBoolean() ? 1 : 0;

        //Inserts a new Project and returns the ID of the project just inserted
        String ID = qh.insertStatementWithReturnID(Statement.INSERT_PROJECT, username, username, name, description, ispublic);

        //Inserts ProjectMetaData with the project
        qh.insertStatement(Statement.INSERT_PROJECT_META_DATA, Integer.parseInt(ID), securityLevel, transactionVolume, userChannel, deploymentStyle);
        //TODO: Add project metadata and userclasses that have access.
        return ok(views.html.dashboard.render());

    }

    public Result deleteProject(){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        final JsonNode values = request().body().asJson();
        Integer PID = values.get("PID").asInt();
        JsonNode project = qh.executeQuery(Statement.GET_PROJECT_BY_ID, PID);
        String managerID = project.get(0).get("managerID").asText();
        String creatorID = project.get(0).get("creatorID").asText();

        JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID);
        String className = userClass.get(0).get("NAME").asText();

        //Checks if the connected user has permission to delete
        if(!((userID != managerID) || (userID != creatorID) || className != "Admin")){
            return unauthorized("You do not have permission to delete this project.");
        }

        qh.executeUpdate(Statement.DELETE_PROJECT_REQUIREMENTS_BY_PID, PID);
        qh.executeUpdate(Statement.DELETE_PROJECT_METADATA, PID);
        qh.executeUpdate(Statement.DELETE_HAS_ACCESS_PROJECT, PID);
        qh.executeUpdate(Statement.DELETE_PROJECT, PID);


        return ok("Project and all related data deleted");
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
        return ok(qh.executeQuery(Statement.GET_PROJECTS_ACCESSIBLE_BY_USER, userID, userID, userID, userID));
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
     * Updates a Project with projet metadata in the database.
     * Called with a POST from client through the routes file.
     * @return Result 200 Ok or 401 Unauthorized
     */
    public Result updateProject(){

        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        //Gets the http body of the POST and converts it to a map
        final JsonNode values = request().body().asJson();

        //Gets the project ID
        int PID = values.get("PID").asInt();

        //Gets the current projectData values
        JsonNode projectData = qh.executeQuery(Statement.GET_PROJECT_BY_ID, PID).get(0);

        boolean hasAccess = qh.executeQuery(Statement.GET_USER_HAS_ACCESS, PID).get(0).asBoolean(); //TODO: can those that have access edit?
        boolean isManager = projectData.get("mangerID").asText().equals(userID);
        boolean isCreator = projectData.get("creatorID").asText().equals(userID);

        //Checks if the user has permission to edit
        if(!(hasAccess || isManager || isCreator)){
            return unauthorized("You do not have permission to edit this project");
        }


        //Gets the current projectMetaData values
        JsonNode projectMetaData = qh.executeQuery(Statement.GET_PROJECT_META_DATA, PID).get(0);
        Map<String, String> updateData = new HashMap<>();

        //Iterates thorugh all the entries in the ProjectData
        while (projectData.fields().hasNext()){

            //The current entry
            Map.Entry<String, JsonNode> entry = projectData.fields().next();

            //If this data has been received by the client, add it to the updateData
            if(values.has(entry.getKey())){
                updateData.put(entry.getKey(), values.get(entry.getKey()).asText());
            }
            //If not, add the old entry
            else{
                updateData.put(entry.getKey(), entry.getValue().asText());
            }
        }

        //Iterates thorugh all the entries in the ProjectMetaData
        while (projectMetaData.fields().hasNext()){

            //The current entry
            Map.Entry<String, JsonNode> entry = projectMetaData.fields().next();

            //If this data has been received by the client, add it to the updateData
            if(values.has(entry.getKey())){
                updateData.put(entry.getKey(), values.get(entry.getKey()).asText());
            }

            //If not, add the old entry
            else{
                updateData.put(entry.getKey(), entry.getValue().asText());
            }
        }


        //Updates the ProjectData
        qh.executeUpdate(Statement.UPDATE_PROJECT, updateData.get("managerID"), updateData.get("name"), updateData.get("description"), updateData.get("ispublic"), PID);

        //Updates the ProjectMetaData
        qh.executeUpdate(Statement.UPDATE_PROJECT_META_DATA, updateData.get("securityLevel"), updateData.get("transactionVolume"), updateData.get("userChannel"), updateData.get("deploymentStyle"), PID);
        //TODO: Add project metadata and userclasses that have access.
        return ok(views.html.dashboard.render());

    }



    /**
     * Gets the meta data of the specified project
     * @param ID The project ID
     * @return Result 200 Ok or 401 Unauthorized
     */
    public Result getProjectMetaData(String ID){
        int PID = Integer.parseInt(ID);

        //Checks if the user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        //Gets the project data
        JsonNode project = qh.executeQuery(Statement.GET_PROJECT_BY_ID, PID).get(0);

        boolean hasAccess = qh.executeQuery(Statement.GET_USER_HAS_ACCESS, userID, PID).get(0).get("bool").asBoolean();
        boolean isManager = project.get("managerID").asText().equals(userID);
        boolean isCreator = project.get("creatorID").asText().equals(userID);

        //Checks if the user has access to the project
        if(hasAccess || isCreator || isManager){
            return ok(qh.executeQuery(Statement.GET_PROJECT_META_DATA, PID));
        }
        return unauthorized("You do not have access to this project's meta data.");

    }


    //=============================================ACCESS===============================================================

    /**
     * Inserts into HasAccess Table or the UserHasAccess Table. These tables specifies the releation between
     * Project and UserClass and between Project and Users. Dictates what user classes and users have access to a project.
     * @return Result 200 Ok, 401 Unauthorized or 400 BadRequest
     */
    public Result insertHasAccess(){

        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            //Returns and 200 OK with a JsonNode as Body.
            return unauthorized(views.html.login.render());
        }

        //Gets the http body of the POST and converts it to a map
        final JsonNode values = request().body().asJson();

        //Gets the values from the map
        int PID = values.get("PID").asInt();


        //Gets the project data to get the manager and creator USERNAME
        JsonNode project = qh.executeQuery(Statement.GET_PROJECT_BY_ID, PID);
        String managerID = project.get("managerID").asText();
        String creatorID = project.get("creatorID").asText();

        //Checks if the connected user is the manager or the creator of the project in question.
        if((userID != managerID) && (userID != creatorID)){
            return unauthorized("Only the creator or the manager of this project can edit what userclasses or users have access");
        }

        //Checks if the client sendt a user or a user class
        if(values.has("userClass")){
            //Inserts into the HasAccess table
            qh.insertStatement(Statement.INSERT_HAS_ACCESS, values.get("userClass"), PID);
            return ok("The user class \"" + values.get("userClass") + "\" now has access to the project with projectID " + PID);
        }
        else if(values.has("userName")){
            //Inserts into the UserHasAccess table
            qh.insertStatement(Statement.INSERT_USER_HAS_ACCESS, values.get("userName"), PID);
            return ok("The user \"" + values.get("userName") + "\" now has access to the project with projectID " + PID);
        }

        return badRequest("No userClass or userName was received.");

    }

    /**
     * Removes a userclass or user from the HasAccess Table or the UserHasAccess Table. These tables specifies the releation between
     * Project and UserClass and between Project and Users. Dictates what user classes and users have access to a project.
     * @return Result 200 Ok, 401 Unauthorized or 400 BadRequest
     */
    public Result removeHasAccess(){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            //Returns and 200 OK with a JsonNode as Body.
            return unauthorized(views.html.login.render());
        }

        //Gets the http body of the POST and converts it to a map
        final JsonNode values = request().body().asJson();

        //Gets the values from the map
        int PID = values.get("PID").asInt();


        //Gets the project data to get the manager and creator USERNAME
        JsonNode project = qh.executeQuery(Statement.GET_PROJECT_BY_ID, PID);
        boolean isManager = project.get("managerID").asText().equals(userID);
        boolean isCreator = project.get("creatorID").asText().equals(userID);

        //Checks if the connected user is the manager or the creator of the project in question.
        if(!(isCreator || isManager)){
            return unauthorized("Only the creator or the manager of this project can edit what userclasses or users have access");
        }

        //Checks if the client sendt a user or a user class
        if(values.has("userClass")){
            //Deletes from HasAccess table
            qh.insertStatement(Statement.DELETE_HAS_ACCESS_SINGLE, values.get("userClass"), PID);
            return ok("The user class \"" + values.get("userClass") + "\" no longer has access to the project with projectID " + PID);
        }
        else if(values.has("userName")){
            //Deletes from UserHasAccess table
            qh.insertStatement(Statement.DELETE_USER_HAS_ACCESS, values.get("userName"), PID);
            return ok("The user \"" + values.get("userName") + "\" no longer has access to the project with projectID " + PID);
        }

        return badRequest("No userClass or userName was received.");
    }

    /**
     *
     * @param id: String from the GET Request
     * @return Result 200 Ok or 401 Unauthorized
     * If 200 OK the body contains all requirements of the specified project
     */

    //=======================================PROJECT REQUIREMENTS=======================================================


    public Result getProjectRequirements(String id){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        int projectID = Integer.parseInt(id);
        //TODO validate access permission

        Map<String, Object> requirementMap = new HashMap<>();
        JsonNode projectRequirements = qh.executeQuery(Statement.GET_PROJECT_REQUIREMENTS, projectID);
        for (JsonNode pr:
             projectRequirements) {
            requirementMap.put(pr.get("RID").asText(), pr);
        }
        return ok(Json.toJson(requirementMap));
    }

    /**
     * Removes a project requirement from a project.
     * NB!: This will delete the fields specific to that project requirement.
     * @return Result 200 Ok or 401 Unauthorized
     * If 200 OK the body contains "Project Requirement deleted"
     */
    public Result deleteProjectRequirement(){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        final JsonNode values = request().body().asJson();
        System.out.println(values);
        Integer PID = values.get("PID").asInt();
        Integer RID = values.get("RID").asInt();
        JsonNode project = qh.executeQuery(Statement.GET_PROJECT_BY_ID, PID);
        System.out.println(project);
        String managerID = project.get(0).get("managerID").asText();
        String creatorID = project.get(0).get("creatorID").asText();
        System.out.println(managerID + " " + creatorID);

        JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID);
        System.out.println(userClass);
        String className = userClass.get(0).get("NAME").asText();

        JsonNode hasAccess = qh.executeQuery(Statement.GET_USER_HAS_ACCESS, className, PID);

        //Checks if the connected user has permission to delete
        if(!((userID != managerID) || (userID != creatorID) || hasAccess.get("bool").asInt() < 1)){
            return unauthorized("You do not have permission to delete a project requirement ");
        }

        qh.executeUpdate(Statement.DELETE_PROJECT_REQUIREMENT_BY_RID_PID, PID, RID);


        return ok("Project Requirement deleted");
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
        final JsonNode values = request().body().asJson();
        String PID = values.get("PID").asText();
        String RID = values.get("RID").asText();
        if(qh.executeQuery(Statement.REQUIREMENT_EXISTS, RID).get(0).get("bool").asInt() != 1){
            return unauthorized(RID + " is not a valid requirement ID");
        }
        if(qh.executeQuery(Statement.PROJECT_EXISTS, PID).get(0).get("bool").asInt() != 1){
            return unauthorized(PID + " is not a valid project ID");
        }
        String reqNo = values.get("reqNo").asText();
        String reqCode = values.get("reqCode").asText();
        String comment = values.get("comment").asText();
        String description = values.get("description").asText();

//        JsonNode globalReq = qh.executeQuery(Statement.GET_GLOBAL_REQUIREMENT_BY_ID, RID).get(0);

        qh.insertStatement(Statement.INSERT_PROJECT_REQUIREMENT, Integer.parseInt(PID), Integer.parseInt(RID), reqNo, reqCode, comment, description);

        return ok("Project Requirement Inserted");

    }
}
