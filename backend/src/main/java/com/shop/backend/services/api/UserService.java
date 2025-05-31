package com.shop.backend.services.api;

import com.shop.backend.models.User;
import java.util.List;

/**
 * User Service Interface
 * Defines operations for managing users
 * Students will implement this interface in their code
 */
public interface UserService {

    /**
     * Get all users
     * 
     * @return list of all users
     */
    List<User> getAllUsers();

    /**
     * Get user by ID
     * 
     * @param id user ID
     * @return user if found
     */
    User getUserById(String id);

    /**
     * Create a new user
     * 
     * @param user user to create
     * @return created user
     */
    User createUser(User user) throws IllegalArgumentException;

    /**
     * Update an existing user
     * 
     * @param id   user ID
     * @param user updated user data
     * @return updated user
     */
    User updateUser(String id, User user);

    /**
     * Delete a user
     * 
     * @param id user ID
     * @return true if deleted, false otherwise
     */
    boolean deleteUser(String id);

    /**
     * Authenticate a user (login)
     * 
     * @param username username
     * @param password password
     * @return user if authentication successful
     */
    User authenticate(String username, String password);

    /**
     * Get user by username
     * 
     * @param username username
     * @return user if found
     */
    User getUserByUsername(String username);

    /**
     * Get user by email
     * 
     * @param email email
     * @return user if found
     */
    User getUserByEmail(String email);
}