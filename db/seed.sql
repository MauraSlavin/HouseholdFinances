use finances;

INSERT INTO accounts
    (id, nick_name, image, purpose)
VALUES
    (1, 'Household Checking', 'CheckingAcctImage.png', 'Everyday bills & expenses; regular pay goes here'), 
    (2, 'Big Bills', 'BigBillsImage.png', 'Save for bigger expenses'),
    (3, 'Credit Card', 'DiscCCImage.png', 'Primary credit card'),
    (4, 'Backup CC', 'BackupCCImage.png', 'When primary card is declined'),
    (5, 'Mike Spending', 'MikeSpendingImage.png', 'Fun for Mike'),
    (6, 'Maura Spending', 'MauraSpendingImage.png', 'Fun for Maura'),
    (7, 'Cash', 'Cash.png', null);

INSERT INTO transactions
    (id, account_id, trans_date, post_date, verified, amount, to_from, description, category, stmt_date)
VALUES  
    (1, 1, "2020-08-01", "2020-08-01", "Yes", 1000, "Beginning",     "Start",              "Transfer",  "2020-08-01"),
    (2, 1, "2020-08-15", "2020-08-20", "",    -220, "Eversource",    "Electric bill",      "Utilities", "2020-08-01"),
    (3, 1, "2020-09-01", NULL,         "Yes", -150, "Market Basket", "Wkly trip",          "SPLIT",     "2020-09-01"),
    (4, 1, "2020-09-01", "2020-09-21", "Yes",  -20, "SCU ATM",       "Household spending", "Transfer",  NULL),
    (5, 2, "2020-08-01", "2020-08-01", "Yes", 5000, "Beginning",     "Start",              "Transfer",  "2020-08-01");

INSERT INTO splits
    (id, transaction_id, amount, category, description)
VALUES 
    (1, 3, -100, "Groceries",      ""),
    (2, 3, -20,  "Kids",           "Cat food"),
    (3, 3, -15,  "Mike Spending",  "snacks"),
    (4, 3, -15,  "Maura Spending", "chocolate");

INSERT INTO buckets
    (id, transaction_id, amount, bucket)
VALUES
    (1, 5, 1000, "Property Taxes"),
    (2, 5,  300, "Water Bill"),
    (3, 5, 3700, "College");

INSERT INTO budgets
    (id, begin_date, category, january, february, march, april, may, june, july, august, september, october, november, december)
VALUES  
    (1, "2020-08-01", "Groceries",      320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320, 320),
    (2, "2020-08-01", "Kids",            75,  75,  75,  75,  75,  75,  75,  75,  75,  75,  75,  75),
    (3, "2020-08-01", "Utilities",      100, 100,  80,  70,  60,  60,  60,  60,  60,  70,  80, 100),
    (4, "2020-08-01", "Mike Spending",  250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250),
    (5, "2020-08-01", "Maura Spending", 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250);
