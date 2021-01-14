
let jerry;
let uImg;
let tImg;
let bImg;
let toms = [];
let value =false;
let start = 'TЯATƧ';
let game =' ';
let score =0 ;


let video;
let poseNet;
let pose;
let skeleton;

function preload() {

  uImg = loadImage('jerry.png');
  tImg = loadImage('tom.png');
  bImg = loadImage('background.jpg');
}

function mousePressed() {
  toms.push(new Tom());
  if(mouseX >=29 && mouseX <=208 && mouseY <= 120 && mouseY >=40 ){
      value = true;
  }
  //console.log(mouseX ," ",mouseY);
}

function setup() {
  createCanvas(1500, 650);
  jerry = new Jerry();


  video = createCapture(VIDEO);

  video.size(1500 ,650);
  video.hide();
  //line(1000 , 0, 1000, height);

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

}


function gotPoses(poses) {
    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;
    }
  }
  
  
  function modelLoaded() {
    console.log('poseNet ready');
  }


function keyPressed() {
  if (key == ' ') {
    jerry.jump();
  }
}

function draw() {
  
  if (random(1) < 0.005 && value) {
    toms.push(new Tom());
  }
  
  
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);
  
  line(500 , 0, 500, height);
  
   textSize(50);

  text(start, 1300, 100);
  line(1490,120,1290,120);
  line(1490,40,1290,40);
  line(1490,120,1490,40);
  line(1290,120,1290,40);
  
  text("ƎЯOƆƧ :", 1310, 260);
  text(score, 1275, 260);
  line(1490,280,1270,280);
  line(1490,200,1270,200);
  line(1490,280,1490,200);
  line(1270,280,1270,200);

  text("ԳMUႱ", 100, 150);
  text("ႧИATƧ", 100, 450);

  if(game == 'ЯƎVO ƎMAӘ'){
    text(game, width / 2, height / 2);
    noLoop();
  }


  line(0 , 300, 500, 300);

  if (pose) {
  
        
        if(pose.keypoints[10].part == 'rightWrist'){
           // console.log(pose.keypoints[10].part);
            
        let x = pose.keypoints[10].position.x;
        let y = pose.keypoints[10].position.y;

        if(x>=0 && x <=500 && y>=0 && y <= 300){
            jerry.jump();
        }

        fill(0);
        stroke(255);
        ellipse(x, y, 16, 16);
        }

  }
  for (let t of toms) {
    t.move();
    t.show();
    if (jerry.hits(t)) {
      console.log('game over');
      value = false;
      game ='ЯƎVO ƎMAӘ';
      start ='ႧƎႧИƎ'
      //noLoop();
    }
    if(t.x >= 0 && t.x <=20 ) score++;
    console.log(score);
  }

  jerry.show();
  jerry.move();
}

