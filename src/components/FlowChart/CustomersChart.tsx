import {Line} from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
} 
from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

import { useSelector } from "react-redux";
import { RootState } from '@/app/store';

export const CustomersChart = ()=> {
    const {transactions, name} = useSelector((state: RootState) => state.selectedCustomer);

    if (transactions?.length === 0) {
        return <div className=' flex justify-center align-middle p-8'>
            <p>No transactions found.</p>
            </div>
    }

    const data = {
            labels: transactions?.map((transaction) => transaction.date ),
            datasets: [
                {
                label: 'Transaction Amount',
                data: transactions?.map((transaction) => transaction.amount),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                tension: 0.4,
                },
            ],
            };

    const options: ChartOptions<'line'> = {
        scales: {
            x: {
                time: {
                unit: 'day',
                },
                title: {
                    display: true,
                    text: 'Transaction Date',
                    font: {
                        size: 14,
                        family: 'Pacifico, cursive'
                    },
                    color:'#000000',
                    
                },
                ticks:{
                    font: {
                        size: 13,
                        family: 'Pacifico, cursive'
                    }
                },
                grid: {
                    color: '#AAAAAA',
                    lineWidth: 1
                },
                },
                y: {
                title: {
                    display: true,
                    text: 'Transaction Amount',
                    font: {
                        size: 14, 
                        family: 'Pacifico, cursive'
                    },
                    color:'#000000',
                },
                ticks: {
                    font: {
                        size: 13,
                        family: 'Pacifico, cursive'
                    },
                    maxTicksLimit: 50
                },
                grid: { 
                    color: '#666666', 
                    lineWidth: 1
                },
                },
                },
            plugins: {
                title: {
                display: true,
                text: `${name} Transactions`,
                font: {
                    size: 15,
                    family: 'Pacifico, cursive'
                },
                color:'#000000',
                },
                legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        size:13,
                        family: 'Pacifico, cursive'
                    }
                }
                },
                },
            }

    return (
        <div className="container p-[0.5rem] sm:p-10">
        <Line data={data} options={options} height={250}/>
        </div>
    ) 
}

