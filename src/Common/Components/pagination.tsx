import React, {useMemo} from "react";

interface IPagination {
    totalItems: number
    currentPage: number
    totalPages: number
    centreNumberCount?: number
    sideNumberCount?: number
    onPageSelected: (page: number) => void
}

const Pagination: React.FC<IPagination> = (props) => {

    const {totalItems, currentPage, totalPages, centreNumberCount = 3, sideNumberCount = 2, onPageSelected} = props

    const shouldDisplay = (page: number) => {

        const isNearTarget = (Math.abs(currentPage - page) <= centreNumberCount % 2)
        const isNearSide = page <= sideNumberCount || totalPages - page < sideNumberCount
        return isNearSide || isNearTarget;

    }
    
    const listPages : number[] = useMemo(() => {
        
        let pages: number[] = []
        let index: number = 0
        
        for (let page = 1; page <= totalPages; page++) {

            if(!shouldDisplay(page)){
                continue
            }

            pages[index] = page

           index++
        }
        
        return pages
    }, [currentPage, totalPages])

    const hasGap = (idx: number): boolean => {
        return idx !== listPages.length - 1 && listPages[idx + 1] - listPages[idx] !== 1
    }

    return (
        <div className='flex gap-4 items-center'>

            <Button
                content={'<'}
                onClick={() => onPageSelected(currentPage - 1)}
                disabled={currentPage === 1}
            />

            {listPages.map((page, idx) => {

                return (
                    <div key={idx} className='flex gap-4'>
                        <Button
                            content={page.toString()}
                            onClick={() => onPageSelected(page)}
                            selected={currentPage === page}
                        />
                        {hasGap(idx) && <div>...</div>}
                    </div>
                )
            })}

            <Button
                content={'>'}
                onClick={() => onPageSelected(currentPage + 1)}
                disabled={currentPage === totalPages}
            />

            <div>Всего - {totalItems}</div>
        </div>
    )
}

export { Pagination }

interface IButton {
    content:string
    onClick: () => void
    disabled?: boolean
    selected?: boolean
}

const Button : React.FC<IButton> = ({content, onClick, selected, disabled}) => {

    const classes = useMemo(() => {
        let classNames = 'px-3 py-1 rounded disabled:bg-transparent dark:disabled:bg-transparent disabled:text-secondary disabled:border-secondary' +
            ' dark:disabled:text-secondary-dark dark:disabled:border-secondary-dark'
        if(selected) {
            classNames += ' bg-blue dark:bg-blue-dark text-background dark:text-background-dark hover:bg-blue dark:hover:bg-blue-dark' +
                ' font-bold'
        } else {
            classNames += ' bg-blue15 dark:bg-blue15-dark border-blue dark:border-blue-dark border text-blue dark:text-blue-dark' +
                ' hover:bg-blue30 dark:hover:bg-blue30-dark'
        }

        return classNames
    }, [selected])

    return (
        <button
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {content}
        </button>
    )
}