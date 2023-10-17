import {useState} from "react";
import {NavBar} from "../header/NavBar.jsx";
import {NavLink} from "react-router-dom";
import {DataIncome} from "./DataIncome.jsx";
import {DataExpense} from './DataExpense.jsx'
import {ChartIncome} from "./ChartIncome.jsx";
import {ChartExpense} from './ChartExpense.jsx'
import './Accueil.scss'
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
                <h1>Dashboard</h1>
                <section className="content-dash">
                    <NavLink  to={'/eleves'} id="ct">
                        <div className="title">
                            <h3>Elève</h3>
                            <h2>20.000</h2>
                        </div>
                        <p>Total élèves</p>
                    </NavLink>
                    <NavLink to={'/staffs'} id="ct">
                        <div className="title">
                            <h3>Staff</h3>
                            <h2>500</h2>
                        </div>

                        <p>Total staffs</p>
                    </NavLink>
                    <NavLink to={'/profs'} id="ct">
                        <div className="title">
                            <h3>Prof</h3>
                            <h2>100</h2>
                        </div>
                        <p>Total professeurs</p>
                    </NavLink>
                    <NavLink to={'/inscription'} id="ct">
                        <div className="title">
                            <h3>Incription</h3>
                            <h2>10</h2>
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