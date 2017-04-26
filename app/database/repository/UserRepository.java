package database.repository;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import database.Statement;
import models.User;
import org.mindrot.jbcrypt.BCrypt;
import play.db.Database;
import play.libs.Json;

/**
 * Created by Vestein Dahl
 * Date: 26.04.2017
 * Time: 16.22
 */
public class UserRepository {

    private final QueryHandler qh;

    public UserRepository(Database db) {
        this.qh = new QueryHandler(db);
    }

    public boolean usernameExists(final String username){
        JsonNode exists = qh.executeQuery(Statement.GET_USERNAME_EXISTS,username);
        return exists.get(0).get("bool").asInt() == 1;
    }

    public void insertUser(final User user) {
        qh.insertStatement(Statement.INSERT_USER, user.firstName, user.lastName, user.email, user.USERNAME, hash(user.pass));
    }

    public User getUser(final User user) {
        return getUser(user.USERNAME);
    }

    public User getUser(final String username){
        //CHANGED
        JsonNode userData = qh.executeQuery(Statement.GET_USER_WITH_PASS_BY_USERNAME,username);
        return Json.fromJson(userData.get(0), User.class);
    }

    private String hash(final String s) {
        return BCrypt.hashpw(s, BCrypt.gensalt(10));
    }

}
