import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
// eslint-disable-next-line react/prop-types
export function ChartIncome({chartData}) {
    return (
        <>
            <div className="bar-income">
                <Bar data={chartData}/>
            </div>
        </>
    )
}