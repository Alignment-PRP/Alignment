package database;

import models.User;
import org.mindrot.jbcrypt.BCrypt;
import play.mvc.Controller;

import java.time.LocalDateTime;

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
        if(BCrypt.checkpw(password, user.Password)){
            session().clear();
            session("connected", user.UserID);
            session("timestamp", LocalDateTime.now().toString());
            return null;
        }
        else{
            return "password does not match";
        }
    }

}
