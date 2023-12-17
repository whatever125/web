package example.entity;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * Represents a result entity for storing point data.
 * This entity is mapped to a database table 'lab3_x_test_table' within the schema 'sXXXXXX'.
 * IT SHOULD INCLUDE (in theory) information about the point coordinates (x, y), radius (r) and whether the point is within a certain area (result).
 */
@Named
@Entity
@Table(name = "lab3_x_test_table", schema = "s368328")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApplicationScoped
public class ResultEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "session_id")
    private String sessionId;
    @Column(name = "x")
    private double x;
    @Column(name = "y")
    private double y;
    @Column(name = "r")
    private double r;
    @Column(name = "success")
    private boolean success;
    @Column(name = "date_time")
    private ZonedDateTime dateTime;
    @Column(name = "execution_time")
    private long executionTime;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        ResultEntity result = (ResultEntity) o;
        return Objects.equals(getId(), result.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}