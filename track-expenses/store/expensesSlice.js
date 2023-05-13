import { createSlice } from "@reduxjs/toolkit"

const expensesSlice = createSlice({
    name: "favorites",
    initialState: {
       expenses:  []
    },
    reducers: {
        addExpense: (state, action) => {
            state.expenses = [...state.expenses, {
                description: action.payload.description,
                amount: action.payload.amount,
                date: action.payload.date,
                id : Math.random().toString()
            }]
        },
        deleteExpense: (state, action) => {
            state.expenses.splice(state.expenses.findIndex((expense) => expense.id === action.payload.id), 1)
        },
        updateExpense: (state, action) => {
            const updatableExpenseIndex = state.expenses.findIndex((expense) => expense.id === action.payload.id)

            const updatableExpense = state.expenses[updatableExpenseIndex]

            const updatedItem = {
                ...updatableExpense,
                description: action.payload.description,
                amount: action.payload.amount,
                date: action.payload.date,
            }

            const updatedExpenses = [...state.expenses]
            updatedExpenses[updatableExpenseIndex] = updatedItem
            state.expenses = updatedExpenses
        },
        setExpenses: (state, action) => {
            state.expenses = action.payload
        }
    }
})

export const setExpenses = expensesSlice.actions.setExpenses
export const addExpense = expensesSlice.actions.addExpense
export const deleteExpense = expensesSlice.actions.deleteExpense
export const updateExpense = expensesSlice.actions.updateExpense
export default expensesSlice.reducer