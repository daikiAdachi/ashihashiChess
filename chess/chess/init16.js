init = function() {
    draw();
};
function draw() {
    var canvas = document.getElementById('chessBoard');
    if (! canvas || ! canvas.getContext) {
	return false;
    }
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 480);
    ctx.lineTo(480, 480);
    ctx.lineTo(480, 0);
    ctx.closePath();

    ctx.moveTo(0, 60);
    ctx.lineTo(480, 60);
    ctx.moveTo(0, 120);
    ctx.lineTo(480, 120);
    ctx.moveTo(0, 180);
    ctx.lineTo(480, 180);
    ctx.moveTo(0, 240);
    ctx.lineTo(480, 240);
    ctx.moveTo(0, 300);
    ctx.lineTo(480, 300);
    ctx.moveTo(0, 360);
    ctx.lineTo(480, 360);
    ctx.moveTo(0, 420);
    ctx.lineTo(480, 420);

    ctx.moveTo(60, 0);
    ctx.lineTo(60, 480);
    ctx.moveTo(120, 0);
    ctx.lineTo(120, 480);
    ctx.moveTo(180, 0);
    ctx.lineTo(180, 480);
    ctx.moveTo(240, 0);
    ctx.lineTo(240, 480);
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 480);
    ctx.moveTo(360, 0);
    ctx.lineTo(360, 480);
    ctx.moveTo(420, 0);
    ctx.lineTo(420, 480);
    
    ctx.stroke();

    var pawn1 = document.createElement("img");
    document.body.appendChild(pawn1);
    pawn1.src = "./img/wpawn2.gif";
    pawn1.style.position = "absolute";
    pawn1.style.left = "430px";
    pawn1.style.top = "440px";
    
    var pawn2 = document.createElement("img");
    document.body.appendChild(pawn2);
    pawn2.src = "./img/wpawn2.gif";
    pawn2.style.position = "absolute";
    pawn2.style.left = "490px";
    pawn2.style.top = "440px";

    var pawn3 = document.createElement("img");
    document.body.appendChild(pawn3);
    pawn3.src = "./img/wpawn2.gif";
    pawn3.style.position = "absolute";
    pawn3.style.left = "550px";
    pawn3.style.top = "440px";

    var pawn4 = document.createElement("img");
    document.body.appendChild(pawn4);
    pawn4.src = "./img/wpawn2.gif";
    pawn4.style.position = "absolute";
    pawn4.style.left = "610px";
    pawn4.style.top = "440px";

    var pawn5 = document.createElement("img");
    document.body.appendChild(pawn5);
    pawn5.src = "./img/wpawn2.gif";
    pawn5.style.position = "absolute";
    pawn5.style.left = "670px";
    pawn5.style.top = "440px";

    var pawn6 = document.createElement("img");
    document.body.appendChild(pawn6);
    pawn6.src = "./img/wpawn2.gif";
    pawn6.style.position = "absolute";
    pawn6.style.left = "730px";
    pawn6.style.top = "440px";

    var pawn7 = document.createElement("img");
    document.body.appendChild(pawn7);
    pawn7.src = "./img/wpawn2.gif";
    pawn7.style.position = "absolute";
    pawn7.style.left = "790px";
    pawn7.style.top = "440px";

    var pawn8 = document.createElement("img");
    document.body.appendChild(pawn8);
    pawn8.src = "./img/wpawn2.gif";
    pawn8.style.position = "absolute";
    pawn8.style.left = "850px";
    pawn8.style.top = "440px";

    var rook1 = document.createElement("img");
    document.body.appendChild(rook1);
    rook1.src = "./img/wrook3.gif";
    rook1.style.position = "absolute";
    rook1.style.left = "430px";
    rook1.style.top = "500px";

    var rook2 = document.createElement("img");
    document.body.appendChild(rook2);
    rook2.src = "./img/wrook3.gif";
    rook2.style.position = "absolute";
    rook2.style.left = "850px";
    rook2.style.top = "500px";

    var knight1 = document.createElement("img");
    document.body.appendChild(knight1);
    knight1.src = "./img/wknight.gif";
    knight1.style.position = "absolute";
    knight1.style.left = "490px";
    knight1.style.top = "500px";

    var knight2 = document.createElement("img");
    document.body.appendChild(knight2);
    knight2.src = "./img/wknight.gif";
    knight2.style.position = "absolute";
    knight2.style.left = "790px";
    knight2.style.top = "500px";

    var bishop1 = document.createElement("img");
    document.body.appendChild(bishop1);
    bishop1.src = "./img/wbishop.gif";
    bishop1.style.position = "absolute";
    bishop1.style.left = "550px";
    bishop1.style.top = "500px";

    var bishop2 = document.createElement("img");
    document.body.appendChild(bishop2);
    bishop2.src = "./img/wbishop.gif";
    bishop2.style.position = "absolute";
    bishop2.style.left = "730px";
    bishop2.style.top = "500px";

    var queen1 = document.createElement("img");
    document.body.appendChild(queen1);
    queen1.src = "./img/wqueen.gif";
    queen1.style.position = "absolute";
    queen1.style.left = "610px";
    queen1.style.top = "500px";

    var king1 = document.createElement("img");
    document.body.appendChild(king1);
    king1.src = "./img/wking.gif";
    king1.style.position = "absolute";
    king1.style.left = "670px";
    king1.style.top = "500px";

    var pawn8 = document.createElement("img");
    document.body.appendChild(pawn8);
    pawn8.src = "./img/bpawn.gif";
    pawn8.style.position = "absolute";
    pawn8.style.left = "430px";
    pawn8.style.top = "140px";

    var pawn9 = document.createElement("img");
    document.body.appendChild(pawn9);
    pawn9.src = "./img/bpawn.gif";
    pawn9.style.position = "absolute";
    pawn9.style.left = "490px";
    pawn9.style.top = "140px";

    var pawn10 = document.createElement("img");
    document.body.appendChild(pawn10);
    pawn10.src = "./img/bpawn.gif";
    pawn10.style.position = "absolute";
    pawn10.style.left = "550px";
    pawn10.style.top = "140px";

    var pawn11 = document.createElement("img");
    document.body.appendChild(pawn11);
    pawn11.src = "./img/bpawn.gif";
    pawn11.style.position = "absolute";
    pawn11.style.left = "610px";
    pawn11.style.top = "140px";

    var pawn12 = document.createElement("img");
    document.body.appendChild(pawn12);
    pawn12.src = "./img/bpawn.gif";
    pawn12.style.position = "absolute";
    pawn12.style.left = "670px";
    pawn12.style.top = "140px";

    var pawn13 = document.createElement("img");
    document.body.appendChild(pawn13);
    pawn13.src = "./img/bpawn.gif";
    pawn13.style.position = "absolute";
    pawn13.style.left = "730px";
    pawn13.style.top = "140px";

    var pawn14 = document.createElement("img");
    document.body.appendChild(pawn14);
    pawn14.src = "./img/bpawn.gif";
    pawn14.style.position = "absolute";
    pawn14.style.left = "790px";
    pawn14.style.top = "140px";

    var pawn15 = document.createElement("img");
    document.body.appendChild(pawn15);
    pawn15.src = "./img/bpawn.gif";
    pawn15.style.position = "absolute";
    pawn15.style.left = "850px";
    pawn15.style.top = "140px";

    var rook3 = document.createElement("img");
    document.body.appendChild(rook3);
    rook3.src = "./img/brook.gif";
    rook3.style.position = "absolute";
    rook3.style.left = "430px";
    rook3.style.top = "80px";

    var rook4 = document.createElement("img");
    document.body.appendChild(rook4);
    rook4.src = "./img/brook.gif";
    rook4.style.position = "absolute";
    rook4.style.left = "850px";
    rook4.style.top = "80px";

    var knight3 = document.createElement("img");
    document.body.appendChild(knight3);
    knight3.src = "./img/bknight.gif";
    knight3.style.position = "absolute";
    knight3.style.left = "490px";
    knight3.style.top = "80px";

    var knight4 = document.createElement("img");
    document.body.appendChild(knight4);
    knight4.src = "./img/bknight.gif";
    knight4.style.position = "absolute";
    knight4.style.left = "790px";
    knight4.style.top = "80px";

    var bishop3 = document.createElement("img");
    document.body.appendChild(bishop3);
    bishop3.src = "./img/bbishop.gif";
    bishop3.style.position = "absolute";
    bishop3.style.left = "550px";
    bishop3.style.top = "80px";

    var bishop4 = document.createElement("img");
    document.body.appendChild(bishop4);
    bishop4.src = "./img/bbishop.gif";
    bishop4.style.position = "absolute";
    bishop4.style.left = "730px";
    bishop4.style.top = "80px";

    var queen2 = document.createElement("img");
    document.body.appendChild(queen2);
    queen2.src = "./img/bqueen.gif";
    queen2.style.position = "absolute";
    queen2.style.left = "610px";
    queen2.style.top = "80px";

    var king2 = document.createElement("img");
    document.body.appendChild(king2);
    king2.src = "./img/bking.gif";
    king2.style.position = "absolute";
    king2.style.left = "670px";
    king2.style.top = "80px";

    var hor = document.createElement("img");
    document.body.appendChild(hor);
    hor.src = "./img/horNum.png";
    hor.style.position = "absolute";
    hor.style.left = "420px";
    hor.style.top = "20px";

    var vir = document.createElement("img");
    document.body.appendChild(vir);
    vir.src = "./img/virNum.png";
    vir.style.position = "absolute";
    vir.style.left = "370px";
    vir.style.top = "80px";
}

