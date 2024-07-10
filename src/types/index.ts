export interface CustomersData {
    id:   string;
    name: string;
}
export interface TransactionsData {
    id:          string;
    customer_id: number;
    date:        Date;
    amount:      number;
}
