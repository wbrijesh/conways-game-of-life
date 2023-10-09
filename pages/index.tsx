import { useState } from "react"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

type GridStateType = Array<Array<boolean>>;

function generateInitialGridState(size: number): GridStateType {
  const gridState: GridState = [];
  for (let i = 0; i < size; i++) {
    const row: Array<boolean> = [];
    for (let j = 0; j < size; j++) {
      row.push(false);
    }
    gridState.push(row);
  }
  return gridState;
}

function filledAt(grid: GridState, x: number, y: number): boolean {
  if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
    console.error('Coordinates are out of bounds. (found during filledAt function)');
  }

  return grid[x][y];
}


const Grid = ({size, gridState, toggleBox}: {size: number, gridState: GridStateType, toggleBox: () => void}) => {
  return (
    <div className="border-[0.5px] max-w-[600px] border-gray-400">
      {gridState.map((row, index_y) => (
        <div key={"row-" + index_y} className="flex">
          {row.map((filled, index_x) => (
            <div
              key={"y-" + index_y + "-x-" + index_x}
              id={"x-" + index_x + "-y-" + index_y}
              onClick={() => toggleBox(index_x, index_y)}
	      className={`border-[0.5px] border-gray-400 w-3 h-3 
		${index_x && filledAt(gridState, index_x, index_y) ? "bg-black" : "bg-yellow-100"}
	      `}
	    >
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  const [gridState, setGridState] = useState<GridStateType>(generateInitialGridState(50));

  function toggleBox(x: number, y: number) {
    window.alert(`togging at x: ${x} and y: ${y}`)

    if (x < 0 || x >= gridState.length || y < 0 || y >= gridState[0].length) {
      console.error('Coordinates are out of bounds. (found during toggleBox function)');
    }

    let tempGridState = gridState;
    tempGridState[x][y] = !tempGridState[x][y];
    setGridState(tempGridState)
  }

  return (
    <main className={`m-5  ${inter.className}`}>
      <p className="my-5">Conway's Game of Life</p>
      <Grid size={50} gridState={gridState} toggleBox={toggleBox} />
    </main>
  )
}
