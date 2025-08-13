package com.finboostplus.model;

import com.finboostplus.DTO.UserRequestDTO;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void dtoToUser_shouldConvertCorrectly() {
        UserRequestDTO dto = new UserRequestDTO("Alice", "alice@example.com", "12345", "dark");

        User user = User.dtoToUser(dto);

        assertEquals("Alice", user.getName());
        assertEquals("alice@example.com", user.getEmail());
        assertEquals("12345", user.getPassword());
        assertEquals("dark", user.getColorTheme());
        assertNotNull(user.getCreatedAt());
    }

    @Test
    void addRole_and_hasRole_shouldWork() {
        User user = new User("Bob", "bob@example.com", "pass", "light");
        Role roleAdmin = new Role(1L, "ROLE_ADMIN");

        assertFalse(user.hasRole("ROLE_ADMIN"));

        user.addRole(roleAdmin);

        assertTrue(user.hasRole("ROLE_ADMIN"));
        assertTrue(user.getAuthorities().contains(roleAdmin));
    }

    @Test
    void getUsername_shouldReturnEmail() {
        User user = new User("Charlie", "charlie@example.com", "pass", "light");
        assertEquals("charlie@example.com", user.getUsername());
    }

    @Test
    void equals_and_hashCode_shouldWorkCorrectly() {
        User user1 = new User("Dave", "dave@example.com", "pass", "light");
        user1.setId(1L);

        User user2 = new User("Eve", "eve@example.com", "pass", "dark");
        user2.setId(1L);

        assertEquals(user1, user2);
        assertEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    void userDetailsMethods_shouldReturnTrue() {
        User user = new User("Frank", "frank@example.com", "pass", "light");

        assertTrue(user.isAccountNonExpired());
        assertTrue(user.isAccountNonLocked());
        assertTrue(user.isCredentialsNonExpired());
        assertTrue(user.isEnabled());
    }
}
