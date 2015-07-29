package inria.diverse.chessanalysis.web.rest;

import inria.diverse.chessanalysis.Application;
import inria.diverse.chessanalysis.domain.Article;
import inria.diverse.chessanalysis.repository.ArticleRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.joda.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the ArticleResource REST controller.
 *
 * @see ArticleResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class ArticleResourceTest {

    private static final String DEFAULT_TITLE = "SAMPLE_TEXT";
    private static final String UPDATED_TITLE = "UPDATED_TEXT";

    private static final LocalDate DEFAULT_DATE = new LocalDate(0L);
    private static final LocalDate UPDATED_DATE = new LocalDate();
    private static final String DEFAULT_QUESTION = "SAMPLE_TEXT";
    private static final String UPDATED_QUESTION = "UPDATED_TEXT";
    private static final String DEFAULT_CONTENT = "SAMPLE_TEXT";
    private static final String UPDATED_CONTENT = "UPDATED_TEXT";

    private static final Integer DEFAULT_SORT = 0;
    private static final Integer UPDATED_SORT = 1;

    @Inject
    private ArticleRepository articleRepository;

    private MockMvc restArticleMockMvc;

    private Article article;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ArticleResource articleResource = new ArticleResource();
        ReflectionTestUtils.setField(articleResource, "articleRepository", articleRepository);
        this.restArticleMockMvc = MockMvcBuilders.standaloneSetup(articleResource).build();
    }

    @Before
    public void initTest() {
        article = new Article();
        article.setTitle(DEFAULT_TITLE);
        article.setDate(DEFAULT_DATE);
        article.setQuestion(DEFAULT_QUESTION);
        article.setContent(DEFAULT_CONTENT);
        article.setSort(DEFAULT_SORT);
    }

    @Test
    @Transactional
    public void createArticle() throws Exception {
        int databaseSizeBeforeCreate = articleRepository.findAll().size();

        // Create the Article
        restArticleMockMvc.perform(post("/api/articles")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(article)))
                .andExpect(status().isCreated());

        // Validate the Article in the database
        List<Article> articles = articleRepository.findAll();
        assertThat(articles).hasSize(databaseSizeBeforeCreate + 1);
        Article testArticle = articles.get(articles.size() - 1);
        assertThat(testArticle.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testArticle.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testArticle.getQuestion()).isEqualTo(DEFAULT_QUESTION);
        assertThat(testArticle.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testArticle.getSort()).isEqualTo(DEFAULT_SORT);
    }

    @Test
    @Transactional
    public void getAllArticles() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articles
        restArticleMockMvc.perform(get("/api/articles"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(article.getId().intValue())))
                .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
                .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
                .andExpect(jsonPath("$.[*].question").value(hasItem(DEFAULT_QUESTION.toString())))
                .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
                .andExpect(jsonPath("$.[*].sort").value(hasItem(DEFAULT_SORT)));
    }

    @Test
    @Transactional
    public void getArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get the article
        restArticleMockMvc.perform(get("/api/articles/{id}", article.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(article.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.question").value(DEFAULT_QUESTION.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.sort").value(DEFAULT_SORT));
    }

    @Test
    @Transactional
    public void getNonExistingArticle() throws Exception {
        // Get the article
        restArticleMockMvc.perform(get("/api/articles/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

		int databaseSizeBeforeUpdate = articleRepository.findAll().size();

        // Update the article
        article.setTitle(UPDATED_TITLE);
        article.setDate(UPDATED_DATE);
        article.setQuestion(UPDATED_QUESTION);
        article.setContent(UPDATED_CONTENT);
        article.setSort(UPDATED_SORT);
        restArticleMockMvc.perform(put("/api/articles")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(article)))
                .andExpect(status().isOk());

        // Validate the Article in the database
        List<Article> articles = articleRepository.findAll();
        assertThat(articles).hasSize(databaseSizeBeforeUpdate);
        Article testArticle = articles.get(articles.size() - 1);
        assertThat(testArticle.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testArticle.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testArticle.getQuestion()).isEqualTo(UPDATED_QUESTION);
        assertThat(testArticle.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testArticle.getSort()).isEqualTo(UPDATED_SORT);
    }

    @Test
    @Transactional
    public void deleteArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

		int databaseSizeBeforeDelete = articleRepository.findAll().size();

        // Get the article
        restArticleMockMvc.perform(delete("/api/articles/{id}", article.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Article> articles = articleRepository.findAll();
        assertThat(articles).hasSize(databaseSizeBeforeDelete - 1);
    }
}
