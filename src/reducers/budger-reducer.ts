import { Category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from "uuid"

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'set-editedId', payload: { id: Expense['id'] } } |
    { type: 'add-filter-category', payload: { id: Category['id'] } } |
    { type: 'updateExpense', payload: { expense: Expense } } |
    { type: 'show-modal' } |
    { type: 'reset-app' } |
    { type: 'close-modal' }


export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editedId: Expense['id'],
    currentCategory:Category['id']
}

const initialBudget=()=>{
    const budget=localStorage.getItem('budget')
    return budget?+budget:0
}

const initialExpenses=()=>{
    const expenses=localStorage.getItem('expenses')
    return expenses?JSON.parse(expenses):[]
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editedId: '',
    currentCategory:''
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {
    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type == 'reset-app') {
        return {
            ...state,
            budget: 0,
            expenses:[]
        }
    }

    if (action.type == 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if (action.type == 'close-modal') {
        return {
            ...state,
            modal: false,
            editedId:''
        }
    }
    if (action.type == 'add-expense') {
        const expense = createExpense(action.payload.expense);
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }
    if (action.type == 'remove-expense') {
        const expensesUpdate = state.expenses.filter(expense => expense.id != action.payload.id)
        return {
            ...state,
            expenses: expensesUpdate
        }
    }
    if (action.type === 'set-editedId') {
        return {
            ...state,
            editedId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'updateExpense') {
        return { ...state,
            expenses:state.expenses.map(updatedExpense=>updatedExpense.id==state.editedId?action.payload.expense:updatedExpense),
            modal:false,
            editedId:''
        }
    }
    if(action.type='add-filter-category')
        {
            return {
                ...state,
                currentCategory:action.payload.id
            }
        }

    return state


}