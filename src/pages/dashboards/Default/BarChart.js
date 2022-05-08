import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ThongKeApi from '../../../api/ThongKeApi'
import DonDatHangApi from '../../../api/DonDatHangApi'
import { Card, Col, Dropdown, Row } from 'react-bootstrap';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const statusOrderColors = [
    {
        ordinary: 1,
        name: "HOA_DON",
        value: "success",
    },
    {
        ordinary: 0,
        name: "DON_DAT",
        value: "warning",
    },
    {
        ordinary: 2,
        name: "VAN_DON",
        value: "info",
    },
    {
        ordinary: 3,
        name: "HUY_DON",
        value: "secondary"
    }
];

const BarChart = () => {
    const [sttData, setSTTData] = useState([])
    const [type, setType] = useState('')
    const [yearData, setYearData] = useState([])
    const [year, setYear] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            let response = await ThongKeApi.statisticOrderByYear(2022, '');
            let data = response.map((item) => item.ord_per_month)
            setSTTData(data)

            let distinctYearResponse = await DonDatHangApi.getDistinctYearDatHang();
            setYearData(distinctYearResponse)
        }
        fetchData()
    }, [])

    //const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const labels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Số đơn đặt trong năm ứng với loại cụ thể',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Sô lượng',
                data: sttData,
                backgroundColor: '#3B82EC',
            }
        ],
    };

    const handleSelectType = async (e) => {
        setType(e)
        let response = await ThongKeApi.statisticOrderByYear(year, e);
        let data = response.map((item) => item.ord_per_month)
        setSTTData(data)
    }

    const handleSelectYear = async (e) => {
        setYear(e)
        let response = await ThongKeApi.statisticOrderByYear(e, type);
        let data = response.map((item) => item.ord_per_month)
        setSTTData(data)
    }

    return (
        <Card className="flex-fill w-100">
            <Card.Header>
                <div className="card-actions float-right">
                    <Row>
                        <Col lg="6">
                            <Dropdown align='end' onSelect={handleSelectType}>
                                <Dropdown.Toggle variant="light" className="bg-white shadow-sm">
                                    Trạng thái đơn đặt
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ margin: 0 }}>
                                    {
                                        statusOrderColors.map(item => (
                                            <Dropdown.Item key={item.ordinary} eventKey={item.name}>{item.name}</Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col lg='1'></Col>
                        <Col lg="5">
                            <Dropdown align='end' onSelect={handleSelectYear}>
                                <Dropdown.Toggle variant="light" className="bg-white shadow-sm">
                                    Năm
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ margin: 0 }}>
                                    {
                                        yearData.map(item => (
                                            <Dropdown.Item key={item} eventKey={item}>{item}</Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </div>
                <Card.Title tag="h5" className="mb-0">
                    Thống kê
                </Card.Title>
            </Card.Header>
            <Card.Body className="d-flex">
                <div className="align-self-center w-100">
                    <div className="chart chart-lg">
                        <Bar data={data} options={options} />
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default BarChart