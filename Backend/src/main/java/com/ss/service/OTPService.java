package com.ss.service;

import com.ss.repository.OTPRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OTPService {
    @Autowired
    OTPRepo otpRepo;
    public String getOtp(){
        return otpRepo.getOtp();
    }
}
