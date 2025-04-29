package com.orthomoveis.estoque;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.orthomoveis.estoque.model.Admin;
import com.orthomoveis.estoque.repository.AdminRepository;

@SpringBootApplication
public class EstoqueApplication implements CommandLineRunner {

    private final AdminRepository adminRepository;

    public EstoqueApplication(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(EstoqueApplication.class, args);
    }

    @Override
    public void run(String... args) {
        if (!adminRepository.existsById("admin@gmail.com")) {
            adminRepository.save(new Admin("admin@gmail.com", "4321"));
        }
    }
}