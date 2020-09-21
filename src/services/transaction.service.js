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

    getAccountTransactions(id) {
        return http.get(`/transactions/${id}`);
    }

}

export default new TransactionDataService();