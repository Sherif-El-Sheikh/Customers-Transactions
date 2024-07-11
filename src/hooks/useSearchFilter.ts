    import { useState, useEffect } from 'react';
    import { CustomersData, TransactionsData } from "@/types";
    
    interface UseSearchFilterProps {
    customersList: CustomersData[];
    transactions: TransactionsData[];
    }

    interface UseSearchFilterReturn {
    searchByName: string;
    setSearchByName: (value: string) => void;
    searchByAmount: string;
    setSearchByAmount: (value: string) => void;
    filteredCustomers: CustomersData[];
    filteredTransactions: TransactionsData[];
    }

    const useSearchFilter = ({ customersList, transactions }: UseSearchFilterProps): UseSearchFilterReturn => {
    const [searchByName, setSearchByName] = useState<string>('');
    const [searchByAmount, setSearchByAmount] = useState<string>('');

    const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
    const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);

    useEffect(() => {
        const [min, max] = searchByAmount.split('-').map(Number);
        setMinAmount(min);
        setMaxAmount(max);
    }, [searchByAmount]);

    const filteredCustomers = customersList.filter((customer: CustomersData) => {
        return customer.name.toLowerCase().includes(searchByName.toLowerCase());
    });

    const min = minAmount ? minAmount : -Infinity;
    const max = maxAmount ? maxAmount : Infinity;

    const filteredTransactions = transactions.filter((transaction: TransactionsData) => {
        return transaction.amount >= min && transaction.amount <= max;
    });

    return {
        searchByName,
        setSearchByName,
        searchByAmount,
        setSearchByAmount,
        filteredCustomers,
        filteredTransactions,
    };
    };

export default useSearchFilter;