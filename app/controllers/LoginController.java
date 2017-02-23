package controllers;


import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import database.Authenticator;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Created by andrfo on 16.02.2017.
 */
public class LoginController extends Controller{
    int fails = 0;


    public Result login() {
        return ok(views.html.login.render());
    }

    public Result authenticate(){
        final Map<String, String[]> values = request().body().asFormUrlEncoded();

        String username = values.get("username")[0];
        String password = values.get("password")[0];
        String authentication = Authenticator.authenticate(username, password);

        if(authentication == null){
            session().clear();
            session("connected", username);
            session("timestamp", LocalDateTime.now().toString());
            return ok(views.html.main.render());
        }
        else{
            fails += 1;
            if(fails >= 10){
                return unauthorized("BAN");
                //TODO: Figure out how to respond properly to lots of fails. Ban IP?
            }
            if(fails >= 3){
                return unauthorized("CAPCHA");
            }
            return unauthorized(views.html.login.render());
        }

    }
}
