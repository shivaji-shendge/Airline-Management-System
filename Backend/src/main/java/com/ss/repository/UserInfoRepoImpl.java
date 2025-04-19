package com.ss.repository;

import com.ss.entity.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

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
                    user.setUid(rs.getInt("uid"));
                    user.setName(rs.getString("name"));
                    user.setEmail(rs.getString("email"));
                    user.setContact(rs.getString("contact"));
                    user.setGender(rs.getString("gender"));
                    user.setAge(rs.getInt("age"));
                    int val=rs.getInt("role");
                    if(val==1){
                        user.setRole("admin");
                    }
                    else {
                        user.setRole("user");
                    }
                    System.out.println("User Found");
                    return user;
                }
            }, email);
        } catch (Exception e) {
            System.out.println("User Found");
            return null;
        }
    }
    @Override
    public List<UserInfo> getAllUser() {
        try {
            String query = "select * from userInfo where role=2";
            System.out.println("Inside get all users repository");
            return template.query(query, new BeanPropertyRowMapper<>(UserInfo.class));
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }


}
