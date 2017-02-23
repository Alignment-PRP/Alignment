package session;


import play.mvc.Controller;

/**
 * Created by andrfo on 16.02.2017.
 */
public class SessionHandler extends Controller {

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
