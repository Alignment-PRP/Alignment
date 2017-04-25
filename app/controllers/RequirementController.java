package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import database.Statement;
import play.db.Database;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import static play.mvc.Results.ok;
import javax.inject.Inject;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Kim Erling on 02.03.2017.
 */
public class RequirementController extends Controller{
    private QueryHandler qh;

    @Inject
    public RequirementController(Database db) {
        this.qh = new QueryHandler(db);
    }


    /**
     * Gets The requirements that are a part of the specified category.
     * @param id: String. The ID of the category
     * @return 200 OK, or 401 Unauthorized.
     * If 200 OK, The body contains the Relevant requirements and accompanying MetaData and Structure.
     */
    public Result getRequirementsByCategoryID(String id){
        int categoryid = Integer.parseInt(id);
        //Checks if the user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        return ok(qh.executeQuery(Statement.GET_REQUIREMENTS_BY_CATEGORY_ID,categoryid));
    }


    /**
     * Gets all the Global Requirements. These are the ones that only the admin can edit and create.
     * For now any one can read them.
     * @return 200 OK, or 401 Unauthorized.
     * If 200 OK, The body contains the Relevant requirements and accompanying MetaData and Structure.
     */
    public Result getGlobalRequirements(){
        //Checks if the user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        Map<String, Object> requirementMap = new HashMap<>();
        JsonNode req = qh.executeQuery(Statement.GET_GLOBAL_REQUIREMENTS);
        for (JsonNode r:
                req) {
            requirementMap.put(r.get("RID").asText(), r);
        }
        return ok(Json.toJson(requirementMap));
    }



    /**
     * Returns a HTML form to insert a requirement. For testing.
     * @return 200 OK  with the form as body.
     */
    public Result getNewRequirementView(){
        return ok(views.html.newrequirement.render());
    }

//==================================================================== GET CATEGORY ================================================================================================================



    /**
     * Gets all the category names and IDs.
     * @return 200 OK, or 401 Unauthorized.
     */
    public Result getCategories() {
        //Checks if the user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        List<Map<String, Object>> categoryList = new ArrayList<>();
        JsonNode categoryData = qh.executeQuery(Statement.GET_CATEGORIES);
        Map<String, Integer> keyMaping = new HashMap<>();
        for(int i = 0; i < categoryData.size(); i++){
            JsonNode content = categoryData.get(i);
            String categoryID = content.get("categoryID").asText();
            if(! keyMaping.containsKey(categoryID)){
                //Make a class object with a couple of strings and a list instead?? and have Map<String, newClassThingy> mainCat = new HashMap<>();
                Map<String, Object> mainCat = new HashMap<>();
                mainCat.put("id", categoryID);
                mainCat.put("name", content.get("categoryName").asText());
                List subcatList = new ArrayList<>();
                Map<String, String> subcategory = new HashMap<>();
                subcategory.put("subcategoryID", content.get("subCategoryID").asText());
                subcategory.put("subcategoryName", content.get("subCategoryName").asText());
                subcatList.add(subcategory);
                mainCat.put("subcategories", subcatList);
                categoryList.add(mainCat);
                keyMaping.put(categoryID, categoryList.size()-1);
            }
            else{
                //should be a list but the cast is required due ot the "Object" definition to have a multi type list
                List subcategories = (List) categoryList.get(keyMaping.get(categoryID)).get("subcategories");
                Map<String, String> subcategory = new HashMap<>();
                subcategory.put("subcategoryID", content.get("subCategoryID").asText());
                subcategory.put("subcategoryName", content.get("subCategoryName").asText());
                subcategories.add(subcategory);
            }
        }
        return ok(Json.toJson(categoryList));

    }

    /*
        //Checks if the user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        JsonNode req = qh.executeQuery(Statement.GET_CATEGORY_NAMES);
        return ok(req);
    }*/


    @Deprecated //need to use ID to get categories now.
    public Result getRequirementsByCategoryName(String name){
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //Returns and 200 OK with a JsonNode as Body.
        //JsonNode req = qh.getRequirementByCategoryName(name);
        JsonNode req = qh.executeQuery(Statement.GET_REQUIREMENTS_BY_CATEGORY_ID,name);
        return ok(req);
    }

    public Result getStructureTypes(){
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        Map<String, Object> structuresMap = new HashMap<>();
        List<String> typeList = new ArrayList<>();
        JsonNode types = qh.executeQuery(Statement.GET_STRUCTURE_TYPES);

        for (JsonNode n:
             types) {
            typeList.add(n.get("type").asText());
        }
        structuresMap.put("types", typeList);
        return ok(Json.toJson(structuresMap));
    }
}


