import GameStateManager from '../gamestatemanager';

describe('gamestatemanager', function() {
    var manager, firstState, firstId, runData, gameState2, id2;

    beforeEach(function() {
        firstState = {
            runCount: 0,
            data: '',
            on: function(evt, callback) {
                if (evt === 'completed') {
                    this.completed = callback;
                } else {
                    this.finished = callback;
                }
            },
            off: function() {},
            run: function(rundata) {
                this.data = rundata;
                this.runCount++;
            },
            finishedEvent: 'finished',
            completedEvent: 'completed'
        };

        firstId = 'state1';
        runData = 'foo';

        gameState2 = {
            runCount: 0,
            data: '',
            on: function(evt, callback) {
                if (evt === 'completed') {
                    this.completed = callback;
                } else {
                    this.finished = callback;
                }
            },
            off: function() {},
            run: function(rundata) {
                this.data = rundata;
                this.runCount++;
            },
            finishedEvent: 'finished',
            completedEvent: 'completed'
        };

        id2 = 'state2';

        manager = new GameStateManager(firstId, firstState, runData);
    });

    it('should have the correct state', function() {
        expect(manager.currentGameState).toBe(firstState);
    });

    it('should not be started', function() {
        expect(manager.started).toBe(false);
    });

    describe('when a game state is added', function() {
        beforeEach(function() {
            manager.addGameState(id2, gameState2);
        });

        it('should have added the game state', function() {
            expect(manager.gameStateMap.get(id2)).toBe(gameState2);
        });

        it('should not start the manager', function() {
            expect(manager.started).toBe(false);
        });

        it('should not override the current game state', function() {
            expect(manager.currentGameState).toBe(firstState);
        });

        describe('when a game state is removed', function() {
            beforeEach(function() {
                manager.removeGameState(id2);
            });

            it('should not have the game state', function() {
                expect(manager.gameStateMap.get(id2)).toBe(undefined);
            });
        });
    });

    describe('when game state manager is started', function() {
        beforeEach(function() {
            manager.start();
        });

        it('should run the first game state', function() {
            expect(firstState.runCount).toBe(1);
            expect(firstState.data).toBe(runData);
        });

        it('should be started', function() {
            expect(manager.started).toBe(true);
        });

        describe('when a game state is finished', function() {
            var finished;
            beforeEach(function() {
                finished = false;
                manager.on(manager.finishedEvent, function() {
                    finished = true;
                });

                firstState.finished();
            });

            it('should finish the game', function() {
                expect(finished).toBe(true);
            });
        });

        describe('when a game state is added', function() {

            beforeEach(function() {
                manager.addGameState(id2, gameState2);
            });

            describe('when a game state is completed', function() {
                beforeEach(function() {
                    firstState.completed(id2);
                });
    
                it('should update the game state', function() {
                    expect(manager.currentGameState).toBe(gameState2);
                });
    
                it('should run the game state', function() {
                    expect(gameState2.runCount).toBe(1);
                    expect(gameState2.data).toBe(runData);
                });
            });

            describe('when game states are cleared', function() {
                beforeEach(function() {
                    manager.clearGameStates();
                });

                it('should still be running', function() {
                    expect(manager.started).toBe(true);
                });

                it('should keep the current game state', function() {
                    expect(manager.currentGameState).toBe(firstState);
                });
            });
        });
    });
});