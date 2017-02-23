package database;

import models.User;
import org.mindrot.jbcrypt.BCrypt;
import play.mvc.Controller;

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
        System.out.println(user.toString());
        if(BCrypt.checkpw(password, user.Password)){
            return null;
        }
        else{
            return "password does not match";
        }
    }

    public static void validateSession(){
        if(session().isDirty){
            session().clear();
        }
        if(session().isEmpty()){
            session("validity", "empty");
        }
        session("validity", "good");
    }
}
