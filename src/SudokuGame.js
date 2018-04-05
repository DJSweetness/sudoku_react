import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './SudokuGame.css';


function checkBoard(grid) 
{

    let i,j,k,l;
    let rowsChecked = Array(9).fill(0);
    let colsChecked = Array(9).fill(0);
    let blocksChecked = Array(9).fill(0);

    // ~ Check blocks ~ //
    // for each block...
    for(i=0;i<9;i++)
    {
      // for each value in block...
      for(j=0;j<9;j++)
      {
        //set corresponding index of number to 1, meaning we have that number
        //We subtract by 1 because our indexes are 0-8 instead of the numbers
        //in sudoku which are 1-9.
        blocksChecked[grid[i][j]-1] = 1;
      }
      
      // if a 0, then it's failed the test already.
      if (blocksChecked.includes(0)) {
        return ['Error block', i];
      }
      
      blocksChecked.fill(0);
    }
    
    // ~ Check rows ~ //
    let row = 0;
    for(i=0;i<3;i++)
    {
      for(j=0;j<3;j++)
      {
        for(k=0;k<3;k++)
        {
          for(l=0;l<3;l++)
          {
            rowsChecked[ grid[k+(i*3)][l+(j*3)] - 1 ] = 1; 
          }
        }
        
        if (rowsChecked.includes(0)) {
          return ['Error row', row, rowsChecked];
        }
        row++;
        rowsChecked.fill(0);
        
      }
    }
    
    // ~ Check columns ~ //
    let col = 0;
    for(i=0;i<3;i++)
    {
      for(j=0;j<3;j++)
      {
        for(k=0;k<3;k++)
        {
          for(l=0;l<3;l++)
          {
            colsChecked[ grid[k*3+i][l*3+j] - 1 ] = 1;
          }
        }
        
        // if a 0, then it's failed the test already.
        if (colsChecked.includes(0)) {
          return ['Error col', col];
        }
        col++;
        colsChecked.fill(0);
        
      }
    }
    
    return Array('You Win!');
}


class Square extends Component {

  render() {

    const i = this.props.value_i;
    const j = this.props.value_j;

    return (
      <input id={'square_'+i+'_'+j} className="square" onInput={(e) => this.props.onInput(i, j, e)}></input>
    );

  }
}


class BoxOfSquares extends Component {

  renderSquare(i, j) {
    return (
      <Square className='square' 
              onInput={this.props.onInput}
              value_i = {i}
              value_j = {j}
      />
    );
  }
  
  render() {

    const i = this.props.value;

    return (
      <div id={'block_'+i} className='boxOfSquares'>
        <div id={'row_'+i+'_0'} className="squares-row">
          {this.renderSquare(i, 0)}
          {this.renderSquare(i, 1)}
          {this.renderSquare(i, 2)}
        </div>
        
        <div id={'row_'+i+'_1'} className="squares-row">
          {this.renderSquare(i, 3)}
          {this.renderSquare(i, 4)}
          {this.renderSquare(i, 5)}
        </div>

        <div id={'row_'+i+'_2'} className="squares-row">
          {this.renderSquare(i, 6)}
          {this.renderSquare(i, 7)}
          {this.renderSquare(i, 8)}
        </div>
      </div>

    );
  }

}


class Board extends Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBoardCheck = this.handleBoardCheck.bind(this);
    this.clearRed = this.clearRed.bind(this);
    this.makeEverythingGreen = this.makeEverythingGreen.bind(this);
    this.startPuzzle = this.startPuzzle.bind(this);

    let grid = [];
    for(let i=0; i<9; i++)
    {
      grid[i] = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    }
    this.state = {
      grid: grid,
      checkBoardResult: '',
      value: '',
      madeRed: ''
    };
  }

  componentDidMount() {
    this.startPuzzle()
  }

  startPuzzle() {

  let chooseFromThis = [1,2,3,4,5,6,7,8,9];
  let i,j;
  let element, randomValue;

  while (chooseFromThis.length) {

    i = (Math.floor(Math.random() * 9));
    j = (Math.floor(Math.random() * 9));
    randomValue = chooseFromThis.splice(Math.floor(Math.random()*chooseFromThis.length), 1);

    element = document.getElementById('square_'+i+'_'+j);
    const grid = this.state.grid.slice();
    grid[i][j] = randomValue
    this.setState({grid:grid});
    // for some reason, the element was null and the values of i and j were
    // credible, but this makes it work :D
    try {
      element.value = randomValue;
    } catch(error){
      continue;
    }
    element.setAttribute('readonly', true);
    element.setAttribute('class', 'answer');
    if (chooseFromThis.length === 0 ) {
      return;
    }
  }

}

  renderBoxOfSquares(i) {
    return(
      <BoxOfSquares 
        onInput={this.handleInputChange}
        value={i}
      />
    );
  }

  makeEverythingGreen() {
    for(let i=0;i<9;i++) {
      document.getElementById('block_'+i).style.color = 'green';
    }
  }

  clearRed() {

    // clear error in block
    if (this.state.madeRed.includes('block')) {

      // clear that block
      document.getElementById(this.state.madeRed).style.color = 'black';
    }

    //clear error in row
    else if (this.state.madeRed.includes('row')) {

      //clear that row
      let row = this.state.madeRed.substring(4,);
      let rowOfBoxesStart = 0;

      //if row is 0,1,2 then we will be in blocks 0,1,2
      if (row > 3 && row < 6) {
        rowOfBoxesStart = 3;
      }
      if (row > 5) {
        rowOfBoxesStart = 6;
      }

      // thus here, we can cycle each block and change the respective row
      for(let i=rowOfBoxesStart; i<rowOfBoxesStart+3; i++) {
        let id = 'row_'+i+'_'+row;
        document.getElementById(id).style.color = 'black';
      }
    }

    // clear error in col
    else if (this.state.madeRed.includes('col')) {

      let col = this.state.madeRed.substring(4,);
      let colOfBoxesStart = 0;
      let square_id = col % 3;

      //if col is 0,1,2 then we will be in blocks 0,1,2
      if (col > 3 && col < 6) {
        colOfBoxesStart = 1;
      }
      if (col > 5) {
        colOfBoxesStart = 2;
      }

      // thus here, we can cycle each block and change the respective row
      for(let i=colOfBoxesStart; i<9; i+=3) {
        for(let j=square_id; j<9; j+=3) {

          document.getElementById('square_'+i+'_'+j ).style.color = 'black';
        }
      }
    }

    this.setState({madeRed: ''}); // no long have red
  }
  
  handleBoardCheck() {
    
    const checkBoardResult = this.state.checkBoardResult.slice();
    
    if (checkBoardResult[0] === 'Error block') {

      //make the block red and the subclasses will inherit the color
      document.getElementById('block_'+checkBoardResult[1]).style.color = 'red';

      this.setState({madeRed: 'block_'+checkBoardResult[1]})
    }

    else if (checkBoardResult[0] === 'Error row') {

      let row = checkBoardResult[1];
      let rowOfBoxesStart = 0;

      //if row is 0,1,2 then we will be in blocks 0,1,2
      if (row > 3 && row < 6) {
        rowOfBoxesStart = 3;
      }
      if (row > 5) {
        rowOfBoxesStart = 6;
      }

      // thus here, we can cycle each block and change the respective row
      for(let i=rowOfBoxesStart; i<rowOfBoxesStart+3; i++) {
        document.getElementById('row_'+i+'_'+row).style.color = 'red';
      }

      this.setState({madeRed: 'row_'+row});
    }

    else if (checkBoardResult[0] === 'Error col') {

      let col = checkBoardResult[1];
      let colOfBoxesStart = 0;
      let square_id = col % 3;

      //if col is 0,1,2 then we will be in blocks 0,1,2
      if (col > 3 && col < 6) {
        colOfBoxesStart = 1;
      }
      if (col > 5) {
        colOfBoxesStart = 2;
      }

      // thus here, we can cycle each block and change the respective row
      for(let i=colOfBoxesStart; i<9; i+=3) {
        for(let j=square_id; j<9; j+=3) {

          document.getElementById('square_'+i+'_'+j ).style.color = 'red';
        }
      }

      this.setState({madeRed: 'col_'+col});
    }

    else if (checkBoardResult[0] === 'You Win!') {

      this.makeEverythingGreen();
      document.getElementById('checkBoardButton').style.display = 'none';
      document.getElementById('win').style.display = 'block';
    }
      
  }

  handleInputChange = (i,j,e) => {

    const grid_temp = this.state.grid.slice();
    grid_temp[i][j] = e.target.value;
    this.setState({grid: grid_temp});

    this.setState({checkBoardResult: checkBoard(this.state.grid)});

    // clear the errors if new input
    if (this.state.madeRed != '') {
      this.clearRed();
    }

  }

  render() { 
    return (
      <div>
        <div className='board'>
          <div className='boxOfSquares-row'>
            {this.renderBoxOfSquares(0)}
            {this.renderBoxOfSquares(1)}
            {this.renderBoxOfSquares(2)}
          </div>

          <div className='boxOfSquares-row'>
            {this.renderBoxOfSquares(3)}
            {this.renderBoxOfSquares(4)}
            {this.renderBoxOfSquares(5)}
          </div>

          <div className='boxOfSquares-row'>
            {this.renderBoxOfSquares(6)}
            {this.renderBoxOfSquares(7)}
            {this.renderBoxOfSquares(8)}
          </div>
        </div>
        <button id='checkBoardButton' className='checkBoardButton' onClick={this.handleBoardCheck}>Check Solution</button>
        <div id='win'>You Win!</div>
      </div>
    );
  }
}

function solvePuzzle() {

  let i,j,k,l,m;

  // initially fill puzzle
  for(i=0;i<9;i++) {
    for(j=0;j<9;j++) {
      if (true)
        ;
    }
  }

  for(i=0;i<9;i++) {
    for(j=0;j<9;j++) { // for each column
      for(k=0;k<9;k++) { // for each row
        for(l=0;l<9;l++) { // foreach value possible
          for(m=1;m<10;m++) {

          }
          
        }
      }
    }
  }

}

class SudokuGame extends Component {

  renderBoard() {
    return <Board class="board"/>
  }
  
  render() {
    return (
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Powered By React</h1>
        </header>
        <p className="App-intro">
          Time to play Sudoku!
        </p>

        {this.renderBoard()}

      </div>
    );
  }

}

export default SudokuGame;

