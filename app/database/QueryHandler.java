package database;

import com.fasterxml.jackson.databind.JsonNode;
import play.db.Database;
import play.libs.Json;

import java.sql.Connection;
import java.sql.PreparedStatement;
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


    public void prepareInsert(Statement statement, Object object1, Object... objects) throws SQLException{
        try {
            Connection c = db.getConnection();
            statement.prepareAndExecuteInsert(c, object1, objects);
            c.close();
        }catch(SQLException e){
            e.printStackTrace();
        }
    }


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
                    String k = rs.getMetaData().getColumnLabel(i);
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

    //USE WHENEVER YOU ARE REFERING TO A TABLE THAT LOOKS LIKE THIS:    |ID1|ID2|   (ex categorycategory)
    public void addTableRelation(Statement statement, int parent, int child){
        try{
            Connection c = db.getConnection();
            statement.addTableRelation(c, parent, child);
            c.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    //WELCOME TO THE DANGER ZONE
    /*public void deleteProject(Statement statement, int id){
        try{
            Connection c = db.getConnection();
            statement.deleteProject(c,id);
            c.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }*/

}
