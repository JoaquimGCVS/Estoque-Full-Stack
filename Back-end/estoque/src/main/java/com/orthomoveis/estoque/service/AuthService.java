package com.orthomoveis.estoque.service;

import com.orthomoveis.estoque.model.Admin;
import com.orthomoveis.estoque.repository.AdminRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AdminRepository adminRepository;

    public AuthService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public boolean authenticate(String email, String password) {
        Admin admin = adminRepository.findByEmailAndPassword(email, password);
        return admin != null;
    }
}
