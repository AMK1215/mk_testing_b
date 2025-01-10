import React from 'react'
import { Badge, Table } from 'react-bootstrap'
import Paginate from './Paginate'

export default function Logs({logs, loading, current_page, links, pageChange}) {
  return (
    <>
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Bank</th>
                <th>Account</th>
                <th>Account Name</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className='text-center'>
                  <td className='text-danger' colSpan={7}>Loading...</td>
                </tr>
              ) : logs?.length < 0 ? (
                <tr className='text-center'>
                  <td className='text-danger' colSpan={7}>No Data Found</td>
                </tr>
              ) : logs?.map((log, index) => (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{log?.payment_type}</td>
                  <td>{log?.account_number}</td>
                  <td>{log?.account_name}</td>
                  <td>{log.amount}</td>
                  <td><Badge bg={log.status == "approved" ? "success" : log.status == "pending" ? "warning" : "danger"}>{log.status}</Badge></td>
                  <td>{log.created_at}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate currentPage={current_page} links={links} pageChange={pageChange} />
        </div>
    </>
  )
}
