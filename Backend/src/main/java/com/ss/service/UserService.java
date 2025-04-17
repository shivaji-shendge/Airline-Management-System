package com.ss.service;

import com.ss.entity.AdminInfo;
import com.ss.entity.UserInfo;

public interface UserService {
    String  registerUser(UserInfo user);
    String  updateUser(UserInfo user);
    UserInfo  loginUser(String email);
    AdminInfo loginAdmin(String email);

}
