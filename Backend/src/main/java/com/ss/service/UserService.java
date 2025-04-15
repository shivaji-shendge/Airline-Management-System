package com.ss.service;

import com.ss.entity.UserInfo;

public interface UserService {
    String  registerUser(UserInfo user);
    UserInfo  loginUser(String email);
}
