import React from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

export default function Paginate({links, currentPage, pageChange}) {
    return (
        <>
            <div className="d-flex justify-content-center pb-4">
                <div className='m-1'>
                    <button onClick={() => pageChange(links[0]?.url)} className="btn btn-sm btn-outline-light" disabled={currentPage === 1}>
                        {/* <i className="fas fa-angle-left"></i> */}
                        <ArrowLeftOutlined />
                    </button>
                </div>
                {links && links.slice(1, -1).map((page, index) => (
                    <div key={index} className='m-1'>
                        <button className={`btn btn-sm ${page.active ? 'btn-light' : 'btn-outline-light'}`} onClick={() => pageChange(page.url)}>
                            {page.label}
                        </button>
                    </div>
                ))}
                <div className='m-1'>
                    <button onClick={() => pageChange(links[links?.length - 1]?.url)} className="btn btn-sm btn-outline-light" disabled={currentPage === (links?.length - 2)}>
                        <ArrowRightOutlined />
                    </button>
                </div>
            </div>
        </>
    )
}
