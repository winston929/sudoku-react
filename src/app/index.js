import React from 'react';
import {render} from 'react-dom';
import {Input} from './input';
import sudoku from './solve';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.inputBox = [];
        this.state = {values: this.initState()};
        this.currentNum = 0;
    }

    initState() {
        const values = []; 
        for(let i=0; i<9; i++) {
            values[i] = [];
            for(let j=0; j<9; j++) {
                values[i][j] = '';
            }
        }

        return values;
    }

    toSolve() {
        this.state.values = sudoku(this.state.values);
        for(let i=0; i<9; i++) {
            for(let j=0; j<9; j++) {
                this.setValue(this.state.values[i][j], i, j);
            }
        }
    }

    onKeyUp(evt, x, y) {
        if(evt.key === 'Backspace' || evt.key === '0') {
            this.setValue('', x, y);
            return;
        }

        if(isNaN(evt.key)) {
            evt.preventDefault();
            return;
        }

        this.currentNum = parseInt(evt.key);
        this.setValue(this.currentNum, x, y);
    }

    setValue(num, x, y) {
        this.setState(prevState => {
            const values = prevState.values;
            values[x][y] = num;
            return {values};
        });
    }

    reset() {
        this.state.values = this.initState();
        for(let i=0; i<9; i++) {
            for(let j=0; j<9; j++) {
                this.setValue(this.state.values[i][j], i, j);
            }
        }
    }

    createInputBoxes() {
        const elem = [];
        for(let i=0; i<9; i++) {
            this.inputBox[i] = [];
            for(let j=0; j<9; j++) {
                elem.push(<Input onKeyUp={evt => {this.onKeyUp(evt, i, j)}} val={{num: this.state.values[i][j]}} />)
                this.inputBox[i][j] = elem[elem.length - 1];
            }
            elem.push(<br />)
        }
        return elem;
    }

    render() {
        return (<div>
                    {this.createInputBoxes()}
                    <p>
                        <button type="button" onClick={this.toSolve.bind(this)}>Solve!</button>
                        <button type="button" onClick={this.reset.bind(this)}>Reset</button>
                    </p>
                </div>);
    }
}

render(<App />, document.getElementById('app'));

