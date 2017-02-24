package controllers;

import models.User;
import org.mindrot.jbcrypt.BCrypt;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.concurrent.Callable;

/**
 * Created by andrfo on 16.02.2017.
 */
public class Authenticator extends Controller {


    /**
     * Checks username/password combination to the database.
     * @param password
     * @return Returns null (success) or an error message.
     */
    public String authenticate(String password, User user){
        if(BCrypt.checkpw(password, user.password)){
            return null;
        }
        else{
            return "password does not match";
        }
    }

    public Result validateSession(Callable<Result> func){
        if(session("connected") != null){
            try{
                return func.call();
            }
            catch (Exception e){
                //TODO: Logging
                e.printStackTrace();
                return unauthorized();
            }
        }
        else{
            return unauthorized(views.html.login.render());
        }
    }
}
