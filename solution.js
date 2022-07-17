const baseURI  =  "https://dynamic-node-json.herokuapp.com/api";
// const development = 'http://localhost:8080/api';
// const baseURI = (process.env.NODE_ENV ? production : development);

const fetchQuestions = async() => {

    const res = await fetch(`${baseURI}/items`);
    const questions = await res.json();

    return questions;
}

const fetchAppendQuestions = async() => {

    const questions = await fetchQuestions();
    const container = document.getElementById('container');
    container.append(createRow(questions));  
}

const showCodeAnswer = (element) => {

    fetch(element.code)
        .then(response => response.text())
        .then(text => toggleText = text);     

    let toggleText = element.text;

    const span = document.createElement('span');
    span.textContent = toggleText;

    const pre = document.createElement('pre');
    pre.classList.add('line-number');

    const code = document.createElement('code');
    code.classList.add('language-js');

    pre.addEventListener('click', () => {

            pre.classList.toggle('clicked');

            if (span.textContent == element.text) 
            span.textContent = toggleText;

            else 
            span.textContent = element.text;;
    }) 

    code.append(span); 
    pre.append(code);

    return pre;
}

const createGroup = () => {
    const groupDiv = document.createElement('div');
    groupDiv.classList.add('group');
    return groupDiv;
}

const createRow = (questions) => {

    const mainDiv = document.createElement('div');
    let groupDiv = createGroup();

    let group = '';

    questions.forEach(element => {

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const h4 = document.createElement('h4');
        h4.append(showCodeAnswer(element));

        if (group !== element.group){

            const h3 = document.createElement('h3');
            
            group = element.group;
            h3.textContent = group;
            questionDiv.append(h3);
            groupDiv = createGroup();

        }            
            questionDiv.append(h4);
            groupDiv.append(questionDiv);
            mainDiv.append(groupDiv);
    });

    return mainDiv;
}


fetchAppendQuestions();
