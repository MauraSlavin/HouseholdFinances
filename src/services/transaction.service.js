import http from "../http-common";
import Home from "../components/Home";

class TransactionDataService {
    getAll() {
    // findAll() {
        return http.get("/transactions");
    };

    getRegisterBalances() {
        return http.get("/transactions/registerbalances");
    };

    getClearedBalances() {
        return http.get("/transactions/clearedbalances");
    };


}

export default new TransactionDataService();