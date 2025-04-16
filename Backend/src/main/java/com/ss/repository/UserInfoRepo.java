package com.ss.repository;

import com.ss.entity.UserInfo;

public interface UserInfoRepo {
    String  registerUser(UserInfo user);
    String  updateUser(UserInfo user);
    UserInfo  loginUser(String email);
    UserInfo  loginAdmin(String email);

}
