
import { LanguageContext } from '../../contexts/LanguageContext';
import { ApiResponse, PaginationData } from '../../../ForFable-Domain';
import { useEffect, useState, useContext, ReactElement } from 'react';

type PaginatorProps<T extends object, Group extends object> = {
  indexFunction: (page: number) => Promise<ApiResponse<Group & PaginationData<T>>>
  renderAll: (data: (Group & PaginationData<T>)|undefined) => JSX.Element
  noDataMessage: string
  title: ReactElement
}

const MAX_BUTTONS = 4

function Paginator<T extends object, Group extends object = object>({ indexFunction, renderAll, noDataMessage, title }: PaginatorProps<T, Group>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [allData, setAllData] = useState<Group & PaginationData<T>>()
    const [lang] = useContext(LanguageContext)

    useEffect(() => {
        const loadUser = async () => {
            const response = await indexFunction(currentPage)
            if (response.state == 'Sucess') {
                setAllData(response.data)
            }
        }

        loadUser()
    }, [currentPage, indexFunction])

    const handleClick = (page: number) => {
        setCurrentPage(page);
    };

    if(!allData) { return <div> {lang.Loading}... </div> }

    if(allData.all.length==0) {
        return (
            <div>
                <h1>{noDataMessage}</h1>
            </div>
        )
    }

    const renderPaginationButtons = () => {
        const buttons = [];
        const totalPages = allData.meta.lastPage;
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > MAX_BUTTONS) {
        const halfMaxButtons = Math.floor(MAX_BUTTONS / 2);
        const halfMaxButtonsRemainder = MAX_BUTTONS % 2 !== 0 ? 1 : 0;
        const halfButtonsToShow = halfMaxButtons + halfMaxButtonsRemainder;

        if (currentPage <= halfButtonsToShow) {
            endPage = MAX_BUTTONS;
        } else if (currentPage >= totalPages - halfButtonsToShow + 1) {
            startPage = totalPages - MAX_BUTTONS + 1;
        } else {
            startPage = currentPage - halfMaxButtons;
            endPage = currentPage + halfMaxButtonsRemainder + halfMaxButtons;
        }

        if (startPage > 1) {
            buttons.push(
            <button key={Math.random()} onClick={() => handleClick(1)}>
                1
            </button>
            );
            if (startPage > 2) buttons.push(<span className='ellipsis-start'>...</span>);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
            <button
                key={Math.random()}
                onClick={() => handleClick(i)}
                className={i === currentPage ? 'page-active' : ''}
            >
                {i}
            </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) buttons.push(<span className='ellipsis-start'>...</span>);
            buttons.push(
            <button key={Math.random()} onClick={() => handleClick(totalPages)}>
                {totalPages}
            </button>
            );
        }
        } else {
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
            <button
                key={Math.random()}
                onClick={() => handleClick(i)}
                className={i === currentPage ? 'page-active' : ''}
            >
                {i}
            </button>
            );
        }
        }

        return buttons;
    };
  
  return (
    <>
        {title}
        {renderAll(allData)}
        <div className='pagination-buttons'>
            {renderPaginationButtons()}
        </div>
    </>
  );
}

export default Paginator;
