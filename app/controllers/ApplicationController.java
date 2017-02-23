package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import database.Authenticator;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import javax.inject.Inject;


public class ApplicationController extends Controller {

    @Inject
    Authenticator authenticator;
    /**
     * Called when first requesting the index page.
     * Checks you have visited the page(if you have a cookie)
     * then redirects you to the welcome page(first visit), login(not first visit but not logged in),
     * or the main page(not first visit and logged in)
     * @return Response
     */
    public Result init(){
        Http.Request request = request();
        Http.Cookie cookieID = request.cookie("id");


        if(cookieID != null){
            return loggedIn();
        }
        else{
            /*
            * New to the page, sets up a new cookie and returns the welcome page.
            * New cookie: Cookie(String name, String value, Integer maxAge, String path,
            * String domain, boolean secure, boolean httpOnly)
            */
            Http.Cookie cookie = new Http.Cookie("id", "andreas", null, "/", null, false, true);
            response().setCookie(cookie);
            return ok(views.html.index.render());
        }
    }

    public Result getProjects(){
        return ok();
    }
    /**
     * Checks if logged in.
     * If so, give home page. If not, give login page.
     * @return Result
     */
    private Result loggedIn(){

        //Checks if the session has been tampered with and the like.
        //Gets the userID
        String userID = session("connected");
        if(userID != null) {
            return ok(views.html.main.render());
        } else {
            return unauthorized(views.html.login.render());
        }

        //else return(views.html.login.render())
    }
    public Result dashboard() {
        return ok(views.html.dashboard.render());
    }


}
