package com.ss.entity;

public class AdminInfo {
    private String name;
    private String email;
    private String contact;
    private String gender;
    private int age;

    public AdminInfo(String name, String email, String contact, String gender, int age) {
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.gender = gender;
        this.age = age;
    }

    public AdminInfo() {
        super();
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

    @Override
    public String toString() {
        return "AdminInfo{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", contact='" + contact + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                '}';
    }
}
