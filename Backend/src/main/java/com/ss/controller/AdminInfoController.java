package com.ss.controller;

import com.ss.entity.UserInfo;
import com.ss.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class AdminInfoController {
    @Autowired
    private UserServiceImpl service;

    @PostMapping("/adminlogin")
    public ResponseEntity<UserInfo> loginUser(@RequestParam String email) {
        // Try to find the admin by email
        UserInfo admin = service.loginAdmin(email);

        // If admin not found, return 404 with an error message
        if (admin == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // If admin is found, return admin data with a 200 status
        return new ResponseEntity<>(admin, HttpStatus.OK);
    }
}
