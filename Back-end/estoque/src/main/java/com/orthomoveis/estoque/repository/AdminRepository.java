package com.orthomoveis.estoque.repository;

import com.orthomoveis.estoque.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, String> {
    Admin findByEmailAndPassword(String email, String password);
}
