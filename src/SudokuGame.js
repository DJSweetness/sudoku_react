import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './SudokuGame.css';


class Square extends Component {

  render() {

    const i = this.props.value_i;
    const j = this.props.value_j;

    return (
      <input className="square" value={this.props.grid[i][j]}  onInput={this.props.onInput}></input>
    );

  }
}


class BoxOfSquares extends Component {

  renderSquare(i, j) {
    return (
      <Square className='square' 
              onInput={this.props.onInput}
              grid={this.props.grid}
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
    this.state = {
      grid: Array(9).fill(Array(9).fill(1)),
      value: ''
    };
  }

  renderBoxOfSquares(i) {
    return(
      <BoxOfSquares 
        onInput={() => this.handleInputChange()}
        grid={this.state.grid}
        value={i}
      />
    );
  }

  handleInputChange(event) {
    const grid = this.state.grid.slice();
    // squares[i][j] =
    // this.setState({
    //   grid: 
    // });
    alert(event)
  }

  render(){
    return (

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
