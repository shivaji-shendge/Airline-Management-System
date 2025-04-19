package com.ss.entity;

public class UserInfo {
    private int uid;
    private String name;
    private String email;
    private String contact;
    private String gender;
    private int age;
    private String role;



    public UserInfo(int uid, String name, String email, String contact, String gender, int age,String role) {
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.gender = gender;
        this.age=age;
        this.role=role;
    }

    public UserInfo() {
        super();
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }


}
