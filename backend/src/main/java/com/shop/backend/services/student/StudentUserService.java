package com.shop.backend.services.student;

import com.shop.backend.models.User;
import com.shop.backend.services.api.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Student Implementation of UserService
 * This is where students will implement their business logic for user
 * management
 */
@Service("studentUserService")
public class StudentUserService implements UserService {

    // In-memory storage for users
    private final List<User> users = new ArrayList<>();

    @Override
    public List<User> getAllUsers() {
        // TODO: Implement this method

        return null;
    }

    @Override
    public User getUserById(String id) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public User createUser(User user) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public User updateUser(String id, User user) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public boolean deleteUser(String id) {
        // TODO: Implement this method
        return false;
    }

    @Override
    public User authenticate(String username, String password) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public User getUserByUsername(String username) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public User getUserByEmail(String email) {
        // TODO: Implement this method
        return null;
    }
}