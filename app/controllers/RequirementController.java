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
import java.util.*;

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
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        //TODO: validate user is admin (ADMIN DOESN'T EXIST YET)
        Map<String, Object> requirementMap = new HashMap<>();
        JsonNode requirements = qh.executeQuery(Statement.GET_GLOBAL_REQUIREMENTS);
        JsonNode requirementsStructures = qh.executeQuery(Statement.GET_REQUIREMENTS_STRUCTURES);
        for (JsonNode r:
                requirements) {

            Map<String, Object> requirementSingle = new HashMap<>();
            Iterator<Map.Entry<String, JsonNode>> fields = r.fields();

            while(fields.hasNext()){
                Map.Entry<String, JsonNode> n = fields.next();

                requirementSingle.put(n.getKey(), n.getValue());
            }
            List<Map<String, Object>> structs = new ArrayList<>();


            requirementSingle.put("structures", structs);

            requirementMap.put(r.get("RID").asText(), requirementSingle);
        }
        for (JsonNode struct :
                requirementsStructures) {
            String RID = struct.get("RID").asText();
            Map r = (HashMap<String, Object>)requirementMap.get(RID);
            List<Map<String, Object>> str = (List<Map<String, Object>>)r.get("structures");

            Iterator<Map.Entry<String, JsonNode>> fields = struct.fields();
            Map<String, Object> s = new HashMap<>();
            while(fields.hasNext()){
                Map.Entry<String, JsonNode> n = fields.next();
                s.put(n.getKey(), n.getValue());
            }
            str.add(s);

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

        final JsonNode types = qh.executeQuery(Statement.GET_STRUCTURE_TYPES);
        final List<String> typeList = new ArrayList<>();

        for (JsonNode node : types) {
            typeList.add(node.get("type").asText());
        }
        return ok(Json.toJson(typeList));
    }

    public Result getStructures(){
        JsonNode structures = qh.executeQuery(Statement.GET_STRUCTURES);
        //List<Map<String, List>> structureList = new ArrayList<>();
        Map<String, List> types = new HashMap<>();
        for(int i = 0; i < structures.size(); i++){
            JsonNode content = structures.get(i);
            String type = content.get("type").asText();
            Map<String, String> instanceContent = new HashMap<>();
            instanceContent.put("ID", content.get("ID").asText());
            instanceContent.put("content", content.get("content").asText());
            if(! types.containsKey(type)){
                List<Map> instances = new ArrayList<>();
                instances.add(instanceContent);
                types.put(type, instances);
            }
            else{
                List<Map> instances = types.get(type);
                instances.add(instanceContent);
            }
        }
        return ok(Json.toJson(types));
    }

}


