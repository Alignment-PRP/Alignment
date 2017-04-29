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
     * Checks username/pass combination to the database.
     * @param user
     * @param dbUser
     * @return
     */
    public boolean authenticate(User user, User dbUser){
        return BCrypt.checkpw(user.pass, dbUser.pass);
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