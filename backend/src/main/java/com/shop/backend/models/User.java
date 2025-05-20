package com.shop.backend.models;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Base User model
 * This class contains all required fields that the frontend needs
 * Students can extend it with custom fields using the customFields map
 * 
 * TODO: Students may need to implement additional methods in this class
 */
public class User {
    private String id;
    private String username;
    private String email;
    private String password; // Note: In a real application, this would be hashed
    private String role; // e.g., "CUSTOMER", "ADMIN"

    // Extension mechanism for students to add custom fields
    private Map<String, Object> customFields = new HashMap<>();

    public User() {
        this.id = UUID.randomUUID().toString();
    }

    public User(String username, String email, String password, String role) {
        this.id = UUID.randomUUID().toString();
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // TODO: Students may implement additional methods here, such as password
    // validation or role checks

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        // TODO: Students should consider hashing passwords here
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // Custom fields extension methods
    public Map<String, Object> getCustomFields() {
        return customFields;
    }

    public void setCustomFields(Map<String, Object> customFields) {
        this.customFields = customFields;
    }

    public void addCustomField(String key, Object value) {
        customFields.put(key, value);
    }

    public Object getCustomField(String key) {
        return customFields.get(key);
    }
}