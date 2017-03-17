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

    @Inject
    public ProjectController(Database db) {
        this.qh = new QueryHandler(db);
    }


    public Result getProjectsAccessibleByUser(){
        String userID = session("connected");
        //TODO checkAuthenticity();   HERE?
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //return ok(qh.getProjectRelatedToUser(userID));
        return ok(qh.executeQuery(Statement.GET_PROJECTS_ACCESSIBLE_BY_USER,userID));
    }

    /**
     * for testing.
     * @return a simple html view for inserting a new project.
     */
    public Result getNewProjectView(){
        return ok(views.html.newproject.render());
    }

    public Result newProject(){

        String username = session("connected");
        if(username == null){
            return unauthorized(views.html.login.render());
        }

        final Map<String, String[]> values = request().body().asFormUrlEncoded();

        String name = values.get("name")[0];
        String ispublic = values.get("ispublic")[0];
        /** TODO:
         *  The one creating the project is now set to be both manager and owner of the project.
         *  Also sets the user as partof. This needs to be done properly. As in you when you set
         *  manager and owner those are set to part of(and checking if they are part of already).
         */
        String ID = qh.insertStatementWithReturnID(Statement.INSERT_PROJECT, username, username, name, ispublic);
        //TODO: Add project metadata and userclasses that have access.
        return ok(views.html.dashboard.render());

    }

    public Result getPublicProjects(){
        //return ok(qh.getPublicProjects());
        return ok(qh.executeQuery(Statement.GET_PUBLIC_PROJECTS));
    }
    public boolean projectNameExists(String name){
        //JsonNode exists = qh.projectNameExists(name);
        JsonNode exists = qh.executeQuery(Statement.GET_PROJECT_NAME_EXISTS,name);
        //System.out.println(exists.get(0).get("bool"));
        //System.out.println(exists.get(0).get("bool").asInt() == 1);
        return exists.get(0).get("bool").asInt() == 1;
    }

    /** For single project view
     * Getting a project from project ID
     */
    public Result getProjectByProjectID(String id){
        String projectid = id;
        //Might as well keep the user check.
        String userID = session("connected");
        if(userID != null){
            //Returns and 200 OK with a JsonNode as Body.
            //return ok(qh.getProjectByProjectID(projectid));
            return ok(qh.executeQuery(Statement.GET_PROJECT_BY_ID,projectid));
        }
        else{
            return unauthorized(views.html.login.render());
        }
    }



    public Result getProjectRequirements(String id){
        int projectID = Integer.parseInt(id);
        //TODO validate access permition
        JsonNode projectRequirements = qh.executeQuery(Statement.GET_PROJECT_REQUIREMENTS, projectID);
        return ok(projectRequirements);
    }

    //NOT SURE WHY IT'S MARKED AS WRONG, SOMEONE CHECK IT. ("getProjectRequirementForm.scala.html" seems to exist and is still marked as wrong [intelij error?])
    public Result getProjectRequirementForm(){
        //return ok(views.html.getProjectRequirements.render());
        return ok(views.html.getProjectRequirements.render());
    }

    public Result addReq(){
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        String projectid = values.get("projectid")[0];
        String[] requirementid = values.get("requirementid");
        for(int i = 0; i < requirementid.length; i++){
            if(qh.executeQuery(Statement.REQUIREMENT_EXISTS, requirementid[i]).get(0).get("bool").asInt() != 1){
                return unauthorized(requirementid[i] + " is not a valid requirement");
            }
        }
        if(qh.executeQuery(Statement.PROJECT_EXISTS, projectid).get(0).get("bool").asInt() != 1){
            return unauthorized(projectid + " is not a valid projectid");
        }
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
