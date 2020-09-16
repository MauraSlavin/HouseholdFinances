import http from "../http-common";
// import Account from "../components/Account";
import Home from "../components/Home";

class AccountDataService {
    getAll() {
    // findAll() {
        console.log("In AccountDataService");
        return http.get("/accounts");
    }


}

export default new AccountDataService();