package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import database.Statement;
import models.User;
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

    public Result getUsers() {
        //TODO check session
        return ok(qh.executeQuery(Statement.GET_USERS));
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

    public JsonNode makeJsonNode(String username){
        //CHANGED
        JsonNode userData = qh.executeQuery(Statement.GET_USER_WITH_PASS_BY_USERNAME,username);
        System.out.println(userData);
        return userData;
    }

    public User makeUserFromJson(JsonNode userData){
        return Json.fromJson(userData.get(0), User.class);
    }

    public void createUser(String firstname, String lastname, String email, String username, String password){

        qh.insertStatement(Statement.CREATE_USER ,firstname, lastname, email, username, password);

    }

    public boolean usernameExists(String username){
        JsonNode exists = qh.executeQuery(Statement.GET_USERNAME_EXISTS,username);
        //System.out.println(exists.get(0).get("bool"));
        //System.out.println(exists.get(0).get("bool").asInt() == 1);
        return exists.get(0).get("bool").asInt() == 1;
    }

}
