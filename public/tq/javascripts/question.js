async function getQuestion(cat, type) {

  try {
    let response = await axios.get(baseTriviaURL, {
      params: {
        amount: 1,
        type: type,
        token: token
      }
    });

    return response.data.results[0];
  } catch (error) {
    console.error(error);
  }
}



$('#get-question').on('click', async function (){
  const q = await getQuestion(9, "multiple");
  currQuestion = q;
  let allAnswers = [];
  debug(JSON.stringify(currQuestion));
  $('#monster-bubble .question').html(q.question);
  allAnswers.push(...q.incorrect_answers, q.correct_answer);

  //console.log('unshuffled', allAnswers);
  const shuffledAnswers = shuffle(allAnswers);
  //console.log('shuffled', shuffledAnswers);
  for (let index = 0; index < shuffledAnswers.length; index++) {
    let c = '#a' + (index + 1)

    $(c).html(shuffledAnswers[index]);
  }
});
