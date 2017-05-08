package controllers;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Iterator;

import database.QueryHandler;
import play.libs.Json;
import play.mvc.Controller;
import play.db.Database;
import database.Statement;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.concurrent.TimeUnit;

public class AccessController extends Controller{

    //Used to determine if querying db for rights is needed again (note 0L = 1970)
    private long lastRefresh = 0L;
    private long timeout = 10;
    //private JsonNode userRights;
    private List<Map<String, String>> userRights = new ArrayList<>();
    private QueryHandler qh;

    @Inject
    public AccessController(Database db){
        this.qh = new QueryHandler(db);
    }

    //TODO Find a sensible location for this
    //============================================================================================ RIGHTS MANAGEMENT ===============================================================================================
    //note will need to update references to point to "qh.[insert function](Statement.[name], Object)" when moved
    //TODO determine if every function can be accessed based soley on one right (for now assume yes)
    public boolean checkRights(String right){
        updateRights();
        for(Map<String, String> element : userRights){
            if(element.get("name").equals(right)){
                return true;
            }
        }
        return false;
    }

    public void updateRights(){
        String username = session().get("connected");
        long now = System.nanoTime();
        long diff = now-lastRefresh;
        diff = TimeUnit.NANOSECONDS.toMinutes(diff);//toMillis(diff);
        //if there's been 10min since last refresh
        if(diff > timeout){
            //Store these for later use, query db if this is more than 10min outdated only (change time?)
            //this.userRights = qh.executeQuery(Statement.GET_USERCLASS_RIGHTS, className);
            JsonNode rights = qh.executeQuery(Statement.GET_USER_RIGHTS, username);
            Iterator<Map.Entry<String,JsonNode>> fields = rights.get(0).fields();
            List<Map<String, String>> output = new ArrayList<>();
            while(fields.hasNext()){
                Map<String, String> right = new HashMap<>();
                Map.Entry<String, JsonNode> recieved = fields.next();
                right.put(recieved.getKey(),recieved.getValue().asText());
                output.add(right);
            }
            this.userRights = output;
            this.lastRefresh = now;
        }
    }

    public Result test(){
        long now = System.nanoTime();
        long diff = now-lastRefresh;
        diff = TimeUnit.NANOSECONDS.toMinutes(diff);
        System.out.println(diff);
        forceUpdateRights();
        //return ok(Json.toJson(this.userRights));
        return ok(Json.toJson(checkRights("AdminPanel")));
       //return ok(Json.toJson(diff));
    }

    public void forceUpdateRights(){
        //added so a user can force the client to update their rights in case they know their rights will change.
        String username = session().get("connected");
        System.out.println(username);
        //Store these for later use, query db if this is more than 10min outdated only (change time?)
        //this.userRights = qh.executeQuery(Statement.GET_USERCLASS_RIGHTS, className);
        JsonNode rights = qh.executeQuery(Statement.GET_USER_RIGHTS, username);
        System.out.println(rights);
        Iterator<Map.Entry<String,JsonNode>> fields = rights.get(0).fields();
        List<Map<String, String>> output = new ArrayList<>();
        while(fields.hasNext()){
            Map<String, String> right = new HashMap<>();
            Map.Entry<String, JsonNode> recieved = fields.next();
            right.put(recieved.getKey(),recieved.getValue().asText());
            output.add(right);
        }
        this.userRights = output;
        this.lastRefresh = System.nanoTime();
    }
}
