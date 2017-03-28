package database.repository;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import database.Statement;
import models.UserClass;
import play.db.Database;

public class UserClassRepo extends QueryHandler {

    public UserClassRepo(Database db) {
        super(db);
    }

    public void insert(UserClass userClass) {
        insertStatement(Statement.INSERT_USERCLASS, userClass.NAME, userClass.description);
    }

    public boolean update(UserClass userClass) {
        final boolean b1 = executeUpdate(Statement.UPDATE_USERCLASS, userClass.NAME, userClass.description, userClass.oldNAME);
        final boolean b2 = executeUpdate(Statement.UPDATE_CHANGE_USERHASCLASS_NAME, userClass.NAME, userClass.oldNAME);
        return b1 && b2;
    }

    public boolean delete(UserClass userClass) {
        final boolean b1 = executeUpdate(Statement.UPDATE_CHANGE_USERHASCLASS_NAME, userClass.replacement, userClass.NAME);
        if (b1) {
            executeUpdate(Statement.DELETE_USERCLASS, userClass.NAME);
            return true;
        }
        return false;
    }

    public boolean userClassExists(UserClass userClass){
        JsonNode exists = executeQuery(Statement.GET_USERCLASS_EXISTS,userClass.NAME);
        return exists.get(0).get("bool").asInt() == 1;
    }

}
