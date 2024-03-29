function drawSceneInit() {
    context.fillStyle = 'Black'
    context.strokeStyle = 'Black'
    context.font = '32px neodgm'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.lineWidth = 2

    context.clearRect(0, 0, 320, 600)
    context.fillStyle = 'White'
    context.fillRect(0, 0, 320, 600)
    context.fillStyle = 'Black'
}

function drawWorldComponent() {
    for (let i = 0; i < dataWorld[worldCurrent]['World'].length; i++) {
        if (sessionVar.worldStatus[dataWorld[worldCurrent]['World'][i][4]] === 0) {
            context.drawImage(img.levelLocked, dataWorld[worldCurrent]['World'][i][0], dataWorld[worldCurrent]['World'][i][1])
        } else if (sessionVar.worldStatus[dataWorld[worldCurrent]['World'][i][4]] === 1) {
            context.drawImage(img.levelOpen, dataWorld[worldCurrent]['World'][i][0], dataWorld[worldCurrent]['World'][i][1])
        } else if (sessionVar.worldStatus[dataWorld[worldCurrent]['World'][i][4]] === 2) {
            context.drawImage(img.levelCleared, dataWorld[worldCurrent]['World'][i][0], dataWorld[worldCurrent]['World'][i][1])
        }

        context.fillText(`${dataWorld[worldCurrent]['World'][i][5]}`, dataWorld[worldCurrent]['World'][i][0] + 20, dataWorld[worldCurrent]['World'][i][1] + 20)
    }

    for (let i = 0; i < dataWorld[worldCurrent]['Level'].length; i++) {
        if (sessionVar.levelStatus[dataWorld[worldCurrent]['Level'][i][4]] === 0) {
            context.drawImage(img.levelLocked, dataWorld[worldCurrent]['Level'][i][0], dataWorld[worldCurrent]['Level'][i][1])
        } else if (sessionVar.levelStatus[dataWorld[worldCurrent]['Level'][i][4]] === 1) {
            context.drawImage(img.levelOpen, dataWorld[worldCurrent]['Level'][i][0], dataWorld[worldCurrent]['Level'][i][1])
        } else if (sessionVar.levelStatus[dataWorld[worldCurrent]['Level'][i][4]] === 2) {
            context.drawImage(img.levelCleared, dataWorld[worldCurrent]['Level'][i][0], dataWorld[worldCurrent]['Level'][i][1])
        }

        context.fillText(`${dataWorld[worldCurrent]['Level'][i][5]}`, dataWorld[worldCurrent]['Level'][i][0] + 20, dataWorld[worldCurrent]['Level'][i][1] + 20)
    }

    if (selectedWorld != -1) {
        for (let i = 0; i < dataWorld[worldCurrent]['World'].length; i++) {
            if (selectedWorld === dataWorld[worldCurrent]['World'][i][4]) {
                context.drawImage(img.selectFrame, dataWorld[worldCurrent]['World'][i][0], dataWorld[worldCurrent]['World'][i][1])
            } 
        }
    }

    if (selectedLevel != -1) {
        for (let i = 0; i < dataWorld[worldCurrent]['Level'].length; i++) {
            if (selectedLevel === dataWorld[worldCurrent]['Level'][i][4]) {
                context.drawImage(img.selectFrame, dataWorld[worldCurrent]['Level'][i][0], dataWorld[worldCurrent]['Level'][i][1])
            } 
        }
    }
}

function drawGameUpperBar() {
    context.drawImage(img.game.objective, UI.game.buttonObjective[0], UI.game.buttonObjective[1])
    context.drawImage(img.game.undo, UI.game.buttonUndo[0], UI.game.buttonUndo[1])
    context.drawImage(img.game.retry, UI.game.buttonRetry[0], UI.game.buttonRetry[1])
    context.drawImage(img.game.help, UI.game.buttonHelp[0], UI.game.buttonHelp[1])
    context.drawImage(img.game.pause, UI.game.buttonPause[0], UI.game.buttonPause[1])
}

function drawGame() {
    // Draing Empty Rectangle
    for (let i = 0; i < game.level['Board'].length; i++) {
        for (let j = 0; j < game.level['Board'][i].length; j++) {
            context.drawImage(img.game.tileEmpty, game.level['Left'] + tileSize * j, game.level['Top'] + tileSize * i)
        }
    }

    for (let i = 0; i < 5; i++) {
        context.drawImage(img.game.tileEmpty, UI.game.hand[0][0] + tileSize * i, UI.game.hand[0][1])
    }

    // Drawing Ray
    for (let i = 0; i < game.level['Board'].length; i++) {
        for (let j = 0; j < game.level['Board'][i].length; j++) {
            let temp = game.level['Board'][i][j]
            
            if (temp['Type'] === 'Power' || temp['Type'] === 'PowerUpper' || temp['Type'] === 'PowerLower' || temp['Type'] === 'PowerNum') {
                for (let k = 0; k < temp['Property'][0].length; k++) {
                    let rayQueue = []
                    if (temp['Property'][0][k] === 'Right') {
                        rayQueue = [[i, j + 1, 'Right']]
                    } else if (temp['Property'][0][k] === 'Left') {
                        rayQueue = [[i, j - 1, 'Left']]
                    } else if (temp['Property'][0][k] === 'Up') {
                        rayQueue = [[i - 1, j, 'Up']]
                    } else if (temp['Property'][0][k] === 'Down') {
                        rayQueue = [[i + 1, j, 'Down']]
                    }

                    while (rayQueue.length > 0) {
                        let row = rayQueue[0][0]
                        let column = rayQueue[0][1]
                        let direction = rayQueue[0][2]
                        rayQueue.shift()

                        if (!(row >= 0 && column >= 0 && row < game.level['Board'].length && column < game.level['Board'][0].length)) {
                            continue
                        }

                        if (game.level['Board'][row][column]['Type'] === 'Wall') {
                            continue
                        }

                        if (direction === 'Right' || direction === 'Left') {
                            context.drawImage(img.game.rayHorizontal, game.level['Left'] + tileSize * column, game.level['Top'] + tileSize * row)
                        } else {
                            context.drawImage(img.game.rayVertical, game.level['Left'] + tileSize * column, game.level['Top'] + tileSize * row)
                        }

                        if (false) {

                        } else {
                            if (direction === 'Right') {
                                rayQueue.push([row, column + 1, 'Right'])
                            } else if (direction === 'Left') {
                                rayQueue.push([row, column - 1, 'Left'])
                            } else if (direction === 'Up') {
                                rayQueue.push([row - 1, column, 'Up'])
                            } else if (direction === 'Down') {
                                rayQueue.push([row + 1, column, 'Down'])
                            }
                        }
                    }
                }
            }
        }
    }

    // Drawing Object
    context.font = '20px neodgm'
    for (let i = 0; i < game.level['Board'].length; i++) {
        for (let j = 0; j < game.level['Board'][i].length; j++) {
            let temp = game.level['Board'][i][j]
            
            if (temp['Type'] === 'Power') {
                context.drawImage(img.game.tilePower, game.level['Left'] + tileSize * j, game.level['Top'] + tileSize * i)
                
                for (let k = 0; k < temp['Property'][0].length; k++) {
                    if (temp['Property'][0][k] === 'Right') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j + 48, game.level['Top'] + tileSize * i + 24)
                    } else if (temp['Property'][0][k] === 'Left') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j, game.level['Top'] + tileSize * i + 24)
                    } else if (temp['Property'][0][k] === 'Up') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j + 24, game.level['Top'] + tileSize * i)
                    } else if (temp['Property'][0][k] === 'Down') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j + 24, game.level['Top'] + tileSize * i + 48)
                    }
                }

                context.fillText(`${temp['Property'][1]}`, game.level['Left'] + tileSize * j + 32, game.level['Top'] + tileSize * i + 24)
                context.fillText(`${temp['Property'][2]}`, game.level['Left'] + tileSize * j + 32, game.level['Top'] + tileSize * i + 40)
            } else if (temp['Type'] === 'PowerUpper') {
                context.drawImage(img.game.tilePower, game.level['Left'] + tileSize * j, game.level['Top'] + tileSize * i)
                
                for (let k = 0; k < temp['Property'][0].length; k++) {
                    if (temp['Property'][0][k] === 'Right') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j + 48, game.level['Top'] + tileSize * i + 24)
                    } else if (temp['Property'][0][k] === 'Left') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j, game.level['Top'] + tileSize * i + 24)
                    } else if (temp['Property'][0][k] === 'Up') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j + 24, game.level['Top'] + tileSize * i)
                    } else if (temp['Property'][0][k] === 'Down') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j + 24, game.level['Top'] + tileSize * i + 48)
                    }
                }

                context.fillText(`${temp['Property'][1]}`, game.level['Left'] + tileSize * j + 32, game.level['Top'] + tileSize * i + 24)
                context.fillText(`>${temp['Property'][2]}`, game.level['Left'] + tileSize * j + 32, game.level['Top'] + tileSize * i + 40)
            } else if (temp['Type'] === 'PowerLower') {
                context.drawImage(img.game.tilePower, game.level['Left'] + tileSize * j, game.level['Top'] + tileSize * i)
                
                for (let k = 0; k < temp['Property'][0].length; k++) {
                    if (temp['Property'][0][k] === 'Right') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j + 48, game.level['Top'] + tileSize * i + 24)
                    } else if (temp['Property'][0][k] === 'Left') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j, game.level['Top'] + tileSize * i + 24)
                    } else if (temp['Property'][0][k] === 'Up') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j + 24, game.level['Top'] + tileSize * i)
                    } else if (temp['Property'][0][k] === 'Down') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j + 24, game.level['Top'] + tileSize * i + 48)
                    }
                }

                context.fillText(`${temp['Property'][1]}`, game.level['Left'] + tileSize * j + 32, game.level['Top'] + tileSize * i + 24)
                context.fillText(`<${temp['Property'][2]}`, game.level['Left'] + tileSize * j + 32, game.level['Top'] + tileSize * i + 40)
            } else if (temp['Type'] === 'PowerNum') {
                context.drawImage(img.game.tilePower, game.level['Left'] + tileSize * j, game.level['Top'] + tileSize * i)
                
                for (let k = 0; k < temp['Property'][0].length; k++) {
                    if (temp['Property'][0][k] === 'Right') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j + 48, game.level['Top'] + tileSize * i + 24)
                    } else if (temp['Property'][0][k] === 'Left') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j, game.level['Top'] + tileSize * i + 24)
                    } else if (temp['Property'][0][k] === 'Up') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j + 24, game.level['Top'] + tileSize * i)
                    } else if (temp['Property'][0][k] === 'Down') {
                        context.drawImage(img.game.orbOn, game.level['Left'] + tileSize * j + 24, game.level['Top'] + tileSize * i + 48)
                    }
                }

                context.fillText(`N${temp['Property'][1]}`, game.level['Left'] + tileSize * j + 32, game.level['Top'] + tileSize * i + 24)
                context.fillText(`N${temp['Property'][2]}`, game.level['Left'] + tileSize * j + 32, game.level['Top'] + tileSize * i + 40)
            } else if (temp['Type'] === 'Number') {
                context.drawImage(img.game.tileEmpty, game.level['Left'] + tileSize * j, game.level['Top'] + tileSize * i)
                context.fillText(`${temp['Property']}`, game.level['Left'] + tileSize * j + 32, game.level['Top'] + tileSize * i + 32)
            } else if (temp['Type'] === 'Wall') {
                context.drawImage(img.game.wall, game.level['Left'] + tileSize * j, game.level['Top'] + tileSize * i)
            } else if (temp['Type'] === 'Ice') {
                context.drawImage(img.game.tileIce, game.level['Left'] + tileSize * j, game.level['Top'] + tileSize * i)
            }

            if (temp['Movable'] === false) {
                context.drawImage(img.game.bolt, game.level['Left'] + tileSize * j + 48, game.level['Top'] + tileSize * i)
            }
        }
    }

    for (let i = 0; i < 5; i++) {
        let temp = game.level['Hand'][i]
            
        if (temp['Type'] === 'Power') {
            context.drawImage(img.game.tilePower, UI.game.hand[0][0] + tileSize * i, UI.game.hand[0][1])
            
            for (let k = 0; k < temp['Property'][0].length; k++) {
                if (temp['Property'][0][k] === 'Right') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i + 48, UI.game.hand[0][1] + 24)
                } else if (temp['Property'][0][k] === 'Left') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i, UI.game.hand[0][1] + 24)
                } else if (temp['Property'][0][k] === 'Up') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i + 24, UI.game.hand[0][1])
                } else if (temp['Property'][0][k] === 'Down') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i + 24, UI.game.hand[0][1] + 48)
                }
            }

            context.fillText(`${temp['Property'][1]}`, UI.game.hand[0][0] + tileSize * i + 32, UI.game.hand[0][1] + 24)
            context.fillText(`${temp['Property'][2]}`, UI.game.hand[0][0] + tileSize * i + 32, UI.game.hand[0][1] + 40)
        } else if (temp['Type'] === 'PowerUpper') {
            context.drawImage(img.game.tilePower, UI.game.hand[0][0] + tileSize * i, UI.game.hand[0][1])
            
            for (let k = 0; k < temp['Property'][0].length; k++) {
                if (temp['Property'][0][k] === 'Right') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i + 48, UI.game.hand[0][1] + 24)
                } else if (temp['Property'][0][k] === 'Left') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i, UI.game.hand[0][1] + 24)
                } else if (temp['Property'][0][k] === 'Up') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i + 24, UI.game.hand[0][1])
                } else if (temp['Property'][0][k] === 'Down') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i + 24, UI.game.hand[0][1] + 48)
                }
            }

            context.fillText(`${temp['Property'][1]}`, UI.game.hand[0][0] + tileSize * i + 32, UI.game.hand[0][1] + 24)
            context.fillText(`>${temp['Property'][2]}`, UI.game.hand[0][0] + tileSize * i + 32, UI.game.hand[0][1] + 40)
        } else if (temp['Type'] === 'PowerLower') {
            context.drawImage(img.game.tilePower, UI.game.hand[0][0] + tileSize * i, UI.game.hand[0][1])
            
            for (let k = 0; k < temp['Property'][0].length; k++) {
                if (temp['Property'][0][k] === 'Right') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i + 48, UI.game.hand[0][1] + 24)
                } else if (temp['Property'][0][k] === 'Left') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i, UI.game.hand[0][1] + 24)
                } else if (temp['Property'][0][k] === 'Up') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i + 24, UI.game.hand[0][1])
                } else if (temp['Property'][0][k] === 'Down') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i + 24, UI.game.hand[0][1] + 48)
                }
            }

            context.fillText(`${temp['Property'][1]}`, UI.game.hand[0][0] + tileSize * i + 32, UI.game.hand[0][1] + 24)
            context.fillText(`<${temp['Property'][2]}`, UI.game.hand[0][0] + tileSize * i + 32, UI.game.hand[0][1] + 40)
        } else if (temp['Type'] === 'PowerNum') {
            context.drawImage(img.game.tilePower, UI.game.hand[0][0] + tileSize * i, UI.game.hand[0][1])
            
            for (let k = 0; k < temp['Property'][0].length; k++) {
                if (temp['Property'][0][k] === 'Right') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i + 48, UI.game.hand[0][1] + 24)
                } else if (temp['Property'][0][k] === 'Left') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i, UI.game.hand[0][1] + 24)
                } else if (temp['Property'][0][k] === 'Up') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i + 24, UI.game.hand[0][1])
                } else if (temp['Property'][0][k] === 'Down') {
                    context.drawImage(img.game.orbOn, UI.game.hand[0][0] + tileSize * i + 24, UI.game.hand[0][1] + 48)
                }
            }

            context.fillText(`N${temp['Property'][1]}`, UI.game.hand[0][0] + tileSize * i + 32, UI.game.hand[0][1] + 24)
            context.fillText(`N${temp['Property'][2]}`, UI.game.hand[0][0] + tileSize * i + 32, UI.game.hand[0][1] + 40)
        } else if (temp['Type'] === 'Number') {
            context.drawImage(img.game.tileEmpty, UI.game.hand[0][0] + tileSize * i, UI.game.hand[0][1])
            context.fillText(`${temp['Property']}`, UI.game.hand[0][0] + tileSize * i + 32, UI.game.hand[0][1] + 32)
        } else if (temp['Type'] === 'Wall') {
            context.drawImage(img.game.wall, UI.game.hand[0][0] + tileSize * i, UI.game.hand[0][1])
        } else if (temp['Type'] === 'Ice') {
            context.drawImage(img.game.tileIce, UI.game.hand[0][0] + tileSize * i, UI.game.hand[0][1])
        }
    }

    if (picking['Type'] != null) {
        if (picking['Type'] === 'Power') {
            context.drawImage(img.game.tilePower, pickingPosition[0], pickingPosition[1])
            
            for (let k = 0; k < picking['Property'][0].length; k++) {
                if (picking['Property'][0][k] === 'Right') {
                    context.drawImage(img.game.orbOn, pickingPosition[0] + 48, pickingPosition[1] + 24)
                }
            }

            context.fillText(`${picking['Property'][1]}`, pickingPosition[0] + 32, pickingPosition[1] + 24)
            context.fillText(`${picking['Property'][2]}`, pickingPosition[0] + 32, pickingPosition[1] + 40)
        } else if (picking['Type'] === 'Number') {
            context.drawImage(img.game.tileEmpty, pickingPosition[0], pickingPosition[1])
            context.fillText(`${picking['Property']}`, pickingPosition[0] + 32, pickingPosition[1] + 32)
        } else if (picking['Type'] === 'Wall') {
            context.drawImage(img.game.wall, pickingPosition[0], pickingPosition[1])
        } else if (picking['Type'] === 'Ice') {
            context.drawImage(img.game.tileIce, pickingPosition[0], pickingPosition[1])
        }
    }

    context.font = '32px neodgm'
}

function drawPause() {
    context.fillStyle = 'White'
    context.fillRect(UI.pause.rect[0], UI.pause.rect[1], UI.pause.rect[2], UI.pause.rect[3])
    context.fillStyle = 'Black'
    context.strokeRect(UI.pause.rect[0], UI.pause.rect[1], UI.pause.rect[2], UI.pause.rect[3])

    context.fillText(`${dataLang['Pause'][langList[lang]]}`, UI.pause.textPaused[0], UI.pause.textPaused[1])
    context.strokeRect(UI.pause.buttonResume[0], UI.pause.buttonResume[1], UI.pause.buttonResume[2], UI.pause.buttonResume[3])
    context.fillText(`${dataLang['Resume'][langList[lang]]}`, UI.pause.textResume[0], UI.pause.textResume[1])
    context.strokeRect(UI.pause.buttonMap[0], UI.pause.buttonMap[1], UI.pause.buttonMap[2], UI.pause.buttonMap[3])
    context.fillText(`${dataLang['Map'][langList[lang]]}`, UI.pause.textMap[0], UI.pause.textMap[1])
}

function drawObjective() {
    context.fillStyle = 'White'
    context.fillRect(UI.game.objective.rect[0], UI.game.objective.rect[1], UI.game.objective.rect[2], UI.game.objective.rect[3])
    context.fillStyle = 'Black'
    context.strokeRect(UI.game.objective.rect[0], UI.game.objective.rect[1], UI.game.objective.rect[2], UI.game.objective.rect[3])

    context.drawImage(img.close, UI.game.objective.close[0], UI.game.objective.close[1])

    context.fillText(`${dataLang['Objective'][langList[lang]]}`, UI.game.objective.textTitle[0], UI.game.objective.textTitle[1])
    context.font = '16px neodgm'
    context.textAlign = 'left'
    for (let i = 0; i < dataLang['Objective1'][langList[lang]].length; i++)
    context.fillText(`${dataLang['Objective1'][langList[lang]][i]}`, UI.game.objective.text1[0], UI.game.objective.text1[1] + UI.game.objective.lineSpace * i)
    context.font = '32px neodgm'
    context.textAlign = 'center'
}

function drawHelp() {
    context.fillStyle = 'White'
    context.fillRect(UI.game.help.rect[0], UI.game.help.rect[1], UI.game.help.rect[2], UI.game.help.rect[3])
    context.fillStyle = 'Black'
    context.strokeRect(UI.game.help.rect[0], UI.game.help.rect[1], UI.game.help.rect[2], UI.game.help.rect[3])

    context.drawImage(img.close, UI.game.help.close[0], UI.game.help.close[1])

    context.fillText(`${dataLang['Help'][langList[lang]]}`, UI.game.help.textTitle[0], UI.game.help.textTitle[1])

    context.fillText(`${game.helpIndex + 1}/6`, UI.game.help.textIndex[0], UI.game.help.textIndex[1])
    context.drawImage(img.prev, UI.game.help.buttonPrev[0], UI.game.help.buttonPrev[1])
    context.drawImage(img.next, UI.game.help.buttonNext[0], UI.game.help.buttonNext[1])
    context.drawImage(img.help[game.helpIndex], UI.game.help.image[0], UI.game.help.image[1])
}