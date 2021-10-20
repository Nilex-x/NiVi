import GQLClient from "../GraphqlConfig";
import { GET_USER_INFO } from "../schema";
import { QueryGetUserInfoResponse } from "../types";

export default class Query {
    client = GQLClient.getIntance()?.getClient()

    getUserInfo(KeyAuth: string) {
        return this.client
        .query<{ GetUserInfo: QueryGetUserInfoResponse }>({
            query: GET_USER_INFO,
            variables: {
                KeyAuth
            }
        })
    }
}