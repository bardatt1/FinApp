package com.finapp.finapp.service;

import com.finapp.finapp.dto.*;

public interface AuthService {
    AuthResponseDto register(RegisterRequestDto request);
    AuthResponseDto login(LoginRequestDto request);
    UserDto me(String email);
    void changePassword(String email, ChangePasswordRequestDto request);
}



