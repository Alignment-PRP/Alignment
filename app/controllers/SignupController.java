package controllers;

import org.mindrot.jbcrypt.BCrypt;

import play.mvc.Controller;
import play.mvc.Result;

import java.util.Map;

import javax.inject.Inject;
import com.fasterxml.jackson.databind.JsonNode;


public class SignupController extends Controller{

    private final UserController uc;

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
        //String uname = values.get("uname")[0];
        String pass = values.get("psw")[0];
        //String email = values.get("mail")[0];
        //String
        pass = hashPass(pass);
        uc.createUser("bob", "bobson", "bob@bob.com", values.get("uname")[0], pass);
        return ok("hello");
    }

    public Result signUp(){
        return ok(views.html.signup.render());
    }

}
