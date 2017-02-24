package models;

/**
 * Created by andrfo on 16.02.2017.
 */
public class User {

    public String userid;
    public String firstname;
    public String lastname;
    public String password;
    public String email;
    public String username;

    @Override
    public String toString() {
        return "User{" +
                "userid='" + userid + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
