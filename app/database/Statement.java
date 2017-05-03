package database;

import net.bytebuddy.dynamic.scaffold.MethodRegistry;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * These are the statements used to query the database.
 * The question marks (?) are values inserted in to the String.
 * They are added in the order they appear in in the string, so
 * remember to pass the values in the right order.
 */
public enum Statement {


    //Gets the PK of the last inserted row.
    SELECT_LAST_INSERT_ID("SELECT LAST_INSERT_ID()"),

    /**
     * ==========================================================================================================================
     * ==========================================REQUIREMENTS====================================================================
     * ==========================================================================================================================
     */

    //===========================================GLOBAL==========================================================================
    INSERT_REQUIREMENT("INSERT INTO Requirements () VALUES()"),
    INSERT_REQUIREMENT_META_DATA("INSERT INTO RequirementMetaData (RID, reqResponsible, description, comment, reqCode, reqNo, name) VALUES(?,?,?,?,?,?,?)"),
    UPDATE_REQUIREMENT_META_DATA("" +
            "UPDATE RequirementMetaData " +
            "SET " +
            "reqResponsible = ?, " +
            "description = ?, " +
            "comment = ?, " +
            "reqCode = ?, " +
            "reqNo = ?, " +
            "name = ? " +
            "WHERE RID = ?"),
    GET_REQUIREMENT_STRUCTURES("" +
            "SELECT r.ID AS RID, s.ID AS SID, s.type AS type, s.content AS content  " +
            "FROM Structure AS s " +
            "INNER JOIN HasStructure AS hs " +
            "ON hs.SID = s.ID " +
            "INNER JOIN Requirements AS r " +
            "ON r.ID = hs.RID " +
            "WHERE r.ID = ? "),
    INSERT_REQUIREMENT_STRUCTURE("INSERT INTO Structure (type, content) VALUES(?,?)"),
    INSERT_REQUIREMENT_HAS_STRUCTURE("INSERT INTO HasStructure (RID, SID) VALUES(?,?)"),
    REQUIREMENT_EXISTS("SELECT count(1) as bool FROM Requirements WHERE ID = ?"),
    GET_REQUIREMENTS_BY_CATEGORY_ID("" +
            ""),//TODO
    GET_GLOBAL_REQUIREMENTS("" +
            "SELECT r.*, rm.*, sc.ID AS scID, sc.name AS scName, sc.description AS scDesc, c.ID AS cID, c.name AS cName, c.description AS cDesc " +
            "FROM Requirements AS r " +
            "INNER JOIN RequirementMetaData AS rm " +
            "ON r.ID = rm.RID " +
            "INNER JOIN HasSubCategory AS hsc " +
            "ON r.ID = hsc.RID " +
            "INNER JOIN SubCategory AS sc " +
            "ON hsc.SID = sc.ID " +
            "INNER JOIN Category AS c " +
            "ON sc.catID = c.ID "),

    GET_REQUIREMENTS_STRUCTURES("" +
            "SELECT r.ID AS RID, s.ID AS SID, s.type AS type, s.content AS content " +
            "FROM Requirements AS r " +
            "INNER JOIN HasStructure AS hs " +
            "ON hs.RID = r.ID " +
            "INNER JOIN Structure AS s " +
            "ON s.ID = hs.SID "),

    GET_GLOBAL_REQUIREMENT_BY_ID("" +
            "SELECT r.*, rm.*, sc.ID AS scID, sc.name AS scName, sc.description AS scDesc, c.ID AS cID, c.name AS cName, c.description AS cDesc " +
            "FROM Requirements AS r " +
            "INNER JOIN RequirementMetaData AS rm " +
            "ON r.ID = rm.RID " +
            "INNER JOIN HasSubCategory AS hsc " +
            "ON r.ID = hsc.RID " +
            "INNER JOIN SubCategory AS sc " +
            "ON hsc.SID = sc.ID " +
            "INNER JOIN Category AS c " +
            "ON sc.catID = c.ID " +
            "WHERE r.ID = ?"),
    UPDATE_GLOBAL_REQUIREMENT(""),//TODO
    DELETE_HAS_STRUCTURE("DELETE FROM HasStructure WHERE RID = ?"),
    DELETE_REQUIREMENT_METADATA("DELETE FROM RequirementMetaData WHERE RID = ?"),
    DELETE_HAS_SUB_CATEGORY("DELETE FROM HasSubCategory WHERE RID = ?"),
    DELETE_PROJECT_REQUIREMENTS_BY_RID("DELETE FROM ProjectRequirements WHERE RID = ? "),//TODO: This is unfortunate.
    DELETE_GLOBAL_REQUIREMENT("DELETE FROM Requirements WHERE ID = ?"),

    GET_PROJECTS_PER_REQUIREMENT("" +
            "SELECT rm.RID, rm.name,   COUNT(DISTINCT pr.PID) AS PIDs " + //Just returning RID with the count for now.
            "FROM ProjectRequirements AS pr " +
            "INNER JOIN RequirementMetaData AS rm " +
            "ON pr.RID = rm.RID " +
            "INNER JOIN HasSubCategory AS hsc " +
            "ON pr.RID = hsc.RID " +
            "INNER JOIN SubCategory AS sc " +
            "ON sc.ID = hsc.SID " +
            "INNER JOIN Category AS c " +
            "ON sc.catID = c.ID " +
            "GROUP BY rm.RID"),
    GET_STRUCTURE_TYPES("" +
            "SELECT type " +
            "FROM Structure " +
            "GROUP BY type"),
    GET_STRUCTURES("SELECT * FROM Structure"),


    //===========================================PROJECT=========================================================================
    GET_PROJECT_REQUIREMENTS("" +
            "SELECT pr.*, rm.*, sc.ID AS scID, sc.name AS scName, sc.description AS scDesc, c.ID AS cID, c.name AS cName, " +
            "c.description AS cDesc, rm.reqNo AS rReqNo, rm.reqCode AS rReqCode, rm.comment AS rComment, rm.description AS rDescription, rm.name AS name, rm.reqResponsible AS reqResponsible " +
            "FROM Requirements AS r " +
            "INNER JOIN RequirementMetaData AS rm " +
            "ON r.ID = rm.RID " +
            "INNER JOIN ProjectRequirements AS pr " +
            "ON pr.RID = r.ID " +
            "INNER JOIN HasSubCategory AS hsc " +
            "ON r.ID = hsc.RID " +
            "INNER JOIN SubCategory AS sc " +
            "ON hsc.SID = sc.ID " +
            "INNER JOIN Category AS c " +
            "ON sc.catID = c.ID " +
            "WHERE pr.PID = ?"),
    GET_PROJECT_REQUREMENT("" +
            "SELECT * " +
            "FROM ProjectRequirements " +
            "WHERE PID = ? AND RID = ?"),
    INSERT_PROJECT_REQUIREMENT("INSERT INTO ProjectRequirements (PID, RID, reqNo, reqCode, comment, description) VALUES(?,?,?,?,?,?)"),
    UPDATE_PROJECT_REQUIREMENT("" +
            "UPDATE ProjectRequirements " +
            "SET " +
            "reqNo = ?, " +
            "reqCode = ?, " +
            "comment = ?, " +
            "description = ? " +
            "WHERE PID = ? AND RID = ?"),

    //TODO:Requirements can be public or not. Need different methods for these.



    /**
     * ==========================================================================================================================
     * ==========================================CATEGORY========================================================================
     * ==========================================================================================================================
     */

    GET_CATEGORIES("" + //TODO: Make it a list of Category Json objects that contain a list of SubCategory Json Objects.
            "SELECT c.ID AS categoryID, sc.ID AS subCategoryID, c.name AS categoryName, c.description AS categoryDescription, sc.name AS subCategoryName, sc.description AS subCategoryDescription " +
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
    INSERT_HAS_SUBCATEGORY("INSERT INTO HasSubCategory (RID, SID) VALUES (?,?)"),




    /**
     * ==========================================================================================================================
     * ==========================================PROJECT=========================================================================
     * ==========================================================================================================================
     */
    DELETE_PROJECT("" +
            "DELETE FROM Project WHERE ID = ? "),
    DELETE_PROJECT_METADATA("" +
            "DELETE FROM ProjectMetaData WHERE PID = ? "),
    DELETE_HAS_ACCESS_PROJECT("DELETE FROM HasAccess WHERE PID = ? "),
    DELETE_HAS_ACCESS_SINGLE("DELETE FROM HasAccess WHERE NAME = ? AND PID = ?"),
    DELETE_USER_HAS_ACCESS("DELETE FROM UserHasAccess WHERE USERNAME = ? AND PID = ?"),
    DELETE_PROJECT_REQUIREMENTS_BY_PID("DELETE FROM ProjectRequirements WHERE PID = ? "),

    GET_PROJECT_META_DATA("SELECT * FROM ProjectMetaData WHERE PID = ?"),

    PROJECT_EXISTS("SELECT count(1) as bool FROM Project WHERE ID = ?"),
    GET_PROJECT_BY_ID("SELECT *  FROM Project WHERE ID=?"),
    GET_PROJECTS_USER_IS_MANAGER("" +
            "SELECT p.* " +
            "FROM Project AS p " +
            "WHERE p.managerID = ? "),
    GET_PROJECTS_USER_IS_CREATOR("" +
            "SELECT p.* " +
            "FROM Project AS p " +
            "WHERE p.creatorID = ? "),
    GET_PROJECTS_ACCESSIBLE_BY_USER("" +
            "SELECT p.* " +
            "FROM Project AS p " +
            "LEFT JOIN HasAccess AS ha " +
            "ON ha.PID = p.ID " +
            "LEFT JOIN UserClass AS uc " +
            "ON uc.NAME = ha.NAME " +
            "LEFT JOIN UserHasClass AS uhc " +
            "ON uhc.NAME = uc.NAME " +
            "LEFT JOIN UserHasAccess AS uha " +
            "ON uha.PID = p.ID " +
            "WHERE uhc.USERNAME = ? OR uha.USERNAME = ? " +
            "GROUP BY p.ID"),
    GET_PUBLIC_PROJECTS("" +
            "SELECT * " +
            "FROM Project AS p " +
            "WHERE p.isPublic = 1 "),
    GET_USER_HAS_ACCESS("" +
            "SELECT count(1) as bool " +
            "FROM Project AS p " +
            "LEFT JOIN HasAccess AS ha " +
            "ON ha.PID = p.ID " +
            "LEFT JOIN UserHasAccess AS uha " +
            "ON uha.PID = p.ID " +
            "WHERE (ha.NAME = ? OR uha.USERNAME = ?) AND p.ID = ?"),
    UPDATE_PROJECT("" +
            "UPDATE Project " +
            "SET " +
            "managerID = ?, " +
            "name = ?, " +
            "description = ?, " +
            "isPublic = ?, " +
            "WHERE ID = ?"),

    UPDATE_PROJECT_META_DATA("" +
            "UPDATE ProjectMetaData " +
            "SET " +
            "securityLevel = ?, " +
            "transactionVolume = ?, " +
            "userChannel = ?, " +
            "deploymentStyle = ?, " +
            "WHERE PID = ?"),

    INSERT_PROJECT("INSERT INTO Project (managerID, creatorID, name, description, isPublic) VALUES(?,?,?,?,?)"),
    INSERT_PROJECT_META_DATA("INSERT INTO ProjectMetaData (PID, securityLevel, transactionVolume, userChannel, deploymentStyle) VALUES(?,?,?,?,?)"),
    INSERT_HAS_ACCESS("INSERT INTO HasAccess (NAME, PID) VALUES(?,?)"),
    INSERT_USER_HAS_ACCESS("INSERT INTO UserHasAccess (USERNAME, PID) VALUES(?,?)"),
    DELETE_PROJECT_REQUIREMENT_BY_RID_PID("" +
            "DELETE FROM ProjectRequirements " +
            "WHERE PID = ? AND RID = ?"),



    /**
     * ==========================================================================================================================
     * ================================================USER======================================================================
     * ==========================================================================================================================
     */

    INSERT_USER("INSERT INTO Users (firstName, lastName, email, USERNAME, pass) VALUES (?,?,?,?,?)"),
    GET_USER_CLASS_BY_USERNAME("" +
            "SELECT * " +
            "FROM UserClass AS uc " +
            "INNER JOIN UserHasClass AS uhc " +
            "ON uhc.NAME = uc.NAME " +
            "INNER JOIN Users AS u " +
            "ON u.USERNAME = uhc.USERNAME " +
            "WHERE u.USERNAME = ? "),
    GET_USER_BY_USERNAME("" +
            "SELECT u.USERNAME, u.firstName, u.lastName, uc.NAME AS ucName, uc.description AS ucDesc, u.email " +
            "FROM Users AS u " +
            "INNER JOIN UserHasClass AS uhc " +
            "ON u.USERNAME = uhc.USERNAME " +
            "INNER JOIN UserClass AS uc " +
            "ON uc.NAME = uhc.NAME " +
            "WHERE u.USERNAME=?"),
    GET_USER_WITH_PASS_BY_USERNAME("SELECT * FROM Users WHERE USERNAME=?"),
    GET_USER_CLASSES("SELECT * FROM UserClass"),
    GET_USERNAME_EXISTS("SELECT count(1) as bool FROM Users WHERE USERNAME=?"),
    GET_USERS("SELECT USERNAME, firstName, lastName, email FROM Users"),
    GET_USERS_WITH_CLASSES(
            "SELECT u.USERNAME, u.firstName, u.lastName, uc.NAME AS ucName, u.email " +
            "FROM Users AS u " +
            "INNER JOIN UserHasClass AS uhc " +
            "ON u.USERNAME = uhc.USERNAME " +
            "INNER JOIN UserClass AS uc " +
            "ON uc.NAME = uhc.NAME "
    ),
    UPDATE_USER("UPDATE Users SET USERNAME=?, firstName=?, lastName=?, email=? WHERE USERNAME=?"),
    UPDATE_USER_WITH_PASS("UPDATE Users SET USERNAME=?, firstName=?, lastName=?, email=?, pass=? WHERE USERNAME=?"),
    UPDATE_USER_CLASS("UPDATE UserHasClass SET USERNAME=?, NAME=? WHERE USERNAME=?"),
    INSERT_USER_CLASS("INSERT INTO UserHasClass (USERNAME, NAME) VALUES (?,?)"),

    GET_USERCLASS_EXISTS("SELECT count(1) as bool FROM UserClass WHERE NAME=?"),
    INSERT_USERCLASS("INSERT INTO UserClass (NAME, description) VALUES (?,?)"),
    UPDATE_USERCLASS("UPDATE UserClass SET NAME=?, description=? WHERE NAME=?"),
    UPDATE_CHANGE_USERHASCLASS_NAME("UPDATE UserHasClass SET NAME=? WHERE NAME=?"),
    DELETE_USERCLASS("DELETE FROM UserClass WHERE NAME=?");



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

    //TODO Errorhandling

    /**
     * Prepares a Statement for execution by the database, used for queries.
     * @param c Database Connection
     * @param objects Values needed to for the query. Usually Primary Key.
     * @return PreparedStatement. Ready for execution.
     * @throws SQLException
     */
    public PreparedStatement prepare(Connection c, Object... objects) throws SQLException {
        PreparedStatement ps = c.prepareStatement(statement);
        if (objects.length > 0) {
            for (int i = 1; i <= objects.length; i++) {
                ps.setObject(i, objects[i-1]);
            }
        }
        return ps;
    }

    /**
     * Uses the prepare method to prepare the statement for execution, then executes it and returns the result set.
     * @param c Database Connection
     * @param objects Values needed to for the query. Usually Primary Key.
     * @return ResultSet. The result set from the database.
     * @throws SQLException
     */
    public ResultSet prepareAndExecute(Connection c, Object... objects) throws SQLException {
        return prepare(c, objects).executeQuery();
    }

    public void prepareAndUpdate(Connection c, Object... objects) throws SQLException {
        prepare(c, objects).executeUpdate();
    }

    /**
     * Prepares and executes an INSERT or UPDATE statement.
     * Uses the prepareObject method to prepare the values to be inserted.
     * @param c Database Connection
     * @param objects Values to insert in to the database. String or int
     * @throws SQLException
     */
    public void prepareAndExecuteInsert(Connection c,  Object... objects) throws SQLException{
        PreparedStatement ps = c.prepareStatement(statement);
        if (objects.length > 0) {
            for (int i = 0; i < objects.length; i++) {
                prepareObject(ps, objects[i], i + 1);
            }
        }
        ps.executeUpdate();
    }

    /**
     * Prepares an object to be inserted in to the database. These are the actual values in the INSERT.
     * Checks whether the Object is an int or a String.
     * @param ps Prepared Statement
     * @param object Object. The value to be set in the statement.
     * @param index The index of the Object. Needed to keep the ordering for the statemnt.
     * @throws SQLException
     */
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

    @Deprecated //Dont think we need this one any more.
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
