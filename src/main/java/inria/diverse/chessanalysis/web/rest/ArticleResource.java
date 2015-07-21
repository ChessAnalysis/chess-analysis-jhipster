package inria.diverse.chessanalysis.web.rest;

import com.codahale.metrics.annotation.Timed;
import inria.diverse.chessanalysis.domain.Article;
import inria.diverse.chessanalysis.repository.ArticleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Article.
 */
@RestController
@RequestMapping("/api")
public class ArticleResource {

    private final Logger log = LoggerFactory.getLogger(ArticleResource.class);

    @Inject
    private ArticleRepository articleRepository;

    /**
     * POST  /articles -> Create a new article.
     */
    @RequestMapping(value = "/articles",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Article> create(@Valid @RequestBody Article article) throws URISyntaxException {
        log.debug("REST request to save Article : {}", article);
        if (article.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new article cannot already have an ID").body(null);
        }
        Article result = articleRepository.save(article);
        return ResponseEntity.created(new URI("/api/articles/" + article.getId())).body(result);
    }

    /**
     * PUT  /articles -> Updates an existing article.
     */
    @RequestMapping(value = "/articles",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Article> update(@Valid @RequestBody Article article) throws URISyntaxException {
        log.debug("REST request to update Article : {}", article);
        if (article.getId() == null) {
            return create(article);
        }
        Article result = articleRepository.save(article);
        return ResponseEntity.ok().body(result);
    }

    /**
     * GET  /articles -> get all the articles.
     */
    @RequestMapping(value = "/articles",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Article> getAll() {
        log.debug("REST request to get all Articles");
        return articleRepository.findAll();
    }

    /**
     * GET  /articles/:id -> get the "id" article.
     */
    @RequestMapping(value = "/articles/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Article> get(@PathVariable Long id) {
        log.debug("REST request to get Article : {}", id);
        return Optional.ofNullable(articleRepository.findOne(id))
            .map(article -> new ResponseEntity<>(
                article,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /articles/:id -> delete the "id" article.
     */
    @RequestMapping(value = "/articles/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable Long id) {
        log.debug("REST request to delete Article : {}", id);
        articleRepository.delete(id);
    }
}
