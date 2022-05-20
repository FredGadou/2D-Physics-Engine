class WindowSetting {
    constructor(name, shape, canvasId) {

        this.name = name;
        this.shape = shape;
        this.canvasId = canvasId;

        //-- winSetDiv
        this.winSetDiv = document.createElement('div');
        this.winSetDiv.className = 'windowSetting';
        this.winSetDiv.id = name;
        //---- nameDiv
        this.nameDiv = document.createElement('div');
        this.nameDiv.className = 'settingInDiv';
        //------ label
        this.labelName = document.createElement('label');
        this.labelName.className = 'inputLabel';
        this.labelName.innerHTML = 'Name: ' + name;
        //------ /label
        //---- /nameDiv

        //---- moreButton
        //------ expandDiv 
        this.expandDiv = document.createElement('div');
        this.expandDiv.className = 'expandDiv';
        this.expandDiv.id = 'expandDiv_' + name;
        this.expandDiv.style.display = 'none';
        //-------- deleteDiv 
        this.deleteShape = document.createElement('div');
        this.deleteShape.className = 'inExpandDiv';
        this.deleteShape.addEventListener('mousedown', () => {
            deleteShape(this.shape);
            deleteWindow(this.name);
        });
        //---------- deleteText
        this.deleteText = document.createElement('label');
        this.deleteText.className = 'inExpandLabel';
        this.deleteText.innerHTML = 'Delete';
        //---------- /deleteText
        //-------- /deleteDiv
        //------ /expandDiv
        //------ expandArrow
        this.expandArrow = document.createElement('span');
        this.expandArrow.innerHTML = 'expand_more';
        this.expandArrow.className = 'material-icons';
        this.expandArrow.id = 'expandArrow';
        //------ /expandArrow
        this.moreButton = document.createElement('button');
        this.moreButton.className = 'moreButton';
        this.moreButton.id = 'moreButton_' + name;
        //---- /moreButton

        //---- xDiv
        this.xDiv = document.createElement('div');
        this.xDiv.className = 'settingInDiv';
        //------ label
        this.xLabel = document.createElement('label');
        this.xLabel.className = 'inputLabel';
        this.xLabel.innerHTML = 'X:';
        //------ /label
        //------ input 
        this.xInput = document.createElement('input');
        this.xInput.className = 'numInput';
        this.xInput.setAttribute('type', 'number');
        this.xInput.defaultValue = Math.floor(this.shape.x);
        this.xInput.addEventListener('change', () => {
            this.shape.setX(Math.floor(this.xInput.value));
            this.resetPointCoordDiv();
            this.setPointsCoordDiv();
            matrix.updateShape(this.shape);
            refresh();
        });
        //------ /input
        //---- /xDiv

        //---- yDiv
        this.yDiv = document.createElement('div');
        this.yDiv.className = 'settingInDiv';
        //------ label
        this.yLabel = document.createElement('label');
        this.yLabel.className = 'inputLabel';
        this.yLabel.innerHTML = 'Y:';
        //------ /label
        //------ input
        this.yInput = document.createElement('input');
        this.yInput.className = 'numInput';
        this.yInput.setAttribute('type', 'number');
        this.yInput.defaultValue = Math.floor(parseInt(this.shape.y));
        this.yInput.addEventListener('change', () => {
            this.shape.setY(Math.floor(parseInt(this.yInput.value)));
            this.resetPointCoordDiv();
            this.setPointsCoordDiv();
            matrix.updateShape(this.shape);
            refresh();
        });
        //------ /input
        //---- /yDiv


        //---- coordDiv
        this.coordDiv = document.createElement('div');
        this.coordDiv.className = 'settingInDiv';
        //------ label
        this.pointsCoordLabel = document.createElement('label');
        this.pointsCoordLabel.className = 'inputLabel';
        this.pointsCoordLabel.innerHTML = 'Points Coord:';
        //------ /label
        //-------- pointsCoordDiv
        this.pointsCoordDiv = document.createElement('div');
        this.pointsCoordDiv.className = 'inChildSettingDiv';
        //---------- input 
        this.setPointsCoordDiv();
        //---------- /input
        //-------- /pointsCoordDiv
        //---- /coordDiv

        //---- shapeSideDiv
        this.shapeSideDiv = document.createElement('div');
        this.shapeSideDiv.className = 'settingInDiv';
        //------ shapeHeightLabel
        this.shapeSideLabel = document.createElement('label');
        this.shapeSideLabel.className = 'inputLabel';
        this.shapeSideLabel.innerHTML = 'Side:'
            //------ /shapeHeightLabel
            //------ input
        this.sideInput = document.createElement('input');
        this.sideInput.className = 'numInput';
        this.sideInput.setAttribute('type', 'number');
        this.sideInput.defaultValue = this.shape.nbSide;
        this.sideInput.addEventListener('change', () => {
            this.shape.setNbSide(Math.floor(this.sideInput.value));
            this.shape.setDefaultShape();
            this.resetPointCoordDiv();
            this.setPointsCoordDiv();
            matrix.updateShape(this.shape);
            refresh();
        });
        //------ /input
        //---- /shapeSideDiv


        //---- shapeStyleDiv
        this.shapeStyleDiv = document.createElement('div');
        this.shapeStyleDiv.className = 'settingInDiv';
        //------ shapeStyleLabel
        this.shapeStyleLabel = document.createElement('label');
        this.shapeStyleLabel.className = 'inputLabel';
        this.shapeStyleLabel.innerHTML = 'Shape Style:';
        //------ /shapeStyleLabel
        //------ select
        this.shapeStyleSelect = document.createElement('select');
        this.shapeStyleSelect.className = 'inputSelect';
        //-------- option
        this.shapeStyleOption1 = document.createElement('option');
        this.shapeStyleOption1.className = 'inputSelectInput';
        this.shapeStyleOption1.value = 'curve';
        this.shapeStyleOption1.text = 'Curve';

        this.shapeStyleOption2 = document.createElement('option');
        this.shapeStyleOption2.className = 'inputSelectInput';
        this.shapeStyleOption2.value = 'straight';
        this.shapeStyleOption2.text = 'Straight';

        if (this.shape.shapeType === 'curve') {
            this.shapeStyleOption1.selected = true;
            this.shapeStyleOption2.selected = false;
            this.shapeSideDiv.style.display = 'none';
        } else {
            this.shapeStyleOption1.selected = false;
            this.shapeStyleOption2.selected = true;
            this.shapeSideDiv.style.display = 'block';
            this.shape.setNbSide(3);
        }

        this.shapeStyleSelect.addEventListener('change', () => {
            this.shape.setShape(this.shapeStyleSelect.value);
            if (this.shape.shapeType === 'curve') {
                this.shapeStyleOption1.selected = true;
                this.shapeStyleOption2.selected = false;
                this.shapeSideDiv.style.display = 'none';
            } else {
                this.shapeStyleOption1.selected = false;
                this.shapeStyleOption2.selected = true;
                this.shapeSideDiv.style.display = 'block';
                this.shape.setNbSide(3);
            }
            this.shape.setDefaultShape();
            this.resetPointCoordDiv();
            this.setPointsCoordDiv();
            matrix.updateShape(this.shape);
            refresh();
        });

        this.shapeStyleSelect.add(this.shapeStyleOption1);
        this.shapeStyleSelect.add(this.shapeStyleOption2);
        //-------- /option
        //------ /select
        //---- /shapeStyleDiv

        //---- shapeHeightDiv
        this.shapeHeightDiv = document.createElement('div');
        this.shapeHeightDiv.className = 'settingInDiv';
        //------ shapeHeightLabel
        this.shapeHeightLabel = document.createElement('label');
        this.shapeHeightLabel.className = 'inputLabel';
        this.shapeHeightLabel.innerHTML = 'Height:'
            //------ /shapeHeightLabel
            //------ input
        this.heightInput = document.createElement('input');
        this.heightInput.className = 'numInput';
        this.heightInput.setAttribute('type', 'number');
        this.heightInput.defaultValue = Math.floor(this.shape.height);
        this.heightInput.addEventListener('change', () => {
            this.shape.setHeight(Math.floor(this.heightInput.value));
            this.resetPointCoordDiv();
            this.setPointsCoordDiv();
            matrix.updateShape(this.shape);
            refresh();
        });
        //------ /input
        //---- /shapeHeightDiv

        //---- shapeColorDiv
        this.shapeColorDiv = document.createElement('div');
        this.shapeColorDiv.className = 'settingInDiv';
        //------ label
        this.shapeColorLabel = document.createElement('label');
        this.shapeColorLabel.className = 'inputLabel';
        this.shapeColorLabel.innerHTML = 'Color:';
        //------ /label
        //------ input
        this.shapeColorInput = document.createElement('input');
        this.shapeColorInput.className = 'colorInput';
        this.shapeColorInput.setAttribute('type', 'color');
        this.shapeColorInput.defaultValue = this.shape.color;
        this.shapeColorInput.addEventListener('change', () => {
            this.shape.setColor(this.shapeColorInput.value);
            this.resetPointCoordDiv();
            this.setPointsCoordDiv();
            matrix.updateShape(this.shape);
            refresh();
        });
        //------ /input
        //---- /shapeColorDiv

        //---- isStaticDiv
        this.isStaticDiv = document.createElement('div');
        this.isStaticDiv.className = 'settingInDiv';

        //------ label
        this.isStaticLabel = document.createElement('label');
        this.isStaticLabel.className = 'inputLabel';
        this.isStaticLabel.innerHTML = 'isStatic:';
        //------ /label
        //------ select
        this.isStaticSelect = document.createElement('select');
        this.isStaticSelect.className = 'inputSelect';
        //-------- option
        this.isStaticOption1 = document.createElement('option');
        this.isStaticOption1.className = 'inputSelectInput';
        this.isStaticOption1.value = 'true';
        this.isStaticOption1.text = 'True';
        this.isStaticOption1.selected = true;

        this.isStaticOption2 = document.createElement('option');
        this.isStaticOption2.className = 'inputSelectInput';
        this.isStaticOption2.value = 'false';
        this.isStaticOption2.text = 'False';
        this.isStaticOption2.selected = false;

        this.isStaticSelect.addEventListener('change', () => {
            this.shape.setStatic(this.isStaticSelect.value);
            this.resetPointCoordDiv();
            this.setPointsCoordDiv();
            matrix.updateShape(this.shape);
            refresh();
        });

        this.isStaticSelect.add(this.isStaticOption1);
        this.isStaticSelect.add(this.isStaticOption2);
        //-------- /option
        //------ /select
        //---- /isStaticDiv

        //---- xVelDiv
        this.xVelDiv = document.createElement('div');
        this.xVelDiv.className = 'settingInDiv';
        //------ label
        this.xVelLabel = document.createElement('label');
        this.xVelLabel.className = 'inputLabel';
        this.xVelLabel.innerHTML = 'X Velocity:';
        //------ /label
        //------ input 
        this.xVelInput = document.createElement('output');
        this.xVelInput.className = 'numInput';
        this.xVelInput.setAttribute('type', 'number');
        this.xVelInput.defaultValue = this.shape.xVel;
        this.xVelInput.addEventListener('change', () => {
            this.shape.setXVel(this.xVelInput.value);
            this.resetPointCoordDiv();
            this.setPointsCoordDiv();
            matrix.updateShape(this.shape);
            refresh();
        });
        //------ /input
        //---- /xVelDiv

        //---- yVelDiv
        this.yVelDiv = document.createElement('div');
        this.yVelDiv.className = 'settingInDiv';
        //------ label
        this.yVelLabel = document.createElement('label');
        this.yVelLabel.className = 'inputLabel';
        this.yVelLabel.innerHTML = 'Y Velocity:';
        //------ /label
        //------ input
        this.yVelInput = document.createElement('output');
        this.yVelInput.className = 'numInput';
        this.yVelInput.setAttribute('type', 'number');
        this.yVelInput.defaultValue = this.shape.yVel;
        this.yVelInput.addEventListener('change', () => {
            this.shape.setYVel(this.yVelInput.value);
            this.resetPointCoordDiv();
            this.setPointsCoordDiv();
            matrix.updateShape(this.shape);
            refresh();
        });
        //------ /input
        //---- /yVelDiv
        //-- /winSetDiv


        this.nameDiv.appendChild(this.labelName);

        this.deleteShape.appendChild(this.deleteText);
        this.expandDiv.appendChild(this.deleteShape);
        this.moreButton.appendChild(this.expandArrow);

        this.xDiv.appendChild(this.xLabel);
        this.xDiv.appendChild(this.xInput);

        this.yDiv.appendChild(this.yLabel);
        this.yDiv.appendChild(this.yInput);

        this.shapeStyleDiv.appendChild(this.shapeStyleLabel);
        this.shapeStyleDiv.appendChild(this.shapeStyleSelect);

        this.shapeSideDiv.appendChild(this.shapeSideLabel);
        this.shapeSideDiv.appendChild(this.sideInput);

        this.shapeHeightDiv.appendChild(this.shapeHeightLabel);
        this.shapeHeightDiv.appendChild(this.heightInput);

        this.shapeColorDiv.appendChild(this.shapeColorLabel);
        this.shapeColorDiv.appendChild(this.shapeColorInput);

        this.isStaticDiv.appendChild(this.isStaticLabel);
        this.isStaticDiv.appendChild(this.isStaticSelect);

        this.xVelDiv.appendChild(this.xVelLabel);
        this.xVelDiv.appendChild(this.xVelInput);

        this.yVelDiv.appendChild(this.yVelLabel);
        this.yVelDiv.appendChild(this.yVelInput);

        this.coordDiv.appendChild(this.pointsCoordLabel);
        this.coordDiv.appendChild(this.pointsCoordDiv);

        this.winSetDiv.appendChild(this.nameDiv);
        this.winSetDiv.appendChild(this.moreButton);
        this.winSetDiv.appendChild(this.xDiv);
        this.winSetDiv.appendChild(this.yDiv);
        this.winSetDiv.appendChild(this.shapeStyleDiv);
        this.winSetDiv.appendChild(this.shapeSideDiv);
        this.winSetDiv.appendChild(this.shapeHeightDiv);
        this.winSetDiv.appendChild(this.shapeColorDiv);
        this.winSetDiv.appendChild(this.isStaticDiv);
        this.winSetDiv.appendChild(this.xVelDiv);
        this.winSetDiv.appendChild(this.yVelDiv);
        this.winSetDiv.appendChild(this.coordDiv);
        this.winSetDiv.appendChild(this.expandDiv);


        this.expandButton = () => {
            let id = 'expandDiv_' + name;
            let div = document.getElementById(id)
            if (div.style.display === 'none') {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        }

        this.moreButton.onclick = this.expandButton;

    }

    setPointsCoordDiv() {
        this.shape.points.forEach(point => {
            let pointCoorDiv = document.createElement('div');
            pointCoorDiv.className = 'settingInChildDiv';
            let pointLabel = document.createElement('label');
            pointLabel.className = 'inputLabel';
            pointLabel.innerHTML = this.pointsCoordDiv.childNodes.length + 1;
            let pointOutput = document.createElement('output');
            pointOutput.className = 'numInput';
            pointOutput.setAttribute('type', 'number');
            pointOutput.defaultValue = `${parseInt(point[0])}, ${parseInt(point[1])}`;
            pointCoorDiv.appendChild(pointLabel);
            pointCoorDiv.appendChild(pointOutput);
            this.pointsCoordDiv.appendChild(pointCoorDiv);
        });
    }

    resetPointCoordDiv() {
        while (this.pointsCoordDiv.childNodes.length > 0) {
            this.pointsCoordDiv.removeChild(this.pointsCoordDiv.firstChild);
        }
    }

    update() {
        this.xInput.value = this.shape.x;
        this.yInput.value = this.shape.y;
        this.xVelInput.value = this.shape.xVel;
        this.yVelInput.value = this.shape.yVel;
        //console.log(this);
    }

    drawWindow(divId) {

        let div = document.getElementById(divId);

        div.appendChild(this.winSetDiv);
    }
}

class NewShapeWindow {
    constructor() {
        //-- windowDiv
        this.windowDiv = document.createElement('div');
        this.windowDiv.id = 'newShapeWin';
        this.windowDiv.className = 'windowSetting';

        //---- setHeightDiv
        this.setHeightDiv = document.createElement('div');
        this.setHeightDiv.className = 'settingInDiv';
        //------ label
        this.setHeightLabel = document.createElement('label');
        this.setHeightLabel.className = 'inputLabel';
        this.setHeightLabel.innerHTML = 'Height:';
        //------ /label
        //------ input
        this.setHeightInput = document.createElement('input');
        this.setHeightInput.className = 'numInput';
        this.setHeightInput.setAttribute('type', 'number');
        this.setHeightInput.defaultValue = 100;
        //------ /input
        //---- /setHeightDiv
        //---- typeDiv
        this.typeDiv = document.createElement('div');
        this.typeDiv.className = 'settingInDiv';
        //------ label
        this.typeLabel = document.createElement('label');
        this.typeLabel.className = 'inputLabel';
        this.typeLabel.innerHTML = 'Type:'
            //------ /label
            //------ select
        this.typeSelect = document.createElement('select');
        this.typeSelect.className = 'inputSelect';
        //-------- option
        this.typeOption1 = document.createElement('option');
        this.typeOption1.value = 'curve';
        this.typeOption1.text = 'Curve';
        this.typeOption1.selected = true;

        this.typeOption2 = document.createElement('option');
        this.typeOption2.value = 'straight';
        this.typeOption2.text = 'Straight';
        this.typeOption2.selected = false;
        //-------- /option
        this.typeSelect.addEventListener('change', () => {
                let opt = this.typeSelect.value;
                if (opt === 'curve') {
                    document.getElementById('setSideDiv').style.display = 'none';
                } else {
                    document.getElementById('setSideDiv').style.display = 'block';
                }
            })
            //------ /select
            //---- /typeDiv
            //---- setSideDiv
        this.setSideDiv = document.createElement('div');
        this.setSideDiv.className = 'settingInDiv';
        this.setSideDiv.id = 'setSideDiv';
        this.setSideDiv.style.display = 'none';
        //------ label
        this.setSideLabel = document.createElement('label');
        this.setSideLabel.className = 'inputLabel';
        this.setSideLabel.innerHTML = 'Sides:';
        //------ /label
        //------ input
        this.setSideInput = document.createElement('input');
        this.setSideInput.className = 'numInput';
        this.setSideInput.setAttribute('type', 'number');
        this.setSideInput.defaultValue = 3;
        this.setSideInput.min = 3;
        //------ /input
        //---- /setSideDiv
        //---- buttonAdd
        this.buttonAdd = document.createElement('button');
        this.buttonAdd.innerHTML = 'Add';
        this.buttonAdd.onclick = () => {
            addDefaultShape(this.typeSelect.value, this.setSideInput.value, this.setHeightInput.value);
            document.getElementById('newShapeWin').remove();
        };
        //---- /buttonAdd
        //-- /windowDiv

        this.setHeightDiv.appendChild(this.setHeightLabel);
        this.setHeightDiv.appendChild(this.setHeightInput);
        this.typeSelect.add(this.typeOption1);
        this.typeSelect.add(this.typeOption2);
        this.typeDiv.appendChild(this.typeLabel);
        this.typeDiv.appendChild(this.typeSelect);
        this.setSideDiv.appendChild(this.setSideLabel);
        this.setSideDiv.appendChild(this.setSideInput);
        this.windowDiv.appendChild(this.setHeightDiv);
        this.windowDiv.appendChild(this.typeDiv);
        this.windowDiv.appendChild(this.setSideDiv);
        this.windowDiv.appendChild(this.buttonAdd);
    }
    draw(divId) {
        let div = document.getElementById(divId);

        div.appendChild(this.windowDiv);
    }
}





const sideDivId = 'sideContent';
const screenDiv = document.getElementById('screenDiv');
let btn01 = document.getElementById('btn01');

let canvasId = 'screen';
let canvas = document.getElementById(canvasId);

canvas.width = screenDiv.offsetWidth;
canvas.height = screenDiv.offsetHeight;

let c = canvas.getContext('2d');
let req;

var shapeCount = 0;

const windSetMap = new Map();
const matrix = new Matrix(canvasId);

let isGridOn = false;




function newShapeWin() {
    let newSW = new NewShapeWindow();
    newSW.draw(sideDivId);
}

function addDefaultShape(shapetype, nSide, height) {
    shapeCount += 1;
    let shape = new Shape('shape' + shapeCount, canvasId, shapetype, nSide, height);
    let windoSet = new WindowSetting(shape.name, shape, canvasId);
    windSetMap.set(windoSet.name, windoSet);
    matrix.addShape(shape);
    matrix.play();
    windoSet.drawWindow(sideDivId);
}

function deleteShape(shape) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    matrix.deleteShape(shape);
    matrix.update();
}

function deleteWindow(winId) {
    windSetMap.delete(winId);
    document.getElementById(winId).remove();

}

function play() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    req = requestAnimationFrame(play);
    if (isGridOn) {
        setGrid();
    }
    matrix.play();
    windSetMap.forEach(win => {
        win.update();
    });
}

function refresh() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    req = requestAnimationFrame(play);
    if (isGridOn) {
        setGrid();
    }
    matrix.play();
    windSetMap.forEach(win => {
        win.update();
    });
    //console.log(windSetMap);
    stopFrame();
}

function stopFrame() {
    cancelAnimationFrame(req);
}

function clearCanvas() {
    c.clearRect(0, 0, canvas.width, canvas.height);
}

function setGrid() {
    let gap = 25;
    let xColumCount = (canvas.width / gap);
    let yColumCount = (canvas.height / gap);
    let xLength = (xColumCount * gap) - gap;
    let yLength = (yColumCount * gap) - gap;
    for (let i = 0; i < xColumCount; i++) {
        c.lineWidth = 1;
        c.strokeStyle = 'black';
        c.beginPath();
        c.moveTo((i * gap) + 0.5, 0.5);
        c.lineTo((i * gap) + 0.5, yLength + 0.5);
        c.closePath();
        c.stroke();
    }
    for (let i = 0; i < yColumCount; i++) {
        c.lineWidth = 1;
        c.strokeStyle = 'black';
        c.beginPath();
        c.moveTo(0.5, (i * gap) + 0.5);
        c.lineTo(xLength + 0.5, (i * gap) + 0.5);
        c.closePath();
        c.stroke();
    }
}

function toggleGrid() {
    if (isGridOn) {
        btn01.style.backgroundColor = '#3A8E32A8';
        isGridOn = false;
        refresh();
    } else {
        btn01.style.backgroundColor = '#2eee36b0';
        isGridOn = true;
        refresh();
    }
}
