import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// GitHub GraphQL API endpoint
const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

// Configure error handling middleware
// This will intercept and log any GraphQL or network errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  // Handle GraphQL-specific errors (e.g., validation, resolver errors)
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  // Handle network-level errors (e.g., connection issues)
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Configure HTTP connection to GitHub's GraphQL API
// Including authentication token from environment variables
const httpLink = new HttpLink({
  uri: GITHUB_GRAPHQL_API,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, 
  },
});

// Create the Apollo Link chain
const link = ApolloLink.from([errorLink, httpLink]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;