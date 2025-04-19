package com.ss.repository;

import com.ss.entity.UserInfo;

import java.util.List;

public interface UserInfoRepo {
    String  registerUser(UserInfo user);
    String  updateUser(UserInfo user);
    UserInfo  loginUser(String email);
    public List<UserInfo> getAllUser();


}
