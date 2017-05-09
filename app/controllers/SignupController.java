package controllers;

import database.repository.UserRepository;
import models.User;
import play.libs.Json;
import play.db.Database;
import play.mvc.Controller;
import play.mvc.Result;


import javax.inject.Inject;


public class SignupController extends Controller{

    private final UserRepository userRepository;

    //TODO: decide if a qh would be nice (wasn't going to call more than one query here but seems it's happening anyways)
    @Inject
    public SignupController(Database db){
        this.userRepository = new UserRepository(db);
    }

    public Result register(){
        final User user = Json.fromJson(request().body().asJson(), User.class);


        if(userRepository.usernameExists(user.USERNAME)) {
            //TODO determine a good http response for "recource is ok and all but needs a different value"
            return internalServerError("Username is taken");
        }
        userRepository.insertUser(user);
        return ok("Created new user");
    }

}