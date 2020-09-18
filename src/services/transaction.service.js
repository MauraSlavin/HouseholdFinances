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


}

export default new TransactionDataService();