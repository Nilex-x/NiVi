import { action, makeObservable, observable } from "mobx";
import RootStore from "..";
import Query from "../../Graphql/Query";

export default class userLogin {
    isLoggedIn: Boolean = false;
    authKey: string = "";
    loginUser: string = "";
    firstName: string = "";
    lastName: string = "";
    currentSemestre: number = 0
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            isLoggedIn: observable,
            authKey: observable,

            login: action,
            logout: action
        })
        this.rootStore = rootStore
    }

    login = async (newAuthKey: string, loginUser: string, firstName: string, lastName: string, currentSemestre: number) => {
        localStorage.setItem("KeyAuth", newAuthKey)
        this.isLoggedIn = true;
        this.authKey = newAuthKey;
        this.loginUser = loginUser;
        this.firstName = firstName;
        this.lastName = lastName;
        this.currentSemestre = currentSemestre;
    }

    logout = () => {
        localStorage.removeItem("KeyAuth")
        this.isLoggedIn = false;
        this.authKey = "";
    }
}