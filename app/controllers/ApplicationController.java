package controllers;

import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import javax.inject.Inject;

public class ApplicationController extends Controller {

    private final Authenticator authenticator;

    @Inject
    public ApplicationController(Authenticator authenticator) {
        this.authenticator = authenticator;
    }

    /**
     * Called when first requesting the index page.
     * Checks you have visited the page(if you have a cookie)
     * then redirects you to the welcome page(first visit), login(not first visit but not logged in),
     * or the main page(not first visit and logged in)
     * @return Response
     */

    public Result login() {
        return ok(views.html.login.render());
    }

    /**
     * React routing
     * @param url
     * @return
     */
    public Result initUrl(String url) {
        return init();
    }

    public Result init(){
        String userID = session("connected");
        if(userID != null) {
            return ok(views.html.dashboard.render());
        } else {
            return unauthorized(views.html.login.render());
        }
    }
    /**
     * Checks if logged in.
     * If so, give home page. If not, give login page.
     * @return Result
     */
    @Deprecated
    private Result loggedIn(){

        //Checks if the session has been tampered with and the like.
        //Gets the userid
        String userID = session("connected");
        if(userID != null) {
            return ok(views.html.dashboard.render());
        } else {
            return unauthorized(views.html.login.render());
        }

        //else return(views.html.login.render())
    }
}