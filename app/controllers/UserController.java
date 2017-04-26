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

        String oldUSERNAME = values.get("oldUSERNAME").textValue();
        String USERNAME = values.get("USERNAME").textValue();
        String firstName = values.get("firstName").textValue();
        String lastName = values.get("lastName").textValue();
        String email = values.get("email").textValue();
        String ucName = values.get("ucName").textValue();

        if (usernameExists(USERNAME) && !oldUSERNAME.equals(USERNAME)) {
            return internalServerError("Brukernavn er brukt!");
        }

        final boolean b1 = qh.executeUpdate(Statement.UPDATE_USER, USERNAME, firstName, lastName, email, oldUSERNAME);
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

    public Result getUsersWithClass() {
        return ok(qh.executeQuery(Statement.GET_USERS_WITH_CLASSES));
    }

    public Result getConnectedUser(){
        //TODO replace this with references to new DB's "userClass" table. (session username should be ok?)
        String username = session("connected");
        JsonNode result = qh.executeQuery(Statement.GET_USER_BY_USERNAME, username);
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
