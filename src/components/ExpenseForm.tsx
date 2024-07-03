import DatePicker from "react-date-picker";
import { categories } from "../data/categories";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export const ExpenseForm = () => {

    const initialExpense:DraftExpense = {
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    }

    const [expense, setExpense] = useState<DraftExpense>(initialExpense)

    const [previousAmount,setPreviousAmount]=useState(0)

    const [error, setError] = useState('')
    const { dispatch,state,remainingBudget } = useBudget()

    useEffect(()=>{
        if(state.editedId)
            {
                const editingExpense=state.expenses.filter(editedExpense=>editedExpense.id===state.editedId)[0]
                setPreviousAmount(editingExpense.amount)
                setExpense(editingExpense)
            }
    },[state.editedId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmount = ['amount'].includes(name)
        setExpense({ ...expense, [name]: isAmount ? +value : value })
    }

    const handleChangeDate = (value: Value) => {
        setExpense({ ...expense, date: value })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(expense).some(value => value == "")) {
            setError("Todos los campos son obligatorios");
            return
        }

        if(expense.amount-previousAmount>remainingBudget){
            setError("Se está excediendo el presupuesto definido");
            return
        }

        if(state.editedId){
            dispatch({type:'updateExpense',payload:{expense:{id:state.editedId,...expense}}})
        }else{
            dispatch({ type: 'add-expense', payload: { expense } })
        }  
        setExpense(initialExpense)
    }

    return (
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                {state.editedId?'Guardar cambios':'Nuevo Gasto'}
            </legend>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
                <input type="text"
                    id="expenseName"
                    placeholder="Añade nombre del gasto"
                    className="bg-slate-200 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Cantidad:</label>
                <input type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto (Ejm: 300)"
                    className="bg-slate-200 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Categorias:</label>
                <select name="category"
                    id="category"
                    className="bg-slate-200 p-2"
                    value={expense.category}
                    onChange={handleChange}>
                    <option value="">-- Seleccione --</option>
                    {categories.map((e) => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">Fecha Gasto:</label>
                <DatePicker className="bg-slate-100 p-2" value={expense.date} onChange={handleChangeDate} />
            </div>
            <input type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editedId?'Guardar Cambios':'Registrar Gasto'} />
        </form>
    )
}
