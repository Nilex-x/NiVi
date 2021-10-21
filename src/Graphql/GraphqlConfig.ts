import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

const getEnvironment = () => {
    if (process.env.NODE_ENV === "production") {
        return "http://nivi-back.hosting.oiqia.net/"
    } else {
        return "http://localhost:4000/"
    }
}

export default class GQLClient {
    protected client: ApolloClient<NormalizedCacheObject>

    static instance = new GQLClient()

    constructor() {

        this.client = new ApolloClient({
            uri: getEnvironment(),
            cache: new InMemoryCache()
        });
    }

    static getIntance() {
        return this.instance;
    }

    public getClient() {
        return this.client;
    }
}