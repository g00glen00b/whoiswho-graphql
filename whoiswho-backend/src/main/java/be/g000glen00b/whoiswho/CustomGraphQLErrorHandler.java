package be.g000glen00b.whoiswho;

import graphql.ExceptionWhileDataFetching;
import graphql.GraphQLError;
import graphql.servlet.core.GenericGraphQLError;
import graphql.servlet.core.GraphQLErrorHandler;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

import static be.g000glen00b.whoiswho.StreamUtils.collectionStream;

@Component
public class CustomGraphQLErrorHandler implements GraphQLErrorHandler {
    @Override
    public List<GraphQLError> processErrors(List<GraphQLError> errors) {
        return collectionStream(errors)
            .map(this::unwrapError)
            .collect(Collectors.toList());
    }

    private GraphQLError unwrapError(GraphQLError error) {
        if (error instanceof ExceptionWhileDataFetching) {
            ExceptionWhileDataFetching unwrappedError = (ExceptionWhileDataFetching) error;
            return new GenericGraphQLError(unwrappedError.getException().getMessage());
        } else {
            return error;
        }
    }
}
