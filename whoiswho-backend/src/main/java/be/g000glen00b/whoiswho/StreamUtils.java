package be.g000glen00b.whoiswho;

import java.util.Collection;
import java.util.stream.Stream;

public final class StreamUtils {
    public static <T> Stream<T> collectionStream(Collection<T> collection) {
        return collection == null || collection.isEmpty() ? Stream.empty() : collection.stream();
    }
}
