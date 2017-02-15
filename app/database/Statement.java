package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

//TODO Doc
public enum Statement {

  //Example statements
  GET_PROJECT_BY_ID("SELECT *  FROM Project WHERE id=?"),
  GET_PROJECT_RELATED_TO_USER("SELECT Project.ID, Project.Name FROM Project JOIN PartOf ON Project.ID = PartOf.ProjectID LEFT JOIN User ON PartOf.UserID = User.ID WHERE UserID=?"),
  GET_USER_BY_ID("SELECT * FROM User WHERE id=?"),
  GET_USER_BY_NAME("SELECT * FROM User WHERE username=?");

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

}
