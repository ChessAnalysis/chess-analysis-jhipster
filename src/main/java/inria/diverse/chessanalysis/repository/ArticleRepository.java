package inria.diverse.chessanalysis.repository;

import inria.diverse.chessanalysis.domain.Article;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Article entity.
 */
public interface ArticleRepository extends JpaRepository<Article,Long> {

}
