import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Header } from '../Header/Header'
import { Pagination } from '../Pagination/Pagination'
import { IssuesTable } from './IssuesTable'

export const Issues = () => {
    const [owner] = useState('facebook')
    const [repo] = useState('react')
    const [issues, setIssues] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [issuesPerPage] = useState(50)
    const [searchTerm, setSearchTerm] = useState('')
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const getIssues = async () => {
            if (searchTerm !== '') {
                const response = await axios.get(`https://api.github.com/search/issues?q=${searchTerm}/repo:${owner}/${repo}/node+type:issue&per_page=${issuesPerPage}&page=${currentPage}`)
                setIssues(response.data.items)

                if (response.headers.link !== undefined) {
                    if (response.headers.link.includes("; rel=\"last\"")) {
                        const responseHeaderLink = response.headers.link.split("; rel=\"last\"")[0]
                        setTotalPages(parseInt(responseHeaderLink.substring(
                            responseHeaderLink.lastIndexOf("=") + 1,
                            responseHeaderLink.lastIndexOf(">"))))
                    }
                    else {
                        const responseHeaderLink = response.headers.link.split("; rel=\"prev\"")[0]
                        setTotalPages(parseInt(responseHeaderLink.substring(
                            responseHeaderLink.lastIndexOf("=") + 1,
                            responseHeaderLink.lastIndexOf(">"))) + 1)
                    }
                }
                else
                    setTotalPages(1)
            }
            else {
                const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues?per_page=${issuesPerPage}&page=${currentPage}`)
                setIssues(response.data)

                if (response.headers.link.includes("; rel=\"last\"")) {
                    const responseHeaderLink = response.headers.link.split("; rel=\"last\"")[0]
                    setTotalPages(parseInt(responseHeaderLink.substring(
                        responseHeaderLink.lastIndexOf("=") + 1,
                        responseHeaderLink.lastIndexOf(">"))))
                }
                else {
                    const responseHeaderLink = response.headers.link.split("; rel=\"prev\"")[0]
                    setTotalPages(parseInt(responseHeaderLink.substring(
                        responseHeaderLink.lastIndexOf("=") + 1,
                        responseHeaderLink.lastIndexOf(">"))) + 1)
                }
            }
        }

        getIssues()
    }, [currentPage, issuesPerPage, owner, repo, searchTerm])

    const SearchHandler = (e, searchTerm) => {
        if (e !== null)
            e.preventDefault()
        setSearchTerm(searchTerm)
    }

    const ChangePageHandler = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div>
            <Header title={owner + "/" + repo} SearchHandler={SearchHandler} />
            <section className="p-md-5">
                <IssuesTable issues={issues} />
                <Pagination totalPages={totalPages} ChangePageHandler={ChangePageHandler} />
            </section>
        </div>
    )
}