DROP DATABASE IF EXISTS finances;
CREATE DATABASE finances;

USE finances;

CREATE TABLE account (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nick_name VARCHAR(30) UNIQUE NOT NULL,
  image VARCHAR(30) DEFAULT "defaultAcctIMage.jpg"
);

CREATE TABLE transaction (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  account_id INT UNSIGNED NOT NULL,
  INDEX acct_id (account_id),
  CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE,
  trans_date DATE NOT NULL,
  post_date DATE NOT NULL,
  amount DECIMAL(8,2) NOT NULL,
  to_from VARCHAR(30) NOT NULL,
  description VARCHAR(100),
  category VARCHAR(30) NOT NULL,
  stmt_date DATE
);

CREATE TABLE split (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT UNSIGNED NOT NULL,
    INDEX trans_id (transaction_id),
    CONSTRAINT fk1_transaction FOREIGN KEY (transaction_id) REFERENCES transaction(id) ON DELETE CASCADE,
    amount DECIMAL(8,2) NOT NULL,
    category VARCHAR(30) NOT NULL,
    description VARCHAR(100)
);

CREATE TABLE bucket (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT UNSIGNED NOT NULL,
    INDEX trans_id (transaction_id),
    CONSTRAINT fk2_transaction FOREIGN KEY (transaction_id) REFERENCES transaction(id) ON DELETE CASCADE,
    amount DECIMAL(8,2) NOT NULL,
    bucket VARCHAR(30) NOT NULL
);

CREATE TABLE budget (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    begin_date DATE NOT NULL,
    category VARCHAR(30),
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
    december DECIMAL(8,2) DEFAULT 0.00
);