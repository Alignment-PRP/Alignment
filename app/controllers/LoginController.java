package controllers;


import models.User;
import play.mvc.Controller;
import play.mvc.Result;
import database.Authenticator;

import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.Map;

/**
 * Created by andrfo on 16.02.2017.
 */
public class LoginController extends Controller{
    int fails = 0;

    @Inject
    Authenticator authenticator;

    @Inject
    UserController userController;



    public Result authenticate(){
        final Map<String, String[]> values = request().body().asFormUrlEncoded();

        String receivedUsername = values.get("uname")[0];
        String reveivedPassword = values.get("psw")[0];
        User user = userController.makeUserFromUserName(receivedUsername);

        String authentication = authenticator.authenticate(reveivedPassword, user);

        if(authentication == null){

            return ok(views.html.main.render());
        }
        else{
            fails += 1;
            if(fails >= 10){
                return unauthorized("BAN");
                //TODO: Figure out how to respond properly to lots of fails. Ban IP?
            }
            if(fails >= 3){
                return unauthorized("CAPCHA");
            }
            return unauthorized(views.html.login.render());
        }

    }
}
