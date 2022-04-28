Prediction_1= "";
Prediction_2= "";

camera = document.getElementById("camera");
Webcam.attach(camera);

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

function take_snapshot() {
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML='<img id= "captured_img" src= "'+data_uri+'">';
});

}

console.log("ml5 version", ml5.version);

classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dYm_xeUV5/model.json", modelLoaded);

function modelLoaded() {
console.log("MODEL IS LOADED SUCCESSFULLY");
}

function speak() {
speak_data1= "The first Prediction is" + Prediction_1;
speak_data2= "And the second Prediction is" + Prediction_2;

synth= window.speechSynthesis;
utterthis= new SpeechSynthesisUtterance(speak_data1 + speak_data2);
synth.speak(utterthis);
}
function check() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotresults);
    }
    
    function gotresults(error, results) {
        if(error){
        console.error(error);
        }
        else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML= results[0].label;
        document.getElementById("result_emotion_name2").innerHTML= results[1].label;
        Prediction_1= results[0].label;
        Prediction_2= results[1].label;
        speak();
    if(results[0].label == "Best"){
document.getElementById("update_emoji").innerHTML= "&#128077;";
document.getElementById("result_object_accuracy1").innerHTML= (results[0].confidence * 100).toFixed(2) + "%";
    } 
    if(results[0].label == "Victory"){
        document.getElementById("update_emoji").innerHTML= "&#9996;";
        document.getElementById("result_object_accuracy1").innerHTML= (results[0].confidence * 100).toFixed(2) + "%";
    }
    if(results[0].label == "Amazing"){
        document.getElementById("update_emoji").innerHTML= "&#128076;";
        document.getElementById("result_object_accuracy1").innerHTML= (results[0].confidence * 100).toFixed(2) + "%";
    }
    

    if(results[1].label == "Best"){
        document.getElementById("update_emoji2").innerHTML= "&#128077;";
        document.getElementById("result_object_accuracy2").innerHTML= (results[1].confidence * 100).toFixed(2) + "%";
            } 
            if(results[1].label == "Victory"){
                document.getElementById("update_emoji2").innerHTML= "&#9996;";
                document.getElementById("result_object_accuracy2").innerHTML= (results[1].confidence * 100).toFixed(2) + "%";
            }
            if(results[1].label == "Amazing"){
                document.getElementById("update_emoji2").innerHTML= "&#128076;";
                document.getElementById("result_object_accuracy2").innerHTML= (results[1].confidence * 100).toFixed(2) + "%";
            }
        }
    }
