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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public Result getUserById(int id) {
        //TODO check session
        return ok(qh.executeQuery(Statement.GET_USER_BY_ID, id));
    }

    public Result getUser(){
        //TODO replace this with references to new DB's "userClass" table. (session username should be ok?)
        Map<String, String> map = new HashMap<>();
        String userName = qh.executeQuery(Statement.GET_USER_NAME, session("connected")).get(0).get("username").asText();
        map.put("username", userName);
        map.put("userClass", "UserClassPlaceholder");
        List<Map<String,String>> list = new ArrayList<>();
        list.add(map);
        JsonNode result = Json.toJson(list);
        return ok(result);
    }

    public JsonNode makeJsonNode(String username){
        //CHANGED
        JsonNode userData = qh.executeQuery(Statement.GET_USER_BY_NAME,username);
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
        JsonNode exists = qh.executeQuery(Statement.GET_USER_NAME_EXISTS,username);
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
