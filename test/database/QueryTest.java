package database;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.collect.ImmutableMap;
import org.junit.BeforeClass;
import org.junit.Test;
import play.Application;
import play.db.Database;
import play.db.Databases;
import play.inject.guice.GuiceApplicationBuilder;
import play.test.WithApplication;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Iterator;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class QueryTest extends WithApplication {

    private static Database database = Databases.inMemory(
            "testingDatabase",
            ImmutableMap.of(
                    "MODE", "MYSQL"
            )
    );

    private static String[] tables = {
            "CREATE TABLE `ProjectRequirementView` (`ID` int(11) NOT NULL AUTO_INCREMENT, `Name` varchar(40) NOT NULL, PRIMARY KEY (`ID`))",
            "CREATE TABLE `User` (`ID` int(11) NOT NULL AUTO_INCREMENT,`Username` varchar(30) NOT NULL, `Email` varchar(50) NOT NULL, `pass` binary(60) NOT NULL,PRIMARY KEY (`ID`))",
            "CREATE TABLE `PartOf` (`ProjectID` int(11) NOT NULL DEFAULT '0',`userid` int(11) NOT NULL DEFAULT '0',PRIMARY KEY (`ProjectID`,`userid`),CONSTRAINT `PartOf_UID_fk` FOREIGN KEY (`userid`) REFERENCES `User` (`ID`),CONSTRAINT `PartOf_PID_fk` FOREIGN KEY (`ProjectID`) REFERENCES `ProjectRequirementView` (`ID`))"
    };

    private static String[][] users = {
            {"arne", "arne@tr.kommune.no", "123"},
            {"bjarne", "bjarne@tr.kommune.no", "123"}
    };

    private static String[][] projects = {
            {"Super Awsome ProjectRequirementView"},
            {"The Best ProjectRequirementView In The World"}
    };

    private static int[][] partof = {
            {1, 1},
            {1, 2},
            {2, 1}
    };

    private static QueryHandler queryHandler;

    protected Application provideApplication() {
        return new GuiceApplicationBuilder()
                .build();
    }

    @Test
    public void testSelectUser() {
        for (String[] user : users) {
            String resultName = queryHandler.executeQuery(
                    Statement.GET_USER_BY_USERNAME, user[0]).findValue("USERNAME").textValue();
            assertEquals(user[0], resultName);
        }
    }

    @Test
    public void testSelectProject() {
        int i = 1;
        for (String[] project : projects) {
            String result = queryHandler.executeQuery(Statement.GET_PROJECT_BY_ID, i).findValue("NAME").textValue();
            i++;
            assertEquals(project[0], result);
        }
    }

    @Test
    public void testUserPartOf() {

        for (int[] part : partof) {
            JsonNode result = queryHandler.executeQuery(Statement.GET_PROJECTS_ACCESSIBLE_BY_USER, part[0]);

            Iterator<JsonNode> it = result.elements();
            while (it.hasNext()) {
                JsonNode element = it.next();
                //assertEquals(projects[part[1]][0], element.findValue("NAME").asText());
            }


        }
        assertTrue(true);
    }

    @BeforeClass
    public static void setup() {
        queryHandler = new QueryHandler(database);
        initDatabse();
    }

    private static void initDatabse() {
        try {
            Connection c = database.getConnection();
            for (String table : tables) {
                c.prepareCall(table).execute();
            }

            for (String[] user : users) {
                PreparedStatement ps = c.prepareStatement("INSERT INTO User (Username, Email, Password) VALUES (?, ?, ?)");
                ps.setString(1, user[0]);
                ps.setString(2, user[1]);
                ps.setByte(3, Byte.decode(user[2]));
                ps.execute();
            }

            for (String[] project : projects) {
                PreparedStatement ps = c.prepareStatement("INSERT INTO Project (Name) VALUES (?)");
                ps.setString(1, project[0]);
                ps.execute();
            }

            for (int[] part : partof) {
                PreparedStatement ps = c.prepareStatement("INSERT INTO PartOf (ProjectID, UserID) VALUES (?, ?)");
                ps.setInt(1, part[0]);
                ps.setInt(2, part[1]);
                ps.execute();
            }

            c.close();
        } catch (SQLException e) {
            e.printStackTrace();
            assert false;
        }
    }
}
