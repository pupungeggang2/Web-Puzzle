function loopGame() {
    displayGame()
}

function displayGame() {
    drawSceneInit()

    if (state === '' || state === 'Objective' || state === 'Help') {
        context.fillText(`${dataLang['LevelTitle'][levelCurrent][langList[lang]]}`, UI.textTitle[0], UI.textTitle[1])
    } else if (state === 'Win') {
        context.fillText(`${dataLang['Win'][langList[lang]]}`, UI.textTitle[0], UI.textTitle[1])
    }

    drawGameUpperBar()
    drawGame()

    if (pause === true) {
        drawPause()
    }

    if (state === 'Objective') {
        drawObjective()
    }

    if (state === 'Help') {
        drawHelp()
    }
}

function actionDownGame(x, y, button) {
    if (button === 0) {
        if (pause === false) {
            if (state === '') {
                for (let i = 0; i < game.level['Board'].length; i++) {
                    for (let j = 0; j < game.level['Board'][i].length; j++) {
                        if (pointInsideRect(x, y, game.level['Left'] + tileSize * j, game.level['Top'] + tileSize * i, tileSize, tileSize)) {
                            if (game.level['Board'][i][j]['Type'] != 'Empty') {
                                if (game.level['Board'][i][j]['Movable'] === true) {
                                    picking = JSON.parse(JSON.stringify(game.level['Board'][i][j]))
                                    game.level['Board'][i][j] = {'Type' : 'Empty'}
                                    pickingPosition = [x - 32, y - 32]
                                }
                            }
                        }
                    }
                }

                for (let i = 0; i < 5; i++) {
                    if (pointInsideRect(x, y, UI.game.hand[0][0] + tileSize * i, UI.game.hand[0][1], tileSize, tileSize)) {
                        if (game.level['Hand'][i]['Type'] != 'Empty') {
                            if (game.level['Hand'][i]['Movable'] === true) {
                                picking = JSON.parse(JSON.stringify(game.level['Hand'][i]))
                                game.level['Hand'][i] = {'Type' : 'Empty'}
                                pickingPosition = [x - 32, y - 32]
                            }
                        }
                    }
                }
            }
        }
    }
}

function actionMoveGame(x, y, button) {
    if (button === 0) {
        if (pause === false) {
            if (state === '') {
                if (picking['Type'] != null) {
                    pickingPosition = [x - 32, y - 32]
                }
            }
        }
    }
}

function actionUpGame(x, y, button) {
    if (button === 0) {
        if (pause === false) {
            if (state === '') {
                if (pointInsideRectArray(x, y, UI.game.buttonPause)) {
                    pause = true
                } else if (pointInsideRectArray(x, y, UI.game.buttonRetry)) {
                    loadLevel()
                } else if (pointInsideRectArray(x, y, UI.game.buttonUndo)) {
                    undo()
                } else if (pointInsideRectArray(x, y, UI.game.buttonObjective)) {
                    state = 'Objective'
                } else if (pointInsideRectArray(x, y, UI.game.buttonHelp)) {
                    state = 'Help'
                    game.helpIndex = 0
                }

                if (picking['Type'] != null) {
                    let moved = false

                    for (let i = 0; i < game.level['Board'].length; i++) {
                        for (let j = 0; j < game.level['Board'][i].length; j++) {
                            if (pointInsideRect(x, y, game.level['Left'] + tileSize * j, game.level['Top'] + tileSize * i, tileSize, tileSize)) {
                                if (game.level['Board'][i][j]['Type'] === 'Empty') {
                                    game.level['Board'][i][j] = JSON.parse(JSON.stringify(picking))
                                    moved = true
                                }
                            }
                        }
                    }

                    for (let i = 0; i < 5; i++) {
                        if (pointInsideRect(x, y, UI.game.hand[0][0] + tileSize * i, UI.game.hand[0][1], tileSize, tileSize)) {
                            if (game.level['Hand'][i]['Type'] === 'Empty') {
                                game.level['Hand'][i] = JSON.parse(JSON.stringify(picking))
                                moved = true
                            }
                        }
                    }

                    if (moved === false) {
                        game.level = JSON.parse(recorded[0])
                    } else {
                        applyChange()
                        winCheck()
                    }

                    picking = {'Type' : null}
                }
            } else if (state === 'Win') {
                scene = 'LevelSelect'
                selectedWorld = -1
                selectedLevel = -1
                state = ''
            } else if (state === 'Objective') {
                if (pointInsideRectArray(x, y, UI.game.objective.close)) {
                    state = ''
                }
            } else if (state === 'Help') {
                if (pointInsideRectArray(x, y, UI.game.help.close)) {
                    state = ''
                } else if (pointInsideRectArray(x, y, UI.game.help.buttonPrev)) {
                    game.helpIndex = (game.helpIndex + 5) % 6
                } else if (pointInsideRectArray(x, y, UI.game.help.buttonNext)) {
                    game.helpIndex = (game.helpIndex + 7) % 6
                }
            }
        } else if (pause === true) {
            if (pointInsideRectArray(x, y, UI.pause.buttonResume)) {
                pause = false
            } else if (pointInsideRectArray(x, y, UI.pause.buttonMap)) {
                scene = 'LevelSelect'
                selectedWorld = -1
                selectedLevel = -1
                pause = false
                state = ''
            }
        }
    }
}