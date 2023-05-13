import { View, Text } from 'react-native'
import React from 'react'

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { useSelector } from 'react-redux'

const AllExpenses = () => {
  const expenses = useSelector((state) => state.expensesSlice.expenses)

  return (
    <ExpensesOutput 
    expenses={expenses}
    expensesPeriod="Total"
    fallbackText="No expenses registered found"
    />
  )
}

export default AllExpenses