import { useBudget } from "../hooks/useBudget"
import { AmountDisplay } from "./AmountDisplay"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export const BudgetTracker = () => {

  const {state,dispatch,remainingBudget,totalExpenses}=useBudget()

  const handleReset=()=>{
    dispatch({type:'reset-app'})
  }

  const percentaje=+((totalExpenses/state.budget)*100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
          <CircularProgressbar 
          value={percentaje}
          text={percentaje+"% Gastado"}
          styles={buildStyles({
            pathColor:percentaje===100?'#DC2626':'#3B82F6',
            trailColor:'#F5F5F5',
            textSize:8,
            textColor:percentaje===100?'#DC2626':'#3B82F6'
          })}>
            
          </CircularProgressbar>
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
          <button
          onClick={handleReset}
           className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg">
            Resetear App
          </button>
          <AmountDisplay label='Presupuesto' amount={state.budget}/>
          <AmountDisplay label='Disponible' amount={remainingBudget}/>
          <AmountDisplay label='Gastado' amount={totalExpenses}/>
        </div>
    </div>
  )
}
