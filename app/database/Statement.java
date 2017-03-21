package database;

import net.bytebuddy.dynamic.scaffold.MethodRegistry;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

//TODO Doc
public enum Statement {

    SELECT_LAST_INSERT_ID("SELECT LAST_INSERT_ID()"),

    /**
     * ==========================================================================================================================
     * ==========================================REQUIREMENTS====================================================================
     * ==========================================================================================================================
     */

    //===========================================GLOBAL==========================================================================
    INSERT_REQUIREMENT("INSERT INTO Requirement ()"),
    INSERT_REQUIREMENT_META_DATA("INSERT INTO RequirementMetaData (RID, subCatID, reqResponsible, description, comment, reqCode, reqNo, name) VALUES(?,?,?,?,?,?,?,?)"),
    INSERT_REQUIREMENT_STRUCTURE("INSERT INTO Structure (type, content) VALUES(?,?,?)"),
    INSERT_REQUIREMENT_HAS_STRUCTURE("INSERT INTO HasStructure (RID, SID) VALUES(?,?,?)"),
    REQUIREMENT_EXISTS("SELECT count(1) as bool FROM Requirement WHERE ID = ?"),
    GET_REQUIREMENTS_BY_CATEGORY_ID("" +
            ""),//TODO
    GET_GLOBAL_REQUIREMENTS("" +
            "SELECT * " +
            "FROM Requirements AS r " +
            "INNER JOIN RequirementMetaData AS rm " +
            "ON r.ID = rm.RID "),

    GET_GLOBAL_REQUIREMENT_BY_ID("SELECT * FROM Requirement WHERE ID = ?"),
    UPDATE_GLOBAL_REQUIREMENT(""),//TODO


    //===========================================PROJECT=========================================================================
    GET_PROJECT_REQUIREMENTS("" +
            "SELECT * " +
            "FROM Requirements AS r " +
            "INNER JOIN RequirementMetaData AS rm " +
            "ON r.ID = rm.RID " +
            "INNER JOIN ProjectRequirement AS pr " +
            "ON pr.RID = r.ID " +
            "WHERE pr.PID = ?"),
    INSERT_PROJECT_REQUIREMENT(""),//TODO

    //TODO:Requirements can be public or not. Need different methods for these.



    /**
     * ==========================================================================================================================
     * ==========================================CATEGORY========================================================================
     * ==========================================================================================================================
     */

    GET_CATEGORIES("" + //TODO: Make it a list of Category Json objects that contain a list of SubCategory Json Objects.
            "SELECT c.ID AS categoryID, sc.ID AS subCategoryID, c.name AS categoryName, c.desctription AS categoryDescription, sc.name AS subCategoryName, sc.description AS subCategoryDescription " +
            "FROM Category AS c " +
            "INNER JOIN SubCategory AS sc " +
            "ON sc.catID = c.ID"),
    GET_CATEGORY_NAMES("" + //TODO: Make it a list of Category Json objects that contain a list of SubCategory Json Objects.
            "SELECT c.ID AS categoryID, sc.ID AS subCategoryID, c.name AS categoryName, sc.name AS subCategoryName " +
            "FROM Category AS c " +
            "INNER JOIN SubCategory AS sc " +
            "ON sc.catID = c.ID"),
    INSERT_CATEGORY("INSERT INTO Category (name, description) VALUES (?,?)"),
    CATEGORY_EXISTS("SELECT count(1) as bool FROM Category WHERE ID = ?"),
    INSERT_SUBCATEGORY("INSERT INTO SubCategory (catID, name, description) VALUES (?,?,?)"),




    /**
     * ==========================================================================================================================
     * ==========================================PROJECT=========================================================================
     * ==========================================================================================================================
     */

    PROJECT_EXISTS("SELECT count(1) as bool FROM Project WHERE ID = ?"),
    GET_PROJECT_BY_ID("SELECT *  FROM Project WHERE ID=?"),
    GET_PROJECTS_ACCESSIBLE_BY_USER("" +
            "SELECT * " +
            "FROM Project AS p " +
            "INNER JOIN HasAccess AS ha " +
            "ON ha.PID = p.ID " +
            "INNER JOIN UserHasClass AS uhc " +
            "ON uhc.USERNAME = ?"),//TODO
    GET_PUBLIC_PROJECTS("SELECT * FROM project WHERE ispublic = 1"),

    GET_PROJECT_NAME_EXISTS("SELECT count(1) as bool FROM project WHERE name=?"),

    INSERT_PROJECT("INSERT INTO Project (managerID, creatorID, name, isPublic) VALUES(?,?,?,?)"),//TODO




    /**
     * ==========================================================================================================================
     * ================================================USER======================================================================
     * ==========================================================================================================================
     */

    CREATE_USER("INSERT INTO Users (firstName, lastName, email, USERNAME, pass) VALUES (?,?,?,?,?)"),
    GET_USER_BY_USERNAME("SELECT * FROM Users WHERE USERNAME=?"),
    GET_USERNAME_EXISTS("SELECT count(1) as bool FROM Users WHERE USERNAME=?");


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

    public void prepareAndExecuteInsert(Connection c,  Object... objects) throws SQLException{
        PreparedStatement ps = c.prepareStatement(statement);
        if (objects.length > 0) {
            for (int i = 0; i < objects.length; i++) {
                prepareObject(ps, objects[i], i + 1);
            }
        }
        ps.executeUpdate();
    }

    public void prepareObject(PreparedStatement ps, Object object, int index) throws SQLException{
    //NOTE define datatype to SQL conversion here
        if(object instanceof Integer){
            //cast to Integer (should already be a damn Integer but Java wants to know in advance.
            //((Integer) object).intValue();
            ps.setInt(index, ((Integer) object));
        }
        else{
            //toString (should already be a damn string but Java wants to know in advance.
            ps.setString(index, object.toString());
        }
    }

    public void addTableRelation(Connection c, int parent, int child) throws SQLException{
        PreparedStatement ps = c.prepareStatement(statement);
        ps.setInt(1, parent);
        ps.setInt(2, child);
        ps.executeUpdate();
    }

    /*public void setInteger(PreparedStatement ps, int object, int index){
        ps.setInt(index,object);
    }*/


    //DANGER ZONE (anything bellow here should be deletions)
    /*public void deleteProject(Connection c, int id) throws SQLException{
        PreparedStatement ps = c.prepareStatement(statement);
        ps.setInt(1, id);
        ps.executeUpdate();
    }*/
}
