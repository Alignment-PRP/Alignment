package controllers;

import database.QueryHandler;
import org.mindrot.jbcrypt.BCrypt;

import play.mvc.Controller;
import play.mvc.Result;

import java.util.Map;

import javax.inject.Inject;
import com.fasterxml.jackson.databind.JsonNode;


public class SignupController extends Controller{

    private final UserController uc;

    //TODO: decide if a qh would be nice (wasn't going to call more than one query here but seems it's happening anyways)
    @Inject
    public SignupController(UserController userController){
        this.uc = userController;
    }

    private String hashPass(String pass){
        //TODO check all of this
        String Passwrd = BCrypt.hashpw(pass, BCrypt.gensalt(10));
        return Passwrd;
    }

    public Result create(){
        //TODO expand HTML WITH lastname, mail, usernam
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        String username = values.get("uname")[0];
        if(uc.usernameExists(username)) {
            //TODO determine a good http response for "recource is ok and all but needs a different value"
            return status(200, "Username is taken");
        }
        //String uname = values.get("uname")[0];
        String pass = values.get("psw")[0];
        //String email = values.get("mail")[0];
        //String
        pass = hashPass(pass);
        //TODO more validation on fields beyond username and pass?
        uc.createUser(values.get("firstname")[0], values.get("lastname")[0], values.get("email")[0], username, pass);
        //201 = created
        return status(201, "Created new user");
    }

    public Result signUp(){
        return ok(views.html.signup.render());
    }

}
