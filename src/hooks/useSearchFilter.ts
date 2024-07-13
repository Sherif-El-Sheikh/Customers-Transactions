    import { useState, useEffect } from 'react';
    import {
        UseSearchFilterProps,
        UseSearchFilterReturn,
        TransactionsData,
        CustomersData
    } from "@/types";

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

    const min = minAmount ? minAmount : -Infinity;
    const max = maxAmount ? maxAmount : Infinity;

    const filteredTransactions = transactions.filter((transaction: TransactionsData) => {
        return transaction.amount >= min && transaction.amount <= max 
    });

    const filteredCustomers = customersList.filter((customer: CustomersData) => {
        return customer.name.toLowerCase().includes(searchByName.toLowerCase()) &&
        filteredTransactions.some((transaction: TransactionsData) => parseInt(customer.id) === transaction.customer_id)
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