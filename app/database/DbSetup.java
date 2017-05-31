package database;

import com.fasterxml.jackson.databind.JsonNode;
import play.db.Database;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.Connection;

/**
 * Created by Andreas on 26.05.2017.
 */

@Singleton
public class DbSetup {
    private QueryHandler qh;

    @Inject
    public DbSetup(Database db){
        this.qh = new QueryHandler(db);
        //THIS PART RUNS ON STARTUP
        JsonNode exists = qh.executeQuery(Statement.TABLE_EXISTS);
        //If there is no Users table (note it may be desireable to change what this looks for but Users should always be present)
        if(exists.get(0) == null){
            Connection c = db.getConnection();
            /*try {
                InputStream in = getClass().getResourceAsStream("test.sql");
                Statement.importSQL(c, in);
                //Statement.importSQL(c,in);
            }catch(Exception e){
                e.printStackTrace();
            }*/
            ScriptRunner runner = new ScriptRunner(c, false, false);
            try {
                String path = new File("").getAbsolutePath();
                //System.out.println(path);
                //NOTE the sql file exists in master but not in this branch (the actual running of the program was tested on the original private repo for the system
                path = path.concat("\\SQL\\prosjekt2SQL.sql");
                //System.out.println(path);
                //System.out.println("foo");
                runner.runScript(new BufferedReader(new FileReader(path)));
                //FileReader f = new FileReader("test.sql");
            } catch (Exception e) {
                //e.printStackTrace();
                System.out.println("bar");
            }
            //qh.executeUpdate(Statement.INSERT_REQUIREMENT);
        }
    }

    @Deprecated
    //Finds the string values of every table name in the database, can be used to check against expected.
    public void existenceCheck(){
        JsonNode a = qh.executeQuery(Statement.SHOW_TABLES);
        for(int i = 0; i < a.size(); i++){
            String value = a.get(i).fields().next().getValue().asText();
            System.out.println(value);
        }
    }
}
