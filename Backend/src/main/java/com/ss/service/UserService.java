package com.ss.service;

import com.ss.entity.UserInfo;

import java.util.List;

public interface UserService {
    String  registerUser(UserInfo user);
    String  updateUser(UserInfo user);
    UserInfo  loginUser(String email);
    public List<UserInfo> getAllUser();

}
