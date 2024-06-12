import {DatePicker} from "antd";
import {Circle, Download} from "lucide-react";
import {useState} from "react";
import {Line} from "react-chartjs-2";
import {NavBar} from "../../components/Navbar/NavBar";
import CaisseLink from "../Profit&Loss/CaisseLink";

const {RangePicker} = DatePicker;

export default function Gain() {
	const [dateRange, setDateRange] = useState(null);
	const [dataIncome, setDataIncome] = useState([]);
	const [dataExpense, setDataExpense] = useState([]);
	const [date, setDate] = useState([]);
	const [totalIncome, setTotalIncome] = useState(0);
	const [totalExpense, setTotalExpense] = useState(0);
	const [profit, setProfit] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [showPeriod, setShowPeriod] = useState(false);
	const [showAnnual, setShowAnnual] = useState(false);
	const [hidePeriod, setHidePeriod] = useState(false);
	const [chartDataG, setChartDataG] = useState({
		labels: [
			"Dimanche",
			"Lundi",
			"Mardi",
			"Mercredi",
			"Jeudi",
			"Vendredi",
			"Samedi",
		],
		datasets: [
			{
				label: "Revenu",
				data: [1200, 9500, 1800, 1400, 2000, 2200],
				fill: true,
				backgroundColor: "rgba(10, 700, 122, 0.2)",
				borderColor: "rgb(10, 700, 122)",
				borderWidth: 2,
			},
			{
				label: "Dépense",
				data: [100, 500, 1800, 100, 7000, 200],
				fill: true,
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgb(255, 99, 132)",
				borderWidth: 2,
			},
			// {
			//   label: "Perte",
			//   data: [10000, 10000, 10000, 10000, 10000, 10000],
			//   fill: true,
			//   backgroundColor: "rgba(255, 215, 132, 0.2)",
			//   borderColor: "rgb(255, 215, 32)",
			//   borderWidth: 2,
			// },
		],
	});
	
	const options = {
		scales: {
			x: {
				display: true,
			},
			y: {
				beginAtZero: true,
				display: true,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
		maintainAspectRatio: false,
		responsive: true,
	};
	
	const hide = () => {
		setHidePeriod(false);
	};
	
	const handleResetHideP = (hideP) => {
		if (hideP) {
			setShowPeriod(false);
		}
	};
	
	const handleResetHideA = (hideA) => {
		if (hideA) {
			setShowAnnual(false);
		}
	};
	
	const onDateChange = (dates) => {
		if (dates) {
			setDateRange(dates.map((date) => date.format("YYYY-MM-DD")));
		} else {
			setDateRange(null);
		}
	};
	
	return (
			<>
				<NavBar/>
				<div className="h-screen overflow-y-scroll pl-64 py-5 bg-primaryColor bg-opacity-10">
					<div className="w-[95%] p-4 text-supportingColor1 bg-white rounded-lg shadow-sm mb-10">
						<h1 className="font-semibold text-2xl">Fiche de rapport</h1>
					</div>
					<div className="flex ml-[58%] ">
						<button
								// onClick={generatePDF}
								className="btn font-normal bg-primaryColor border-none text-white hover:text-primaryColor
          hover:bg-slate-100">
							<Download strokeWidth={1.45}/>
							Exporter
						</button>
						<RangePicker
								onChange={onDateChange}
								placeholder={"Sélectionner une date"}
								className=" h-12  border-primaryColor border-2 rounded-lg bg-white ml-5
          focus:file-input-primaryColor mb-5"
						/>
					</div>
					
					<CaisseLink dateRange={dateRange}/>
					<div className="w-[95%] mt-10  p-4 bg-white rounded-lg shadow-sm">
						<div className="flex justify-between items-center mb-5">
							<h2>Analise annuel</h2>
							<div className="flex items-center">
								<button
										type="search"
										className="btn btn-xs text-xs h-10 w-24 border-none text-white bg-primaryColor
              hover:bg-slate-100 hover:text-primaryColor active:bg-slate-100">
									Search
								</button>
							</div>
						</div>
						<div>
							<Line className="h-80 w-40 " data={chartDataG} options={options}/>
						</div>
						<div className="flex flex-auto justify-center mt-5 mb-0">
							<h4 className="text-supportingColor1 flex items-center ">
								<Circle className="text-supportingColor2 bg-supportingColor2 rounded-full w-2 h-2 mr-2"/>
								Revenu
							</h4>
							<h4 className="text-supportingColor1 flex items-center ">
								<Circle className="text-supportingColor3 bg-supportingColor3 rounded-full w-2 h-2 mr-2 ml-5"/>
								Dépense
							</h4>
							<h4 className="text-supportingColor1 flex items-center ">
								<Circle className="text-supportingColor4 bg-supportingColor4 rounded-full w-2 h-2 mr-2 ml-5"/>
								Estimation payroll
							</h4>
						</div>
					</div>
					{/* </div> */}
					
					<div className="w-[95%] p-4 mt-10 bg-white rounded-lg shadow-sm">
						<div className="font- text-supportingColor1 mb-5">
							<h2>Plus détails</h2>
						</div>
						<div className="overflow-y-hidden overflow-x-auto h-auto mt-10 rounded-lg bg-white p-4">
							<table className="table table-xs">
								<thead
										key="thead"
										className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10">
								<tr>
									<th>Date</th>
									<th>Revenu</th>
									<th>Dépense</th>
									<th>Profit ou Perte</th>
									<th>Actions</th>
								</tr>
								</thead>
								<tbody key={"student.id"} className="font-semibold">
								<tr>
									<td>0</td>
									<td>$ 20000</td>
									<td>$ 1000</td>
									<td>$ 1000</td>
									<td>
										<button className="btn bg-color2 hover:bg-supportingColor1 text-white btn-xs">
											Détails
										</button>
										<button className="btn bg-red-600 hover:bg-red-700 text-white btn-xs">
											Delete
										</button>
									</td>
								</tr>
								</tbody>
							</table>
						</div>
						{showResult && dateRange.length === 2 && (
								<div>
									<table className="table table-xs">
										<thead className="text-color2 text-sm bg-gray-50 hover:bg-gray-100">
										<tr>
											<th>Date</th>
											<th>Revenu</th>
											<th>Dépense</th>
											<th>Profit ou Perte</th>
											<th>Actions</th>
										</tr>
										</thead>
										<tbody className="text-2xl font-semibold">
										<tr>
											<td>
												{dateRange[0].format("DD/MM/YYYY")} -{" "}
												{dateRange[1].format("DD/MM/YYYY")}
											</td>
											<td>$ {totalIncome}</td>
											<td>$ {totalExpense}</td>
											<td>$ {profit}</td>
											<td>
												<button className="btn bg-color2 hover:bg-color1 text-white btn-xs">
													Détails
												</button>
												<button className="btn bg-red-600 hover:bg-red-700 text-white btn-xs">
													Delete
												</button>
											</td>
										</tr>
										</tbody>
									</table>
								</div>
						)}
					</div>
				</div>
			</>
	);
}
