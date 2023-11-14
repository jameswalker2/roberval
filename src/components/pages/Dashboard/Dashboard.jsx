import {useState, useEffect} from "react";
import {NavBar} from "../../header/NavBar.jsx";
import {NavLink} from "react-router-dom";
import {DataIncome} from "../../accueil/DataIncome.jsx";
import {DataExpense} from '../../accueil/DataExpense.jsx'
import {ChartIncome} from "../../accueil/ChartIncome.jsx";
import {ChartExpense} from '../../accueil/ChartExpense.jsx'
import {motion} from "framer-motion";
import {supabase} from '../../login/SupabaseConfig.jsx'
import './Dashboard.scss'
 export function  Dashboard() {

    const [text, setText] = useState([])

     useEffect(() => {

         async function numStudents () {
             const {data, error} = await supabase
                 .from('students')
                 .select("*")

             if(data){
                 setText(data)
             }
             if (error) throw error
         }

          numStudents()
     }, []);


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
   // console.log(setDataIncome, setDataExpense)


    return (
        <>
            <NavBar/>
            <motion.div
              initial={{opacity: 0, scaleY: 0}}
              animate={{opacity: 1, scaleY: 1}}
              exit={{opacity: 0, scaleY: 0}}
              transition={{duration: 0.5, easeinout: [0.22, 1, 0.36, 1]}}>
              <div className="container_dash">
                <section className="dashboard">
                  <h1>Dashboard</h1>
                  <section className="content-dash">
                    <NavLink  to={'/eleves'} id="ct">
                        <div className="title">
                            <h3>Elève</h3>
                            <h2>{text.length}</h2>
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
              </div>
            </motion.div>
        </>
    )
}
