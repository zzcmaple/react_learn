import './index.scss'
import { useState } from 'react'
const initArr = () => {
  const arr = []
  for (let i = 1; i < 10; i++) {
    arr.push({
      sortNum: i,
      isSelect: false,
      isX: false,
      isWinBox: false
    })
  }
  return arr
}
export default function App() {
  const [arr, setArr] = useState(initArr())
  const [step, setStep] = useState(0)
  const [isWin, setIsWin] = useState(false)
  const [cantWin, setCantWin] = useState(false)
  const handleClick = (item) => {
    if (isWin || item.isSelect) return
    item.isSelect = true
    setStep(step + 1)
    item.isX = step % 2 !== 0
    setArr([...arr])
    checkWin()
    if (!arr.find(item => !item.isSelect)) {
      setCantWin(true)
    }
  }
  const checkWin = () => {
    const newArr = []
    for (let i = 0; i < 3; i++) {
      newArr.push(arr.slice(i * 3, i*3 + 3))
    }
    newArr.find((item, i) => {
      // 检查横向
      if (item[0].isSelect && item[1].isSelect && item[2].isSelect && (item[0].isX === item[1].isX && item[1].isX === item[2].isX)) {
        item[0].isWinBox = true
        item[1].isWinBox = true
        item[2].isWinBox = true
        setArr([...newArr.flat(1)])
        setIsWin(true)
        return true
      }
      // 检查纵向
      if (newArr[0][i].isSelect && newArr[1][i].isSelect && newArr[2][i].isSelect && (newArr[0][i].isX === newArr[1][i].isX && newArr[1][i].isX === newArr[2][i].isX)) {
        newArr[0][i].isWinBox = true
        newArr[1][i].isWinBox = true
        newArr[2][i].isWinBox = true
        setArr([...newArr.flat(1)])
        setIsWin(true)
        return true
      }
      // 检查对角线
      if (newArr[0][0].isSelect && newArr[1][1].isSelect && newArr[2][2].isSelect && (newArr[0][0].isX === newArr[1][1].isX && newArr[1][1].isX === newArr[2][2].isX)) {
        newArr[0][0].isWinBox = true
        newArr[1][1].isWinBox = true
        newArr[2][2].isWinBox = true
        setArr([...newArr.flat(1)])
        setIsWin(true)
        return true
      }
      if (newArr[0][2].isSelect && newArr[1][1].isSelect && newArr[2][0].isSelect && (newArr[0][2].isX === newArr[1][1].isX && newArr[1][1].isX === newArr[2][0].isX)) {
        newArr[0][2].isWinBox = true
        newArr[1][1].isWinBox = true
        newArr[2][0].isWinBox = true
        newArr[2][0].isWinBox = true
        setArr([...newArr.flat(1)])
        setIsWin(true)
        return true
      }
      return false
    })
  }
  const reset = () => {
    setArr(initArr())
    setStep(0)
    setIsWin(false)
  }
  return (
      <div>
        <div className="flex">
          <div>{ isWin ? '胜负已出！' : cantWin ? '看来你俩实力差不多嘛，重来重来！' : '盛世对决，棋逢对手' }</div>
          <div className="box">
            {arr.map((item) => {
              return (
                  <div
                      className={
                        item.isSelect
                            ? 'box_in ' + (item.isX ? 'select_X' : 'select_O') + (item.isWinBox ? ' win_box' : '')
                            : 'box_in'
                      }
                      key={item.sortNum}
                      onClick={() => handleClick(item)}
                  ></div>
              )
            })}
          </div>
          <button className="rest_btn" onClick={reset}>重置</button>
        </div>
      </div>
  )
}
