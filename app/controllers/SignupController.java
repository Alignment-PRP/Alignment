package controllers;

import org.mindrot.jbcrypt.BCrypt;

import play.mvc.Controller;
import play.mvc.Result;

import java.util.Map;


public class SignupController extends Controller{

    private String hashPass(String pass){
        //TODO check all of this
        String Passwrd = BCrypt.hashpw(pass, BCrypt.gensalt(10));
        return Passwrd;
    }

    public Result create(){
        //TODO expand
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        //String uname = values.get("uname")[0];
        String pass = values.get("psw")[0];
        //String email = values.get("mail")[0];
        //String
        pass = hashPass(pass);
        return ok(uname+" "+pass);
    }

    public Result signUp(){
        return ok(views.html.signup.render());
    }

}
