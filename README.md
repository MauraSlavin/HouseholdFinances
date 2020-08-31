# HouseholdFinances
App for managing household finances.  Track transactions, verify balances, see total assets, create and track budget by categories, earmark portions of balance in some accounts using "buckets."

# Planned functions:

1. Import transactions from an Excel file to the database for multiple accounts
    1. Checking for duplicates (prompting to eliminate duplicates or to keep)
2. Track transactions by Category
3. Add and rename categories
4. Delete categories that have no transactions associated with them
5. Split a transaction by multiple categories
6. Note that a transaction has been verified against physical receipts
7. Note that a transaction has cleared
8. See an account by transaction date (to verify statement balances & transactions)
9. Manually enter transactions
10. Manually update transactions
11. See cleared balance, and total balance
12. See a snapshot of all accounts
13. See income / spending for all accounts by category
14. Allow for "buckets" in some accounts, where money is earmarked for specific purposes
    1. Ability to see buckets for the account
    2. Ability to move money from one bucket to another
    3. Ability to add, rename, delete buckets
15. Ability to assign values by month for each category
16. See year-to-date budget vs. actual by month


# SQL database
Required field is indicated by *.

## Transactions
1. ID*
2. Account*: string - nickname for the account (i.e. "Household checking")
3. TransDate*: datetime - date of the transaction initiated
4. PostDate: datetime   - date the transaction posted/cleared; default TransDate
5. Amount*: float (2 decimal places) - amount of the transaction
6. ToFrom*: string - where the transaction was going to or from
7. Description: string - more information about the transaction; default empty
8. Category*: string - category this transaction belongs to, or "SPLIT" if multiple categories
9. StmtDate: datetime - if an account with statements, the statement date this transaction will appear on; default empty

## Splits
1. ID*
2. TransactionID*: link to transaction in Transactions table
3. Amount*: float (2 decimal places) - amount of this portion of the transaction
4. Category*: what category this portion of the transaction belongs to

NOTE: The total of the Amounts for all the entries of a given TransactionID should equal the corresponding Amount in the Transactions table.

## Buckets
1. ID*
2. TransactionID*: link to transaction in the Transactions table
3. Amount*: float (2 decimal places) - amount to/from this bucket
4. Bucket*: string - name of the bucket (i.e. "Property Taxes")

NOTE:  One transaction from the Transactions table could have multiple entries in the Buckets table if the transaction is split among multiple buckets.  The total for each TransactionID should match the Amount in the Transactions table.

## Budget
1. ID*
2. BeginDate*: datetime - what date the fiscal year starts
3. Category*: string - name of the category
4. Jan: float (2 decimal places) - budget amount for this month in current fiscal year; default 0
5. Feb: float (2 decimal places) - budget amount for this month in current fiscal year; default 0
6. Mar: float (2 decimal places) - budget amount for this month in current fiscal year; default 0
7. Apr: float (2 decimal places) - budget amount for this month in current fiscal year; default 0
8. May: float (2 decimal places) - budget amount for this month in current fiscal year; default 0
9. Jun: float (2 decimal places) - budget amount for this month in current fiscal year; default 0
10. Jul: float (2 decimal places) - budget amount for this month in current fiscal year; default 0
11. Aug: float (2 decimal places) - budget amount for this month in current fiscal year; default 0
12. Sep: float (2 decimal places) - budget amount for this month in current fiscal year; default 0
13. Oct: float (2 decimal places) - budget amount for this month in current fiscal year; default 0
14. Nov: float (2 decimal places) - budget amount for this month in current fiscal year; default 0
15. Dec: float (2 decimal places) - budget amount for this month in current fiscal year; default 0