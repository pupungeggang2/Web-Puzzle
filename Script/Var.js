let canvas
let context

let gameInstance
let gameFrameCurrent
let gameFramePrevious
let delta

let scene = 'Title'
let state = ''
let pause = false
let lang = 0

let mouseUpEnabled = true
let mouseMoveEnabled = true
let mouseDownEnabled = true

let levelClearedNum = 0
let worldCurrent = -1
let levelCurrent = -1
let selectedWorld = -1
let selectedLevel = -1
let picking = ['None', -1]
let pickingDraw = -1

let drawObject = []

let sessionVar = {

}

let game = {
    level : {
        
    }
}

let boardLeft = -1
let boardTop = -1

let stateRecorded = []