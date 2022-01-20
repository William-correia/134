var img = ""
var status
var objects = []

function preload() {
    Alarm = loadSound("alarm.mp3")
}

function setup() {
    canvas = createCanvas(460, 380)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()
    video.size(460, 380)

    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status - Detecting Objects"
}

function draw() {
    image(video, 0, 0, 460, 380)

    if (status != "") {
        r = random(255)
        g = random(255)
        b = random(255)

        objectDetector.detect(video, gotResult)

        for (var i = 0; i < objects.length; i++) {   
            document.getElementById("status").innerHTML = "Status - Objects Detected"

            if (objects[i].label == "person") {
                document.getElementById("persondetection").innerHTML = "Human Detected"
                //Alarm.stop()
            }

            else if (objects.length < 0) {
                document.getElementById("persondetection").innerHTML = "Human Not Detected!"
                for (var i = 0; i < Infinity; i++) {
                    //Alarm.play()
                }
            }

            else {
                document.getElementById("persondetection").innerHTML = "Human Not Detected!"
                for (var i = 0; i < Infinity; i++) {
                    //Alarm.play()
                }
            }
            
            fill(r, g, b)
            stroke(r, g, b)

            noFill()
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            fill("#000000") 
            stroke("#000000")

            noFill()

            percent = floor(objects[i].confidence * 100)

            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)

        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true
    objectDetector.detect(video, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }

    console.log(results)
    objects = results
}