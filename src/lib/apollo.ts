import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4nl1zg6092t01xo7cks51po/master',
  cache: new InMemoryCache()
})