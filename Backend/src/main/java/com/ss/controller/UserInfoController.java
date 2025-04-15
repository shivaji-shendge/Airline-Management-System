package com.ss.controller;

import com.ss.entity.UserInfo;
import com.ss.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
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
    public UserInfo loginUser(@RequestParam String email) {
        return service.loginUser(email);
    }

}
