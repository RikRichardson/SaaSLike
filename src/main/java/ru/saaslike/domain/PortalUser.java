package ru.saaslike.domain;

import ru.saaslike.util.RolesStringAttributeConverter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(
        uniqueConstraints = {@UniqueConstraint(columnNames = {"login"}, name = "uk_portal_user_login")}
)
public class PortalUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String login;

    private String name;

    private String password;

    /**
     * см. пример https://virgo47.wordpress.com/2014/08/02/converting-java-enums-to-values-and-back/
     */
    @Convert(converter = RolesStringAttributeConverter.class)
    @Column(name = "roles")
    private Set<PortalRole> roles = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<PortalRole> getRoles() {
        return roles;
    }

    public void setRoles(Set<PortalRole> roles) {
        this.roles = roles;
    }

}
