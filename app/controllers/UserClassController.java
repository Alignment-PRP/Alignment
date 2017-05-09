package controllers;

import database.repository.UserClassRepo;
import models.UserClass;
import play.db.Database;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

public class UserClassController extends Controller {

    private final UserClassRepo repo;

    @Inject
    public UserClassController(Database db) {
        this.repo = new UserClassRepo(db);
    }

    public Result newUserClass() {
        if(!AccessController.checkRights("UserClass write")){
            return unauthorized("Du har ikke rett til å opprete nye bruker klasser");
        }
        UserClass userClass = Json.fromJson(request().body().asJson(), UserClass.class);

        if (repo.userClassExists(userClass)) {
            return internalServerError("Brukerklasse eksisterer");
        }

        repo.insert(userClass);
        return ok("Brukerklasse lagt til.");
    }

    public Result updateUserClass() {
        if(!AccessController.checkRights("UserClass write")){
            return unauthorized("Du har ikke rett til å redigere bruker klasser");
        }
        UserClass userClass = Json.fromJson(request().body().asJson(), UserClass.class);

        if (repo.userClassExists(userClass) && !userClass.isNameEqual()) {
            return internalServerError("Brukerklassen eksisterer");
        }

        final boolean b1 = repo.update(userClass);
        return b1 ? ok("Brukerklasse oppdatert") : internalServerError("Noe gikk galt..");
    }

    public Result deleteUserClass() {
        if(!AccessController.checkRights("UserClass write")){
            return unauthorized("Du har ikke rett til å slette bruker klasser");
        }
        UserClass userClass = Json.fromJson(request().body().asJson(), UserClass.class);
        final boolean b1 = repo.delete(userClass);
        return b1 ? ok("Brukerklasse slettet") : internalServerError("Noe gikk galt");
    }

}
