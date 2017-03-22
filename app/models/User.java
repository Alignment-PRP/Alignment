package models;

/**
 * Created by andrfo on 16.02.2017.
 */
public class User {

    public String firstName;
    public String lastName;
    public String pass;
    public String email;
    public String USERNAME;

    @Override
    public String toString() {
        return "User{" +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", pass='" + pass + '\'' +
                ", email='" + email + '\'' +
                ", USERNAME='" + USERNAME + '\'' +
                '}';
    }
}
