package com.example.users.soap;

import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "AddUserRequest")
public class AddUserRequest {
    private String name;
    private String email;

    @XmlElement
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    @XmlElement
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
