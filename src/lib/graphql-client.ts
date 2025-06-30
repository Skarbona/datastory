import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://datastory-cloud-v2.stellate.sh';

export const client = new GraphQLClient(endpoint);
