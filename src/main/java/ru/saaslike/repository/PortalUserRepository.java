package ru.saaslike.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.saaslike.domain.PortalUser;

@Repository
public interface PortalUserRepository extends JpaRepository<PortalUser, Long> {

    PortalUser findByLogin(String login);
}
