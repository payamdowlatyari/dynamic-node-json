const baseURI = "http://localhost:8080/api";


const fetchQuestions = async() => {
    const res = await fetch(`${baseURI}/items`);
    const questions = await res.json();
    return questions;
}

const fetchAppendQuestions = async() => {

    const questions = await fetchQuestions();
    const container = document.getElementById('container');

       container.append(createRow(questions));
       container.append(resetQ());
}

const showAnswer = (element) => {
    const span = document.createElement('span');
    span.textContent = "Show Answer";
    span.addEventListener('click', () => {
        span.classList.add('clicked');
        span.textContent = element.answer;
    }) 
    return span;
}

const createRow = (questions) => {

    const mainDiv = document.createElement('div');

    questions.forEach(element => {

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const h3 = document.createElement('h3');
        h3.textContent = element.text;

        const h4 = document.createElement('h4');
        h4.append(showAnswer(element));

        questionDiv.append(h3);
        questionDiv.append(h4);

        mainDiv.append(questionDiv); 
    });

    return mainDiv;
}

const resetQ = () => {
    const res = document.createElement('button');
    res.textContent = "Reset";
    res.classList.add("btn");
    res.addEventListener('click', () => {
       window.location.reload();
    })
    return res;
}

fetchAppendQuestions();
