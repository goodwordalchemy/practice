/**
 * Created by davidgoldberg on 10/16/14.
 */

function Question(topic,question,choices,correctAnswer){
    this.topic = topic;
    this.question = question;
    this.choices = choices;
    this.correctAnswer = correctAnswer;
    this.userAnswer = null;
}

var allQuestions;
allQuestions = [
    new Question("Addition", "What is 8 + 8?", [16, 18, 64, 28], 16),
    new Question("Subtraction", "What is 23-8?", [16, 15, 14, 17], 15),
    new Question("Multiplication", "What is 8 * 8?", [16, 18, 64, 36], 64),
    new Question("Division", "What is 48/16", [3, "3/2", 4, "8/3"], 3),
    new Question("Imaginary Numbers", "What is \u221A(-1)^8?", ["i", "-i", 1, -1], 1)
];


function qToHTML(question) {
    var header = "<h2>" + question.topic + "</h2>";
    var qText = "<p>" + question.question + "</p>";
    var options = "";
    for (var i = 0; i < question.choices.length; i++) {
        options += "<input type='radio' name='" + question.topic + "' value ='" + question.choices[i] + "'>" + question.choices[i] + "<br>"
    }
    var wrapper = "<div class='question'></div>";

    var HTMLstring;
    HTMLstring = header + qText + options;
    $("#question-box").append(HTMLstring).wrap(wrapper);
}



$(document).ready(function(){
    

    //render questions
    for(var i = 0; i < allQuestions.length; i++){
        qToHTML(allQuestions[i]);
    }

    //collect and check user answers
    $('form').on('submit', function(event) {

        var numCorrect = 0;

        event.preventDefault();

        for(var i = 0; i < allQuestions.length; i++) {

            // collect answers
            var currentQ = allQuestions[i];
            currentQ.userAnswer = $("input[name='" + currentQ.topic + "']:checked").val();

            // check answers
            if (currentQ.correctAnswer == currentQ.userAnswer) {
                numCorrect++;
            }
        }

        // show score
        var score = numCorrect + "/" + allQuestions.length;
        $('#results').find('p').text("You got " + score + " of the questions right");
        $('#results').removeClass('hidden');



        // resets buttons    
        $('input[type="radio"]').each(function(){
            $(this).prop('checked', false);
        });

    });

});