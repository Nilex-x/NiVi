import GQLClient from "../GraphqlConfig";
import { GET_ACTI_DETAIL, GET_BOARD, GET_MODULE_DETAIL, GET_PLANNING, GET_USER_INFO } from "../schema";
import { User, Board, Planning, ModuleDetail, ActiType } from "../types";

export default class Query {
    client = GQLClient.getIntance()?.getClient()

    getUserInfo(KeyAuth: string) {
        return this.client
            .query<{ GetUserInfo: User }>({
                query: GET_USER_INFO,
                variables: {
                    KeyAuth
                }
            })
    }

    getBoard(KeyAuth: string) {
        return this.client
            .query<{ GetBoard: Board }>({
                query: GET_BOARD,
                variables: {
                    KeyAuth
                }
            })
    }

    getPlanning(KeyAuth: string) {
        return this.client
            .query<{ GetPlanning: Planning }>({
                query: GET_PLANNING,
                variables: {
                    KeyAuth,
                }
            })
    }

    getModuleDetails(KeyAuth: string, scolaryear: string, codemodule: string, codeinstance: string, codeActi: string) {
        return this.client
        .query<{ GetModuleDetail: ModuleDetail }>({
            query: GET_MODULE_DETAIL,
            variables: {
                KeyAuth,
                scolaryear,
                codemodule,
                codeinstance,
                codeActi
            }
        })
    }

    getActiDetail(KeyAuth: string, scolaryear: string, codemodule: string, codeinstance: string, codeActi: string) {
        return this.client
        .query<{ GetActiDetail: ActiType }>({
            query: GET_ACTI_DETAIL,
            variables: {
                KeyAuth,
                scolaryear,
                codemodule,
                codeinstance,
                codeActi
            }
        })
    }
}