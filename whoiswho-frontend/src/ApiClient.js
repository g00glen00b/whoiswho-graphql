import {createUploadLink} from 'apollo-upload-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import {persistCache} from 'apollo-cache-persist';
import {useState, useEffect} from 'react';
import {setContext} from 'apollo-link-context';
import jwt_decode from 'jwt-decode';

export const authenticationId = 'currentUser';

const httpLink = createUploadLink({uri: `http://localhost:8080/graphql`});
const cache = new InMemoryCache();

const typeDefs = gql`
  extend type Query {
    authentication: Authentication
  }
  
  type Authentication {
    isAuthenticated: Boolean
    isAdmin: Boolean
    token: String
    firstName: String
    avatar: String
    personId: ID
    id: ID
  }
`;

const resolvers = {
  Query: {
    authentication: () => ({
      isAuthenticated: false,
      isAdmin: false,
      token: null,
      firstName: null,
      avatar: null,
      personId: null,
      id: authenticationId,
      __typename: 'Authentication'
    })
  }
};

function isExpired(token) {
  if (token != null) {
    const payload = jwt_decode(token);
    const currentDate = new Date().getTime() / 1000;
    return payload.exp - currentDate <= 0;
  } else {
    return false;
  }
}

const authLink = setContext((_, {cache, headers}) => {
  const authentication = cache.data.get(`Authentication:${authenticationId}`);
  const token = authentication != null ? authentication.token : null;
  if (token != null && !isExpired(token)) {
    const customHeaders = {'Authorization': `Bearer ${token}`};
    return {headers: {...headers, ...customHeaders}};
  } else {
    cache.reset();
    return {headers};
  }
});

export function useClient() {
  const [client, setClient] = useState();
  useEffect(() => {
    async function getClient() {
      await persistCache({
        cache,
        storage: window.localStorage
      });
      setClient(new ApolloClient({
        resolvers,
        typeDefs,
        defaultOptions: {
          query: {fetchPolicy: 'network-only'},
          watchQuery: {fetchPolicy: 'network-only'},
          mutate: {errorPolicy: 'all'}
        },
        link: authLink.concat(httpLink),
        cache
      }));
    }

    getClient();
  }, [setClient]);
  return [client];
}


