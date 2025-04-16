package com.ss.controller;

import com.ss.entity.UserInfo;
import com.ss.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class UserInfoController {
    @Autowired
    private UserServiceImpl service;

    @PostMapping("/register")
    public String registerUser(@RequestBody UserInfo user){
        return service.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<UserInfo> loginUser(@RequestParam String email) {
        // Try to find user by email
        UserInfo user = service.loginUser(email);

        // If user is not found, return 404 with an error message
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // If user is found, return the user data with a 200 status
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/update-profile")
    public String updateUser(@RequestBody UserInfo user){
        return service.updateUser(user);
    }
}
