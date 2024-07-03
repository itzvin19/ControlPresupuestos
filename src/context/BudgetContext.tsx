import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react";
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budger-reducer";

type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>,
    totalExpenses:number,
    remainingBudget:number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const totalExpenses=useMemo(()=>state.expenses.reduce((total,expense)=>expense.amount+total,0),[state.expenses])
    const remainingBudget=state.budget-totalExpenses

    return (
        <BudgetContext.Provider value={{ state, dispatch, totalExpenses,remainingBudget }}>
            {children}
        </BudgetContext.Provider>
    )
}