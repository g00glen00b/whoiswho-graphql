import gql from 'graphql-tag';

export const authenticationQuery = gql`query {
  authentication @client {
    id
    isAuthenticated
    isAdmin
    token
    firstName
    avatar
    personId
  }
}`;
