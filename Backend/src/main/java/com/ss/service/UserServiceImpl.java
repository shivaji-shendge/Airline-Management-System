package com.ss.service;

import com.ss.entity.UserInfo;
import com.ss.repository.UserInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserInfoRepo repo;

    @Override
    public String registerUser(UserInfo user) {
        return repo.registerUser(user);
    }

    @Override
    public String updateUser(UserInfo user) {
        return repo.updateUser(user);
    }

    @Override
    public UserInfo loginUser(String email) {
        return repo.loginUser(email);
    }

    @Override
    public UserInfo loginAdmin(String email) {
        return repo.loginAdmin(email);
    }
}
