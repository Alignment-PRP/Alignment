package database;

import com.fasterxml.jackson.databind.JsonNode;
import play.db.Database;
import play.libs.Json;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//TODO Doc
public class QueryHandler {

    private final Database db;

    public QueryHandler(Database db) {
        this.db = db;
    }


    public JsonNode getRequirementsByID(int id){
        return executeQuery(Statement.GET_REQUIREMENTS_BY_ID);
    }
    public JsonNode getRequirementByCategoryID(int id){
        return executeQuery(Statement.GET_REQUIREMENTS_BY_CATEGORY_ID, id);
    }
    public JsonNode getAllRequirements(){
        return executeQuery(Statement.GET_ALL_REQUIREMENTS);
    }

    public JsonNode getUserByName(String name) {
        return executeQuery(Statement.GET_USER_BY_NAME, name);
    }
    public JsonNode getProjectRelatedToUser(String userID) {
        return executeQuery(Statement.GET_PROJECTS_RELATED_TO_USER, userID);
    }
    public JsonNode getPublicProjects() {
        return executeQuery(Statement.GET_PUBLIC_PROJECTS);
    }
    public JsonNode getUserByID(String ID) {
        return executeQuery(Statement.GET_USER_BY_ID, ID);
    }
    public JsonNode userExists(String username){
        return executeQuery(Statement.GET_USER_NAME_EXISTS, username);
    }
    public JsonNode projectNameExists(String name){
        return executeQuery(Statement.GET_PROJECT_NAME_EXISTS, name);
    }
    public JsonNode projectRequirementNameExists(String name){
        return executeQuery(Statement.GET_PROJECT_REQUIREMENT_NAME_EXISTS, name);
    }
    public JsonNode userPartOfProject(String userid){
        //TODO: pass userid and projectid into the query to check if a user is part of a project.
        return executeQuery(Statement.GET_USER_IS_PART_OF_PROJECT, userid);
    }
    public JsonNode getProjectIDByName(String name){
        return executeQuery(Statement.GET_PROJECTID_BY_NAME, name);
    }
    public void createUser(String firstname, String lastname, String email, String username, String password){
        //TODO: make executeInsert instead?
        //TODO change pointer to insertUser once you're sure it's not changing
        insertUser(Statement.CREATE_USER, firstname, lastname, email, username, password);
    }
    public void createProject(String name, String description, String ispublic, String managerID, String ownerID){
        insertProject(Statement.CREATE_PROJECT, name, description, Integer.parseInt(ispublic));
        int projectID = getProjectIDByName(name).get(0).get("projectid").asInt();
        insertProjectManager(Statement.CREATE_PROJECT_MANAGER, projectID, Integer.parseInt(managerID));
        insertProjectOwner(Statement.CREATE_PROJECT_OWNER, projectID, Integer.parseInt(ownerID));
    }
    public JsonNode getProjectRequirementIDByName(String name){
        return executeQuery(Statement.GET_PROJECT_REQUIREMENTID_BY_NAME, name);
    }
    public void createProjectRequirement(String projectid,
                                         String ispublic,
                                         String name,
                                         String description,
                                         String source,
                                         String stimlus,
                                         String artifact,
                                         String response,
                                         String responsemeasure,
                                         String environment){
        insertProjectRequirement(
                Statement.CREATE_PROJECT_REQUIREMENT,
                Integer.parseInt(ispublic),
                name,
                description,
                source,
                stimlus,
                artifact,
                response,
                responsemeasure,
                environment
                );
        int projectRequirementID = getProjectRequirementIDByName(name).get(0).get("id").asInt();
        insertLocalRequirement(Statement.CREATE_LOCAL_REQUIREMENT, Integer.parseInt(projectid), projectRequirementID);

    }
    private void insertUser(Statement statement, String firstname, String lastname, String email, String username, String password){
        //taken out so we can do validation stuffs with the variables if desireable (I think it will be)
        //Validation stuffs here
        //Call the userExists from here instead of checking in Signup?
        try{
            Connection c = db.getConnection();
            statement.prepareAndExecuteNewUser(c, firstname, lastname, email, username, password);
            c.close();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

    private void insertProjectRequirement(Statement statement,
                                          int ispublic,
                                          String name,
                                          String description,
                                          String source,
                                          String stimlus,
                                          String artifact,
                                          String response,
                                          String responsemeasure,
                                          String environment){
        try{
            Connection c = db.getConnection();
            statement.prepareAndExecuteNewProjectRequirement(c, ispublic, name, description, source, stimlus, artifact, response, responsemeasure, environment);
            c.close();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

    private void insertLocalRequirement(Statement statement, int projectid, int projectrequirementid){
        try{
            Connection c = db.getConnection();
            statement.prepareAndExecuteNewLocalRequirement(c, projectid, projectrequirementid);
            c.close();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

    private void insertProject(Statement statement, String name, String description, int ispublic){
        //taken out so we can do validation stuffs with the variables if desireable (I think it will be)
        //Validation stuffs here
        //Call the userExists from here instead of checking in Signup?
        try{
            Connection c = db.getConnection();
            statement.prepareAndExecuteNewProject(c, name, description, ispublic);
            c.close();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

    public void insertProjectManager(Statement statement, int projectid, int managerid){
        try{
            Connection c = db.getConnection();
            statement.prepareAndExecuteNewProjectManager(c, projectid, managerid);
            c.close();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

    public void insertProjectOwner(Statement statement, int projectid, int ownerid){
        try{
            Connection c = db.getConnection();
            statement.prepareAndExecuteNewProjectOwner(c, projectid, ownerid);
            c.close();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

    public void addReq(boolean global, String pub, String name, String desc, String source, String stimulus, String artifact, String response, String environment){
        //TODO fix project req to also use this (change global=true to global dependent on project or global when you do)
        insertReq(Statement.CREATE_REQUIREMENT, true, Integer.parseInt(pub), name, desc, source, stimulus, artifact, response, environment);
    }
    public void updateReq(boolean global,String id,  String pub, String name, String desc, String source, String stimulus, String artifact, String response, String environment){
        Statement statement = Statement.UPDATE_GLOBAL_REQUIREMENT;
        try{
            Connection c = db.getConnection();
            statement.prepareAndUpdateRequirement(c, Integer.parseInt(id), global, Integer.parseInt(pub), name, desc, source, stimulus, artifact, response, environment);
            c.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public void insertReq(Statement statement, boolean global, int pub, String name, String desc, String source, String stimulus, String artifact, String response, String environment) {
        try {
            Connection c = db.getConnection();
            statement.prepareAndInsertRequirement(c, global, pub, name, desc, source, stimulus, artifact, response, environment);
            c.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    //TODO Doc
    public JsonNode executeQuery(Statement statement, Object... objects) {
        try {
            Connection c = db.getConnection();
            JsonNode json = resultSetToJson(statement.prepareAndExecute(c, objects));
            c.close();
            return json;
        } catch (SQLException e) {
            e.printStackTrace();
            return Json.toJson("SQL Exception");
        }
    }

    private JsonNode resultSetToJson(ResultSet rs) {
        List<Map<String, String>> list = new ArrayList<>();
        try {
            while (rs.next()) {
                Map<String, String> map = new HashMap<>();
                for (int i = 1; i<= rs.getMetaData().getColumnCount(); i++) {
                    String k = rs.getMetaData().getColumnLabel(i);
                    String v = rs.getString(k);
                    map.put(k, v);
                }
                list.add(map);
            }
        } catch (SQLException e) {
            //TODO Some sort of errorhandling.
            e.printStackTrace();
            return Json.toJson(e.toString());
        }
        return Json.toJson(list);
    }



}
