import http from "../http-common";
import Home from "../components/Home";

class AccountDataService {
    getAll() {
    // findAll() {
        return http.get("/accounts");
    };

    getRegisterBalances() {
        return http.get("/accounts/registerbalances");
    };


}

export default new AccountDataService();