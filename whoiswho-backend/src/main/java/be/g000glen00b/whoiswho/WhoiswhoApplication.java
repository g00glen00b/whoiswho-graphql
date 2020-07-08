package be.g000glen00b.whoiswho;

import graphql.schema.GraphQLScalarType;
import graphql.servlet.core.ApolloScalars;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;

import javax.servlet.Filter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Clock;

@SpringBootApplication
public class WhoiswhoApplication {

	public static void main(String[] args) {
		SpringApplication.run(WhoiswhoApplication.class, args);
	}

	@Bean
	public Filter openFilter() {
		return new OpenEntityManagerInViewFilter();
	}

	@Bean
	public GraphQLScalarType uploadScalar() {
		return ApolloScalars.Upload;
	}

	@Bean
	public Clock clock() {
		return Clock.systemDefaultZone();
	}

	@Bean
	public MessageDigest messageDigest() throws NoSuchAlgorithmException {
		return MessageDigest.getInstance("SHA1");
	}
}
