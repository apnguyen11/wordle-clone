import React, { Component } from 'react';
// import './Game.css';

class GameTileState {
    static Blank = new GameTileState("Blank");
    static Grey = new GameTileState("Grey");
    static Yellow = new GameTileState("Yellow");
    static Green = new GameTileState("Green");

    constructor(value) {
        this.value = value
    }
}

class GameTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '_',
            state: GameTileState.Blank,
        };
    }
    update(value) {
        // value should be of type GameTileState
        this.state.state = value;
    }
    render() {
        return this.state.value
    }
}

class GameRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameTiles: [
                <GameTile />,
                <GameTile />,
                <GameTile />,
                <GameTile />,
                <GameTile />,
            ]
        }
    }
    update(values) { }
    render() {
        return this.state.gameTiles.map((gameTile, index) =>
            <span key={index}>{gameTile}</span>
        )
    }
}

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solution: props.solution,
            attempts: [],
            gameRows: [
                <GameRow />,
                <GameRow />,
                <GameRow />,
                <GameRow />,
                <GameRow />,
                <GameRow />,
            ]
        }
    }

    render() {
        return this.state.gameRows.map((gameRow, index) =>
            <div className="row" key={index}>{gameRow}</div>
        )
    }
}

class GameKeyboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            gameBoard: props.gameBoard,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.value.length < 6) {
            this.setState({ value: event.target.value });
        }
    }

    handleSubmit(event) {
        if (this.state.value.length != 5) {
            alert('please enter a 5 letter word');
        }
        else {
            console.log(this.state.gameBoard.props.attempts);
            if (this.state.gameBoard.attempts.length > this.state.gameBoard.gameRows.length) {
                alert('No more attempts! The answer is ' + this.state.gameBoard.state.solution);
            }
            else if (this.state.value == this.state.gameBoard.state.solution) {
                alert("You Win!");
            }
            else {
                this.state.gameBoard.setState({
                    attempts: this.state.gameBoard.state.attempts.concat(this.state.value)
                })
            }
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.gameBoard = <GameBoard solution='crane' />;
        this.state.gameKeyboard = <GameKeyboard gameBoard={this.state.gameBoard} />;
    }

    render() {
        return (
            <div id="game" >
                <div id="game-board">
                    {this.state.gameBoard}
                </div>
                <div id="game-keyboard">
                    {this.state.gameKeyboard}
                </div>
            </div>
        )
    }
}

export default Game;