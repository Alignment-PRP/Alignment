package models;

public class UserClass {

    public String NAME;
    public String description;
    public String oldNAME = "";
    public String replacement = "";

    public boolean isNameEqual() {
        return oldNAME.equals(NAME);
    }

}
