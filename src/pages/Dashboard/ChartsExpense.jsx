import {Empty} from "antd";
import moment from "moment";
import {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import {supabase} from "../../Config/SupabaseConfig";

function ChartsExpense() {
	const [chartExpense, setChartExpense] = useState([]);
	
	const expenses = {
		stroke: {
			curve: "smooth",
		},
		chart: {
			id: "area",
		},
		label: {
			show: true,
		},
		series: [
			{
				name: "Dépense",
				data: chartExpense.map((nums) => nums.amount),
				color: "#ff2424",
				fontWeight: 800,
			},
		],
		xaxis: {
			type: "datetime",
			categories: chartExpense.map((dates) =>
					moment(dates.date).format("DD/MMMM/YYYY"),
			),
		},
	};
	
	
	useEffect(() => {
		async function fetchDataChart() {
			const expenseData = await supabase.from("expense").select("date, amount");
			if (expenseData.data) {
				setChartExpense(expenseData.data.map((entry) => entry));
			}
		}
		
		fetchDataChart();
	}, [chartExpense]);
	
	return (
			<>
				{chartExpense.length > 0 ? (
						<div className="flex">
							<Chart
									type="area"
									options={expenses}
									series={expenses.series}
									width={"550"}
									height={"320"}
							/>
						</div>
				) : (
						<Empty description={"Aucune dépense pour ce moment"}/>
				)}
			</>
	);
}

export default ChartsExpense;
