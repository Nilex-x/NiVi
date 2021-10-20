import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

export default class GQLClient {
    protected client: ApolloClient<NormalizedCacheObject>

    static instance = new GQLClient()

    constructor() {

        this.client = new ApolloClient({
            uri: `http://${window.location.hostname}:4000`,
            cache: new InMemoryCache(),
            queryDeduplication: true
        });
    }

    static getIntance() {
        return this.instance;
    }

    public getClient() {
        return this.client;
    }
}