import { EventEmitter } from "events";
import './gamestate';

class GameStateManager extends EventEmitter {
    constructor(id, currentGameState, runtimeData) {
        super();
        this._gamestatemap = new Map();
        this._runtimeData = runtimeData;
        this.started = false;
        
        this.onFinished = this.finish.bind(this);
        this.onCompleted = this.completed.bind(this);

        this._initialize(id, currentGameState)
    }

    _initialize(id, gameState) {
        this._gamestatemap.set(id, gameState);
        this.currentGameState = gameState;
    }

    get finishedEvent() {
        return 'finished';
    }

    completed(data) {
        this.lastKey = data;
        this.currentGameState = this._gamestatemap.get(data);
    }

    get currentGameState() {
        return this._currentGameState;
    }

    set currentGameState(gameState) {
        if (this._currentGameState) {
            this._currentGameState.off('completed', this.onCompleted);
            this._currentGameState.off('finish', this.onFinished);
        }
        
        this._currentGameState = gameState;

        if (this._currentGameState) {
            this._currentGameState.on('completed', this.onCompleted);
            this._currentGameState.on('finish', this.onFinished);
        }

        if (this.started) {
            this.currentGameState.run(this._runtimeData);
        }
    }

    get gameStateMap() {
        return this._gamestatemap;
    }

    addGameState(id, gameState) {
        this._gamestatemap.set(id, gameState);
    }

    removeGameState(id) {
        this._gamestatemap.delete(id);
    }

    clearGameStates() {
        this._gamestatemap.clear();

        if (this.started) {
            this._gamestatemap.set(this.lastKey, this.currentGameState);
        }
    }

    start() {
        this.currentGameState.run(this._runtimeData);
        this.started = true;
    }

    finish() {
        this.emit(this.finishedEvent);
    }
}

export default GameStateManager;