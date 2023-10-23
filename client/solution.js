const baseURI  =  "https://dynamic-node-json.vercel.app/api";
// const baseURI = 'http://localhost:8080/api';

const fetchQuestions = async() => {

    const res = await fetch(`${baseURI}/items`, {
        mode: 'cors'
    });

    console.log(res);
    const questions = await res.json();
    console.log(questions);
    return questions;
}

const fetchAppendQuestions = async() => {

    const questions = await fetchQuestions();
    const container = document.getElementById('container');
    container.before(createNavbar());
    container.append(createRow(questions));  
    container.after(createFooter());
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
        span.classList.toggle('problem-text');
        if (span.textContent == element.text) {
            span.textContent = toggleText;
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
    btn.classList.add('sm-btn','blink');
    btn.addEventListener('click', () => {
        if (btn.innerHTML == '<i class="bi bi-chevron-down"></i>'){
            btn.innerHTML = '<i class="bi bi-chevron-up"></i>';
            btn.classList.remove('blink');
        }      
        else {
            btn.innerHTML = '<i class="bi bi-chevron-down"></i>';
            btn.classList.add('blink');
        }
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
    div.prepend(btn);
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

    let groupName =  document.createElement('h3'); 
    let group = '';

    questions.forEach(element => { 

        if (group !== element.group){
            groupName = document.createElement('h3'); 
            groupName.classList.add('group-name');      
            group = element.group;
            groupName.textContent = group;           
            groupDiv = createGroup();
            groupDiv.append(groupName);
        }   
            
        const questionDiv = document.createElement('div');
            
        groupDiv.append(questionDiv);
        questionDiv.classList.add('question');  
        questionDiv.classList.add('group-closed'); 

            groupName.addEventListener('click', () => { 
                if (questionDiv.innerHTML == ''){
                    questionDiv.append(showProblems(element));
                    questionDiv.classList.add('group-clicked');
                    questionDiv.classList.remove('group-closed');
                }               
                else{
                    questionDiv.innerHTML = '';  
                    questionDiv.classList.add('group-closed');
                    questionDiv.classList.remove('group-clicked'); 
                }
             })
            mainDiv.append(groupDiv);
    });
    return mainDiv;
}

const mode = () => {
    const icon = document.createElement('span');
    icon.classList.add('mode');
    icon.innerHTML = '<i class="bi bi-sun-fill"></i>';

    let bg =  document.getElementById('container');
    bg.classList.add('bg-night');

    let grp = document.getElementsByClassName('group-name'); 


    icon.addEventListener('click', () => {
        if (icon.innerHTML == '<i class="bi bi-sun-fill"></i>') {
            icon.innerHTML = '<i class="bi bi-moon-fill"></i>';
            bg.classList.add('bg-day');
            bg.classList.remove('bg-night');
            for (let i = 0; i < grp.length; i++){
                    grp[i].classList.add('color-light');
                    grp[i].classList.remove('color-dark');
                }      
        }      
        else {
            icon.innerHTML = '<i class="bi bi-sun-fill"></i>';
            bg.classList.add('bg-night');
            bg.classList.remove('bg-day');
            for (let i = 0; i < grp.length; i++){
                grp[i].classList.add('color-dark');
                grp[i].classList.remove('color-light');
            }      
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
    brand.innerHTML =  '<img id="home-logo" src="img/payamd-logo-white-500x320.png" alt="home logo"/>';

    const title = document.createElement('a');
    title.href = 'https://payamdowlatyari.github.io/dynamic-node-json/';
    title.classList.add('main-title');
    title.text = 'Algorithms for Life';

    container.append(brand);
    container.append(title);
    container.append(mode());
    nav.append(container);
    return nav;
}

const createFooter = () => {
    const footer = document.createElement('div');
    footer.classList.add('footer');
    let date = new Date();
    footer.innerHTML = 'Designed by <a href="https://www.payamd.com/"> payamd.com </a> © ' + date.getFullYear();
    return footer;
}

// main function call
fetchAppendQuestions();
