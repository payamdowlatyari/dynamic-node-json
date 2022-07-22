const baseURI  =  "https://dynamic-node-json.herokuapp.com/api";
// const baseURI = 'http://localhost:8080/api';

const fetchQuestions = async() => {

    const res = await fetch(`${baseURI}/items`);
    const questions = await res.json();
    return questions;
}

const fetchAppendQuestions = async() => {

    const questions = await fetchQuestions();
    const container = document.getElementById('container');
    container.before(createNavbar());
    container.append(createRow(questions));  
    container.append(createFooter());
}

const showProblems = (element) => {

    fetch(element.problem)
        .then(response => response.text())
        .then(text => toggleText = text);  

    let toggleText = element.text;

    const span = document.createElement('span');
    
    span.textContent = toggleText;

    const pre = document.createElement('pre');
    pre.classList.add('line-number');

    const btn = closeBtn();
   
    btn.addEventListener('click', () => {
        pre.classList.toggle('clicked');

        if (span.textContent == element.text) {
            span.textContent = toggleText;
            span.classList.toggle('problem-text');
            span.append(solutionBtn(element));  

        }                 
        else  {
            span.textContent = element.text; 
        }  
    });
   
    pre.append(span);
    pre.append(btn);
    
    return pre;
}

const showCodeAnswer = (element) => {

    fetch(element.code)
        .then(response => response.text())
        .then(text => toggleText = text);   
          
    let toggleText = element.text;

    const span = document.createElement('span');
    span.textContent = toggleText;

    const pre = document.createElement('pre');
    pre.classList.add('solution-line');
    
    const code = document.createElement('code');
   
    const btn = closeBtn();
   
    btn.addEventListener('click', () => {

            pre.classList.toggle('solution-clicked');

            if (span.textContent == element.text) {
                span.textContent = toggleText;
                code.classList.toggle('language-js');
                span.append(copyText(span.textContent));
            }                 
            else {             
                span.textContent = element.text;   
            }
    });

    code.append(span); 
    pre.append(code);
    pre.append(btn);
    return pre;
}

const copyText = (code) => {
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '<i class="bi bi-clipboard"></i>';
    copyBtn.classList.toggle('sm-btn');

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(code);
        copyBtn.innerHTML = '<i class="bi bi-check-lg"></i>';
    });
    return copyBtn;
}

const closeBtn = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="bi bi-chevron-down"></i>';
    btn.classList.add('sm-btn');

    btn.addEventListener('click', () => {
        if (btn.innerHTML == '<i class="bi bi-chevron-down"></i>')
        btn.innerHTML = '<i class="bi bi-chevron-up"></i>';
        else
        btn.innerHTML = '<i class="bi bi-chevron-down"></i>';
    })
    return btn;
}


const solutionBtn = (element) => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="bi bi-code-slash"></i>';
    btn.classList.add('sm-btn');

    const div = document.createElement('div');
    div.classList.add('selected');

    btn.addEventListener('click', () => {
        div.replaceWith(showCodeAnswer(element));
    })
    div.append(btn);
    return div;
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
       
        const problem = document.createElement('div');
        questionDiv.append(problem);

        if (group !== element.group){

            const h3 = document.createElement('h3');       
            group = element.group;
            h3.textContent = group;
            questionDiv.append(h3);
            groupDiv = createGroup();
        }            
            questionDiv.append(showProblems(element)) 
            groupDiv.append(questionDiv);
            mainDiv.append(groupDiv);
    });
    
    return mainDiv;
}

const mode = () => {
    const icon = document.createElement('span');
    icon.classList.add('mode');
    icon.innerHTML = '<i class="bi bi-sun-fill"></i>';

    let bg =  document.getElementById('container');
    let h3 = document.getElementsByTagName('h3');

    icon.addEventListener('click', () => {
        if (icon.innerHTML == '<i class="bi bi-sun-fill"></i>') {
            icon.innerHTML = '<i class="bi bi-moon-fill"></i>';
            bg.style.backgroundColor = '#FEF9E7'; 
            for(let i = 0; i < h3.length; i++) { h3[i].style.color = '#17202A';}
        }
        else {
            icon.innerHTML = '<i class="bi bi-sun-fill"></i>';
            bg.style.backgroundColor = '#17202A'; 
            for(let i = 0; i < h3.length; i++) { h3[i].style.color = '#FEF9E7';}
        }
    });
    return icon;
}

const createNavbar = () => {
    const nav = document.createElement('nav');
    nav.classList.add('navbar');
    nav.classList.add('sticky-top');
    const container = document.createElement('div');
    container.classList.add('container-fluid');
    const brand = document.createElement('a');
    brand.href = 'https://www.payamd.com/';
    brand.innerHTML = '<i class="bi bi-house-fill"></i>';

    const title = document.createElement('a');
    title.href = 'https://payamdowlatyari.github.io/dynamic-node-json/';
    title.classList.add('main-title');
    title.text = 'Algorithms for Life';

    container.append(brand);
    container.append(title);
    container.append(mode());
    nav.append(container)
   
    return nav;
}

const createFooter = () => {
    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.innerHTML = 'Designed by <a href="https://www.payamd.com/"> payamd.com </a> © 2022';
    return footer;
}


fetchAppendQuestions();
