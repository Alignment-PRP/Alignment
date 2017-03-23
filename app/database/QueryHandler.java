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


    /**
     * Executes an INSERT statement and returns the PK of the row you just
     * inserted before closing the database connection.
     * @param statement an instance of the Statement Class with a statement
     * @param objects a list of Objects that are the values to be inserted into the database. String or int
     * @return String ID, or SQLException
     */
    public String insertStatementWithReturnID(Statement statement, Object... objects){

        try {
            Connection c = db.getConnection();

            //Executes the statement passed in as an argument.
            statement.prepareAndExecuteInsert(c, objects);

            //Changes the statement to the one that gets the last inserted ID
            statement = Statement.SELECT_LAST_INSERT_ID;

            //Executes the new statement
            JsonNode ID = resultSetToJson(statement.prepareAndExecute(c));

            //Closes the connection and returns the ID
            c.close();
            return ID.get(0).get("LAST_INSERT_ID()").asText();
        }catch(SQLException e){
            e.printStackTrace();
            return "SQLException";
        }
    }

    /**
     * Executes an INSERT statement
     * @param statement an instance of the Statement Class with a Statement
     * @param objects a list of Objects that are the values to be inserted into the database. String or int
     */
    public void insertStatement(Statement statement,  Object... objects){
        try {
            Connection c = db.getConnection();

            //Executes the statement passed in as an argument.
            statement.prepareAndExecuteInsert(c, objects);

            //Closes the database connection
            c.close();
        }catch(SQLException e){
            e.printStackTrace();
        }
    }

    /**
     * Executes a query and returns the result as a JsonNode.
     * @param statement an instance of the Statement Class with a Statement
     * @param objects A list of Objects to be used in the query
     * @return JsonNode containing the result set from the query
     */
    public JsonNode executeQuery(Statement statement, Object... objects) {
        try {
            Connection c = db.getConnection();

            //Executes the query statement and converts it to Json
            JsonNode json = resultSetToJson(statement.prepareAndExecute(c, objects));

            //Closes the database connection
            c.close();
            return json;
        } catch (SQLException e) {
            e.printStackTrace();
            return Json.toJson("SQL Exception");
        }
    }

    /**
     * Takes in a result set from a query and converts it to Json.
     * @param rs ResultSet. The result set from a database query.
     * @return JsonNode The result set as Json.
     */
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

}
