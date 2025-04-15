package com.ss.entity;

public class UserInfo {
    private int id;
    private String name;
    private String email;
    private String contact;
    private String gender;
    private String password;

    public UserInfo(int id, String name, String email, String contact, String gender, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.gender = gender;
        this.password=password;
    }

    public UserInfo() {
        super();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
