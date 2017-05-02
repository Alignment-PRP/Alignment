package controllers;

import javax.inject.Inject;

import com.fasterxml.jackson.databind.JsonNode;
import database.Statement;
import play.libs.Json;
import play.db.Database;

import database.QueryHandler;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.*;

/**
 * Created by Andreas on 05.03.2017.
 */
public class AdminController extends Controller {

    private QueryHandler qh;
    private List<String> structures;
    @Inject //Injects the database object generated from the config file
    public AdminController(Database db){
        this.qh = new QueryHandler(db);
        this.structures = new ArrayList<String>();
        structures.add("source");
        structures.add("stimulus");
        structures.add("artifact");
        structures.add("response");
        structures.add("responsemeasure");
        structures.add("environment");
    }


    //================================  ADD REQUIREMENT ===================================================

    /**
     * Inserts into the Structure table
     * @param type String one of [Source, Stimulus, Artifact,...]
     * @param content the associated text.
     * @return Response 200 OK wiht body "Structure added"
     */
    public Result insertStructure(String type, String content){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        qh.insertStatement(Statement.INSERT_REQUIREMENT_STRUCTURE, type , content);
        return ok("Structure added");
    }
    private String insertStructureWithReturnID(String type, String content){
        return qh.insertStatementWithReturnID(Statement.INSERT_REQUIREMENT_STRUCTURE, type , content);
    }

    /**
     * Inserts into the relational table HasStructure
     * @param rid requirementID
     * @param sid structureID
     */
    private void insertHasStructure(int rid, int sid){
        qh.insertStatement(Statement.INSERT_REQUIREMENT_HAS_STRUCTURE, rid, sid);
    }

    /**
     * A form for testing
     * @return 200 OK with a body cointaining the form to add a requirement
     */
    public Result addRequirement(){
        return ok(views.html.addReq.render());
    }

    /**
     * Inserts a GlobalRequirement into the database along with the structure and the metadata
     * @return 200 OK or 401 Unauthorized
     */
    public Result addReq(){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        //TODO: Validate user class

        //Converts the POST data to a map
        final JsonNode values = request().body().asJson();

        //Gets the meta data values
        int subCatID = Integer.parseInt(values.get("scID").asText());
        String description = values.get("description").asText();
        String reqCode = values.get("reqCode").asText();
        String reqNo = values.get("reqNo").asText();
        String name = values.get("name").asText();
        String reqResponsible;
        String comment;
        try{
            reqResponsible = values.get("reqResponsible").asText();
        }
        catch (NullPointerException e){
            reqResponsible = userID;
        }
        try{
            comment = values.get("comment").asText();
        }
        catch (NullPointerException e){
            comment = "-";
        }
        //TODO determine and create correct validation for requirements
        //validateReq(source, stimulus, artifact, response, responsemeasure, environment);


        //TODO determine if private global reqs are a thing
        //Checks if isPublic
        int pub;
        if(values.get("public") != null){
            pub = 1;
        }
        else {
            pub = 0;
        }

        //Inserts a new requirement and returns the requirement ID.
        int ID = Integer.parseInt(qh.insertStatementWithReturnID(Statement.INSERT_REQUIREMENT));

        //Inserts a new row in RequirementMetaData using the requirement ID as PK
        qh.insertStatement(Statement.INSERT_REQUIREMENT_META_DATA, ID, reqResponsible, description, comment, reqCode, reqNo, name);

        qh.insertStatement(Statement.INSERT_HAS_SUBCATEGORY, ID, subCatID);

        //Inserts all the structures
        for (JsonNode structure: values.get("structure")){

            if(structure.has("id")){
                insertHasStructure(ID, structure.get("id").asInt());
            }
            else if(structure.has("content")){
                String SID = insertStructureWithReturnID(structure.get("type").asText(), structure.get("content").asText());
                insertHasStructure(ID, Integer.parseInt(SID));

            }
        }
        return ok(getGlobalRequirementById(ID));
    }

    private JsonNode getGlobalRequirementById(int id) {
        Map<String, Object> requirementMap = new HashMap<>();
        JsonNode requirement = qh.executeQuery(Statement.GET_GLOBAL_REQUIREMENT_BY_ID, id);
        JsonNode requirementsStructure = qh.executeQuery(Statement.GET_REQUIREMENT_STRUCTURES);
        for (JsonNode r:
                requirement) {

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
                requirementsStructure) {
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

        return Json.toJson(requirementMap);
    }

    private boolean validateReq(String source, String stimulus, String artifact, String response, String responsemeasure, String environment){
        //TODO
        return true;
    }

    public Result getRequirementUsage(){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        return ok(qh.executeQuery(Statement.GET_PROJECTS_PER_REQUIREMENT));
    }
    //==================================== GET REQUIREMENT ===================================================

    /**
     * A method to get all the global requirements with the accompanying Structures
     * @return 200 OK or 401 Unauthorized
     * If 200 OK, the body contains all global requirements with metadata and category
     * TODO: Get structure as well?
     */
    public Result getReq(){
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

    //==================================== UPDATE REQUIREMENT ================================================

    /**
     * A form for testing input
     * @return 200 OK with a form for updating a requirement as body
     */
    public Result updateReq(){
        return ok(views.html.updateReq.render());
    }

    /**
     * Updates an existing global requirement with new data.
     * @return
     */
    public Result updateRequirement(){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        //TODO: Validate user class

        //Gets the POST data as Json
        final JsonNode values = request().body().asJson();


        //Gets the meta data values
        int ID = values.get("ID").asInt();
        int subCatID = Integer.parseInt(values.get("scID").asText());
        String description = values.get("description").asText();
        String comment = values.get("comment").asText();
        String reqCode = values.get("reqCode").asText();
        String reqNo = values.get("reqNo").asText();
        String name = values.get("name").asText();
        String reqResponsible;
        try{
            reqResponsible = values.get("reqResponsible").asText();
        }
        catch (NullPointerException e){
            reqResponsible = userID;
        }
        //TODO determine and create correct validation for requirements
        //validateReq(source, stimulus, artifact, response, responsemeasure, environment);


        //TODO determine if private global reqs are a thing
        //Checks if isPublic
        int pub;
        if(values.get("public") != null){
            pub = 1;
        }
        else {
            pub = 0;
        }
        JsonNode req = qh.executeQuery(Statement.GET_GLOBAL_REQUIREMENT_BY_ID, ID);
        int scID = req.get(0).get("scID").asInt();
        //Checks if the subcategory has been changed, if so delete the old and insert the new.
        if(subCatID != scID){
            qh.executeUpdate(Statement.DELETE_HAS_SUB_CATEGORY, ID);
            qh.insertStatement(Statement.INSERT_HAS_SUBCATEGORY, ID, subCatID);
        }
        //Inserts a new row in RequirementMetaData using the requirement ID as PK
        qh.insertStatement(Statement.UPDATE_REQUIREMENT_META_DATA, reqResponsible, description, comment, reqCode, reqNo, name, ID);

        //Deletes all the HAS structure relations for this requirement
        qh.executeUpdate(Statement.DELETE_HAS_STRUCTURE, ID);

        //Inserts all the structures
        for (JsonNode structure: values.get("structure")){

            if(structure.has("id")){
                insertHasStructure(ID, structure.get("id").asInt());
            }
            else if(structure.has("content")){
                String SID = insertStructureWithReturnID(structure.get("type").asText(), structure.get("content").asText());
                insertHasStructure(ID, Integer.parseInt(SID));

            }
        }

        req = qh.executeQuery(Statement.GET_GLOBAL_REQUIREMENT_BY_ID, ID).get(0);








        return ok(getGlobalRequirementById(ID));


    }


    //================================ CREATE CATEGORY ================================================

    public Result addCategory(){
        return( ok(views.html.addCategroy.render()));
    }
/*
    public Result createCategory(){
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        String name = values.get("name")[0];
        if(qh.executeQuery(Statement.CATEGORY_NAME_EXISTS, name).get(0).get("bool").asInt() == 1){
            return unauthorized("category name is allready taken do you wish to update it instead?");
        }
        String description = values.get("description")[0];

        qh.insertStatement(Statement.INSERT_CATEGORY, name, description);

        return ok();
    }
*/
    //=========================== ADD SUBCATEGORY =======================================

    /**
     *
     * @return
     */
    public Result addSubcategory(){
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        String parent = values.get("parent")[0];
        String child = values.get("child")[0];
        //note: this should also cover the case of parent = child (returns 1 but not 2)
        JsonNode exists = qh.executeQuery(Statement.CATEGORY_EXISTS);
        System.out.println(exists);
        if(exists.get(0).get("bool").asInt() != 2){
            return unauthorized("one or more of the selected categories do not exist");
        }
        qh.addTableRelation(Statement.INSERT_SUBCATEGORY, Integer.parseInt(parent), Integer.parseInt(child));
        return ok("new parent/child relationship established");
    }

    //================================= ADD CATEGORY TO (GLOBAL) REQUIREMENT ==========================================

    public Result insertRequirementCategory(){
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        int requirement = Integer.parseInt(values.get("requirementid")[0]);
        int category = Integer.parseInt(values.get("categoryid")[0]);

        int reqExists = qh.executeQuery(Statement.REQUIREMENT_EXISTS, requirement).get(0).get("bool").asInt();
        int categoryExists = qh.executeQuery(Statement.CATEGORY_EXISTS, category).get(0).get("bool").asInt();
        System.out.println(reqExists);
        System.out.println(categoryExists);

        if(reqExists == 1 && categoryExists == 1){
            qh.addTableRelation(Statement.INSERT_CATEGORY, requirement, category);
            return ok("added requirementCategory");
        }
        return unauthorized("category or requirement does not exist");
    }

    public Result addCategeroyToRequirement(){
        return ok(views.html.addRequirementCategory.render());
    }

    //================================ DELETE =======================================

    public Result deleteRequirement(){
        //Check if user is logged in
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        final JsonNode values = request().body().asJson();
        Integer RID = values.get("RID").asInt();

        JsonNode userClass = qh.executeQuery(Statement.GET_USER_CLASS_BY_USERNAME, userID);
        String className = userClass.get(0).get("NAME").asText();

        //Checks if the connected user has permission to delete
        if(!className.equals("Admin")){
            return unauthorized("You do not have permission to delete requirements.");
        }

        qh.executeUpdate(Statement.DELETE_HAS_STRUCTURE, RID);
        qh.executeUpdate(Statement.DELETE_REQUIREMENT_METADATA, RID);
        qh.executeUpdate(Statement.DELETE_HAS_SUB_CATEGORY, RID);
        qh.executeUpdate(Statement.DELETE_PROJECT_REQUIREMENTS_BY_RID, RID);//TODO: This is unfortunate.
        qh.executeUpdate(Statement.DELETE_GLOBAL_REQUIREMENT, RID);


        return ok("Global Requirement and all related data deleted");
    }

    /*public Result deleteProjects(){
        return ok(views.html.deleteProject.render());
    }

    public Result deleteProject(){
        //SERIOUSLY BE CAREFULL WITH THIS SHIT LATER
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        int id = Integer.parseInt(values.get("id")[0]);
        qh.deleteProject(Statement.DELETE_PROJECT, id);
        return ok();
    }*/

}