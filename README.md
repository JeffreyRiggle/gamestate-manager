# gamestate-manager
Basic javascript library for managing game states.

## Installing
`npm install @jeffriggle/gamestate-manager`

## Example
```javascript
import { GameStateManager, GameState } from '@jeffriggle/gamestate-manager';

class LogGameState extends GameState {
    constructor(id, shouldFinish) {
        this.id = id;
        this.shouldFinish = shouldFinish;
    }

    run() {
        console.log(`Game State ${this.id} ran`);
        if (this.shouldFinish) {
            this.finish();
        } else {
            this.stateCompleted();
        }
    }
}

const firstId = 'state1';
const firstState = new LogGameState(firstId, false);

const secondId = 'state2';
const gameState2 = new LogGameState(secondId, true);

const manager = new GameStateManager(firstId, firstState, 'foo');
manager.addGameState(secondId, gameState2);
manager.on(manager.finishedEvent, function() {
    console.log('Game finished');
});
manager.start();
```