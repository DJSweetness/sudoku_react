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


function getMistake(checkBoardResult)
{

  if (checkBoardResult[0] === 'Error block')
  {
    console.log('Error block');
  }
  else if (checkBoardResult[0] === 'Error row')
  {
    console.log('Error row');
  }
  else if (checkBoardResult[0] === 'Error col')
  {
    console.log('Error col');
  }
  else if (checkBoardResult[0] === 'You Win!')// winner
  {

  }

}


function checkIfSolved(checkBoardResult)
{

}

class Square extends Component {

  render() {

    const i = this.props.value_i;
    const j = this.props.value_j;

    return (
      <input className="square" onInput={(e) => this.props.onInput(i, j, e)}></input>
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
      <div className='boxOfSquares'>
        <div className="squares-row">
          {this.renderSquare(i, 0)}
          {this.renderSquare(i, 1)}
          {this.renderSquare(i, 2)}
        </div>

        <div className="squares-row">
          {this.renderSquare(i, 3)}
          {this.renderSquare(i, 4)}
          {this.renderSquare(i, 5)}
        </div>

        <div className="squares-row">
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
    let grid = [];
    for(let i=0; i<9; i++)
    {
      grid[i] = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    }
    this.state = {
      grid: grid,
      checkBoardResult: '',
      value: ''
    };
  }

  renderBoxOfSquares(i) {
    return(
      <BoxOfSquares 
        onInput={this.handleInputChange}
        value={i}
      />
    );
  }

  handleInputChange = (i,j,e) => {

    const grid_temp = this.state.grid.slice();
    grid_temp[i][j] = e.target.value;
    this.setState({grid: grid_temp});

    this.setState({checkBoardResult: checkBoard(this.state.grid)});

  }

  render(){
    
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
        <button class='getMistake' >Get Mistake</button>
        <button class='checkBoard' >Check Solution</button>
      </div>

    );
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
