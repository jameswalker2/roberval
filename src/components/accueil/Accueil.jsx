import {NavBar} from "../header/NavBar.jsx";
import './Accueil.scss'
import {NavLink} from "react-router-dom";
import {ChartIncome} from "./ChartIncome.jsx";
import {ChartExpense} from './ChartExpense.jsx'
import {useState} from "react";
import {DataIncome} from "./DataIncome.jsx";
import {DataExpense} from './DataExpense.jsx'
export function Accueil() {

    const [dataIncome, setDataIncome] = useState({
        labels: DataIncome.map((data) => data.week),
        datasets: [{
            label: "Rentrée",
            data: DataIncome.map((data) => data.income),
            backgroundColor: [
                '#30038B',
                '#00D1FF',
                '#FF0000',
                '#FFA901'
            ]
        },
        ],
    });

    const [dataExpense, setDataExpense] = useState({
        labels: DataExpense.map((data) => data.week),
        datasets: [{
            label: "Sortie",
            data: DataExpense.map((data) => data.expense),
            backgroundColor: [
                '#30038B',
                '#00D1FF',
                '#FF0000',
                '#FFA901'
            ]
        },
        ],
    });


    return (
        <>

            <NavBar/>
            <section className="dashboard">
                <h2>Dashboard</h2>
                <section className="content-dash">
                    <NavLink  to={'/eleves'} id="ct-el">
                        <div className="title">
                            <h3>Elève</h3>
                            <h2>20.000</h2>
                        </div>
                        <p>Total élèves</p>
                    </NavLink>
                    <NavLink id="ct-st">
                        <div className="title">
                            <h3>Staff</h3>
                            <h2>500</h2>
                        </div>

                        <p>Total staffs</p>
                    </NavLink>
                    <NavLink id="ct-pf">
                        <div className="title">
                            <h3>Prof</h3>
                            <h2>100</h2>
                        </div>
                        <p>Total professeurs</p>
                    </NavLink>
                </section>
            </section>
            <section className="revenu">
                <h1 id="rev-h1">Total revenu du mois Octobre</h1>
                <div id="revenu-bar">
                <ChartIncome chartData={dataIncome}/>
                </div>
            </section>
            <section className="depense">
                <h1 id="dep-h1">Total depense du mois Octobre</h1>
                <div id="depense-bar">
                <ChartExpense chartData={dataExpense}/>
                </div>
            </section>
        </>
    )
}