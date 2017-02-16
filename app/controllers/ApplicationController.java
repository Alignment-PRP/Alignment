package controllers;

import play.mvc.Controller;
import play.mvc.Result;



public class ApplicationController extends Controller {

    public Result login() {
        return ok(views.html.login.render());
    }


    public Result dashboard() {
        return ok(views.html.dashboard.render());
    }


}
