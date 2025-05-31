package com.shop.backend.services.student;

import com.shop.backend.models.User;
import com.shop.backend.services.api.UserService;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

//import static com.shop.backend.services.student.FileDatabaseWriter.FILE_NAME;

/**
 * Student Implementation of UserService
 * This is where students will implement their business logic for user
 * management
 */
@Service("studentUserService")
public class StudentUserService implements UserService {

    // In-memory storage for users
    private List<User> users = FileDatabaseWriter.readUsers();
    private static final String DELIMITER = "|";
    private static final String HEADER = "USER_ID" + DELIMITER + "USER_NAME" + DELIMITER + "EMAIL" + DELIMITER + "PASSWORD" + DELIMITER + "ROLE";

//    public StudentUserService(){
//        users.add(new User("pouya" , "pouya@gmail.com" , "pass123456" , "ADMIN"));
//    }


    public StudentUserService() {
        this.users = FileDatabaseWriter.readUsers();
    }

    @Override
    public List<User> getAllUsers() {
        return new ArrayList<User>(users);
    }

    @Override
    public User getUserById(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty.");
        }

        for (User user : users) {
            if (id.equals(user.getId())) {
                return user;
            }
        }
        throw new IllegalArgumentException("User not found with ID: " + id);
    }

    @Override
    public User createUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User object cannot be null.");
        }

        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty.");
        }
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty.");
        }
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty.");
        }

        // Check for duplicate username
        for (User existing : users) {
            if (user.getUsername().equalsIgnoreCase(existing.getUsername())) {
                throw new IllegalArgumentException("Username '" + user.getUsername() + "' is already taken.");
            }
        }

        // Set default role if not provided
        if (user.getRole() == null || user.getRole().trim().isEmpty()) {
            user.setRole("CUSTOMER");
        }

        users.add(user);
        FileDatabaseWriter.saveUser(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getRole()
        );
        return user;
    }

    @Override
    public User updateUser(String id, User user) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty.");
        }
        if (user == null) {
            throw new IllegalArgumentException("User object cannot be null.");
        }

        User existingUser = getUserById(id);
        if (existingUser == null) {
            throw new IllegalArgumentException("User not found with ID: " + id);
        }

        // Check for username conflicts (case-insensitive)
        for (User u : users) {
            if (!u.getId().equals(id)) {
                if (u.getUsername().equalsIgnoreCase(user.getUsername())) {
                    throw new IllegalArgumentException("Username '" + user.getUsername() + "' is already taken.");
                }
            }
        }

        // Update user properties
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());
        existingUser.setEmail(user.getEmail());

        // Only update role if provided
        if (user.getRole() != null && !user.getRole().trim().isEmpty()) {
            existingUser.setRole(user.getRole());
        }

        rewriteDatabaseFile();
        return existingUser;
    }

    private void rewriteDatabaseFile() {
        try (FileWriter fileWriter = new FileWriter(FileDatabaseWriter.FILE_NAME);
             BufferedWriter writer = new BufferedWriter(fileWriter)) {

            // Write header
            writer.write(HEADER);
            writer.newLine();

            // Write all users
            for (User user : users) {
                String role = user.getRole();
                if (role == null) {
                    role = "CUSTOMER";
                }

                writer.write(user.getId());
                writer.write(DELIMITER);
                writer.write(user.getUsername());
                writer.write(DELIMITER);
                writer.write(user.getEmail());
                writer.write(DELIMITER);
                writer.write(user.getPassword());
                writer.write(DELIMITER);
                writer.write(role);
                writer.newLine();
            }

        } catch (IOException e) {
            System.err.println("Error writing to database file: " + e.getMessage());
            throw new RuntimeException("Failed to update user database", e);
        }
    }

    @Override
    public boolean deleteUser(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty.");
        }

        User userToDelete = null;
        for (User user : users) {
            if (id.equals(user.getId())) {
                userToDelete = user;
                break;
            }
        }

        if (userToDelete == null) {
            throw new IllegalArgumentException("User not found with ID: " + id);
        }

        users.remove(userToDelete);
        rewriteDatabaseFile();
        return true;
    }

    @Override
    public User authenticate(String username, String password) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty.");
        }
        if (password == null || password.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty.");
        }

        for (User user : users) {
            if (username.trim().equalsIgnoreCase(user.getUsername().trim()) &&
                    password.trim().equals(user.getPassword().trim())) {
                return user;
            }
        }
        throw new IllegalArgumentException("Invalid username or password.");
    }

    @Override
    public User getUserByUsername(String username) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty.");
        }

        for (User user : users) {
            if (username.equals(user.getUsername())) {
                return user;
            }
        }
        throw new IllegalArgumentException("User not found with username: " + username);
    }

    @Override
    public User getUserByEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty.");
        }

        for (User user : users) {
            if (email.equals(user.getEmail())) {
                return user;
            }
        }
        throw new IllegalArgumentException("User not found with email: " + email);
    }
}