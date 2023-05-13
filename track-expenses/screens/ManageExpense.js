import { StyleSheet, View, TextInput } from 'react-native'
import React, { useLayoutEffect } from 'react'
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import { useDispatch, useSelector } from 'react-redux'

import { deleteExpense } from '../store/expensesSlice'
import { addExpense } from '../store/expensesSlice'
import { updateExpense } from '../store/expensesSlice'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { storeExpense } from '../util/http'


const ManageExpense = ({route, navigation}) => {
  const expenses = useSelector((state) => state.expensesSlice.expenses)
  const dispatch = useDispatch()
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  const selectedExpense = expenses.find(expense => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  }, [navigation, isEditing])


  function deleteExpenseHandler() {
    dispatch(deleteExpense({id: editedExpenseId}))
    navigation.goBack()
  }

  function cancelHandler() {
    navigation.goBack()
  }

  function confirmHandler(expenseData) {
    if(isEditing) {
      dispatch(updateExpense({
        id: editedExpenseId,
        ...expenseData
      }))
    } else {
      storeExpense(expenseData)
      dispatch(addExpense(expenseData))
    }
    navigation.goBack()
  }
  

  return (
    <View style={styles.container}>
      <ExpenseForm 
      submitButtonLabel={isEditing ? "Update" : "Add"}
      onCancel={cancelHandler}
      onSubmit={confirmHandler}
      defaultValues={selectedExpense}
      />

      {isEditing && 
      (
        <View style={styles.deleteContainer}>
          <IconButton onPress={deleteExpenseHandler} icon="trash" color={GlobalStyles.colors.error500} size={36}/>
        </View>
      )
      }
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  }
})