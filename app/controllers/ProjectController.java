package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import database.Statement;

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

        //Gets the values from the map
        String projectid = values.get("PID")[0];
        String[] requirementid = values.get("RID");

        //Checks if valid requirement ID
        for(int i = 0; i < requirementid.length; i++){
            if(qh.executeQuery(Statement.REQUIREMENT_EXISTS, requirementid[i]).get(0).get("bool").asInt() != 1){
                return unauthorized(requirementid[i] + " is not a valid requirement");
            }
        }

        //Checks if valid project ID
        if(qh.executeQuery(Statement.PROJECT_EXISTS, projectid).get(0).get("bool").asInt() != 1){
            return unauthorized(projectid + " is not a valid projectid");
        }

        //Inserts all Requiremnts
        for(int i=0; i < requirementid.length; i++){
            JsonNode globalReq = qh.executeQuery(Statement.GET_GLOBAL_REQUIREMENT_BY_ID, requirementid[i]).get(0);
            //qh.createProjectRequirement(projectid, globalReq.get("ispublic").asText(), globalReq.get("name").asText(),
            qh.insertStatement(Statement.INSERT_PROJECT_REQUIREMENT,projectid, globalReq.get("ispublic").asText(), globalReq.get("name").asText(),
            globalReq.get("description").asText(), globalReq.get("source").asText(), globalReq.get("stimulus").asText(),
            globalReq.get("artifact").asText(), globalReq.get("response").asText(), globalReq.get("responsemeasure").asText(),
            globalReq.get("environment").asText());
        }
        return ok("ok");

    }
    //SAME AS getProjectRequirementForm()
    public Result addReqForm(){
        return ok(views.html.addGlobalReqToProject.render());
    }


}
