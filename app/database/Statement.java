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
    GET_USER_BY_NAME("SELECT * FROM user WHERE username=?"),
    GET_USER_NAME_EXISTS("SELECT count(1) as bool FROM user WHERE username=?"),
    GET_PROJECT_NAME_EXISTS("SELECT count(1) as bool FROM project WHERE name=?"),
    GET_USER_IS_PART_OF_PROJECT("" +
            //TODO: A check if user is part of a project.
            //INPUTS: userid, projectid
            "SELECT count(1) as bool"
    ),
    GET_PROJECT_REQUIREMENT_NAME_EXISTS("SELECT count(1) as bool FROM projectrequirement WHERE name=?"),
    GET_PROJECTID_BY_NAME(
            "SELECT projectid " +
                    "FROM project " +
                    "WHERE name = ?"
    ),
    GET_PROJECT_REQUIREMENTID_BY_NAME(
            "SELECT projectrequirement AS id " +
                    "FROM projectrequirement " +
                    "WHERE name = ?"
    ),
    CREATE_PROJECT("INSERT INTO project (name, description, ispublic) VALUES (?, ?, ?)"),
    CREATE_PROJECT_MANAGER("INSERT INTO projectmanager (userid, projectid) VALUES (?, ?)"),
    CREATE_PROJECT_OWNER("INSERT INTO projectowner (userid, projectid) VALUES (?, ?)"),
    CREATE_PROJECT_REQUIREMENT("INSERT INTO projectrequirement " +
            "(" +
            "ispublic, " +
            "name, " +
            "description, " +
            "source, " +
            "stimulus, " +
            "artifact, " +
            "response, " +
            "responsemeasure, " +
            "environment" +
            " ) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"),
    CREATE_LOCAL_REQUIREMENT(
            "INSERT INTO localrequirement (projectid, projectrequirementid) VALUES (?, ?)"
    ),
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

    public void prepareAndExecuteNewProject(Connection c, String name, String description, int ispublic) throws SQLException{
        PreparedStatement ps = c.prepareStatement(statement);
        //TODO set username = unique in db
        ps.setString(1, name);
        ps.setString(2, description);
        ps.setInt(3, ispublic);
        ps.executeUpdate();
    }

    public void prepareAndExecuteNewLocalRequirement(Connection c, int projectid, int projectrequrementid) throws SQLException{
        PreparedStatement ps = c.prepareStatement(statement);
        //TODO set username = unique in db
        ps.setInt(1, projectid);
        ps.setInt(2, projectrequrementid);
        ps.executeUpdate();
    }

    public void prepareAndExecuteNewProjectManager(Connection c, int projectid, int managerid) throws SQLException{
        PreparedStatement ps = c.prepareStatement(statement);
        //TODO set username = unique in db
        ps.setInt(1, managerid);
        ps.setInt(2, projectid);
        ps.executeUpdate();
    }
    public void prepareAndExecuteNewProjectOwner(Connection c, int projectid, int ownerid) throws SQLException{
        PreparedStatement ps = c.prepareStatement(statement);
        //TODO set username = unique in db
        ps.setInt(1, ownerid);
        ps.setInt(2, projectid);
        ps.executeUpdate();
    }

    public void prepareAndExecuteNewProjectRequirement(Connection c,
                                                       int ispublic,
                                                       String name,
                                                       String description,
                                                       String source,
                                                       String stimlus,
                                                       String artifact,
                                                       String response,
                                                       String responsemeasure,
                                                       String environment) throws SQLException{
        PreparedStatement ps = c.prepareStatement(statement);
        //TODO set username = unique in db
        ps.setInt(1, ispublic);
        ps.setString(2, name);
        ps.setString(3, description);
        ps.setString(4, source);
        ps.setString(5, stimlus);
        ps.setString(6, artifact);
        ps.setString(7, response);
        ps.setString(8, responsemeasure);
        ps.setString(9, environment);
        ps.executeUpdate();
    }
}
