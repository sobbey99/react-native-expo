import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { useDispatch, useSelector } from 'react-redux'
import { getDateMinusDays } from '../util/date'
import { getExpenses } from '../util/http'
import { useEffect, useState } from 'react'
import { setExpenses } from '../store/expensesSlice'



const RecentExpenses = () => {
  const dispatch = useDispatch()
  // const expenses = useSelector((state) => state.expensesSlice.expenses)
  const [fetchedExpenses, setFetchedExpenses] = useState([])
  
  useEffect(() => {
    async function fetchAllData() {
      const expenses =  await getExpenses()
      dispatch(setExpenses(expenses))
      setFetchedExpenses(expenses)
    }

    fetchAllData()
  }, [])


  const recentExpenses = fetchedExpenses.filter((expense) => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)

    const date = new Date(expense.date);
    return date > date7DaysAgo // 2023-03-25
  })


  return (
    <ExpensesOutput 
    expenses={recentExpenses}
    expensesPeriod="Last 7 Days"
    fallbackText="No expenses registered for the last 7 days"
    />
  )
}

export default RecentExpenses