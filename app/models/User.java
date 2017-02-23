package models;

import java.util.ArrayList;

/**
 * Created by andrfo on 16.02.2017.
 */
public class User {

    private final Long ID;
    private String firstName;
    private String sirName;
    private ArrayList<String> emails;
    private String userName;

    public User(Long ID, String firstName, String sirName, String email, String userName) {
        this.ID = ID;
        this.firstName = firstName;
        this.sirName = sirName;
        this.emails = emails;
        this.userName = userName;

    }

    public Long getID() {
        return ID;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getSirName() {
        return sirName;
    }

    public ArrayList<String> getEmail() {
        return emails;
    }

    public String getUserName() {
        return userName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setSirName(String sirName) {
        this.sirName = sirName;
    }

    public void setEmails(ArrayList<String> emails) {
        this.emails = emails;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
