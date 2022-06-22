import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import ThongKeApi from '../../../api/ThongKeApi'

const ProductStt = () => {
    const [sttData, setSTTData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let response = await ThongKeApi.productMostSold();
            setSTTData(response)
        }
        fetchData()
    }, [])

    return (
        <Card className="flex-fill w-100">
            <Card.Header>
                <Card.Title tag="h5" className="mb-0">
                    Top 4 sản phẩm bán được nhiều
                </Card.Title>
            </Card.Header>
            <Card.Body className="d-flex">
                <Table className="mb-0">
                    <thead>
                        <tr>
                            <th>Thứ tự</th>
                            <th>Mã sản phẩm</th>
                            <th className="text-end">Tên sản phẩm</th>
                            <th className="text-end">Số lượng bán được</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sttData.map((item, i) => (
                                <tr key={item.maSP}>
                                    <td className="text-end">{i + 1}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faSquare} className="text-primary" />{" "}
                                        {item.maSP}
                                    </td>
                                    <td className="text-end">{item.tenSP}</td>
                                    <td className="text-end text-success">{item.soLuongBan}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}

export default ProductStt