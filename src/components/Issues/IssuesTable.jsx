import React from 'react'

export const IssuesTable = ({ issues }) => {
    return (
        <div>
            <table className="table table-light table-bordered border border-2 border-dark table-hover">
                <thead className="table-dark border-light">
                    <tr>
                        <th>Issue No</th>
                        <th>Issue Description</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        issues.map(issue =>
                            <tr key={issue.number}>
                                <td>{issue.number}</td>
                                <td>{issue.title}</td>
                                <td>{issue.user.login}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}