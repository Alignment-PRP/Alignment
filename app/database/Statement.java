package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

//TODO Doc
public enum Statement {

  GET_ALL_REQUIREMENTS("SELECT * FROM requirement"),
  GET_REQUIREMENTS_BY_ID("SELECT * FROM requirement WHERE requirementid=?"),
  GET_REQUIREMENTS_BY_CATEGORY_ID("SELECT requirement.*, category.name as cname " +//category.name AS 'cname', category.description AS 'cdesc' " +
          "FROM requirement " +
          "JOIN requirementcategory " +
          "ON requirement.requirementid = requirementcategory.requirementid " +
          "JOIN category " +
          "ON requirementcategory.categoryid = category.categoryid " +
          "WHERE category.categoryid=?"),
  GET_PROJECT_BY_ID("SELECT *  FROM project WHERE projectid=?"),
  GET_PROJECTS_RELATED_TO_USER(
          //TODO: Should probably make the nested queries into views.
          "SELECT pid, p_name, p_desc, po_username, po_userid, pm_username, pm_userid, public " +
                  "FROM " +
                        //Gets all user related projects
                        "(SELECT p.projectid AS 'pid', p.name AS 'p_name', p.description AS 'p_desc', p.ispublic AS 'public'" +
                            "FROM project p " +
                            "JOIN partof " +
                            "ON p.projectid = partof.projectid " +
                            "JOIN user u " +
                            "ON partof.userid = u.userid " +
                            "WHERE u.userid= ?) AS part " +

                  "INNER JOIN " +
                        //Gets all the users that are projects owners of at least one project
                        "(SELECT u.userid AS 'po_userid', u.username AS 'po_username', po.projectid AS 'po_pid' " +
                          "FROM user u " +
                          "JOIN projectowner po " +
                          "ON u.userid = po.userid) AS pos " +
                  "ON pos.po_pid = part.pid " +

                  "INNER JOIN " +
                        //Gets all the users that are project managers for at least one project
                        "(SELECT u.userid AS 'pm_userid', u.username AS 'pm_username', pm.projectid AS 'pm_pid' " +
                          "FROM user u " +
                          "JOIN projectmanager pm " +
                          "ON u.userid = pm.userid) AS pms " +
                  "ON pms.pm_pid = part.pid"

            ),
  GET_PUBLIC_PROJECTS(
          "SELECT * " +
                  "FROM project " +
                  "WHERE ispublic = 1"
  ),
  GET_USER_BY_ID("SELECT * FROM user WHERE userid=?"),
  GET_USER_BY_NAME("SELECT * FROM user WHERE username=?");


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
