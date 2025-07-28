package com.example.users.soap;

import com.example.users.model.User;
import com.example.users.service.UserService;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import java.util.List;

@Endpoint
public class UserEndpoint {
    private static final String NAMESPACE_URI = "http://example.com/users";
    private final UserService userService;

    public UserEndpoint(UserService userService) {
        this.userService = userService;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "AddUserRequest")
    @ResponsePayload
    public AddUserResponse addUser(@RequestPayload AddUserRequest request) {
        User user = userService.addUser(request.getName(), request.getEmail());
        AddUserResponse response = new AddUserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "ListUsersRequest")
    @ResponsePayload
    public ListUsersResponse listUsers(@RequestPayload ListUsersRequest request) {
        List<User> users = userService.listUsers();
        ListUsersResponse response = new ListUsersResponse();
        response.setUsers(users);
        return response;
    }
}
