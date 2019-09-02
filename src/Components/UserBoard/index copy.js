import React from 'react'

import Cell from '../Cell/index'
import NeonText from '../NeonText/index'
import { createBoard, toggleAdjCells } from '../../utils/board'
import './style.css'

const Board = ({ rows, cols, changeLightStartOn }) => {

  const [board, setBoard] = React.useState(createBoard(rows, cols, changeLightStartOn))
  const [hasWon, setHasWon] = React.useState(false)

  // while (board.every(arr => arr.every(val => !val))) {

  //   for (let i = 0; i < 3; i++) {
  //     for (let j = 0; j < 3; j++) {
  //       console.log(board)
  //       if (board.every(arr => arr.every(val => !val))) {
  //         console.log('SOLVED!')
  //         break
  //       }
  //       setTimeout(() => setBoard(toggleAdjCells(board, rows, cols, i, j)), 1000)
  //     }
  //   }
  // }

  const handleCellClick = (board, rows, cols, x, y) => {
    setBoard(toggleAdjCells(board, rows, cols, x, y))
    const hasWon = board.every(arr => arr.every(val => !val))
    hasWon && setTimeout(() => setHasWon(true), 250)
  }

  return (
    <>
      {hasWon ? <NeonText first="You" second="Won" /> :
        <table className="board" cellSpacing="4">
          <tbody>
            {board.map((arr, x) =>
              <tr key={x}>
                {arr.map((val, y) =>
                  <Cell key={`${x}-${y}`} isLit={val}
                    toggleCell={() => handleCellClick(board, rows, cols, x, y)} />)}
              </tr>
            )}
          </tbody>
        </table>
      }
    </>
  )
}

export default Board