import { GameState } from '../gamestate';

describe('gamestate', function() {
    var state, callCount;

    beforeEach(function() {
        callCount = 0;
        state = new GameState();
    });

    describe('when a game state is completed', function() {
        var updateData, data;

        beforeEach(function() {
            data = {
                state: 'foo'
            };

            state.on(state.completedEvent, function(data) {
                callCount++;
                updateData = data;
            });

            state.stateCompleted(data);
        });

        it('should send an event', function() {
            expect(callCount).toBe(1);
            expect(updateData).toBe(data);
        });
    });

    describe('when a game state is finished', function() {
        beforeEach(function() {
            state.on(state.finishedEvent, function() {
                callCount++;
            });

            state.finish();
        });

        it('should send an event', function() {
            expect(callCount).toBe(1);
        });
    });
});