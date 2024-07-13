import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { FaMoneyBill } from 'react-icons/fa';
import { PiUserFill } from "react-icons/pi";
import { IoCalendarNumber } from "react-icons/io5";

import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";

import { getCustomers } from "@/app/features/customers/customersSlice";
import { AppDispatch, RootState } from '@/app/store';
import { getTransactions } from "@/app/features/transactions/transactionsSlice";

import { SkeletonTable } from "@/shared/SkeletonTable";

import useSearchFilter from "@/hooks/useSearchFilter";
import useTableRowSelection from "@/hooks/useTableRowSelection";
import { selectedCustomerData, setSelectedCustomer } from "@/app/features/customers/selectedCustomerSlice";
import { CustomersData } from "@/types";
import { CustomerModal } from "../ChartModal/CustomerModal";



export const Customers = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {customersList, isLoading}= useSelector((state:RootState)=> state.customers);
    const{transactions}= useSelector((state:RootState)=> state.transactions);
    

    useEffect(()=> {
        dispatch(getCustomers());
        dispatch(getTransactions());
    },[dispatch])

    const {
        searchByName,
        setSearchByName,
        searchByAmount,
        setSearchByAmount,
        filteredCustomers,
        filteredTransactions
    }
    = useSearchFilter({ customersList, transactions });

    const { selectedRowId, setSelectedRowId }= useTableRowSelection();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleTableRowClick = (customer: CustomersData) => {
            const selectedCustomerData: selectedCustomerData = {
            name: customer.name,
            transactions: filteredTransactions.filter((transaction) => transaction.customer_id === parseInt(customer.id)),
            };
            dispatch(setSelectedCustomer(selectedCustomerData));
            setSelectedRowId(customer.id);
            toggleModal();
        };

    if (isLoading) {
        return (
            <SkeletonTable/>
        )
    }

    return (
        <div className="container p-[0.5rem] sm:p-8 ">

        <h1 className="font-bold text-2xl mb-2">Customers Transactions</h1>
        <p className="mb-5 text-muted-foreground text-xs sm:text-sm">This table illustrates customer transactions and related details.</p>
        <p className="mb-5 text-muted-foreground  text-center font-semibold ">Click on any row to view the corresponding customer's transaction graph.</p>

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
                onChange={(e) => {
                    const inputValue = e.target.value;
                    const onlyNumbers = inputValue.replace(/[^0-9-]/g, '');
                    setSearchByAmount(onlyNumbers);
                }}
                
            />
        </div>

        {filteredCustomers.length === 0 && searchByName && (
            <p className="text-center mt-20">No customers found with name "{searchByName}"</p>
        )}

            {filteredCustomers.length === 0 && !searchByName && searchByAmount &&(
            <p className="text-center mt-20">
                No customers have transactions greater than {searchByAmount}
            </p>
            )}

        {filteredCustomers.length > 0 &&(
            <Table>
                <TableHeader>
                <TableRow>
                <TableHead>
                    <div className="flex justify-center items-center">
                    <PiUserFill />
                    <span className="ms-1 text-[10px] sm:text-base">Customer Name</span>
                    
                    </div>
                </TableHead>
                <TableHead>
                    <div className="flex justify-center items-center">
                    <IoCalendarNumber />
                    <span className="ms-1 text-[10px] sm:text-base">Transaction Date</span>
                    </div>
                </TableHead>
                <TableHead>
                    <div className="flex justify-center items-center">
                    <FaMoneyBill />
                    <span className="ms-1 text-[10px] sm:text-base">Transaction Amount</span>
                    
                    </div>
                </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCustomers.map((customer, index) => (
                        <TableRow key={customer.id}
                        className={`${index % 2 === 0 ? 'bg-[#f2f2f2]' : ''} ${selectedRowId === customer.id ? 'bg-blue-100' : ''} cursor-pointer`}
                        onClick={() => handleTableRowClick(customer)}
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
        <CustomerModal isOpen={isModalOpen} onClose={toggleModal}/>
    </div>
)
}

