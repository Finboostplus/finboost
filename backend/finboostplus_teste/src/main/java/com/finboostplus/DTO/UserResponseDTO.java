package com.finboostplus.DTO;

import com.finboostplus.model.User;

public class UserResponseDTO {

  private Long id;
  private String name;
  private String colorTheme;
  
  public UserResponseDTO(Long id, String name, String colorTheme) {
    this.id = id;
    this.name = name;
    this.colorTheme = colorTheme;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getColorTheme() {
    return colorTheme;
  }

  public static UserResponseDTO userToDto(User user) {
    return new UserResponseDTO(user.getId(), user.getName(), user.getColorTheme());
  }
}
