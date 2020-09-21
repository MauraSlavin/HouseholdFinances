DROP DATABASE IF EXISTS finances;
CREATE DATABASE finances;

USE finances;

CREATE TABLE accounts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nick_name VARCHAR(30) UNIQUE NOT NULL,
  image VARCHAR(30) DEFAULT "defaultAcctIMage.png",
  purpose VARCHAR(100),
  createdAt TIMESTAMP DEFAULT current_timestamp(),
  updatedAt TIMESTAMP DEFAULT current_timestamp()
);

CREATE TABLE transactions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  account_id INT UNSIGNED NOT NULL,
  INDEX acct_id (account_id),
  CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  trans_date DATE NOT NULL,
  post_date DATE,
  verified BOOLEAN default FALSE,
  amount DECIMAL(8,2) NOT NULL,
  to_from VARCHAR(30) NOT NULL,
  description VARCHAR(100),
  category VARCHAR(30) NOT NULL,
  stmt_date DATE,
  createdAt TIMESTAMP DEFAULT current_timestamp(),
  updatedAt TIMESTAMP DEFAULT current_timestamp()
);

CREATE TABLE splits (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT UNSIGNED NOT NULL,
    INDEX trans_id (transaction_id),
    CONSTRAINT fk1_transaction FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
    amount DECIMAL(8,2) NOT NULL,
    category VARCHAR(30) NOT NULL,
    description VARCHAR(100),
    createdAt TIMESTAMP DEFAULT current_timestamp(),
	updatedAt TIMESTAMP DEFAULT current_timestamp()
);

CREATE TABLE buckets (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT UNSIGNED NOT NULL,
    INDEX trans_id (transaction_id),
    CONSTRAINT fk2_transaction FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
    amount DECIMAL(8,2) NOT NULL,
    bucket VARCHAR(30) NOT NULL,
    createdAt TIMESTAMP DEFAULT current_timestamp(),
	updatedAt TIMESTAMP DEFAULT current_timestamp()
);

CREATE TABLE budgets (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    begin_date DATE NOT NULL,
    category VARCHAR(30) NOT NULL,
    january DECIMAL(8,2) DEFAULT 0.00,
    february DECIMAL(8,2) DEFAULT 0.00,
    march DECIMAL(8,2) DEFAULT 0.00,
    april DECIMAL(8,2) DEFAULT 0.00,
    may DECIMAL(8,2) DEFAULT 0.00,
    june DECIMAL(8,2) DEFAULT 0.00,
    july DECIMAL(8,2) DEFAULT 0.00,
    august DECIMAL(8,2) DEFAULT 0.00,
    september DECIMAL(8,2) DEFAULT 0.00,
    october DECIMAL(8,2) DEFAULT 0.00,
    november DECIMAL(8,2) DEFAULT 0.00,
    december DECIMAL(8,2) DEFAULT 0.00,
    createdAt TIMESTAMP DEFAULT current_timestamp(),
	updatedAt TIMESTAMP DEFAULT current_timestamp()
);

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
    (1, 1, "2020-08-01", "2020-08-01", 1, 1000, "Beginning",     "Start",              "Transfer",  "2020-08-01"),
    (2, 1, "2020-08-15", "2020-08-20", 0, -220, "Eversource",    "Electric bill",      "Utilities", "2020-08-01"),
    (3, 1, "2020-09-01", NULL,         1, -150, "Market Basket", "Tot: $150",          "SPLIT",     "2020-09-01"),
    (4, 1, "2020-09-01", "2020-09-21", 1,  -20, "SCU ATM",       "Household spending", "Transfer",  NULL),
    (5, 2, "2020-08-01", "2020-08-01", 1, 5000, "Beginning",     "Start",              "Transfer",  "2020-08-01");

INSERT INTO splits
    (id, transaction_id, amount, category, description)
VALUES 
    (1, 3, -100, "Groceries",      NULL),
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



SELECT * FROM accounts;
SELECT * FROM transactions;
SELECT * FROM splits;
SELECT * FROM buckets;
SELECT * FROM budgets;

SELECT SUM(amount) FROM transactions WHERE account_id = 1;
