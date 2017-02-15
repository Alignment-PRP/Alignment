package database;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.collect.ImmutableMap;
import org.junit.Before;
import org.junit.Test;
import play.Application;
import play.db.Database;
import play.db.Databases;
import play.inject.guice.GuiceApplicationBuilder;
import play.libs.Json;
import play.test.WithApplication;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertTrue;

public class QueryTest extends WithApplication {

  Database database = Databases.inMemory(
          "testingDatabase",
          ImmutableMap.of(
                  "MODE", "MYSQL"
          )
  );

  protected Application provideApplication() {
    return new GuiceApplicationBuilder()
            .build();
  }

  @Test
  public void something() {
    try {
      Connection c = database.getConnection();
      ResultSet rs = c.prepareCall("SELECT * FROM User WHERE username='arne'").executeQuery();

      System.out.println(resultSetToJson(rs));
    } catch (SQLException e) {
      e.printStackTrace();
      assertTrue(false);
    }
    assertTrue(true);
  }

  @Before
  public void setup() {
    try {
      Connection c = database.getConnection();
      c.prepareCall("CREATE TABLE `User` (\n" +
              "  `ID` int(11) NOT NULL AUTO_INCREMENT,\n" +
              "  `Username` varchar(30) NOT NULL,\n" +
              "  `Email` varchar(50) NOT NULL,\n" +
              "  `Password` binary(60) NOT NULL,\n" +
              "  PRIMARY KEY (`ID`)\n" +
              ")").execute();

      c.prepareCall("INSERT INTO User (Username, Email, Password) VALUES ('arne', 'arne@tr.kommune.no', 0x123)").execute();
      c.close();
    } catch (SQLException e) {
      e.printStackTrace();
      assert false;
    }
  }

  private JsonNode resultSetToJson(ResultSet rs) {
    List<Map<String, String>> list = new ArrayList<>();
    try {
      while (rs.next()) {
        Map<String, String> map = new HashMap<>();
        for (int i = 1; i<= rs.getMetaData().getColumnCount(); i++) {
          String k = rs.getMetaData().getColumnName(i);
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

}
