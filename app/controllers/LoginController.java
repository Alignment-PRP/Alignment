package controllers;

import models.User;
import play.mvc.Controller;
import play.mvc.Result;
import com.fasterxml.jackson.databind.JsonNode;

import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.Map;

/**
 * Created by andrfo on 16.02.2017.
 */
public class LoginController extends Controller{

    private final Authenticator authenticator;
    private final UserController userController;
    private int fails = 0;

    @Inject
    public LoginController(Authenticator authenticator, UserController userController) {
        this.authenticator = authenticator;
        this.userController = userController;
    }

    public Result logout(){
        session("connected", ""); //just to be sure. Not completely sure how session works yet.
        session().clear();
        return ok(views.html.index.render());
    }



    public Result authenticate(){
        final Map<String, String[]> values = request().body().asFormUrlEncoded();

        String receivedUsername = values.get("uname")[0];
        String reveivedPassword = values.get("psw")[0];
        JsonNode userData = userController.makeJsonNode(receivedUsername);
        if(userData.findValuesAsText("username").isEmpty()){
          //TODO propper Errorhandling!
          return errorHandling("invalid username or pass");
        }
        //User user = userController.makeUserFromUserName(receivedUsername);
        User user = userController.makeUserFromJson(userData);
        System.out.println(user.toString());
        String authentication = authenticator.authenticate(reveivedPassword, user);

        if(authentication == null){
            session().clear();
            session("connected", user.userid);
            session("timestamp", LocalDateTime.now().toString());
            //session().getAuthenticityToken();
            return ok(views.html.main.render());
        }
        return errorHandling("invalid username or pass");
    }

    private Result errorHandling(String message){
        fails += 1;
        if(fails >= 10){
            fails = 0;
            return unauthorized("BAN");
            //TODO: Figure out how to respond properly to lots of fails. Ban IP?
        }
        if(fails >= 3){
            return unauthorized("CAPCHA");
        }
        return unauthorized(message);
    }
}
