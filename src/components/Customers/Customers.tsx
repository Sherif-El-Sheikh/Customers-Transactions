import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { getCustomers } from "@/app/features/customers/customersSlice";
import { AppDispatch, RootState } from '@/app/store';
import { getTransactions } from "@/app/features/transactions/transactionsSlice";

import { SkeletonTable } from "@/shared/SkeletonTable";
import { CustomersData, TransactionsData } from "@/types";



export const Customers = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {customersList, isLoading}= useSelector((state:RootState)=> state.customers);
    const{transactions}= useSelector((state:RootState)=> state.transactions);
    

    useEffect(()=> {
        dispatch(getCustomers());
        dispatch(getTransactions());

    },[dispatch])

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

    const min = minAmount? minAmount : -Infinity;
    const max = maxAmount?  maxAmount : Infinity;


    const filteredTransactions = transactions.filter((transaction: TransactionsData) => {
        return transaction.amount >= min && transaction.amount <= max;
    });

    const [selectedRowId, setSelectedRowId] = useState<string | undefined>(undefined);
    
useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
        if (!(event.target instanceof Element) || !event.target.closest('tr')) {
        setSelectedRowId(undefined);
    }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
    document.removeEventListener('click', handleDocumentClick);
    };
}, []);

    if (isLoading) {
        return (
            <SkeletonTable/>
        )
    }

    return (
        <div className="container p-[0.5rem] sm:p-10 ">

        <h1 className="font-bold text-2xl mb-2">Customers Transactions</h1>
        <p className="mb-5 text-muted-foreground text-xs sm:text-sm">This table illustrates customer transactions and related details.</p>

        <div className="flex gap-4 mb-5">
            <Input
                type="text"
                placeholder="Search by name"
                value={searchByName}
                onChange={(e) => setSearchByName(e.target.value)}
            />
            <Input
                type="text"
                placeholder="Search by amount (e.g. 500-2500)"
                value={searchByAmount}
                onChange={(e) => setSearchByAmount(e.target.value)}
            />
        </div>

        {filteredCustomers.length === 0 && (
            <p className="text-center mt-20">No customers found with name "{searchByName}"</p>
        )}



        {filteredCustomers.length > 0 && (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Transaction Date</TableHead>
                        <TableHead>Transaction Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCustomers.map((customer, index) => (
                        <TableRow key={customer.id}  
                        className={`${index % 2 === 0 ? 'bg-[#f2f2f2]' : ''} ${selectedRowId === customer.id ? 'bg-blue-300' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedRowId(customer.id)}
                        >
                            <TableCell className="font-medium">{customer.name}</TableCell>
                            <TableCell>
                                {filteredTransactions.filter((customerTransaction) => parseInt(customer.id) == customerTransaction.customer_id)
                                    .map((customerTransaction) => (
                                        <div key={customerTransaction.id} className='p-2 even:border-t-2'>
                                            {new Date(customerTransaction.date).toLocaleDateString(undefined, {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-')}
                                        </div>
                                    ))}
                                            {filteredTransactions.length === 0 && (
                                                <p>No transactions found</p>
                                            )}
                            </TableCell>
                            <TableCell>
                                {filteredTransactions.filter((customerTransaction) => parseInt(customer.id) == customerTransaction.customer_id)
                                    .map((customerTransaction) => (
                                        <div key={customerTransaction.id} className='p-2 even:border-t-2'>{customerTransaction.amount}</div>
                                    ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )}
    </div>
)
}

