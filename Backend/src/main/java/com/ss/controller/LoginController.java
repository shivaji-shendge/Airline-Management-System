package com.ss.controller;

import com.ss.entity.UserInfo;
import com.ss.service.EmailService;
import com.ss.service.OTPService;
import com.ss.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {
    @Autowired
    private UserServiceImpl service;

    @Autowired
    private JdbcTemplate template;

    @Autowired
    private OTPService otpService;

    @Autowired
    private EmailService emailService;

    // Using ConcurrentHashMap for thread safety
    private static final Map<String, String> otpStorage = new ConcurrentHashMap<>();

    @PostMapping("/verifyEmail")
    public ResponseEntity<Map<String, Object>> verifyEmail(@RequestBody Map<String, String> request) {
        System.out.println("Inside the verify email backend api");
        String email = request.get("email");
        UserInfo user = service.loginUser(email);

        try {
            if (user != null) {
                // Generate a 4-digit OTP
                String otp = otpService.getOtp();
                System.out.println("Generated OTP for " + email + ": " + otp);

                // Send OTP email
                emailService.sendOtpEmail(email, otp);

                // Store OTP for later verification
                otpStorage.put(email, otp);
                System.out.println("OTP stored for " + email);

                // Prepare response with complete user data
                Map<String, Object> response = new HashMap<>();
                response.put("message", "OTP sent successfully");
                response.put("userData", user); // Send complete user data including role

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Email not registered"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error processing request"));
        }
    }

    // OTP Verification - Just verifies OTP without retrieving user data again
    @PostMapping("/verifyOtp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String enteredOtp = request.get("otp");

        System.out.println("Verifying OTP for " + email + ": entered=" + enteredOtp);

        String storedOtp = otpStorage.get(email);
        System.out.println("Stored OTP: " + storedOtp);

        if (storedOtp != null && storedOtp.equals(enteredOtp)) {
            // Remove OTP from storage after successful verification
            otpStorage.remove(email);
            System.out.println("OTP verified successfully for " + email);

            // Simply return success - no need to get user data again
            return ResponseEntity.ok(
                    Map.of("message", "OTP verified successfully")
            );
        } else {
            System.out.println("OTP verification failed for " + email);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Invalid OTP. Please try again."));
        }
    }

}
