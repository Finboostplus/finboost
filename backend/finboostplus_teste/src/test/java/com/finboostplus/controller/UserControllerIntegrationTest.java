package com.finboostplus.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finboostplus.DTO.UserRequestDTO;
import com.finboostplus.model.User;
import com.finboostplus.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    private UserRequestDTO validUserDto;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();

        validUserDto = new UserRequestDTO(
                "Integration Test User",
                "integration@example.com",
                "password123",
                "light"
        );
    }

    @Test
    void saveProfile_shouldCreateUserInDatabase_whenValidData() throws Exception {
        // Verify user doesn't exist before
        assertEquals(0, userRepository.count());

        // Act
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validUserDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(content().string("Cadastro feito com sucesso!"));

        // Verify user was created in database
        assertEquals(1, userRepository.count());

        User savedUser = userRepository.findAll().getFirst();
        assertEquals("Integration Test User", savedUser.getName());
        assertEquals("integration@example.com", savedUser.getEmail());
        assertEquals("light", savedUser.getColorTheme());
        assertNotNull(savedUser.getCreatedAt());
    }

    @Test
    void saveProfile_shouldReturnBadRequest_whenEmailAlreadyExists() throws Exception {
        // Create user first
        User existingUser = new User("Existing User", "integration@example.com", "pass", "dark");
        userRepository.save(existingUser);

        // Try to create another user with same email
        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validUserDto))
                        .with(csrf()))
                .andExpect(status().isBadRequest());

        // Should still have only one user
        assertEquals(1, userRepository.count());
    }

    @Test
    @WithMockUser(username = "integration@example.com", roles = "USER")
    void getReturnAuthorized_shouldReturnUserEmail_whenAuthenticated() throws Exception {
        mockMvc.perform(get("/user/whoareyou"))
                .andExpect(status().isOk())
                .andExpect(content().string("O usuário logado possui o e-mail: integration@example.com"));
    }

    @Test
    void getReturnAuthorized_shouldReturn401_whenNotAuthenticated() throws Exception {
        mockMvc.perform(get("/user/whoareyou"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(roles = "OWNER")
    void getReturnNotAuthorized_shouldReturnOk_whenOwnerRole() throws Exception {
        mockMvc.perform(get("/user/no"))
                .andExpect(status().isOk())
                .andExpect(content().string("Aqui não está autorizado!"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void getReturnNotAuthorized_shouldReturn403_whenUserRole() throws Exception {
        mockMvc.perform(get("/user/no"))
                .andExpect(status().isForbidden());
    }
}
