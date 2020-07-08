# Spring boot + React + GraphQL Example
=======================================

This project contains a full example of an application developed using [GraphQL](https://graphql.org/) within the Java ecosystem.
The backend uses [Spring boot](https://spring.io/projects/spring-boot), [Spring Data](https://spring.io/projects/spring-data), and the [GraphQL Java Kickstart](https://www.graphql-java-kickstart.com/) library.

The frontend uses [React](https://reactjs.org/) (with React hooks) and the [Apollo GraphQL client](https://www.apollographql.com/).

## Installation

The backend requires JDK 11+ and can be installed using:

```
cd whoiswho-backend
./mvnw package
```

The frontend requires Node.js 12+ can be installed using:

```
cd whoiswho-frontend
npm install
```

## Running

To run the backend, you need JDK 11+ and you can use the following command:

```
cd whoiswho-backend
WHOISWHO_SECURITY_PASSWORDSTRENGTH=10
WHOISHWO_SECURITY_TOKENSECRET=myspecialsecret 
./mvnw spring-boot:run
```

To run the frontnd, you need Node.js 12+ and you can use the following command:

```
cd whoiswho-frontend
npm start
```

## Testing it out

The backend provides a [GraphQL Playground](https://github.com/prisma-labs/graphql-playground) to test things out. The playground is located at http://localhost:8080/playground by default.
Authentication happens by passing a [JWT token](https://jwt.io/) as a header by using the `Authorization: Bearer <token>` header.

A JWT token can be obtained by calling the `login` mutation. By default, there is a user created with the following credentials:

- E-mail: craig.gonzalez@example.org
- Password: password

By default, the JWT token is valid for 4 hours, but this can be extended by the use of the `whoiswho.security.tokenexpiration` property.

The frontend will run at http://localhost:3000. Logging in can be done through the credentials provided above.
