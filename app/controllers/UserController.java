package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import database.Statement;
import models.User;
import play.api.db.DB;
import play.db.Database;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by andrfo on 16.02.2017.
 */
public class UserController extends Controller {

    private QueryHandler qh;

    @Inject
    public UserController(Database db) {
        this.qh = new QueryHandler(db);
    }

    public Result getUser(){
        //TODO replace this with references to new DB's "userClass" table. (session username should be ok?)
        List<String> liste = new ArrayList<>();
        String userName = qh.executeQuery(Statement.GET_USER_NAME, session("connected")).get(0).get("userName").asText();
        liste.add(userName);
        liste.add("UserClassPlaceholder");
        JsonNode result = Json.toJson(liste);
        return ok(result);
    }

    public JsonNode makeJsonNode(String username){
        JsonNode userData = qh.getUserByName(username);
        System.out.println(userData);
        return userData;
    }

    public User makeUserFromJson(JsonNode userData){
        return Json.fromJson(userData.get(0), User.class);
    }

    public void createUser(String firstname, String lastname, String email, String username, String password){
        qh.createUser(firstname, lastname, email, username, password);
    }

    public boolean usernameExists(String username){
        JsonNode exists = qh.userExists(username);
        //System.out.println(exists.get(0).get("bool"));
        //System.out.println(exists.get(0).get("bool").asInt() == 1);
        return exists.get(0).get("bool").asInt() == 1;
    }

    /*@deprecated
    public User makeUserFromUserName(String username){
        JsonNode userData =  qh.getUserByName(username);
        return Json.fromJson(userData.get(0), User.class);

    }*/
}
