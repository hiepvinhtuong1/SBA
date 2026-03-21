package edu.fnews.config;

import edu.fnews.entity.Category;
import edu.fnews.entity.SystemAccount;
import edu.fnews.entity.Tag;
import edu.fnews.repository.CategoryRepository;
import edu.fnews.repository.SystemAccountRepository;
import edu.fnews.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final SystemAccountRepository accountRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;

    @Override
    public void run(String... args) {
        // Seed admin account
        if (!accountRepository.existsByAccountEmail("admin")) {
            SystemAccount admin = SystemAccount.builder()
                    .accountName("Administrator")
                    .accountEmail("admin")
                    .accountPassword("123456")
                    .role(1) // Admin
                    .build();
            accountRepository.save(admin);
            log.info("Seeded admin account: admin@funews.com / admin123");
        }

        // Seed staff account
        if (!accountRepository.existsByAccountEmail("staff@funews.com")) {
            SystemAccount staff = SystemAccount.builder()
                    .accountName("Staff Writer")
                    .accountEmail("staff@funews.com")
                    .accountPassword("staff123")
                    .role(2) // Staff
                    .build();
            accountRepository.save(staff);
            log.info("Seeded staff account: staff@funews.com / staff123");
        }

        // Seed categories
        if (categoryRepository.count() == 0) {
            categoryRepository.save(Category.builder().categoryName("Technology").categoryDescription("Latest in tech and gadgets").isActive(true).build());
            categoryRepository.save(Category.builder().categoryName("Business").categoryDescription("Market trends and economy").isActive(true).build());
            categoryRepository.save(Category.builder().categoryName("Sports").categoryDescription("World wide sports coverage").isActive(true).build());
            categoryRepository.save(Category.builder().categoryName("Health").categoryDescription("Wellness and medical news").isActive(true).build());
            categoryRepository.save(Category.builder().categoryName("Entertainment").categoryDescription("Movies, music, and pop culture").isActive(true).build());
            log.info("Seeded 5 categories");
        }

        // Seed tags
        if (tagRepository.count() == 0) {
            tagRepository.save(Tag.builder().tagName("AI").tagNote("Artificial Intelligence related").build());
            tagRepository.save(Tag.builder().tagName("Future").tagNote("Future trends and predictions").build());
            tagRepository.save(Tag.builder().tagName("Tech").tagNote("General technology").build());
            tagRepository.save(Tag.builder().tagName("Innovation").tagNote("Innovation and startups").build());
            log.info("Seeded 4 tags");
        }
    }
}
