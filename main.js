var manoIzquierdaX=0;
var manoIzquierdaY=0;
var manoDerechaX=0;
var manoDerechaY=0;
var manoDerechaPuntos=0;
var manoIzquierdaPuntos=0;
var velocidad = 1;
var volumen = 1;
var cancion = "";
function preload(){
    cancion = loadSound("TWICEFeelSpecial.mp3");
}
function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    video.size(400,400)
    modelo = ml5.poseNet(video, modeloListo);
    modelo.on("pose",usarResultados);
}
function draw(){
image(video,0,0,400,400)
if(manoIzquierdaPuntos>0.2){
    fill("blue");
    circle(manoIzquierdaX,manoIzquierdaY,20);
    volumen =(manoIzquierdaY *2)/ 400;
    volumen = 2-volumen;
    volumen =Math.round(volumen*10)/10;
     cancion.setVolume(volumen);
    document.getElementById("volumen").innerHTML = "volumen"+volumen;
}
if(manoDerechaPuntos>0.2){
    fill("red");
    circle(manoDerechaX,manoDerechaY,20);
    if(manoDerechaY < 100){
        velocidad= 3;
    }else if(manoDerechaY<200){
        velocidad= 2;
    }else if(manoDerechaY <300){
        velocidad= 1;
    }else if(manoDerechaY < 400){
        velocidad=0.5;
    }
    cancion.rate(velocidad);
    document.getElementById("velocidad").innerHTML = "velocida"+velocidad;
}
}
function reproducir(){
    if(!cancion.isPlaying()){
        cancion.play();
        cancion.setVolume(1);
        cancion.rate(1);
    }
    
}
function detener(){
    cancion.stop();
}
function modeloListo(){
    console.log("ya esta listo poseNet");
}
function usarResultados(resultados){
    if(resultados.length>0){
        console.log(resultados);
        manoIzquierdaX = resultados[0].pose.leftWrist.x;
        manoIzquierdaY = resultados[0].pose.leftWrist.y;

        manoDerechaX = resultados[0].pose.rightWrist.x;
        manoDerechaY = resultados[0].pose.rightWrist.y;
        
        manoIzquierdaPuntos = resultados[0].pose.keypoints[9].score;
        manoDerechaPuntos = resultados[0].pose.keypoints[10].score;

        
        


    }
}