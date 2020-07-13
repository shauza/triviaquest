async function getQuestion(cat, type) {

  try {
    let response = await axios.get(baseTriviaURL, {
      params: {
        amount: 1,
        category:cat,
        type: type,
        token: token
      }
    });

    return response.data.results[0];
  } catch (error) {
    console.error(error);
  }
}



async function showQuestion(cat){
  const q = await getQuestion(cat, "multiple");
  currQuestion = q;
  let allAnswers = [];
  //debug(JSON.stringify(currQuestion));
  $('#monster-bubble .question').html(q.question);
  allAnswers.push(...q.incorrect_answers, q.correct_answer);
  const shuffledAnswers = shuffle(allAnswers);
  for (let index = 0; index < shuffledAnswers.length; index++) {
    let c = '#a' + (index)
    $(c).html(shuffledAnswers[index]);
  }
}

$(".answer-btn").on("click", function(){
  const correct = checkAnswer($(this).html());
 if (correct) {
   $(this).removeClass("btn-outline-dark");
   $(this).addClass("btn-outline-success");
 }else{
  $(this).removeClass("btn-outline-dark");
  $(this).addClass("btn-outline-danger");
 }
});

function checkAnswer(answerText){
  if (answerText === currQuestion.correct_answer) {
    return true;
  }else{
    return false;
  }
   

}
