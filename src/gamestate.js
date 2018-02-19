import { EventEmitter } from "events";

class GameState extends EventEmitter {
    get finishedEvent() {
        return 'finished';
    }

    get completedEvent() {
        return 'completed';
    }

    run() {

    }
    
    stateCompleted(data) {
        this.emit(this.completedEvent, data);
    }

    finish() {
        this.emit(this.finishedEvent);
    }
}

export default GameState;