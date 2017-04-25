package controllers;

import models.User;
import play.mvc.Controller;
import play.mvc.Result;
import com.fasterxml.jackson.databind.JsonNode;

import javax.inject.Inject;
import java.time.LocalDateTime;

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
        return ok("Logged out");
    }

    public Result loginCheck() {
        String userID = session("connected");

        if(userID != null) {
            return ok("YEY");
        } else {
            return unauthorized("Not valid session.");
        }
    }

    public Result authenticate(){
        final JsonNode values = request().body().asJson();

        String receivedUsername = values.get("username").asText();
        String reveivedPassword = values.get("password").asText();

        JsonNode userData = userController.makeJsonNode(receivedUsername);
        if(userData.findValuesAsText("USERNAME").isEmpty()){
          //TODO propper Errorhandling!
          return errorHandling("invalid USERNAME or pass");
        }
        //User user = userController.makeUserFromUserName(receivedUsername);
        User user = userController.makeUserFromJson(userData);
        System.out.println(user.toString());
        String authentication = authenticator.authenticate(reveivedPassword, user);

        if(authentication == null){
            session().clear();
            session("connected", user.USERNAME);
            session("timestamp", LocalDateTime.now().toString());

            System.out.println("Heiiaaa");
            return ok("Success!");
        }
        return errorHandling("invalid USERNAME or pass");
    }

    private Result errorHandling(String message){
        fails += 1;
        if(fails >= 1000){
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
