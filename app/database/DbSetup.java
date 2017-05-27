package database;

import com.fasterxml.jackson.databind.JsonNode;
import play.db.Database;

import javax.inject.Inject;
import javax.inject.Singleton;

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
