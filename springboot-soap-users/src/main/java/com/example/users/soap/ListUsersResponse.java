package com.example.users.soap;

import com.example.users.model.User;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement(name = "ListUsersResponse")
public class ListUsersResponse {
    private List<User> users;

    @XmlElement(name = "user")
    public List<User> getUsers() { return users; }
    public void setUsers(List<User> users) { this.users = users; }
}
