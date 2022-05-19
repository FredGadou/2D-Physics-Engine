class Shape {
    constructor(name, canvasId, shapeType, nbSide, height) {
        this.canvas = document.getElementById(canvasId);
        this.c = this.canvas.getContext('2d');
        this.name = name;
        this.height = height;
        this.x = Math.floor(this.canvas.width / 2);
        this.y = Math.floor(this.canvas.height / 2);
        this.xCenter = this.x;
        this.yCenter = this.y;
        this.xVel = 0;
        this.yVel = 0;
        this.gravity = 1;
        this.isStatic = 'true';
        this.shapeType = shapeType; // curve , straight
        this.color = 'black';
        this.nbSide = nbSide;
        this.coord = [];
        this.points = new Map();
        this.sides = new Map();
        this.path = [
            [this.x, this.y],
            [this.x, this.y]
        ];
        this.setDefaultShape();
    }
    setHeight(height) {
        this.height = Math.floor(parseInt(height));
        this.setDefaultShape();
    }
    setX(X) {
        this.setPath(X, this.y);
        let xDif = this.x - X;
        this.x = Math.floor(parseInt(X));
        this.xCenter = Math.floor(parseInt(X));
        let series = 0;
        this.coord = [];
        this.points.forEach(coor => {
            series += 1;
            let x = coor[0] - xDif;
            let y = coor[1];
            this.coord.push([x, y]);
        });
        this.setPoints(this.coord);
        for (let i = 0; i < this.coord.length; i++) {
            if (i < this.coord.length - 1) {
                let x1 = this.coord[i][0];
                let y1 = this.coord[i][1];
                let x2 = this.coord[i + 1][0];
                let y2 = this.coord[i + 1][1];
                this.setSide(i + 1, x1, y1, x2, y2);
            } else {
                let x1 = this.coord[i][0];
                let y1 = this.coord[i][1];
                let x2 = this.coord[0][0];
                let y2 = this.coord[0][1];
                this.setSide(i + 1, x1, y1, x2, y2);
            }
        }

    }
    setY(Y) {
        this.setPath(this.x, Y);
        let yDif = this.y - Y;
        this.y = Math.floor(parseInt(Y));
        this.yCenter = Math.floor(parseInt(Y));
        let series = 0;
        this.coord = [];
        this.points.forEach(coor => {
            series += 1;
            let x = coor[0];
            let y = coor[1] - yDif;
            this.coord.push([x, y]);
        });
        this.setPoints(this.coord);
        for (let i = 0; i < this.coord.length; i++) {
            if (i < this.coord.length - 1) {
                let x1 = this.coord[i][0];
                let y1 = this.coord[i][1];
                let x2 = this.coord[i + 1][0];
                let y2 = this.coord[i + 1][1];
                this.setSide(i + 1, x1, y1, x2, y2);
            } else {
                let x1 = this.coord[i][0];
                let y1 = this.coord[i][1];
                let x2 = this.coord[0][0];
                let y2 = this.coord[0][1];
                this.setSide(i + 1, x1, y1, x2, y2);
            }
        }
    }
    addXVel(x) {
        this.xVel += Math.floor(parseInt(x));
    }
    addYVel(y) {
        this.yVel += Math.floor(parseInt(y));
    }
    setXVel(x) {
        this.xVel = Math.floor(parseInt(x));
    }
    setYVel(y) {
        this.yVel = Math.floor(parseInt(y));
    }
    setGravity(gravity) {
        this.gravity = Math.floor(parseInt(gravity));
    }
    setStatic(isStatic) {
        this.isStatic = isStatic;
    }
    setColor(color) {
        this.color = color;
    }
    setNbSide(nb) {
        this.nbSide = parseInt(nb);
    }
    setPoints(points) {
        this.points.clear();
        let series = 0;
        points.forEach(coor => {
            series += 1;
            this.points.set(series, coor);
        });
    }
    setSide(side, x1, y1, x2, y2) {
        if (this.shapeType === 'straight') {
            let sideLength = Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2);
            sideLength = Math.sqrt(sideLength);
            let a = (y2 - y1) / (x2 - x1);
            let b = (a * x1) - y1;
            if (b < 0) {
                b = Math.abs(b);
            } else {
                b = -Math.abs(b);
            }
            this.sides.set(side, { side: side, x1: x1, y1: y1, x2: x2, y2: y2, a: a, b: b, sideLength: sideLength });
        } else if (this.shapeType === 'curve') {
            let r = this.height / 2;
            let a = this.x;
            let b = this.y;
            this.sides.set(side, { r: r, a: a, b: b });
            this.setNbSide(1);
        }
    }
    setShape(shapeType) {
        this.shapeType = shapeType;
    }
    setDefaultShape() {
        this.points.clear();
        this.sides.clear();
        this.coord = [];
        let sideLgth = 0;
        let x1 = 0;
        let y1 = 0;
        let x2 = 0;
        let y2 = 0;
        let x3 = 0;
        let y3 = 0;
        let x4 = 0;
        let y4 = 0;
        let x = 0;
        let y = 0;
        let n = parseInt(this.nbSide);
        let angle = 360 / n;
        let calLoop = 0;
        let ag = 0;
        let ad = 0;
        let op = 0;
        const pointsMap = new Map();
        if (this.shapeType === 'curve') {
            this.setNbSide(1);
            this.setSide(1);
        } else {
            if (n === 3) {
                sideLgth = this.height / Math.sin((Math.PI * 60) / 180);
                x1 = this.x;
                y1 = this.y - (this.height / 2);
                x2 = this.x + (sideLgth / 2);
                y2 = this.y + (this.height / 2);
                x3 = this.x - (sideLgth / 2);
                y3 = this.y + (this.height / 2);
                this.setSide(1, x1, y1, x2, y2);
                this.setSide(2, x2, y2, x3, y3);
                this.setSide(3, x3, y3, x1, y1);
                this.setPoints([
                    [x1, y1],
                    [x2, y2],
                    [x3, y3]
                ]);
                this.points.forEach(coor => {
                    this.coord.push(coor);
                    //console.log(coor);
                });
            } else if (n === 4) {
                x1 = this.x - (this.height / 2);
                y1 = this.y - (this.height / 2);
                x2 = this.x + (this.height / 2);
                y2 = y1;
                x3 = x2;
                y3 = this.y + (this.height / 2);
                x4 = x1;
                y4 = y3;
                this.setSide(1, x1, y1, x2, y2);
                this.setSide(2, x2, y2, x3, y3);
                this.setSide(3, x3, y3, x4, y4);
                this.setSide(4, x4, y4, x1, y1);
                this.setPoints([
                    [x1, y1],
                    [x2, y2],
                    [x3, y3],
                    [x4, y4]
                ]);
                this.points.forEach(coor => {
                    this.coord.push(coor);
                    //console.log(coor);
                });
            } else if (n > 4) {
                x = this.x;
                y = this.y - (this.height / 2);
                pointsMap.set(1, { x: x, y: y });
                if (n % 2 != 0) {
                    calLoop = (n - 1) / 2;
                    if (calLoop % 2 != 0 && calLoop > 3) {
                        ag = (90 - (angle * ((calLoop - 1) / 2))) + (angle * (((calLoop - 1) / 2) - 1));
                        op = Math.sin((Math.PI * ag) / 180) * (this.height / 2);
                        ad = Math.cos((ag * Math.PI) / 180) * (this.height / 2);
                        x = this.x + ad;
                        y = this.y - op;
                        pointsMap.set(2, { x: x, y: y });
                        x = this.x - ad;
                        y = this.y - op;
                        pointsMap.set((n), { x: x, y: y });
                        for (let i = 1; i < calLoop; i++) {
                            if (i >= 1 && i <= (calLoop - 1) / 2) {
                                ag -= angle;
                                op = Math.sin((Math.PI * ag) / 180) * (this.height / 2);
                                ad = Math.cos((ag * Math.PI) / 180) * (this.height / 2);
                                x = this.x + ad;
                                y = this.y - op;
                                pointsMap.set((i + 2), { x: x, y: y });
                                x = this.x - ad;
                                y = this.y - op;
                                pointsMap.set((n - i), { x: x, y: y });
                            } else if (i > (calLoop - 1) / 2) {
                                if (i === ((calLoop - 1) / 2) + 1) {
                                    ag -= (angle / 2);
                                    op = Math.sin((Math.PI * ag) / 180) * (this.height / 2);
                                    ad = Math.cos((ag * Math.PI) / 180) * (this.height / 2);
                                    x = this.x + ad;
                                    y = this.y + op;
                                    pointsMap.set(i + 2, { x: x, y: y });
                                    x = this.x - ad;
                                    y = this.y + op;
                                    pointsMap.set((n - i), { x: x, y: y });
                                } else {
                                    ag += angle;
                                    op = Math.sin((Math.PI * ag) / 180) * (this.height / 2);
                                    ad = Math.cos((ag * Math.PI) / 180) * (this.height / 2);
                                    x = this.x + ad;
                                    y = this.y + op;
                                    pointsMap.set(i + 2, { x: x, y: y });
                                    x = this.x - ad;
                                    y = this.y + op;
                                    pointsMap.set((n - i), { x: x, y: y });
                                }
                            }
                        }
                    } else {
                        ag = (90 - (angle * ((calLoop / 2)))) + (angle * ((calLoop / 2) - 1));
                        op = Math.sin((Math.PI * ag) / 180) * (this.height / 2);
                        ad = Math.cos((ag * Math.PI) / 180) * (this.height / 2);
                        x = this.x + ad;
                        y = this.y - op;
                        pointsMap.set(2, { x: x, y: y });
                        x = this.x - ad;
                        y = this.y - op;
                        pointsMap.set((n), { x: x, y: y });
                        for (let i = 1; i < calLoop; i++) {
                            if (i >= 1 && i < calLoop / 2) {
                                ag -= angle;
                                op = Math.sin((Math.PI * ag) / 180) * (this.height / 2);
                                ad = Math.cos((ag * Math.PI) / 180) * (this.height / 2);
                                x = this.x + ad;
                                y = this.y - op;
                                pointsMap.set((i + 2), { x: x, y: y });
                                x = this.x - ad;
                                y = this.y - op;
                                pointsMap.set((n - i), { x: x, y: y });
                            } else if (i >= calLoop / 2) {
                                if (i === 1) {
                                    ag = angle - ag;
                                    op = Math.sin((Math.PI * ag) / 180) * (this.height / 2);
                                    ad = Math.cos((ag * Math.PI) / 180) * (this.height / 2);
                                    x = this.x + ad;
                                    y = this.y + op;
                                    pointsMap.set(i + 2, { x: x, y: y });
                                    x = this.x - ad;
                                    y = this.y + op;
                                    pointsMap.set((n - i), { x: x, y: y });
                                } else if (i === (calLoop / 2)) { //ok
                                    ag = angle - ag;
                                    op = Math.sin((Math.PI * ag) / 180) * (this.height / 2);
                                    ad = Math.cos((ag * Math.PI) / 180) * (this.height / 2);
                                    x = this.x + ad;
                                    y = this.y + op;
                                    pointsMap.set(i + 2, { x: x, y: y });
                                    x = this.x - ad;
                                    y = this.y + op;
                                    pointsMap.set((n - i), { x: x, y: y });
                                } else if (i === calLoop - 1) {
                                    ag = angle - ag;
                                    op = Math.sin((Math.PI * ag) / 180) * (this.height / 2);
                                    ad = Math.cos((ag * Math.PI) / 180) * (this.height / 2);
                                    x = this.x + ad;
                                    y = this.y + op;
                                    pointsMap.set(i + 2, { x: x, y: y });
                                    x = this.x - ad;
                                    y = this.y + op;
                                    pointsMap.set((n - i), { x: x, y: y });
                                } else {
                                    ag += angle;
                                    op = Math.sin((Math.PI * ag) / 180) * (this.height / 2);
                                    ad = Math.cos((ag * Math.PI) / 180) * (this.height / 2);
                                    x = this.x + ad;
                                    y = this.y + op;
                                    pointsMap.set(i + 2, { x: x, y: y });
                                    x = this.x - ad;
                                    y = this.y + op;
                                    pointsMap.set((n - i), { x: x, y: y });
                                }
                            }
                        }
                    }
                } else {
                    x = this.x;
                    y = this.y + (this.height / 2);
                    pointsMap.set((n / 2) + 1, { x: x, y: y });
                    if ((n - (n / 2)) % 2 != 0) {
                        calLoop = ((n - (n / 2)) - 1) / 2;
                        for (let i = 0; i < calLoop; i++) {
                            if (i === 0) {
                                ag = (angle * (calLoop - 1)) + (angle / 2);
                                op = Math.sin((Math.PI * ag) / 180) * (this.height / 2);
                                ad = Math.cos((ag * Math.PI) / 180) * (this.height / 2);
                                x = this.x + ad;
                                y = this.y - op;
                                pointsMap.set((i + 2), { x: x, y: y });
                                x = this.x - ad;
                                y = this.y - op;
                                pointsMap.set((n - i), { x: x, y: y });
                                x = this.x + ad;
                                y = this.y + op;
                                pointsMap.set((n / 2), { x: x, y: y });
                                x = this.x - ad;
                                y = this.y + op;
                                pointsMap.set(((n / 2) + 2), { x: x, y: y });
                            } else {
                                ag -= angle;
                                op = Math.sin((Math.PI * ag) / 180) * (this.height / 2);
                                ad = Math.cos((ag * Math.PI) / 180) * (this.height / 2);
                                x = this.x + ad;
                                y = this.y - op;
                                pointsMap.set((i + 2), { x: x, y: y });
                                x = this.x - ad;
                                y = this.y - op;
                                pointsMap.set((n - i), { x: x, y: y });
                                x = this.x + ad;
                                y = this.y + op;
                                pointsMap.set((n / 2) - i, { x: x, y: y });
                                x = this.x - ad;
                                y = this.y + op;
                                pointsMap.set(((n / 2) + 2) + i, { x: x, y: y });
                            }
                        }
                    } else {
                        calLoop = (((n - (n / 2)) - 2) / 2) + 1;
                        for (let i = 0; i < calLoop; i++) {
                            if (i === 0) {
                                ag = (angle * (calLoop - 1));
                                op = Math.sin((Math.PI * ag) / 180) * (this.height / 2);
                                ad = Math.cos((ag * Math.PI) / 180) * (this.height / 2);
                                x = this.x + ad;
                                y = this.y - op;
                                pointsMap.set((i + 2), { x: x, y: y });
                                x = this.x - ad;
                                y = this.y - op;
                                pointsMap.set((n - i), { x: x, y: y });
                                x = this.x + ad;
                                y = this.y + op;
                                pointsMap.set((n / 2) - i, { x: x, y: y });
                                x = this.x - ad;
                                y = this.y + op;
                                pointsMap.set(((n / 2) + 2) + i, { x: x, y: y });
                            } else if (i > 0 && i < calLoop - 1) {
                                ag -= angle;
                                op = Math.sin((Math.PI * ag) / 180) * (this.height / 2);
                                ad = Math.cos((ag * Math.PI) / 180) * (this.height / 2);
                                x = this.x + ad;
                                y = this.y - op;
                                pointsMap.set((i + 2), { x: x, y: y });
                                x = this.x - ad;
                                y = this.y - op;
                                pointsMap.set((n - i), { x: x, y: y });
                                x = this.x + ad;
                                y = this.y + op;
                                pointsMap.set((n / 2) - i, { x: x, y: y });
                                x = this.x - ad;
                                y = this.y + op;
                                pointsMap.set(((n / 2) + 2) + i, { x: x, y: y });
                            } else {
                                x = this.x + (this.height / 2);
                                y = this.y;
                                pointsMap.set((i + 2), { x: x, y: y });
                                x = this.x - (this.height / 2);
                                y = this.y;
                                pointsMap.set((n - i), { x: x, y: y });
                            }
                        }
                    }
                }
                for (let i = 0; i < pointsMap.size; i++) {
                    this.coord.push([pointsMap.get(i + 1).x, pointsMap.get(i + 1).y, ])
                }
                this.setPoints(this.coord);
                for (let i = 0; i < this.coord.length; i++) {
                    if (i < this.coord.length - 1) {
                        x1 = this.coord[i][0];
                        y1 = this.coord[i][1];
                        x2 = this.coord[i + 1][0];
                        y2 = this.coord[i + 1][1];
                        this.setSide(i + 1, x1, y1, x2, y2);
                    } else {
                        x1 = this.coord[i][0];
                        y1 = this.coord[i][1];
                        x2 = this.coord[1][0];
                        y2 = this.coord[1][1];
                        this.setSide(i + 1, x1, y1, x2, y2);
                    }
                }
            }
        }
    }
    setPath(x, y) {
        this.path[0][0] = this.path[1][0];
        this.path[0][1] = this.path[1][1];
        this.path[1][0] = x;
        this.path[1][1] = y;
    }
    updateMapsGlobal() {
        let xDif = this.path[0][0] - this.path[1][0];
        let yDif = this.path[0][1] - this.path[1][1];
        let series = 0;
        this.coord = [];
        this.points.forEach(coor => {
            series += 1;
            let x = coor[0] - xDif;
            let y = coor[1] - yDif;
            this.coord.push([x, y]);
        });
        this.setPoints(this.coord);
        for (let i = 0; i < this.coord.length; i++) {
            if (i < this.coord.length - 1) {
                let x1 = this.coord[i][0];
                let y1 = this.coord[i][1];
                let x2 = this.coord[i + 1][0];
                let y2 = this.coord[i + 1][1];
                if (this.shapeType === 'straight') this.setSide(i + 1, x1, y1, x2, y2);
                else if (this.shapeType === 'curve') this.setSide(1);
            } else {
                let x1 = this.coord[i][0];
                let y1 = this.coord[i][1];
                let x2 = this.coord[0][0];
                let y2 = this.coord[0][1];
                this.setSide(i + 1, x1, y1, x2, y2);
                if (this.shapeType === 'straight') this.setSide(i + 1, x1, y1, x2, y2);
                else if (this.shapeType === 'curve') this.setSide(1);
            }
        }

    }
    draw() {
        //console.log(this);
        switch (this.shapeType) {
            case 'curve':
                //console.log(`${this.shapeType}, ${this.color}`);
                let r = this.height / 2;
                this.c.fillStyle = this.color;
                this.c.beginPath();
                this.c.arc(this.x, this.y, r, 0, 2 * Math.PI);
                this.c.fill();
                break;
            case 'straight':
                //console.log(`${this.shapeType}, ${this.color}`);
                this.c.fillStyle = this.color;
                this.c.beginPath();
                this.coord.forEach(coor => {
                    this.c.lineTo(coor[0], coor[1]);
                });
                this.c.closePath();
                this.c.fill();
                break;
        }
    }
    update() {
        if (this.isStatic === 'true') {
            this.setXVel(0);
            this.setYVel(0);
        } else {
            if (this.yVel < 10) {
                this.addYVel(this.gravity);
            } else if (this.yVel > 10) {
                this.setYVel(10);
            } else if (this.yVel < -10) {
                this.setYVel(-10);
            }

            if (this.xVel > 10) {
                this.setXVel(10);
            } else if (this.xVel < -10) {
                this.setXVel(-10);
            }
            this.setX(this.x + this.xVel);
            this.setY(this.y + this.yVel);
            this.setPath(this.x, this.y);
            this.updateMapsGlobal()

        }
    }
}


class Matrix {
    constructor(canvasId) {
        this.id = canvasId;
        this.canvas = document.getElementById(canvasId);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.gravity = 1;
        this.objectsList = new Map();
    }
    addNewShape() {
        let name = 'NewShape' + (this.objectsList.size + 1);
        let shape = new Shape(name, this.id);
        this.objectsList.set(name, shape);
    }
    addShape(shape) {
        this.objectsList.set(shape.name, shape);
    }
    updateShape(shape) {
        this.objectsList.set(shape.name, shape);
    }
    deleteShape(shape) {
        this.objectsList.delete(shape.name);
    }
    isPathColliding(shapeA, shapeB) {}
    update() {
        this.objectsList.forEach(shape => {
            shape.update();
        });
        //console.log(this.objectsList);
    }
    draw() {
        this.objectsList.forEach(shape => {
            shape.draw();
        });
    }
    play() {
        this.objectsList.forEach(shape => {
            shape.update();
            shape.draw();
        });
    }
}