import React from 'react'

export const Pagination = ({ totalPages, ChangePageHandler }) => {
    const pageNumbers = []

    for (let i = 1; i <= totalPages; i++)
        pageNumbers.push(i)

    return (
        <nav className="d-flex justify-content-end">
            <ul className="pagination">
                {
                    pageNumbers.map(pageNumber => (
                        <li key={pageNumber} className="page-item">
                            <button onClick={() => ChangePageHandler(pageNumber)} className="page-link">
                                {pageNumber}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}