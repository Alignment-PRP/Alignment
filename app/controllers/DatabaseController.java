package controllers;

import database.QueryHandler;
import play.db.Database;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

//PLACEHOLDER
@Deprecated
public class DatabaseController extends Controller {

  private final QueryHandler databaseHandler;

  @Inject
  public DatabaseController(Database db) {
    databaseHandler = new QueryHandler(db);
  }

  //Example
  public Result userByName(String name) {
    return ok(databaseHandler.getUserByName(name));
  }

}
