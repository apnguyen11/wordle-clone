import React, { Component } from 'react';
// import './Game.css';
import {stringsToCharactersSet, setDifference, setIntersection} from './Utils';

const Alphabet = 'abcdefghijklmnopqrstuvwxyz';


class GameTileState {
    static Blank = new GameTileState('Blank');
    static Green = new GameTileState('Green');
    static Yellow = new GameTileState('Yellow');
    static Grey = new GameTileState('Grey');

    constructor(value) {
        this.value = value
    }

    toString() {
        if (this.value == 'Blank') {
            return '_'
        }
        if (this.value == 'Green') {
            return 'G'
        }
        if (this.value == 'Yellow') {
            return 'Y'
        }
        if (this.value == 'Grey') {
            return 'X'
        }
    }
}

// computeTileStates takes a solution and a guess and returns a list of
// GameTileState objects that represent the difference between the solution
// and the guess.
export function computeTileStates(solution, guess) {
    if (solution.length != guess.length) {
        // TODO: how do you raise an error in javascript?
        // The length of the solution and guess should be exactly equal
        return null
    }
    let result = []
    for (let i = 0; i < solution.length; i++) {
        if (guess[i] == solution[i]) {
            result.push(GameTileState.Green)
        }
        else if (solution.includes(guess[i])) {
            result.push(GameTileState.Yellow)
        }
        else {
            result.push(GameTileState.Grey)
        }
    }
    return result
}

class GameTile extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return this.props.value + ' ' + this.props.state.toString()
    }
}

class GameRow extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        if (this.props.guess == '') {
            return this.props.tileStates.map((state, index) => 
                <span key={index}><GameTile value='' state={state} /></span>
            )
        }
        let gameTiles = []
        for (let i = 0; i < this.props.guess.length; i++) {
            const value = this.props.guess[i]
            const state = this.props.tileStates[i]
            gameTiles.push(<GameTile value={value} state={state} />)
        }
        console.log(gameTiles)
        return gameTiles.map((gameTile, index) =>
            <span key={index}>{gameTile}</span>
        )
    }
}

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        // for each guess, update the corresponding game row's tile states
        let gameRows = []
        for (let i = 0; i < 6; i++) {
            let guess = ''
            let tileStates = [
                GameTileState.Blank,
                GameTileState.Blank,
                GameTileState.Blank,
                GameTileState.Blank,
                GameTileState.Blank,
            ]
            if (i < this.props.guesses.length) {
                let guess = this.props.guesses[i]
                let tileStates = computeTileStates(this.props.solution, guess)
            }
            gameRows.push(<GameRow guess={guess} tileStates={tileStates} />)
        }
        return gameRows.map((gameRow, index) =>
            <div className='row' key={index}>{gameRow}</div>
        )
    }
}

class GameInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.props.handleChange(e.target.value);
    }

    handleSubmit(e) {
        this.props.handleSubmit(e);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <input type='text' value={this.state.value} onChange={this.handleChange} />
                <input type='submit' value='Submit' />
            </form>
        );
    }
}

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // solution is the word the player is trying to guess.
            // To be like the original game, it should the solution should rotate
            // once every 24 hours.
            // TODO: get the solution from an external source
            solution: 'crane',

            // candidateValue is the current value the player has inputted but
            // not yet submitted.
            // We should prevent the player from submitting words with less
            // than 5 characters and warn the player if they use letters that
            // are known to not be in the solution (ie. grey letters).
            candidateValue: '',

            // guesses are each candidate value the player has submitted.
            // To be like the original game, we should only allow 6 guesses.
            guesses: [],
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
        this.getMissedGuessedLetters = this.getMissedGuessedLetters.bind(this);
    }

    // getMissedGuessedLetters returns the set of letters that have been the
    // player has guessed but are not in the solution, ie: grey letters.
    getMissedGuessedLetters() {
        return setDifference(
            stringsToCharactersSet(this.state.guesses),
            new Set(this.state.solution),
        );
    }

    handleInputChange(value) {
        value = value.trim()
        // update the candidate value
        console.log(value);
        if (value.length > 5) {
            return; // do nothing
        }
        this.setState({ candidateValue: value });
    }

    handleInputSubmit(e) {
        console.log(e);
        console.log(this.state.candidateValue);
        if (this.state.guesses.length > 5) {
            alert('You Lose! The solution is ' + this.state.solution);
            return;
        }
        if (this.state.candidateValue == this.state.solution) {
            alert('You Win!!');
            // TODO: show/save stats
            return;
        }
        if (this.state.candidateValue.length != 5) {
            alert('Please input at exactly 5 letters!');
            return;
        }
        // if (setIntersection(
        //         this.getMissedGuessedLetters(),
        //         stringsToCharactersSet([this.state.candidateValue]),
        //     ) != 0
        // ) {
        //     // TODO: maybe make this a warning?
        //     alert('Your word contains letters that are not in the solution!');
        //     return;
        // }
        // at this point, the candidate value should be guaranteed to be valid but wrong
        // this.state.guesses.push(this.state.candidateValue)
        this.setState({
            guesses: this.state.guesses.concat(this.state.candidateValue),
            candidateValue: '',
        })
        console.log(this.state.guesses)
        e.preventDefault();
    }

    render() {
        return (
            <div id='game' >
                <GameBoard
                    solution={this.state.solution}
                    guesses={this.state.guesses}
                />
                <GameInput
                    guesses={this.state.guesses}
                    handleChange={this.handleInputChange}
                    handleSubmit={this.handleInputSubmit}
                />
            </div>
        )
    }
}

export default Game;