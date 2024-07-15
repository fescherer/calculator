import { useState } from 'react'
import { data } from './util/data'
import { TCalculatorData } from './@types/calculator-data'

function App() {
  const [number1, setNumber1] = useState('')
  const [number2, setNumber2] = useState('')
  const [operator, setOperator] = useState('')

  function addValueToDisplay(item: TCalculatorData) {
    if (item.type === 'invalid') return

    if (item.type === 'number' && !operator) setNumber1((prev) => `${prev}${item.value}`)
    if (item.type === 'number' && operator) setNumber2((prev) => `${prev}${item.value}`)
    if (item.type === 'operator') {

      if (item.value === '=') {
        if (number1 && number2) {
          let calcResult = 0
          if (operator === '+') calcResult = parseFloat(number1) + parseFloat(number2)
          if (operator === '-') calcResult = parseFloat(number1) - parseFloat(number2)
          if (operator === '/') calcResult = parseFloat(number1) / parseFloat(number2)
          if (operator === '*') calcResult = parseFloat(number1) * parseFloat(number2)
          setNumber1(calcResult.toString())
          setNumber2('')
          setOperator('')
        }
        return
      }
      if (item.value === '<-') {
        console.log('1', number1, number2, operator,)
        if (number2) setNumber2(prev => prev.slice(0, -1))
        else if (operator) setOperator('')
        else setNumber1(prev => prev.slice(0, -1))

        return
      }
      if (item.value === 'C') {
        setNumber1('')
        setNumber2('')
        setOperator('')
        return
      }
      setOperator(item.value)
    }
  }

  return (
    <div className='m-auto flex w-full max-w-lg flex-col items-center justify-center p-4'>
      <div className='my-2 flex w-full justify-end rounded bg-slate-900 p-4'>{(number1 + operator + number2) || 0}</div>
      <div className='grid w-full grid-cols-4 grid-rows-4 gap-2'>
        {
          data.map(item => (
            <button onClick={() => addValueToDisplay(item)} disabled={item.type === 'invalid'} key={item.value}>{item.value}</button>
          ))
        }
      </div>
    </div>
  )
}

export default App
