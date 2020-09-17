import http from "../http-common";
import Home from "../components/Home";

class AccountDataService {
    getAll() {
    // findAll() {
        return http.get("/accounts");
    }


}

export default new AccountDataService();