package inria.diverse.chessanalysis.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import inria.diverse.chessanalysis.domain.util.CustomLocalDateSerializer;
import inria.diverse.chessanalysis.domain.util.ISO8601LocalDateDeserializer;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;
import org.joda.time.LocalDate;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;


/**
 * A Article.
 */
@Entity
@Table(name = "ARTICLE")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Article implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "title")
    private String title;

    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
    @JsonSerialize(using = CustomLocalDateSerializer.class)
    @JsonDeserialize(using = ISO8601LocalDateDeserializer.class)
    @Column(name = "date")
    private LocalDate date;

    @Column(name = "question")
    private String question;

    @Size(max = 650000)
    @Column(name = "content", length = 650000)
    private String content;

    @Column(name = "sort")
    private Integer sort;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Article article = (Article) o;

        if ( ! Objects.equals(id, article.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Article{" +
                "id=" + id +
                ", title='" + title + "'" +
                ", date='" + date + "'" +
                ", question='" + question + "'" +
                ", content='" + content + "'" +
                ", sort='" + sort + "'" +
                '}';
    }
}
