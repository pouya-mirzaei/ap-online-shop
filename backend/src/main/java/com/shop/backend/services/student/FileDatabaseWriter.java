package com.shop.backend.services.student;

import com.shop.backend.models.User;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

public class FileDatabaseWriter {
    protected static final String FILE_NAME = "D:\\programming\\ap-online-shop\\backend\\database.txt";
    private static final String DELIMITER = "|";
    private static final String HEADER = "USER_ID" + DELIMITER + "USER_NAME" + DELIMITER + "EMAIL" +
            DELIMITER + "PASSWORD" + DELIMITER + "ROLE";
    private static final ReentrantLock fileLock = new ReentrantLock();

    public static void saveUser(String userId, String username, String email, String password, String role) {
        // Validate input parameters
        if (userId == null || username == null || email == null || password == null) {
            System.err.println("❌ Error: Required user fields cannot be null");
            return;
        }

        // Set default role if not provided
        String normalizedRole = (role == null || role.isEmpty()) ? "CUSTOMER" : role.toUpperCase();

        fileLock.lock();
        try {
            // Check for existing user before writing
            if (userExists(userId)) {
                System.out.println("⚠️ User with ID " + userId + " already exists. Skipping save.");
                return;
            }

            // Ensure file exists with header
            initializeFile();

            // Write user data
            try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME, true))) {
                String userRecord = String.join(DELIMITER,
                        userId, username, email, password, normalizedRole);
                writer.write(userRecord);
                writer.newLine();
                System.out.println("✅ User saved successfully: " + username);
            }
        } catch (IOException e) {
            System.err.println("❌ Error writing to file: " + e.getMessage());
        } finally {
            fileLock.unlock();
        }
    }

    private static void initializeFile() throws IOException {
        Path path = Paths.get(FILE_NAME);
        if (!Files.exists(path) || Files.size(path) == 0) {
            try (BufferedWriter writer = Files.newBufferedWriter(path)) {
                writer.write(HEADER);
                writer.newLine();
            }
        }
    }

    private static boolean userExists(String userId) {
        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_NAME))) {
            // Skip header
            reader.readLine();

            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split("\\" + DELIMITER, 5); // Split into max 5 parts
                if (parts.length > 0 && userId.equals(parts[0].trim())) {
                    return true;
                }
            }
        } catch (IOException e) {
            System.err.println("❌ Error reading from file: " + e.getMessage());
        }
        return false;
    }

    public static List<User> readUsers() {
        List<User> users = new ArrayList<>();
        fileLock.lock();
        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_NAME))) {
            // Skip header
            reader.readLine();

            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split("\\" + DELIMITER, 5);

                if (parts.length >= 4) {  // Minimum required fields
                    String userId = parts[0].trim();
                    String username = parts[1].trim();
                    String email = parts[2].trim();
                    String password = parts[3].trim();
                    String role = (parts.length == 5) ? parts[4].trim() : "CUSTOMER";

                    users.add(new User(userId, username, email, password, role));
                }
            }
        } catch (IOException e) {
            System.err.println("❌ Error reading from file: " + e.getMessage());
        } finally {
            fileLock.unlock();
        }
        return users;
    }

    public static void clearDatabase() {
        fileLock.lock();
        try {
            Files.write(Paths.get(FILE_NAME), HEADER.getBytes());
            System.out.println("✅ Database cleared successfully");
        } catch (IOException e) {
            System.err.println("❌ Error clearing database: " + e.getMessage());
        } finally {
            fileLock.unlock();
        }
    }
}