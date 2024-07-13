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

export interface UseSearchFilterProps {
    customersList: CustomersData[];
    transactions: TransactionsData[];
    }

export interface UseSearchFilterReturn {
    searchByName: string;
    setSearchByName: (value: string) => void;
    searchByAmount: string;
    setSearchByAmount: (value: string) => void;
    filteredCustomers: CustomersData[];
    filteredTransactions: TransactionsData[];
    }

    export interface CustomerModalProps {
        isOpen: boolean;
        onClose: () => void;
    }
