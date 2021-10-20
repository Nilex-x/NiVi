import { action, makeObservable, observable } from "mobx";
import RootStore from "..";

export default class userLogin {
    isLoggedIn: Boolean = false;
    authKey: string = "";
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

    login = (newAuthKey: string) => {
        localStorage.setItem("KeyAuth", newAuthKey)
        this.isLoggedIn = true;
        this.authKey = newAuthKey;
    }

    logout = () => {
        localStorage.removeItem("KeyAuth")
        this.isLoggedIn = false;
        this.authKey = "";
    }
}