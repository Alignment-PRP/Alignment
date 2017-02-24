package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import models.User;
import play.api.db.DB;
import play.db.Database;
import play.libs.Json;
import play.mvc.Controller;

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





    public User makeUserFromUserName(String username){
        JsonNode userData =  qh.getUserByName(username);
        System.out.println("user data: " + userData);
        return Json.fromJson(userData.get(0), User.class);

    }
}
