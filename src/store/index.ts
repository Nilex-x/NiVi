import userLogin from "./userLogin"

export default class RootStore {
    static instance = new RootStore()

    userLogin: userLogin;

    constructor() {
        this.userLogin = new userLogin(this);
    }

    static getInstance() {
        return this.instance
    }
}