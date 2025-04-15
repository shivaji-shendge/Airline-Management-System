package com.ss.repository;

import com.ss.entity.UserInfo;

public interface UserInfoRepo {
    String  registerUser(UserInfo user);
    UserInfo  loginUser(String email);
}
