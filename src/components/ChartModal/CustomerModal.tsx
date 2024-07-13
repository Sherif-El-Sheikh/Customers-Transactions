import { CustomerModalProps } from '@/types';
import { CustomersChart } from "../FlowChart/CustomersChart";
import { FaTimes } from 'react-icons/fa';

export const CustomerModal = ({ isOpen, onClose }: CustomerModalProps) => {
        return (
        <div className={`fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center ${isOpen ? '' : 'hidden'}`} onClick={onClose}>
            <div className="bg-white p-5 rounded-lg w-full xl:w-1/2 md:w-[75%] relative"
        onClick={(e) => e.stopPropagation()}>
            <CustomersChart/>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 absolute top-0 right-0 p-7">
        <FaTimes />
        </button>
            </div>
        </div>
        );
    };