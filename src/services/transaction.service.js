import http from "../http-common";
// import Home from "../components/Home";

class TransactionDataService {
    getAll() {
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
    };

    postTransactions(trans) {
        console.log("--- in transaction.service.js (postTransactions) ---");
        return http.post("/transactions/upload", trans);
    };
}

export default new TransactionDataService();