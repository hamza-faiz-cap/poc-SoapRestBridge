package com.example.users.soap;

import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "AddUserResponse")
public class AddUserResponse {
    private Long id;
    private String name;
    private String email;

    @XmlElement
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    @XmlElement
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    @XmlElement
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
