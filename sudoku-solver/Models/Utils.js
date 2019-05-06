 const suffleArray = (arr) => {
  let out = []
  let arrCopy = [...arr]
  let array = new Array(arrCopy.length)
  for (let i = 0; i < array.length; i++) {
    let ran = Math.floor(Math.random() * arrCopy.length)
    let a = arrCopy.splice(ran, 1)[0]
    out.push(a)
  }
  return out
}
 
 
 const pickRandom = arr => {
   // console.log(arr.length)
  let randomIndex = Math.floor(Math.random() * arr.length)
  // console.log(randomIndex)
  return arr[randomIndex] 
 }
 
 
//   generateCells() {
//     let array = Array.from(new Array(9), (x, index) => index + 1)
//     let possibleCols = Array.from(new Array(9), (x, index) => [...array])
//     let possibleRows = Array.from(new Array(9), (x, index) => [...array])
//     let possibleBoxes = Array.from(new Array(9), (x, index) => [...array])

//     // let possibleValues = Array.from(new Array(9), (x, index) => [...array])

//     for (let i = 0; i < this.rows; i++) {
//       for (let j = 0; j < this.cols; j++) {
//         let cell = this.cells[i][j]
//         // let randomValue = pickRandom(possibleCols[i])

//         // let colIndexToRemove = possibleCols[i].indexOf(randomValue)

//         const getAvaliableSubset = (colSubset, rowSubset, boxSubset) => {
//           let s1 = []
//           let s2 = []
//           colSubset.forEach(r => {
//             if (rowSubset.indexOf(r) > -1) {
//               s1.push(r)
//             }
//           })

//           s1.forEach(r => {
//             if (boxSubset.indexOf(r) > -1) {
//               s2.push(r)
//             }
//           })

//           return s2
//         }

//         let colSubset = possibleCols[i]
//         let rowSubset = possibleRows[j]
//         let boxSubset = possibleBoxes[Math.floor(j / 3) + Math.floor(i / 3) * 3]

//         let avaliableSubset = getAvaliableSubset(colSubset, rowSubset, boxSubset)
        
//         if (avaliableSubset.length === 0) {
//           // need backtracking
//           // this.generateCells()
//           // break;
//          // console.log('boo') 
//         }
//         let randomValue = pickRandom(avaliableSubset)
//         if (colSubset.indexOf(randomValue) > -1) {
//           colSubset.splice(colSubset.indexOf(randomValue), 1)
//         }
//         // colSubset.splice(colSubset.indexOf(randomValue), 1)
//         rowSubset.splice(rowSubset.indexOf(randomValue), 1)
//         boxSubset.splice(boxSubset.indexOf(randomValue), 1)

//         cell.number = randomValue

//       }
//     }
//   }
 
 
 
 
//    generateCells() {
//     const dfs = (index = Math.floor(Math.random() * 81),
//       possibleCols = Array.from(new Array(9), (x, ind) => Array.from(new Array(9), (x, index) => index + 1)),
//       possibleRows = Array.from(new Array(9), (x, ind) => Array.from(new Array(9), (x, index) => index + 1)),
//       possibleBoxes = Array.from(new Array(9), (x, ind) => Array.from(new Array(9), (x, index) => index + 1)),
//       unvisited = Array.from(new Array(81), (x, ind) => ind)) => {
//       let i = Math.floor(index / 9)
//       let j = index % 9
//       debugger
//       if (unvisited.length === 0) {
//         return
//       }

//       const getAvaliableSubset = (colSubset, rowSubset, boxSubset) => {
//         let s1 = []
//         let s2 = []
//         colSubset.forEach(r => {
//           if (rowSubset.indexOf(r) > -1) {
//             s1.push(r)
//           }
//         })

//         s1.forEach(r => {
//           if (boxSubset.indexOf(r) > -1) {
//             s2.push(r)
//           }
//         })

//         return s2
//       }

//       let colSubset = possibleCols[i] || []
//       let rowSubset = possibleRows[j] || []
//       let boxSubset = possibleBoxes[Math.floor(j / 3) + Math.floor(i / 3) * 3] || []
//       let avaliableSubset = getAvaliableSubset(colSubset, rowSubset, boxSubset)
//       let randomValue = pickRandom(avaliableSubset)
//       if (avaliableSubset.length === 0) {
//         // console.log('go back')
//         return
//       }
//       colSubset.splice(colSubset.indexOf(randomValue), 1)
//       rowSubset.splice(rowSubset.indexOf(randomValue), 1)
//       boxSubset.splice(boxSubset.indexOf(randomValue), 1)
//       unvisited.splice(unvisited.indexOf(index), 1)
//       unvisited.forEach(unvisitedCell => {
//         this.cells[i][j].number = randomValue
//         dfs(unvisitedCell, [...possibleCols], [...possibleRows], [...possibleBoxes], [...unvisited])
//       })
//     }
//     dfs()
//   }