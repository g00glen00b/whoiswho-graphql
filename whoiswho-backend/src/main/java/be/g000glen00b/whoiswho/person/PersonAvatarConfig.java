package be.g000glen00b.whoiswho.person;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebMvc
@Configuration
@EnableConfigurationProperties(PersonAvatarProperties.class)
@RequiredArgsConstructor
public class PersonAvatarConfig implements WebMvcConfigurer {
    private final PersonAvatarProperties properties;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler("/avatar/**")
            .addResourceLocations(properties.getLocation());
    }
}
