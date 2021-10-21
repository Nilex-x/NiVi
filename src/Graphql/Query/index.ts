import GQLClient from "../GraphqlConfig";
import { GET_BOARD, GET_USER_INFO } from "../schema";
import { QueryGetUserInfoResponse, QueryGetBoardReponse } from "../types";

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

    getBoard(KeyAuth: string) {
        return this.client
        .query<{ GetBoard: QueryGetBoardReponse }>({
            query: GET_BOARD,
            variables: {
                KeyAuth
            }
        })
    }
}