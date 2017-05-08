package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import database.Statement;
import models.User;
import org.mindrot.jbcrypt.BCrypt;
import play.db.Database;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;


/**
 * Created by andrfo on 16.02.2017.
 */
public class UserController extends Controller {

    private QueryHandler qh;

    @Inject
    public UserController(Database db) {
        this.qh = new QueryHandler(db);
    }


    public Result updateUser() {
        final JsonNode values = request().body().asJson();

        //String oldUSERNAME = values.get("oldUSERNAME").textValue();
        String oldUSERNAME = session("connected");
        String USERNAME = values.get("USERNAME").textValue();
        String firstName = values.get("firstName").textValue();
        String lastName = values.get("lastName").textValue();
        String email = values.get("email").textValue();
        String ucName = values.get("ucName").textValue();
        //String pass =  values.get("pass").textValue();
        if (usernameExists(USERNAME) && !oldUSERNAME.equals(USERNAME)) {
            return internalServerError("Brukernavn er brukt!");
        }
        boolean b1 = false;
        if(values.has("pass")) {
            String pass = BCrypt.hashpw(values.get("pass").asText(), BCrypt.gensalt(10));
            b1 = qh.executeUpdate(Statement.UPDATE_USER_WITH_PASS, USERNAME, firstName, lastName, email, pass, oldUSERNAME);
        }
        else{
            b1 = qh.executeUpdate(Statement.UPDATE_USER, USERNAME, firstName, lastName, email, oldUSERNAME);
        }

        final boolean b2 = qh.executeUpdate(Statement.UPDATE_USER_CLASS, USERNAME, ucName, oldUSERNAME);

        return b1 && b2 ? ok() : internalServerError();
    }

    public Result getUsers() {
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        return ok(qh.executeQuery(Statement.GET_USERS));
    }

    public Result deleteUser(){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        final JsonNode values = request().body().asJson();
        
        JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID);
        String className = userClass.get(0).get("NAME").asText();
        boolean isAdmin = className.equals("Admin");
        if (!isAdmin){
            return unauthorized("Only an administrator may delete a user.");
        }
        
        String deleteUser = values.get("USERNAME").asText();
        final String ADMIN = "Admin";//DO NOT DELETE! This is the one admin user that cannot be deleted.
        
        if(deleteUser.equals(ADMIN)){
            return unauthorized("The Admin user can not be deleted.");
        }
        
        JsonNode projectsIsCreator = qh.executeQuery(Statement.GET_PROJECTS_USER_IS_CREATOR, deleteUser);
        JsonNode projectsIsManager = qh.executeQuery(Statement.GET_PROJECTS_USER_IS_MANAGER, deleteUser);
        JsonNode requirementsIsResponsible = qh.executeQuery(Statement.GET_REQUIREMENTS_IS_RESPONSIBLE, deleteUser);

        for (JsonNode p :
                projectsIsCreator) {
            qh.executeUpdate(Statement.SET_PROJECT_CREATOR, ADMIN, p.get("ID").asInt());
        }
        for (JsonNode p :
                projectsIsManager) {
            qh.executeUpdate(Statement.SET_PROJECT_MANAGER, ADMIN, p.get("ID").asInt());
        }
        for (JsonNode r :
                requirementsIsResponsible) {
            qh.executeUpdate(Statement.SET_REQUIREMENT_RESPONSIBLE, ADMIN, r.get("RID").asInt());
        }

        qh.executeUpdate(Statement.DELETE_USER_HAS_ACCESS_BY_USERNAME, deleteUser);
        qh.executeUpdate(Statement.DELETE_USER_HAS_CLASS, deleteUser);
        qh.executeUpdate(Statement.DELETE_USER, deleteUser);

        return ok("User " + deleteUser + " has been deleted.");

    }

    public Result getUsersWithClass() {
        return ok(qh.executeQuery(Statement.GET_USERS_WITH_CLASSES));
    }

    public Result getConnectedUser(){
        //TODO replace this with references to new DB's "userClass" table. (session username should be ok?)
        String username = session("connected");
        JsonNode result = qh.executeQuery(Statement.GET_USER_BY_USERNAME, username).get(0);
        return ok(result);
    }

    public Result getUserByUsername(String username){
        //TODO replace this with references to new DB's "userClass" table. (session username should be ok?)
        JsonNode result = qh.executeQuery(Statement.GET_USER_BY_USERNAME, username);
        return ok(result);
    }

    public Result getUserClasses(){
        JsonNode result = qh.executeQuery(Statement.GET_USER_CLASSES);
        return ok(result);
    }

    @Deprecated
    public JsonNode makeJsonNode(String username){
        //CHANGED
        JsonNode userData = qh.executeQuery(Statement.GET_USER_WITH_PASS_BY_USERNAME,username);
        System.out.println(userData);
        return userData;
    }

    public User makeUserFromJson(JsonNode userData){
        return Json.fromJson(userData, User.class);
    }

    public Result createUserJson() {
        final JsonNode values = request().body().asJson();
        final User user = makeUserFromJson(values);
        String ucName = values.get("ucName").textValue();
        String pass = BCrypt.hashpw(user.pass, BCrypt.gensalt(10));

        if (usernameExists(user.USERNAME)) {
            return internalServerError("Brukernavn er brukt!");
        }
        createUser(user, pass);
        qh.insertStatement(Statement.INSERT_USER_CLASS, user.USERNAME, ucName);
        return ok("User created");
    }

    public void createUser(final User user, final String password){
        qh.insertStatement(Statement.INSERT_USER, user.firstName, user.lastName, user.email, user.USERNAME, password);
    }

    public boolean usernameExists(String username){
        JsonNode exists = qh.executeQuery(Statement.GET_USERNAME_EXISTS,username);
        //System.out.println(exists.get(0).get("bool"));
        //System.out.println(exists.get(0).get("bool").asInt() == 1);
        return exists.get(0).get("bool").asInt() == 1;
    }

}