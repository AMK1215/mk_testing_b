import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { IoGameController } from 'react-icons/io5'
import useLanguage from '../hooks/useLanguage';
import mm_data from '../lang/mm';
import en_data from '../lang/en';
import th_data from '../lang/th'
import ch_data from '../lang/ch'
import BASE_URL from "../hooks/baseURL"
import useFetch from "../hooks/useFetch"

const GameLogsPage = () => {
  const { lang } = useLanguage();
  const [selectedDate, setSelectedDate] = useState('today');
  const content = lang === 'mm' ? mm_data.gameLogs : lang === 'ch' ? ch_data.gameLogs : lang === 'th' ? th_data.gameLogs : en_data.gameLogs;

  const { data: logs, loading } = useFetch(BASE_URL + "/wager-logs?type=" + selectedDate);

  return (
    <div className='authBg py-4 py-sm-5 px-2 px-sm-3 px-lg-4'>
      <h3 className="mb-4 text-center fw-semibold">
        <IoGameController size={40} className='me-2' />
        {content.title}</h3>
      <div style={{ background: '#131313' }} className='p-3 rounded-3'>
        <div className="d-flex justify-content-center mb-4 gap-3">
          <button className={`btn btn-sm btn-${selectedDate === "today" ? "warning" : "outline-warning"}`} onClick={() => setSelectedDate("today")}>
            {content?.today}
          </button>
          <button className={`btn btn-sm btn-${selectedDate === "yesterday" ? "warning" : "outline-warning"}`} onClick={() => setSelectedDate("yesterday")}>
            {content?.yesterday}
          </button>
          <button className={`btn btn-sm btn-${selectedDate === "this_week" ? "warning" : "outline-warning"}`} onClick={() => setSelectedDate("this_week")}>
            {content?.thisWeek}
          </button>
          <button className={`btn btn-sm btn-${selectedDate === "last_week" ? "warning" : "outline-warning"}`} onClick={() => setSelectedDate("last_week")}>
            {content?.lastWeek}
          </button>
        </div>
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>{content.from}</th>
              <th>{content.to}</th>
              <th>{content.gameName}</th>
              <th>{content.count}</th>
              <th>{content.betAmount}</th>
              <th>{content.result}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={6}>Loading....</td></tr> : logs && logs.length === 0 ? <tr><td className='text-center text-danger' colSpan={6}>{content?.noData}</td></tr> : logs && logs.map((log, index) => (
              <tr key={index}>
                <td>{log.from_date}</td>
                <td>{log.to_date}</td>
                <td>{log.product}</td>
                <td>{log.total_count}</td>
                <td>{log.total_bet_amount}</td>
                <td>{log.total_transaction_amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default GameLogsPage
