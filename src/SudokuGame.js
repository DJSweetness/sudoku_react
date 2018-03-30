import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './SudokuGame.css';


function Square(props) {
  return (
    <input className="square" onInput={() => this.props.onInputChange}>
      {props.value}
    </input>
  );
}


class BoxOfSquares extends Component {

  renderSquare() {
    return (
      <Square className='square'/>
    );
  }
  
  render() {
    return (

      <div>
        <div className="squares-row">
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>

        <div className="squares-row">
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>

        <div className="squares-row">
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
      </div>

    );
  }

}


class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(Array(9).fill(null)),
    };
  }

  renderBoxOfSquares() {
    return(
      <BoxOfSquares />
    );
  }

  handleInputChange() {
    {alert('changed input')}
  }

  render(){
    return (

      <div>
        <div className='boxOfSquares-row'>
          {this.renderBoxOfSquares()}
          {this.renderBoxOfSquares()}
          {this.renderBoxOfSquares()}
        </div>

        <div className='boxOfSquares-row'>
          {this.renderBoxOfSquares()}
          {this.renderBoxOfSquares()}
          {this.renderBoxOfSquares()}
        </div>

        <div className='boxOfSquares-row'>
          {this.renderBoxOfSquares()}
          {this.renderBoxOfSquares()}
          {this.renderBoxOfSquares()}
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
