import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

const BudgetForm = () => {

    const {dispatch} = useBudget()
    const [budget,setBudget]=useState(0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch({type:'add-budget',payload:{budget}})
    }

    return (
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">Definir Presupuesto</label>
                <input type="number"
                    id="budget"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input type="submit" value="Definir Presupuesto"
                className="bg-blue-600 hover:bg-blue-800 cursor-pointer w-full p-2 text-white duration-75 font-black uppercase disabled:opacity-40"  
                disabled={isValid} />
        </form>
    )
}

export default BudgetForm