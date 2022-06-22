import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4ng6a8401ky01xyc49h7344/master',
  cache: new InMemoryCache()
})