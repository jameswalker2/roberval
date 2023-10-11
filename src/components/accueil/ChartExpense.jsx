import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
// eslint-disable-next-line react/prop-types
export function ChartExpense({chartData}) {
    return (
        <>
            <div className="bar">
                <div className="bar-expense">
                <Bar data={chartData}/>
                </div>
            </div>
        </>
    )
}