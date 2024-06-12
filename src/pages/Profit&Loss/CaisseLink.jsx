import {useEffect, useState} from "react";
import {supabase} from "../../Config/SupabaseConfig";

// eslint-disable-next-line react/prop-types
function CaisseLink({dateRange}) {
	const [balance, setBalance] = useState([]);
	const [incomeTotal, setIncomeTotal] = useState(0);
	const [expenseTotal, setExpenseTotal] = useState(0);
	const [profit, setProfit] = useState(0);
	const [incomePercent, setIncomePercent] = useState(0);
	const [expensePercent, setExpensePercent] = useState(0);
	const [profitPercent, setProfitPercent] = useState(0);
	
	useEffect(() => {
		const handleFetchData = async () => {
			try {
				let incomesQuery = supabase.from("income").select("*");
				let expensesQuery = supabase.from("expense").select("*");
				
				if (dateRange) {
					const [startDate, endDate] = dateRange;
					incomesQuery = incomesQuery
					.gte("date", startDate)
					.lte("date", endDate);
					expensesQuery = expensesQuery
					.gte("date", startDate)
					.lte("date", endDate);
				}
				
				const {data: incomes, error: incomesError} = await incomesQuery;
				
				if (incomesError) throw incomesError;
				
				const totalIncome = incomes.reduce(
						(sum, record) => sum + record.amount,
						0,
				);
				
				const {data: expenses, error: expensesError} = await expensesQuery;
				
				if (expensesError) throw expensesError;
				
				const totalExpenses = expenses.reduce(
						(sum, record) => sum + record.amount,
						0,
				);
				
				const calculatedProfit = totalIncome - totalExpenses;
				
				const incomePercent = ((totalIncome / balance) * 100).toFixed(0);
				const expensePercent = ((totalExpenses / balance) * 100).toFixed(0);
				const profitPercent = ((calculatedProfit / balance) * 100).toFixed(0);
				
				setIncomeTotal(totalIncome);
				setExpenseTotal(totalExpenses);
				setProfit(calculatedProfit);
				setIncomePercent(incomePercent);
				setExpensePercent(expensePercent);
				setProfitPercent(profitPercent);
				
				const {data: students, error: studentsError} = await supabase
				.from("students")
				.select("*");
				
				if (studentsError) {
					throw studentsError;
				}
				
				const {data: classes, error: classesError} = await supabase
				.from("classes")
				.select("*");
				
				if (classesError) {
					throw classesError;
				}
				
				const {data: generatedPaiement, error: generatedPaiementError} =
						await supabase.from("generated_paiement").select("*");
				
				if (generatedPaiementError) {
					throw generatedPaiementError;
				}
				
				const excludedStudentIds = new Set(
						generatedPaiement
						.filter((paiement) => paiement.bourse || paiement.exo)
						.map((paiement) => paiement.student_id),
				);
				
				const classTotals = {};
				
				for (const student of students) {
					if (!excludedStudentIds.has(student.id)) {
						const classId = student.classe;
						if (!classTotals[classId]) {
							classTotals[classId] = 0;
						}
						classTotals[classId]++;
					}
				}
				
				let totalPaidStudentsSum = 0;
				for (const classInfo of classes) {
					const classId = classInfo.classeName;
					if (classTotals[classId]) {
						const totalStudents = classTotals[classId];
						const classeAmount = classInfo.classeAmount;
						const totalPaidStudents = totalStudents * classeAmount;
						totalPaidStudentsSum += totalPaidStudents;
					}
				}
				setBalance(totalPaidStudentsSum);
			} catch (error) {
				console.error(error);
			}
		};
		
		handleFetchData();
	}, [balance, dateRange]);
	
	return (
			<>
				<div>
					<div className="flex">
						<div
								className="w-[22%] bg-white max-xs-w mr-[2.5%] p-4 m-0 rounded-lg shadow-sm
        transition ease-in-out delay-15 
        hover:-translate-y-1 hover:scale-110 duration-300">
							<div className="stat-title flex items-center text-supportingColor1 mb-5">
								<h1>Total Revenu</h1>
								<span
										className="text-supportingColor2 font-semibold ml-5 bg-opacity-20 bg-supportingColor2
              px-2 rounded-lg">
                {incomePercent}%
              </span>
							</div>
							<div className="stat-value text-3xl text-supportingColor2">
								{incomeTotal.toLocaleString()} ht
							</div>
						</div>
						
						<div
								className="w-[22%] bg-white max-xs-w mr-[2.5%] p-4 m-0 rounded-lg shadow-sm
        transition ease-in-out delay-15 
        hover:-translate-y-1 hover:scale-110 duration-300">
							<div className="stat-title flex items-center text-supportingColor1 mb-5">
								<h1>Total Dépense</h1>
								<span
										className="text-supportingColor3 font-semibold ml-5 bg-opacity-20 bg-supportingColor3
              px-2 rounded-lg">
                {expensePercent}%
              </span>
							</div>
							<div className="stat-value text-3xl text-supportingColor3">
								{expenseTotal.toLocaleString()} ht
							</div>
						</div>
						<div
								className="w-[22%] bg-white max-xs-w mr-[2.5%] p-4 m-0 rounded-lg shadow-sm
        transition ease-in-out delay-15 
        hover:-translate-y-1 hover:scale-110 duration-300">
							<div className="stat-title flex items-center text-supportingColor1 mb-5">
								<h1>Total Profit</h1>
								<span
										className="text-supportingColor4 font-semibold ml-5 bg-opacity-20 bg-supportingColor4
              px-2 rounded-lg">
                {profitPercent}%
              </span>
							</div>
							<div className="stat-value text-3xl text-supportingColor4">
								{profit.toLocaleString()} ht
							</div>
						</div>
						<div
								className="w-[22%] bg-white max-xs-w p-4 m-0 rounded-lg shadow-sm
        transition ease-in-out delay-15 
        hover:-translate-y-1 hover:scale-110 duration-300">
							<div className="stat-title flex items-center text-supportingColor1 mb-5">
								<h1>Estimation Annuel</h1>
								<span
										className="text-primaryColor font-semibold ml-5 bg-opacity-20 bg-primaryColor
              px-2 rounded-lg">
                100%
              </span>
							</div>
							<div className="stat-value text-3xl text-primaryColor">
								{balance.toLocaleString() || 0} ht
							</div>
						</div>
					</div>
				</div>
			</>
	);
}

export default CaisseLink;
