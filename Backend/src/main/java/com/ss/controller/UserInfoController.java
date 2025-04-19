package com.ss.controller;

import com.ss.entity.UserInfo;

import com.ss.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserInfoController {

    @Autowired
    private UserServiceImpl service;


    @PostMapping("/register")
    public String registerUser(@RequestBody UserInfo user){
        return service.registerUser(user);
    }

    @GetMapping("/getAllUsers")
    public List<UserInfo> getAllUser(){
        System.out.println("Get all user api called");
        return service.getAllUser();
    }

    @PutMapping("/update-profile")
    public String updateUser(@RequestBody UserInfo user){
        return service.updateUser(user);
    }

}