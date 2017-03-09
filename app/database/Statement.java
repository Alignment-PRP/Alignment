package database;

import net.bytebuddy.dynamic.scaffold.MethodRegistry;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

//TODO Doc
public enum Statement {


    //TODO:Requirements can be public or not. Need different methods for these.
    GET_ALL_REQUIREMENTS(
            "SELECT r.*, c.name AS cname, c.description AS cdesc " +
                    "FROM requirement AS r " +
                    "INNER JOIN requirementcategory AS rc " +
                    "ON r.requirementid = rc.requirementid " +
                    "INNER JOIN category AS c " +
                    "ON c.categoryid = rc.categoryid "
    ),
    GET_REQUIREMENTS_BY_ID("SELECT * FROM requirement WHERE requirementid=?"),
    GET_REQUIREMENTS_BY_CATEGORY_ID(
            "SELECT requirement.*, category.name as cname, category.description AS cdesc " +
                    "FROM requirement " +
                    "JOIN requirementcategory " +
                    "ON requirement.requirementid = requirementcategory.requirementid " +
                    "JOIN category " +
                    "ON requirementcategory.categoryid = category.categoryid " +
                    "WHERE category.categoryid=?"
    ),
    GET_CATEGORY_NAMES("SELECT name FROM category"),
    GET_REQUIREMENTS_BY_CATEGORY_NAME(
            "SELECT r.*, c.name AS cname, c.description AS cdesc  " +
                    "FROM requirement AS r " +
                    "INNER JOIN requirementcategory AS rc " +
                    "ON r.requirementid = rc.requirementid " +
                    "INNER JOIN category AS c " +
                    "ON c.categoryid = rc.categoryid " +
                    "WHERE c.name = ?"
    ),
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
    SELECT_LAST_INSERT_ID("SELECT LAST_INSERT_ID()"),
    CREATE_PROJECT("INSERT INTO project (name, description, ispublic) VALUES (?, ?, ?)"),
    CREATE_PROJECT_MANAGER("INSERT INTO projectmanager (userid, projectid) VALUES (?, ?)"),
    CREATE_PROJECT_OWNER("INSERT INTO projectowner (userid, projectid) VALUES (?, ?)"),
    CREATE_PART_OF("INSERT INTO partof (userid, projectid) VALUES (?, ?)"),
    CREATE_PROJECT_REQUIREMENT(
            "INSERT INTO projectrequirement (" +
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

    CREATE_REQUIREMENT("INSERT INTO requirement (ispublic, name, description, source, stimulus, artifact, response, enviroment) VALUES (?,?,?,?,?,?,?,?)"),

    GET_GLOBAL_REQUIREMENTS("SELECT * FROM requirement"),

    GET_GLOBAL_REQUIREMENT("SELECT * FROM requirement WHERE requirementid = ?"),

    UPDATE_GLOBAL_REQUIREMENT("UPDATE requirement SET ispublic=?, name=?, description=?, source=?, stimulus=?, artifact=?, response=?, enviroment=? WHERE requirementid=?"),

    REQUIREMENT_EXISTS("SELECT count(1) as bool FROM requirement WHERE requirementid = ?"),
    //TODO combine all of these into "SELECT count(1) as bool FROM ? WHERE ? = ? or some such
    CATEGORY_NAME_EXISTS("SELECT count(1) as bool FROM category WHERE name = ?"),

    CREATE_CATEGORY("INSERT INTO category (name, description) VALUES (?,?)"),

    CATEGORIES_EXISTS("SELECT count(1) as bool FROM category WHERE categoryid IN (?, ?)"),
    //TODO join these by using int... and for int in list setInt(i,liste[i])
    CATEGORY_EXISTS("SELECT count(1) as bool FROM category WHERE categoryid = ?"),

    //TODO combine all of these into "INSERT INTO ? (?,?) VALUES (?,?) for all table relationships
    ADD_SUBCATEGORY("INSERT INTO categorycategory (parentid, childid) VALUES (?,?)"),

    PROJECT_EXISTS("SELECT count(1) as bool FROM project WHERE projectid = ?"),

    ADD_REQUIREMENT_CATEGORY("INSERT INTO requirementcategory (requirementid, categoryid) VALUES (?,?)"),

    /*GET_PROJECT_REQUIREMENT_CATEGORY("SELECT projectrequirement.*, category.name AS cname, category.description AS cdesc" +
    "FROM projectrequirement INNER JOIN projectrequirementcategory" +
    "ON projectrequirement.requirement = projectrequirementcategory.projectrequirementid" +
    "INNER JOIN category ON category.categoryid = projectrequirementcategory.categoryid" +
    "WHERE projectrequirement.projectrequirement = ?"),*/

    GET_PROJECT_REQUIREMENTS("SELECT projectrequirement.* FROM projectrequirement "+
    "WHERE projectrequirement.projectrequirement IN (SELECT localrequirement.projectrequirementid "+
    "FROM localrequirement WHERE localrequirement.projectid = ?)"),
    /*("SELECT projectrequirement FROM projectrequirement INNER JOIN "+
    "ON localrequirement.projectrequirementid = projectrequirement.projectrequirement "
    "WHERE localrequirement.projectid = ?"),*/

    CREATE_USER("INSERT INTO user (firstname, lastname, email, username, password) VALUES (?,?,?,?,?)");

    //NOTE LEAVE ALL OF THIS FOR WHEN WE GET TO DELETIONS (THEY'RE A FUCKING PAIN)
    //DELETE_PROJECT_MANAGER(),

    //DELETE_PROJECT_OWNER(),

    /*DELETE_PROJECT("DELETE project, projectowner, projectmanager FROM " +
            "project INNER JOIN projectowner INNER JOIN projectmanager " +
            "WHERE project.projectid = projectowner.projectid AND project.projectid = projectmanager.projectid " +
            "AND project.projectid= ?")*/
    /*
    DELETE_PROJECT_PEOPLE("DELETE projectowner, projectmanager, partof " +
            "FROM projectowner INNER JOIN projectmanager INNER JOIN partof " +
            "WHERE projectowner.projectid = projectmanager.projectid AND projectowner.projectid = partof.projectid AND projectowner.projectid = ?"),

    DELETE_PROJECT("DELETE project");*/


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

    prepareObject(PreparedStatement ps, Object object, int index){
    //NOTE define datatype to SQL conversion here
        if(object instanceof Integer){
            ps.setInt(index, object);
        }
        else{
            ps.setString(index, object);
        }
    }


    //DANGER ZONE (anything bellow here should be deletions)
    /*public void deleteProject(Connection c, int id) throws SQLException{
        PreparedStatement ps = c.prepareStatement(statement);
        ps.setInt(1, id);
        ps.executeUpdate();
    }*/
}
