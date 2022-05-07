import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ThongKeApi from '../../../api/ThongKeApi'
import { Card, Dropdown } from 'react-bootstrap';
import { MoreHorizontal } from 'react-feather';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = () => {
    const [sttData, setSTTData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let response = await ThongKeApi.statisticOrderByYear(2022, '');
            let data = response.map((item) => item.ord_per_month)
            setSTTData(data)
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
                text: 'Số đơn đặt trong năm với loại cụ thể',
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

    return (
        <Card className="flex-fill w-100">
            <Card.Header>
                <div className="card-actions float-right">
                    <Dropdown align='end'>
                        <Dropdown.Toggle>
                            <MoreHorizontal />
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ margin: 0 }}>
                            <Dropdown.Item>Action</Dropdown.Item>
                            <Dropdown.Item>Another Action</Dropdown.Item>
                            <Dropdown.Item>Something else here</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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