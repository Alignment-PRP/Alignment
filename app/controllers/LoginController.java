package controllers;

import database.repository.UserRepository;
import models.User;
import play.libs.Json;
import play.db.Database;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.time.LocalDateTime;

/**
 * Created by andrfo on 16.02.2017.
 */
public class LoginController extends Controller{

    private final Authenticator authenticator;
    private final UserRepository userRepository;
    private int fails = 0;

    @Inject
    public LoginController(Authenticator authenticator, Database db) {
        this.authenticator = authenticator;
        this.userRepository = new UserRepository(db);
    }

    public Result logout(){
        session("connected", ""); //just to be sure. Not completely sure how session works yet.
        session().clear();
        //dirty but effective way to reset all rights information once you're logged out
        AccessController.clearRights();
        return ok("Logged out");
    }

    public Result loginCheck() {
        final String userID = session("connected");

        return userID != null ? ok("YEY") : unauthorized("Not valid session");
    }

    public Result authenticate(){
        final User user = Json.fromJson(request().body().asJson(), User.class);

        if (user.USERNAME.equals("null")) {
            return errorHandling("invalid USERNAME or pass");
        }

        final User dbUser = userRepository.getUser(user);

        if (authenticator.authenticate(user, dbUser)) {
            session().clear();
            session("connected", user.USERNAME);
            session("timestamp", LocalDateTime.now().toString());
            //Ensures your rights are always up to date on login
            AccessController.forceUpdateRights();
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