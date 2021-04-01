import React, { useState } from 'react'
import './Header.css'

export const Header = ({ title, SearchHandler }) => {
    const [searchTerm, setSearchTerm] = useState('')

    if (searchTerm === '')
        SearchHandler(null, searchTerm)

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark myheader">
            <div className="container-fluid">
                <div className="navbar-brand">
                    {title}
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav d-flex justify-content-end w-100">
                        <form className="py-2" id="searchForm" onSubmit={e => SearchHandler(e, searchTerm)}>
                            <input id="searchKeyword" className="form-control w-100" type="search"
                                placeholder="Search..." aria-label="Search"
                                onChange={e => setSearchTerm(e.target.value)} value={searchTerm} />
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    )
}