package database;

import com.fasterxml.jackson.databind.JsonNode;
import play.db.Database;
import play.libs.Json;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//TODO Doc
public class QueryHandler {

    private final Database db;

    public QueryHandler(Database db) {
        this.db = db;
    }


    public JsonNode getUserByName(String name) {
        return executeQuery(Statement.GET_USER_BY_NAME, name);
    }
    public JsonNode getProjectRelatedToUser(String userID) {
        return executeQuery(Statement.GET_USER_BY_NAME, userID);
    }
    public JsonNode getPublicProjects() {
        return executeQuery(Statement.GET_PUBLIC_PROJECTS);
    }

    public JsonNode getUserByID(String ID) {
        return executeQuery(Statement.GET_USER_BY_ID, ID);
    }

    //TODO Doc
    public JsonNode executeQuery(Statement statement, Object... objects) {
        try {
            Connection c = db.getConnection();
            JsonNode json = resultSetToJson(statement.prepareAndExecute(c, objects));
            c.close();
            return json;
        } catch (SQLException e) {
            e.printStackTrace();
            return Json.toJson("SQL Exception");
        }
    }

    private JsonNode resultSetToJson(ResultSet rs) {
        List<Map<String, String>> list = new ArrayList<>();
        try {
            while (rs.next()) {
                Map<String, String> map = new HashMap<>();
                for (int i = 1; i<= rs.getMetaData().getColumnCount(); i++) {
                    String k = rs.getMetaData().getColumnName(i);
                    String v = rs.getString(k);
                    map.put(k, v);
                }
                list.add(map);
            }
        } catch (SQLException e) {
            //TODO Some sort of errorhandling.
            e.printStackTrace();
            return Json.toJson(e.toString());
        }
        return Json.toJson(list);
    }

}
