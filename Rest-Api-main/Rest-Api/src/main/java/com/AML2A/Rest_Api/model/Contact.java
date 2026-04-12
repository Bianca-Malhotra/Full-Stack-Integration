package com.AML2A.Rest_Api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "contacts")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private String name;
    private String phone;
    private String email;
    private String relation;

    public Contact() {}
    public Contact(Long userId, String name, String phone, String email, String relation) {
        this.userId = userId;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.relation = relation;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getRelation() { return relation; }
    public void setRelation(String relation) { this.relation = relation; }
}
