import {
  ApolloClient,
  CombinedGraphQLErrors,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { type ReactNode } from "react";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";

const GraphQLProvider = ({ children }: { children: ReactNode }) => {
  const errorLink = new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
      error.errors.forEach(({ message }) => {
				if (message === "Invalid token") {
					localStorage.removeItem("token");
					window.location.pathname = "/auth";
				}
				
      });
    }
  });
  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URI,
  });
  const authLink = new SetContextLink(({ headers }) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(errorLink, httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: false,
              merge(existing = [], incoming) {
                if (!existing.data || !Array.isArray(existing.data)) {
                  return incoming;
                }
                if (!incoming.data || !Array.isArray(incoming.data)) {
                  return existing;
                }
                return {
                  ...incoming,
                  data: [...existing.data, ...incoming.data],
                  pageInfo: incoming.pageInfo,
                };
              },
            },
            myPosts: {
              keyArgs: false,
              merge(existing = [], incoming) {
                if (!existing.data || !Array.isArray(existing.data)) {
                  return incoming;
                }
                if (!incoming.data || !Array.isArray(incoming.data)) {
                  return existing;
                }
                return {
                  ...incoming,
                  data: [...existing.data, ...incoming.data],
                  pageInfo: incoming.pageInfo,
                };
              },
            },
            favouritePosts: {
              keyArgs: false,
              merge(existing = [], incoming) {
                if (!existing.data || !Array.isArray(existing.data)) {
                  return incoming;
                }
                if (!incoming.data || !Array.isArray(incoming.data)) {
                  return existing;
                }
                return {
                  ...incoming,
                  data: [...existing.data, ...incoming.data],
                  pageInfo: incoming.pageInfo,
                };
              },
            },
          },
        },
      },
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphQLProvider;
