package com.ss.repository;

import com.ss.entity.AdminInfo;
import com.ss.entity.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class UserInfoRepoImpl implements  UserInfoRepo{
    @Autowired
    JdbcTemplate template;
    @Override
    public String registerUser(UserInfo user) {
        String query="insert into UserInfo (name,email,contact,gender,age) values (?,?,?,?,?)";
        int value=template.update(query,user.getName(),user.getEmail(),user.getContact(),user.getGender(),user.getAge());
        return value != 0 ? "User Registered successfully" : "Some problem to register user";
    }
    @Override
    public String updateUser(UserInfo user) {
        String query = "UPDATE UserInfo SET name = ?, contact = ?, gender = ?, age = ? WHERE email = ?";
        int value = template.update(query, user.getName(), user.getContact(), user.getGender(), user.getAge(), user.getEmail());
        return value != 0 ? "Profile Updated successfully" : "Some problem to Update Profile";
    }

    public UserInfo loginUser(String email) {
        String query = "SELECT * FROM UserInfo WHERE email = ?";
        try {
            return template.queryForObject(query, new RowMapper<UserInfo>() {
                @Override
                public UserInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
                    UserInfo user = new UserInfo();
                    user.setId(rs.getInt("uid"));
                    user.setName(rs.getString("name"));
                    user.setEmail(rs.getString("email"));
                    user.setContact(rs.getString("contact"));
                    user.setGender(rs.getString("gender"));
                    user.setAge(rs.getInt("age"));
                    return user;
                }
            }, email);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public AdminInfo loginAdmin(String email) {
        String query = "SELECT * FROM admininfo WHERE email = ?";
        try {
            return template.queryForObject(query, new RowMapper<AdminInfo>() {
                @Override
                public AdminInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
                    AdminInfo admin = new AdminInfo();
                    admin.setName(rs.getString("name"));
                    admin.setEmail(rs.getString("email"));
                    admin.setContact(rs.getString("contact"));
                    admin.setGender(rs.getString("gender"));
                    admin.setAge(rs.getInt("age"));
                    return admin;
                }
        }, email);
        } catch (Exception e) {
            return null;  // Return null if no matching admin is found
        }
    }


}
