package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

//TODO Doc
public enum Statement {

  //Example statements
  GET_PROJECT_BY_ID("SELECT *  FROM project WHERE projectid=?"),
  GET_PROJECT_RELATED_TO_USER(
          "SELECT project.projectid, Project.name " +
                  "FROM project " +
                  "JOIN partof " +
                  "ON project.projectid = partof.projectid " +
                  "LEFT JOIN user ON partof.userid = user.userid " +
                  "WHERE userid=?"),
  GET_PUBLIC_PROJECTS(
          "SELECT *" +
                  "FROM project" +
                  "WHERE ispublic = 1"
  ),
  GET_USER_BY_ID("SELECT * FROM user WHERE userid=?"),
  GET_USER_BY_NAME("SELECT * FROM user WHERE username=?"),

  CREATE_USER("INSERT INTO user (firstname, lastname, email, username, password) VALUES (?,?,?,?,?)");

  private final String statement;

  Statement(String statement) {
    this.statement = statement;
  }

  //TODO Doc
  //TODO Errorhandling
  public PreparedStatement prepare(Connection c, Object... objects) throws SQLException {
    PreparedStatement ps = c.prepareStatement(statement);
    if (objects.length > 0) {
      for (int i = 1; i <= objects.length; i++) {
        ps.setObject(i, objects[i-1]);
      }
    }
    return ps;
  }

  //TODO Doc
  public ResultSet prepareAndExecute(Connection c, Object... objects) throws SQLException {
    return prepare(c, objects).executeQuery();
  }

  public void prepareAndExecuteNewUser(Connection c, String firstname, String lastname, String email, String username, String password) throws SQLException{
      PreparedStatement ps = c.prepareStatement(statement);
      //TODO set username = unique in db
      ps.setString(1, firstname);
      ps.setString(2, lastname);
      ps.setString(3, email);
      ps.setString(4, username);
      ps.setString(5, password);
      ps.executeUpdate();
  }

}
