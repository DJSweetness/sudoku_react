import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SudokuGame from './SudokuGame';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SudokuGame />, document.getElementById('root'));
registerServiceWorker();
