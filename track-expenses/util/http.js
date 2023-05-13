import axios from "axios";


export function storeExpense(expenseData) {
    axios.post(
        "https://react-native-expenses-1dd2d-default-rtdb.europe-west1.firebasedatabase.app/expenses.json",
        expenseData
    )
}


export async function getExpenses() {
  const response = await axios.get("https://react-native-expenses-1dd2d-default-rtdb.europe-west1.firebasedatabase.app/expenses.json")
//   console.log(JSON.parse(response.data["-NS1Xt-nJvGTHduAkWOR"].date))


  const expenses = []
  for (const key in response.data) {
    const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: JSON.parse(response.data[key].date),
        description:  response.data[key].description
    }
    expenses.push(expenseObj)
  }
//   console.log(expenses)
  return expenses
}