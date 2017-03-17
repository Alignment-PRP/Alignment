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
     * Checks USERNAME/pass combination to the database.
     * @param password
     * @return Returns null (success) or an error message.
     */
    public String authenticate(String password, User user){
        if(BCrypt.checkpw(password, user.pass)){
            session().clear();
            session("connected", user.USERNAME);
            session("timestamp", LocalDateTime.now().toString());
            return null;
        }
        else{
            return "pass does not match";
        }
    }

}
