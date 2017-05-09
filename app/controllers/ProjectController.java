package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.jamasoftware.services.restclient.JamaConfig;
import com.jamasoftware.services.restclient.exception.RestClientException;
import com.jamasoftware.services.restclient.jamadomain.core.JamaInstance;
import com.jamasoftware.services.restclient.jamadomain.lazyresources.JamaItem;
import com.jamasoftware.services.restclient.jamadomain.lazyresources.JamaItemType;
import com.jamasoftware.services.restclient.jamadomain.lazyresources.JamaProject;
import database.QueryHandler;
import database.Statement;

import java.util.Base64; // Java 8
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.MalformedURLException;
import java.io.IOException;

import play.db.Database;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import static play.mvc.Results.ok;
import javax.inject.Inject;
import java.util.*;

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
        //TODO determine if anyone can add new project or if this should be a right.
        //Check if user is logged in
        String username = session("connected");
        if(username == null){
            return unauthorized("unauthorized");
        }

        //Gets the http body of the POST and converts it to a map
        final JsonNode values = request().body().asJson();

        //Gets the values from the map
        String name = values.get("name").asText();
        String description;
        try{
            description = values.get("description").asText();
        }
        catch (NullPointerException e){
            description = "-";
        }
        int securityLevel = values.get("securityLevel").asInt();
        String transactionVolume = values.get("transactionVolume").asText();
        String userChannel = values.get("userChannel").asText();
        String mangerID = values.get("managerID").asText();
        String deploymentStyle = values.get("deploymentStyle").asText();
        int ispublic = values.has("isPublic") && values.get("isPublic").asBoolean() ? 1 : 0;

        //Inserts a new Project and returns the ID of the project just inserted
        String ID = qh.insertStatementWithReturnID(Statement.INSERT_PROJECT, mangerID, username, name, description, ispublic);

        //Inserts ProjectMetaData with the project
        qh.insertStatement(Statement.INSERT_PROJECT_META_DATA, Integer.parseInt(ID), securityLevel, transactionVolume, userChannel, deploymentStyle);
        //TODO: Add project metadata and userclasses that have access.


        return ok(qh.executeQuery(Statement.GET_PROJECT_BY_ID, ID).get(0));

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

        //JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID);
        //String className = userClass.get(0).get("NAME").asText();

        boolean globalEditRight = AccessController.checkRights("AllProjects write");

        //Checks if the connected user has permission to delete
        if(!((userID != managerID) || (userID != creatorID) || globalEditRight)){ //className != "Admin")){
            return unauthorized("You do not have permission to delete this project.");
        }

        qh.executeUpdate(Statement.DELETE_PROJECT_REQUIREMENTS_BY_PID, PID);
        qh.executeUpdate(Statement.DELETE_PROJECT_METADATA, PID);
        qh.executeUpdate(Statement.DELETE_HAS_ACCESS_PROJECT, PID);
        qh.executeUpdate(Statement.DELETE_PROJECT, PID);


        return ok("Project and all related data deleted");
    }

    private JsonNode mapProjectsToMap(final JsonNode json) {
        final Map<String, Object> projectMap = new HashMap<>();
        json.forEach(node -> projectMap.put(node.get("ID").asText(), node));
        return Json.toJson(projectMap);
    }

    /**
     * Gets all Projects with the isPublic bit set to 1.
     * Any one can read public projects.
     * @return Response 200 OK
     */
    public Result getPublicProjects(){
        return ok(mapProjectsToMap(qh.executeQuery(Statement.GET_PUBLIC_PROJECTS)));
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
        //TODO determine if this is intended to be ALL projects the user has access to (ie all if they are admin) or only those where they have been specficically added.
        return ok(mapProjectsToMap(qh.executeQuery(Statement.GET_PROJECTS_ACCESSIBLE_BY_USER, userID, userID)));
    }

    public Result getProjectsUserIsCreator(){
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        return ok(mapProjectsToMap(qh.executeQuery(Statement.GET_PROJECTS_USER_IS_CREATOR, userID)));
    }


    public Result getProjectsUserIsManager(){
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        return ok(mapProjectsToMap(qh.executeQuery(Statement.GET_PROJECTS_USER_IS_MANAGER, userID)));
    }

    /**
     *
     * @param id: String from the GET Request
     * @return Result 200 Ok or 401 Unauthorized
     * If 200 OK the body contains all relevant project data
     */
    public Result getProjectByProjectID(String id){
        //Check if user is logged in
        int projectid = Integer.parseInt(id);
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        return ok(qh.executeQuery(Statement.GET_PROJECT_BY_ID, projectid).get(0));
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
        JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID).get(0);
        String className = userClass.get("NAME").asText();

        boolean hasAccess = qh.executeQuery(Statement.GET_USER_HAS_ACCESS, className, userID, PID).get(0).asBoolean(); //TODO: can those that have access edit?
        boolean isManager = projectData.get("managerID").asText().equals(userID);
        boolean isCreator = projectData.get("creatorID").asText().equals(userID);
        //boolean isAdmin = className.equals("Admin");
        boolean hasGlobalEditRight = AccessController.checkRights("AllProjects write");

        //Checks if the user has permission to edit
        if(!(hasAccess || isManager || isCreator || hasGlobalEditRight)){  //isAdmin)){
            return unauthorized("You do not have permission to edit this project");
        }


        //Gets the current projectMetaData values
        JsonNode projectMetaData = qh.executeQuery(Statement.GET_PROJECT_META_DATA, PID).get(0);
        Map<String, String> updateData = new HashMap<>();

        //Iterates thorugh all the entries in the ProjectData
        Iterator<Map.Entry<String, JsonNode>> DataFields = projectData.fields();
        while (DataFields.hasNext()){

            //The current entry
            Map.Entry<String, JsonNode> entry = DataFields.next();

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
        Iterator<Map.Entry<String, JsonNode>> MetaFields = projectMetaData.fields();
        while (MetaFields.hasNext()){

            //The current entry
            Map.Entry<String, JsonNode> entry = MetaFields.next();

            //If this data has been received by the client, add it to the updateData
            if(values.has(entry.getKey())){
                updateData.put(entry.getKey(), values.get(entry.getKey()).asText());
            }

            //If not, add the old entry
            else{
                updateData.put(entry.getKey(), entry.getValue().asText());
            }
        }

        int isPublic;
        if(updateData.get("isPublic").equals("true")){
            isPublic = 1;
        }
        else{
            isPublic = 0;
        }


        //Updates the ProjectData
        qh.executeUpdate(Statement.UPDATE_PROJECT, updateData.get("managerID"), updateData.get("name"), updateData.get("description"),isPublic , PID);

        //Updates the ProjectMetaData
        qh.executeUpdate(Statement.UPDATE_PROJECT_META_DATA, Integer.parseInt(updateData.get("securityLevel")), updateData.get("transactionVolume"), updateData.get("userChannel"), updateData.get("deploymentStyle"), PID);
        //TODO: Add project metadata and userclasses that have access.
        return ok(Json.toJson(updateData));

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
        JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID);
        String className = userClass.get(0).get("NAME").asText();

        boolean hasAccess = qh.executeQuery(Statement.GET_USER_HAS_ACCESS, className, userID, PID).get(0).get("bool").asBoolean();
        boolean isManager = project.get("managerID").asText().equals(userID);
        boolean isCreator = project.get("creatorID").asText().equals(userID);
        boolean isPublic = project.get("isPublic").asInt() == 1;
        boolean hasGlobalReadRight = AccessController.checkRights("AllProjects read");

        //Checks if the user has access to the project
        if(hasAccess || isCreator || isManager || isPublic || hasGlobalReadRight){
            return ok(qh.executeQuery(Statement.GET_PROJECT_META_DATA, PID).get(0));
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
        JsonNode project = qh.executeQuery(Statement.GET_PROJECT_BY_ID, PID).get(0);
        JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID);
        String className = userClass.get(0).get("NAME").asText();

        boolean isManager = project.get("managerID").asText().equals(userID);
        boolean isCreator = project.get("creatorID").asText().equals(userID);
        //boolean isAdmin = className.equals("Admin");
        boolean hasGlobalEditRight = AccessController.checkRights("AllProjects write");

        //Checks if the connected user is the manager or the creator of the project in question.
        if(!(isCreator || isManager || hasGlobalEditRight)){ //isAdmin)){
            return unauthorized("Only the creator or the manager of this project can edit what userclasses or users have access");
        }

        //Checks if the client sendt a user or a user class
        if(values.has("userClass")){
            //Inserts into the HasAccess table
            qh.insertStatement(Statement.INSERT_HAS_ACCESS, values.get("userClass").asText(), PID);
            return ok("The user class \"" + values.get("userClass") + "\" now has access to the project with projectID " + PID);
        }
        else if(values.has("userName")){
            //Inserts into the UserHasAccess table
            qh.insertStatement(Statement.INSERT_USER_HAS_ACCESS, values.get("userName").asText(), PID);
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
        JsonNode project = qh.executeQuery(Statement.GET_PROJECT_BY_ID, PID).get(0);
        JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID);
        String className = userClass.get(0).get("NAME").asText();

        boolean isManager = project.get("managerID").asText().equals(userID);
        boolean isCreator = project.get("creatorID").asText().equals(userID);
        //boolean isAdmin = className.equals("Admin");
        boolean hasGlobalEditRight = AccessController.checkRights("AllProjects write");

        //Checks if the connected user is the manager or the creator of the project in question.
        if(!(isCreator || isManager || hasGlobalEditRight)){ //isAdmin)){
            return unauthorized("Only the creator or the manager of this project can edit what userclasses or users have access");
        }

        //Checks if the client sendt a user or a user class
        if(values.has("userClass")){
            //Deletes from HasAccess table
            qh.executeUpdate(Statement.DELETE_HAS_ACCESS_SINGLE, values.get("userClass").asText(), PID);
            return ok("The user class \"" + values.get("userClass") + "\" no longer has access to the project with projectID " + PID);
        }
        else if(values.has("userName")){
            //Deletes from UserHasAccess table
            qh.executeUpdate(Statement.DELETE_USER_HAS_ACCESS, values.get("userName").asText(), PID);
            return ok("The user \"" + values.get("userName") + "\" no longer has access to the project with projectID " + PID);
        }

        return badRequest("No userClass or userName was received.");
    }

    public Result jamaTest(){
        Map<String, Object> projectsMap = new HashMap<>();
        try {
            JamaInstance jamaInstance = new JamaInstance(new JamaConfig(true, "conf/jama.properties"));
            ArrayList<JamaProject> projects = (ArrayList<JamaProject>) jamaInstance.getProjects();
            for (JamaProject project : projects) {
                Map<String, Object>  pMap = new HashMap<>();
                pMap.put("projectKey", project.getProjectKey());
                pMap.put("projectID", project.getId());
                pMap.put("projectName", project.getName());
                pMap.put("description", project.getDescription());

                projectsMap.put(project.getName(), pMap);
            }
        } catch(RestClientException e) {
            e.printStackTrace();
        }


        return ok(Json.toJson(projectsMap));
    }

    /**
     * Gets the the names of the user classes that have access to the project
     * @return Result 200 Ok, 401 Unauthorized or 400 BadRequest
     */
    public Result getClassesHaveAccess(String ID){
        int PID = Integer.parseInt(ID);

        //Checks if the user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        //Gets the project data
        JsonNode project = qh.executeQuery(Statement.GET_PROJECT_BY_ID, PID).get(0);
        JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID);
        String className = userClass.get(0).get("NAME").asText();

        JsonNode hasAccessJ = qh.executeQuery(Statement.GET_USER_HAS_ACCESS, className, userID, PID).get(0);
        boolean hasAccess = hasAccessJ.get("bool").asBoolean();
        boolean isManager = project.get("managerID").asText().equals(userID);
        boolean isCreator = project.get("creatorID").asText().equals(userID);
        //boolean isAdmin = className.equals("Admin");
        boolean hasGlobalReadRight = AccessController.checkRights("AllProjects read");

        //Checks if the user has permission to edit
        if(!(hasAccess || isManager || isCreator || hasGlobalReadRight)){//isAdmin)){
            return unauthorized("You do not have permission to view this data");
        }

        return ok(qh.executeQuery(Statement.GET_CLASSES_THAT_HAVE_ACCESS, PID));
    }


    /**
     * Gets the usernames of the users that have access to the project
     * @param ID
     * @return Result 200 Ok, 401 Unauthorized or 400 BadRequest
     */
    public Result getUsersHaveAccess(String ID){
        int PID = Integer.parseInt(ID);

        //Checks if the user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        //Gets the project data
        JsonNode project = qh.executeQuery(Statement.GET_PROJECT_BY_ID, PID).get(0);
        JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID);
        String className = userClass.get(0).get("NAME").asText();

        JsonNode hasAccessJ = qh.executeQuery(Statement.GET_USER_HAS_ACCESS, className, userID, PID).get(0);
        boolean hasAccess = hasAccessJ.get("bool").asBoolean();
        boolean isManager = project.get("managerID").asText().equals(userID);
        boolean isCreator = project.get("creatorID").asText().equals(userID);
        //boolean isAdmin = className.equals("Admin");
        boolean hasGlobalReadRights = AccessController.checkRights("AllProjects read");

        //Checks if the user has permission to edit
        if(!(hasAccess || isManager || isCreator || hasGlobalReadRights)){//isAdmin)){
            return unauthorized("You do not have permission to view this data");
        }

        return ok(qh.executeQuery(Statement.GET_USERS_THAT_HAVE_ACCESS, PID));
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
        JsonNode requirementsStructures = qh.executeQuery(Statement.GET_REQUIREMENTS_STRUCTURES);
        for (JsonNode pr:
                projectRequirements) {
            Map<String, Object> pReq= new HashMap<>();
            Iterator<Map.Entry<String, JsonNode>> prs = pr.fields();
            while(prs.hasNext()){
                Map.Entry<String, JsonNode> p = prs.next();
                pReq.put(p.getKey(), p.getValue());
            }
            pReq.put("structures", new ArrayList<Map<String, Object>>());
            requirementMap.put(pr.get("RID").asText(), pReq);

        }

        for (JsonNode struct :
                requirementsStructures) {
            String RID = struct.get("RID").asText();
            if(!requirementMap.containsKey(RID)){
                continue;
            }
            Map r = (HashMap<String, Object>)requirementMap.get(RID);
            List<Map<String, Object>> str = (List<Map<String, Object>>)r.get("structures");

            Iterator<Map.Entry<String, JsonNode>> fields = struct.fields();
            Map<String, Object> s = new HashMap<>();
            while(fields.hasNext()){
                Map.Entry<String, JsonNode> n = fields.next();
                s.put(n.getKey(), n.getValue());
            }
            str.add(s);

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
        Integer PID = values.get("PID").asInt();
        Integer RID = values.get("RID").asInt();
        JsonNode project = qh.executeQuery(Statement.GET_PROJECT_BY_ID, PID);
        String managerID = project.get(0).get("managerID").asText();
        String creatorID = project.get(0).get("creatorID").asText();

        JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID);
        String className = userClass.get(0).get("NAME").asText();

        JsonNode hasAccess = qh.executeQuery(Statement.GET_USER_HAS_ACCESS, className, userID, PID);

        boolean hasGlobalWriteRight = AccessController.checkRights("AllProjects write");

        //Checks if the connected user has permission to delete
        if(!((userID != managerID) || (userID != creatorID) || hasAccess.get("bool").asInt() < 1) || hasGlobalWriteRight){
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
        // /Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        //TODO: Check if user has access to project

        //Converts the HTTP POST Request body to a map
        final JsonNode values = request().body().asJson();
        int PID = values.get("PID").asInt();
        int RID = values.get("RID").asInt();

        JsonNode project = qh.executeQuery(Statement.GET_PROJECT_BY_ID, PID).get(0);
        JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID);
        String className = userClass.get(0).get("NAME").asText();

        boolean hasAccess = qh.executeQuery(Statement.GET_USER_HAS_ACCESS, className, userID, PID).get(0).get("bool").asBoolean();
        boolean isManager = project.get("managerID").asText().equals(userID);
        boolean isCreator = project.get("creatorID").asText().equals(userID);
        boolean hasGlobalWriteRight = AccessController.checkRights("AllProjects write");

        //Checks if the user has access to the project
        if(!(hasAccess || isCreator || isManager || hasGlobalWriteRight)){
            return unauthorized("Unauthorized action");
        }


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

        qh.insertStatement(Statement.INSERT_PROJECT_REQUIREMENT, PID, RID, reqNo, reqCode, comment, description);

        return ok("Project Requirement Inserted");

    }

    public Result updateReq(){
        //Check if user is logged in and gets the USERNAME
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }


        final JsonNode values = request().body().asJson();
        int PID = values.get("PID").asInt();
        int RID = values.get("RID").asInt();

        JsonNode project = qh.executeQuery(Statement.GET_PROJECT_BY_ID, PID).get(0);
        JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID);
        String className = userClass.get(0).get("NAME").asText();

        boolean hasAccess = qh.executeQuery(Statement.GET_USER_HAS_ACCESS, className, userID, PID).get(0).get("bool").asBoolean();
        boolean isManager = project.get("managerID").asText().equals(userID);
        boolean isCreator = project.get("creatorID").asText().equals(userID);
        boolean hasGlobalWriteRight = AccessController.checkRights("AllProjects write");

        //Checks if the user has access to the project
        if(!(hasAccess || isCreator || isManager || hasGlobalWriteRight)){
            return unauthorized("You do not have permission to edit this project.");
        }

        //Checks if the requirement exists
        if(qh.executeQuery(Statement.REQUIREMENT_EXISTS, RID).get(0).get("bool").asInt() != 1){
            return badRequest(RID + " is not a valid requirement ID");
        }
        //Checks if the project exists
        if(qh.executeQuery(Statement.PROJECT_EXISTS, PID).get(0).get("bool").asInt() != 1){
            return badRequest(PID + " is not a valid project ID");
        }


        JsonNode requirementData = qh.executeQuery(Statement.GET_PROJECT_REQUREMENT, PID, RID).get(0);
        Map<String, String> updateData = new HashMap<>();

        Iterator<Map.Entry<String, JsonNode>> reqFields = requirementData.fields();


        //Iterates thorugh all the entries in the ProjectData
        while (reqFields.hasNext()){//requirementData.fields().hasNext()){

            //The current entry
            Map.Entry<String, JsonNode> entry = reqFields.next();//requirementData.fields().next();

            //If this data has been received by the client, add it to the updateData
            if(values.has(entry.getKey())){
                updateData.put(entry.getKey(), values.get(entry.getKey()).asText());
            }
            //If not, add the old entry
            else{
                updateData.put(entry.getKey(), entry.getValue().asText());
            }
        }

        qh.insertStatement(Statement.UPDATE_PROJECT_REQUIREMENT, updateData.get("reqNo"), updateData.get("reqCode"), updateData.get("comment"), updateData.get("description"), PID, RID);

        return ok("Project Requirement updated");
    }
}
