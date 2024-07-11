import { useState, useEffect } from 'react';

    const useTableRowSelection = () => {
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

    return { selectedRowId, setSelectedRowId };
    };

export default useTableRowSelection;