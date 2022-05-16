import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card } from 'react-bootstrap';
import ThongKeApi from '../../../api/ThongKeApi'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const ProductPieChart = () => {
    const [sttData, setSTTData] = useState([])
    const [labelData, setLabelData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let response = await ThongKeApi.categorySoldWithOrder();
            let labelData = response.map((item) => item.tenLoai)
            setLabelData(labelData)

            let stData = response.map((item) => item.soSPBan)
            setSTTData(stData)
        }
        fetchData()
    }, [])


    const data = {
        labels: labelData,
        datasets: [
            {
                label: '# of Votes',
                data: sttData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Card className="flex-fill w-100">
            <Card.Header>
                <Card.Title tag="h5" className="mb-0">
                    Top 4 loại bán được nhiều sản phẩm
                </Card.Title>
            </Card.Header>
            <Card.Body className="d-flex">
                <Pie data={data} />
            </Card.Body>
        </Card>
    )
}

export default ProductPieChart