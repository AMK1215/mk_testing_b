import React from 'react'
import { Badge, Table } from 'react-bootstrap'
import Paginate from './Paginate'

export default function BonusLogs({loading, logs, current_page, links, pageChange}) {
  return (
    <>
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Before</th>
                <th>After</th>
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
                  <td>{log?.user_name}</td>
                  <td>{log?.type_id}</td>
                  <td>{log?.amount}</td>
                  <td>{log?.before_amount}</td>
                  <td>{log?.after_amount}</td>
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
