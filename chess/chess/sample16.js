var serverURL = "ws://kgr.cs.inf.shizuoka.ac.jp:10808";
var channel = "cs12002";
var player = "player1";//プレイヤーの識別変数

setup = function() {
	var request = "request1";
	if(channel == "" || serverURL == ""){
	document.getElementById('messageBar').innerHTML = '[ERROR] チャンネルもしくはURLが空です。';
	return;
	}

	var webSocket = new WebSocket(serverURL);
	webSocket.onopen = function(event){
		document.getElementById('messageBar').innerHTML = '接続完了';
		webSocket.send(channel + ':');
	};

    webSocket.onmessage = function(event){
		var msg = event.data;
		if(msg == channel + ";"){
			document.getElementById('messageBar').innerHTML = 'ハンドシェイク完了';
		}else if(msg.indexOf(channel + ":") == 0){
			//チャンネル削除
			msg = msg.substring(msg.indexOf(":")+1);
			//カンマで分けて配列へ
			fields = msg.split(",");
	    	if(fields[0] == player){
				if(fields[1] == "cs"){
					//こちらのkinectからデータがきた場合
					if(request == "request1"){
						//X座標の取り込み
						document.fm.B.value = parseInt(fields[2]);
						//Y座標の取り込み
						document.fm.C.value = fields[3];
						//状態を反映
						myTurn();
						//リクエストを送る
						request = "request2";
						requestMessage();
					}else if(request == "request2"){
						document.fm.D.value = fields[2];
						document.fm.E.value = fields[3];
						destination();
						request = "request1";
					}
				}
			}else{
				if(fields[1] == js){
		    		//相手のJavaScriptからデータがきた場合
		    		document.fm.B.value = fields[2];
		    		document.fm.C.value = fields[3];
		    		document.fm.D.value = fields[4];
		    		document.fm.E.value = fields[5];
		    		destination();
		    		//focusのためのリクエストの送信
		    		request = "request1";
		    		requestMessage();
				}
			}
		}else{
			console.log(JSON.stringify(msg));
		}
	};

	webSocket.onclose = function(event){
		document.getElementById('time').innerHTML = 'socket closed';
	};

	requestMessage = function(){
		//キネクトにリクエストを送る
		webSocket.send(channel+":"+player+",js,"+request);//jsはJavaScriptから送信することを表す
	};

	sendData = function(){
		//自分のターンの情報を相手に送る
		//移動前後の座標の所得
		var b = document.fm.B.value;
		var c = document.fm.C.value;
		var d = document.fm.D.value;
		var e = document.fm.E.value;
		//移動前後の座標を相手のJavaScriptに送る
		webSocket.send(channel+":"+player+",js,"+b+","+c+","+d+","+e);
	};
}

function pxToHeight(y) {
    switch (y) {
    case 500: return 7;
    case 440: return 6;
    case 380: return 5;
    case 320: return 4;
    case 260: return 3;
    case 200: return 2;
    case 140: return 1;
    case 80: return 0;
    }
}

function heightToPx(y) {
    switch (y) {
    case 7: return 500;
    case 6: return 440;
    case 5: return 380;
    case 4: return 320;
    case 3: return 260;
    case 2: return 200;
    case 1: return 140;
    case 0: return 80;
    default: return 0;
    }
}

function pxToWidth(x) {
    switch (x) {
    case 430: return 0;
    case 490: return 1;
    case 550: return 2;
    case 610: return 3;
    case 670: return 4;
    case 730: return 5;
    case 790: return 6;
    case 850: return 7;
    }
}

function widthToPx(x) {
    switch (x) {
    case 0: return 430;
    case 1: return 490;
    case 2: return 550;
    case 3: return 610;
    case 4: return 670;
    case 5: return 730;
    case 6: return 790;
    case 7: return 850;
    default: return 0;
    }
}

function footmark(x, y, n) {
    if (n < 16) {
        w[x][y] = 1;
    } else {
        b[x][y] = 1;
    }
}

var b = [[1,1,0,0,0,0,0,0],[1,1,0,0,0,0,0,0],[1,1,0,0,0,0,0,0],[1,1,0,0,0,0,0,0],[1,1,0,0,0,0,0,0],[1,1,0,0,0,0,0,0],[1,1,0,0,0,0,0,0],[1,1,0,0,0,0,0,0]];

var w = [[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,1,1]];

var f = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];

var number = [[24,16,-1,-1,-1,-1,0,8],[26,17,-1,-1,-1,-1,1,10],[28,18,-1,-1,-1,-1,2,12],[30,19,-1,-1,-1,-1,3,14],[31,20,-1,-1,-1,-1,4,15],[29,21,-1,-1,-1,-1,5,13],[27,22,-1,-1,-1,-1,6,11],[25,23,-1,-1,-1,-1,7,9]];

function resetForcus() {
    f = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
}

var turnWhite = true;

function myTurn() {
    var flag = false;
    var x = choosePieceX();
    var y = choosePieceY();
    var num = number[x][y];
    var x2 = choosePieceX2();
    var y2 = choosePieceY2();
    focus(x, y);
    request = "request2";
    requestMessage();
}

function choosePieceX() {
    var x = parseInt(document.fm.B.value) - 1;
    return x;
}

function choosePieceY() {
    var y = parseInt(document.fm.C.value) - 1;
    return y;
}

function choosePieceX2() {
    var x2 = parseInt(document.fm2.D.value) - 1;
    return x2;
}

function choosePieceY2() {
    var y2 = parseInt(document.fm2.E.value) - 1;
    return y2;
}

function getNumber() {
    var i = parseInt(document.fm.A.value);
    return i;
}

function focus(x, y) {
    var num = number[x][y];
    if (turnWhite && num > 15) {
	alert("白の番です");
	return;
    } else if (!(turnWhite) && num < 16) {
	alert("黒の番です");
	return;
    }
    var canvas = document.getElementById('chessBoard');
    if ( ! canvas || ! canvas.getContext ) { return false; }
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    white();
    resetForcus();
    if (num < 8 && num > -1) {
	if (w[x][y-1] == 0 && b[x][y-1] == 0) {//白ポーン
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect(x*60, (y-1)*60, 60, 60);
	    f[x][y-1] = 1;
	    if (y == 6 && w[x][y-2] == 0 && b[x][y-2] == 0) {
		ctx.fillStyle = 'rgb(255, 200, 0)';
		ctx.fillRect(x*60, (y-2)*60, 60, 60);
		f[x][y-2] = 1;
	    }
	}
	if (b[x+1][y-1] == 1) {
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+1)*60, (y-1)*60, 60, 60);
	    f[x+1][y-1] = 1;
	}
	if (b[x-1][y-1] == 1) {
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-1)*60, (y-1)*60, 60, 60);
	    f[x-1][y-1] = 1;
	}
    } else if (num == 8 || num == 9) {//白ルーク
	for (var i = 1;x+i < 8 && w[x+i][y] == 0; i++) {
	    f[x+i][y] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+i)*60, y*60, 60, 60);
	    if (b[x+i][y] != 0) break;
	}
	for (var k = 1; x-k >= 0 && w[x-k][y] == 0; k++) {
	    f[x-k][y] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-k)*60, y*60, 60, 60);
	    if (b[x-k][y] != 0) break;
	}
	for (i = 1; y-i >= 0 && w[x][y-i] == 0; i++) {
	    f[x][y-i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect(x*60, (y-i)*60, 60, 60);
	    if (b[x][y-i] != 0) break;
	}
	for (i = 1; y+i < 8 && w[x][y+i] == 0; i++) {
	    f[x][y+i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect(x*60, (y+i)*60, 60, 60);
	    if (b[x][y+i] != 0) break;
	}
    } else if (num == 24 || num == 25) {//黒ルーク
	for (var i = 1;x+i < 8 && b[x+i][y] == 0; i++) {
	    f[x+i][y] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+i)*60, y*60, 60, 60);
	    if (w[x+i][y] != 0) break;
	}
	for (var k = 1; x-k >= 0 && b[x-k][y] == 0; k++) {
	    f[x-k][y] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-k)*60, y*60, 60, 60);
	    if (w[x-k][y] != 0) break;
	}
	for (i = 1; y-i >= 0 && b[x][y-i] == 0; i++) {
	    f[x][y-i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect(x*60, (y-i)*60, 60, 60);
	    if (w[x][y-i] != 0) break;
	}
	for (i = 1; y+i < 8 && b[x][y+i] == 0; i++) {
	    f[x][y+i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect(x*60, (y+i)*60, 60, 60);
	    if (w[x][y+i] != 0) break;
	}
    } else if (num == 10 || num == 11) {//白ナイト
	if (x < 7 && y > 1 && w[x+1][y-2] == 0) {
	    f[x+1][y-2] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+1)*60, (y-2)*60, 60, 60);
	}
	if (x < 6 && y > 0 && w[x+2][y-1] == 0) {
	    f[x+2][y-1] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+2)*60, (y-1)*60, 60, 60);
	}
	if (x < 6 && y < 7 && w[x+2][y+1] == 0) {
	    f[x+2][y+1] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+2)*60, (y+1)*60, 60, 60);
	}
	if (x < 7 && y < 6 && w[x+1][y+2] == 0) {
	    f[x+1][y+2] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+1)*60, (y+2)*60, 60, 60);
	}
	if (x > 0 && y < 6 && w[x-1][y+2] == 0) {
	    f[x-1][y+2] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-1)*60, (y+2)*60, 60, 60);
	}
	if (x > 1 && y < 7 && w[x-2][y+1] == 0) {
	    f[x-2][y+1] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-2)*60, (y+1)*60, 60, 60);
	}
	if (x > 1 && y > 0 && w[x-2][y-1] == 0) {
	    f[x-2][y-1] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-2)*60, (y-1)*60, 60, 60);
	}
	if (x > 0 && y > 1 && w[x-1][y-2] == 0) {
	    f[x-1][y-2] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-1)*60, (y-2)*60, 60, 60);
	}
    } else if (num == 26 || num == 27) {//黒ナイト
	if (x < 7 && y > 1 && b[x+1][y-2] == 0) {
	    f[x+1][y-2] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+1)*60, (y-2)*60, 60, 60);
	}
	if (x < 6 && y > 0 && b[x+2][y-1] == 0) {
	    f[x+2][y-1] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+2)*60, (y-1)*60, 60, 60);
	}
	if (x < 6 && y < 7 && b[x+2][y+1] == 0) {
	    f[x+2][y+1] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+2)*60, (y+1)*60, 60, 60);
	}
	if (x < 7 && y < 6 && b[x+1][y+2] == 0) {
	    f[x+1][y+2] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+1)*60, (y+2)*60, 60, 60);
	}
	if (x > 0 && y < 6 && b[x-1][y+2] == 0) {
	    f[x-1][y+2] = 1;
	    ctx.fillStyle = 'rgb(255,200, 0)';
	    ctx.fillRect((x-1)*60, (y+2)*60, 60, 60);
	}
	if (x > 1 && y < 7 && b[x-2][y+1] == 0) {
	    f[x-2][y+1] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-2)*60, (y+1)*60, 60, 60);
	}
	if (x > 1 && y > 0 && b[x-2][y-1] == 0) {
	    f[x-2][y-1] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-2)*60, (y-1)*60, 60, 60);
	}
	if (x > 0 && y > 1 && b[x-1][y-2] == 0) {
	    f[x-1][y-2] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-1)*60, (y-2)*60, 60, 60);
	}
    } else if (num == 12 || num == 13) {//白ビショップ
	for (i = 1; x+i < 8 && y+i < 8 && w[x+i][y+i] == 0; i++) {
	    f[x+i][y+i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+i)*60, (y+i)*60, 60, 60);
	    if (b[x+i][y+i] != 0) break;
	}
	for (i = 1; x+i < 8 && y-i >= 0 &&w[x+i][y-i] == 0; i++) {
	    f[x+i][y-i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+i)*60, (y-i)*60, 60, 60);
	    if (b[x+i][y-i] != 0) break;
	}
	for (i = 1; x-i >= 0 && y+i < 8 && w[x-i][y+i] == 0; i++) {
	    f[x-i][y+i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-i)*60, (y+i)*60, 60, 60);
	    if (b[x-i][y+i] != 0) break;
	}
	for (i = 1; x-i >= 0 && y-i >= 0 && w[x-i][y-i] == 0; i++) {
	    f[x-i][y-i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-i)*60, (y-i)*60, 60, 60);
	    if (b[x-i][y-i] != 0) break;
	}
    } else if (num == 28 || num == 29) {//黒ビショップ
	for (i = 1; x+i < 8 && y+i < 8 && b[x+i][y+i] == 0; i++) {
	    f[x+i][y+i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+i)*60, (y+i)*60, 60, 60);
	    if (w[x+i][y+i] != 0) break;
	}
	for (i = 1; x+i < 8 && y-i >= 0 && b[x+i][y-i] == 0; i++) {
	    f[x+i][y-i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+i)*60, (y-i)*60, 60, 60);
	    if (w[x+i][y-i] != 0) break;
	}
	for (i = 1; x-i >= 0 && y+i < 8 && b[x-i][y+i] == 0; i++) {
	    f[x-i][y+i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-i)*60, (y+i)*60, 60, 60);
	    if (w[x-i][y+i] != 0) break;
	}
	for (i = 1; x-i >= 0 && y-i >= 0 && b[x-i][y-i] == 0; i++) {
	    f[x-i][y-i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-i)*60, (y-i)*60, 60, 60);
	    if (w[x-i][y-i] != 0) break;
	}
    } else if (num == 14) {//白クイーン
	for (var i = 1;x+i < 8 && w[x+i][y] == 0; i++) {
	    f[x+i][y] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+i)*60, y*60, 60, 60);
	    if (b[x+i][y] != 0) break;
	}
	for (var k = 1; x-k >= 0 && w[x-k][y] == 0; k++) {
	    f[x-k][y] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-k)*60, y*60, 60, 60);
	    if (b[x-k][y] != 0) break;
	}
	for (i = 1; y-i >= 0 && w[x][y-i] == 0; i++) {
	    f[x][y-i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect(x*60, (y-i)*60, 60, 60);
	    if (b[x][y-i] != 0) break;
	}
	for (i = 1; y+i < 8 && w[x][y+i] == 0; i++) {
	    f[x][y+i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect(x*60, (y+i)*60, 60, 60);
	    if (b[x][y+i] != 0) break;
	}
	for (i = 1; x+i < 8 && y+i < 8 && w[x+i][y+i] == 0; i++) {
	    f[x+i][y+i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+i)*60, (y+i)*60, 60, 60);
	    if (b[x+i][y+i] != 0) break;
	}
	for (i = 1; x+i < 8 && y-i >= 0 &&w[x+i][y-i] == 0; i++) {
	    f[x+i][y-i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+i)*60, (y-i)*60, 60, 60);
	    if (b[x+i][y-i] != 0) break;
	}
	for (i = 1; x-i >= 0 && y+i < 8 && w[x-i][y+i] == 0; i++) {
	    f[x-i][y+i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-i)*60, (y+i)*60, 60, 60);
	    if (b[x-i][y+i] != 0) break;
	}
	for (i = 1; x-i >= 0 && y-i >= 0 && w[x-i][y-i] == 0; i++) {
	    f[x-i][y-i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-i)*60, (y-i)*60, 60, 60);
	    if (b[x-i][y-i] != 0) break;
	}
    } else if (num == 30) {//黒クイーン
	for (var i = 1;x+i < 8 && b[x+i][y] == 0; i++) {
	    f[x+i][y] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+i)*60, y*60, 60, 60);
	    if (w[x+i][y] != 0) break;
	}
	for (var k = 1; x-k >= 0 && b[x-k][y] == 0; k++) {
	    f[x-k][y] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-k)*60, y*60, 60, 60);
	    if (w[x-k][y] != 0) break;
	}
	for (i = 1; y-i >= 0 && b[x][y-i] == 0; i++) {
	    f[x][y-i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect(x*60, (y-i)*60, 60, 60);
	    if (w[x][y-i] != 0) break;
	}
	for (i = 1; y+i < 8 && b[x][y+i] == 0; i++) {
	    f[x][y+i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect(x*60, (y+i)*60, 60, 60);
	    if (w[x][y+i] != 0) break;
	}
	for (i = 1; x+i < 8 && y+i < 8 && b[x+i][y+i] == 0; i++) {
	    f[x+i][y+i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+i)*60, (y+i)*60, 60, 60);
	    if (w[x+i][y+i] != 0) break;
	}
	for (i = 1; x+i < 8 && y-i >= 0 && b[x+i][y-i] == 0; i++) {
	    f[x+i][y-i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+i)*60, (y-i)*60, 60, 60);
	    if (w[x+i][y-i] != 0) break;
	}
	for (i = 1; x-i >= 0 && y+i < 8 && b[x-i][y+i] == 0; i++) {
	    f[x-i][y+i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-i)*60, (y+i)*60, 60, 60);
	    if (w[x-i][y+i] != 0) break;
	}
	for (i = 1; x-i >= 0 && y-i >= 0 && b[x-i][y-i] == 0; i++) {
	    f[x-i][y-i] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-i)*60, (y-i)*60, 60, 60);
	    if (w[x-i][y-i] != 0) break;
	}
    } else if (num == 15) {//白キング
        if (y != 0 && w[x][y-1] == 0) {
            f[x][y-1] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect(x*60, (y-1)*60, 60, 60);
        }
        if (y != 0 && x != 7 && w[x+1][y-1] == 0) {
            f[x+1][y-1] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect((x+1)*60, (y-1)*60, 60, 60);
        }
        if (x != 7 && w[x+1][y] == 0) {
            f[x+1][y] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect((x+1)*60, y*60, 60, 60);
        }
        if (x != 7 && y != 7 && w[x+1][y+1] == 0) {
            f[x+1][y+1] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect((x+1)*60, (y+1)*60, 60, 60);
        }
        if (y != 7 && w[x][y+1] == 0) {
            f[x][y+1] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect(x*60, (y+1)*60, 60, 60);
        }
        if (x != 0 && y != 7 && w[x-1][y+1] == 0) {
            f[x-1][y+1] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect((x-1)*60, (y+1)*60, 60, 60);
        }
        if (x != 0 && w[x-1][y] == 0) {
            f[x-1][y] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect((x-1)*60, y*60, 60, 60);
        }
        if (x != 0 && y != 0 && w[x-1][y-1] == 0) {
            f[x-1][y-1] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect((x-1)*60, (y-1)*60, 60, 60);
        }
    } else if (num == 31) {//黒キング
        if (y != 0 && b[x][y-1] == 0) {
            f[x][y-1] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect(x*60, (y-1)*60, 60, 60);
        }
        if (y != 0 && x != 7 && b[x+1][y-1] == 0) {
            f[x+1][y-1] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect((x+1)*60, (y-1)*60, 60, 60);
        }
        if (x != 7 && b[x+1][y] == 0) {
            f[x+1][y] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect((x+1)*60, y*60, 60, 60);
        }
        if (x != 7 && y != 7 && b[x+1][y+1] == 0) {
            f[x+1][y+1] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect((x+1)*60, (y+1)*60, 60, 60);
        }
        if (y != 7 && b[x][y+1] == 0) {
            f[x][y+1] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect(x*60, (y+1)*60, 60, 60);
        }
        if (x != 0 && y != 7 && b[x-1][y+1] == 0) {
            f[x-1][y+1] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect((x-1)*60, (y+1)*60, 60, 60);
        }
        if (x != 0 && b[x-1][y] == 0) {
            f[x-1][y] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect((x-1)*60, y*60, 60, 60);
        }
        if (x != 0 && y != 0 && b[x-1][y-1] == 0) {
            f[x-1][y-1] = 1;
            ctx.fillStyle = 'rgb(255, 200, 0)';
            ctx.fillRect((x-1)*60, (y-1)*60, 60, 60);
        }
    } else if (num > 15 && num < 24) {//黒ポーン
        if (w[x][y+1] == 0 && b[x][y+1] == 0) {
	    f[x][y+1] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect(x*60, (y+1)*60, 60, 60);
	    if (y == 1 &&w[x][y+2] == 0 && b[x][y+1] == 0) {
	        f[x][y+2] = 1;
	        ctx.fillStyle = 'rgb(255, 200, 0)';
	        ctx.fillRect(x*60, (y+2)*60, 60, 60);
	    }
        }
	if (w[x+1][y+1] == 1) {
	    f[x+1][y+1] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x+1)*60, (y+1)*60, 60, 60);
	}
	if (w[x-1][y+1] == 1) {
	    f[x-1][y+1] = 1;
	    ctx.fillStyle = 'rgb(255, 200, 0)';
	    ctx.fillRect((x-1)*60, (y+1)*60, 60, 60);
	}
    }
}

function destination() {
    //var flag = false;
    var x = choosePieceX();
    var y = choosePieceY();
    var x2 = choosePieceX2();
    var y2 = choosePieceY2();
    var num = number[x][y];
    var num2 = number[x2][y2];
    if (f[x2][y2] == 1) {
	eraceFootmark(x, y);
	if (number[x2][y2] != -1) eracePiece(x2, y2, num2);
	move5(x2, y2,num);
	f[x2][y2] = 0;
	number[x2][y2] = num;
	//データを送る
	sendData();
    } else {
	//alert("You cant move to there!");
	alert("(" + x2 + "," + y2 + ") is " + f[x2][y2]);
    }
}    

function move5(x, y, n) {
    footmark(x, y, n);
    x = widthToPx(x);
    y = heightToPx(y);
    document.images[n].style.top = y;
    document.images[n].style.left = x;
    white();
    resetForcus();
    turnWhite = !(turnWhite);
}

function white() {
    var canvas = document.getElementById('chessBoard');
    if ( ! canvas || ! canvas.getContext ) { return false; }
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.beginPath();
    ctx.fillRect(0, 0, 480, 480);
    board();
}

function board() {
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
}

function eraceFootmark(x, y) {
    w[x][y] = 0;
    b[x][y] = 0;
    number[x][y] = -1;
}

function eracePiece(x, y, n) {
    //document.images[n].style.top = 1000;
    //document.images[n].style.left = 1000;
    document.images[n].style.visibility = 'hidden';
    if (n < 16) {
	w[x][y] = 0;
    } else {
	b[x][y] = 0;
    }
}

