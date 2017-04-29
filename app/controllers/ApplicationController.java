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

    /**
     * Called when first entering the site GET /
     * Checks if oyu are logged in, if not redirects to the login page.
     * @return
     */
    public Result init(){
        return ok(views.html.dashboard.render());
    }

}