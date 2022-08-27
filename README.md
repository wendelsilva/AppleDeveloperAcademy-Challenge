# AppleDeveloperAcademy-Challenge

Para a realização do teste técnico escolhi desenvolver uma solução utilizando JavaScript, trabalhando com arrays e seus métodos.

## Executar a aplicação
Para executar a aplicação você precisa do [Visual Studio Code](https://code.visualstudio.com/download) instalado. Após instalar o VS Code, instale a extensão [Live Server](https://www.freecodecamp.org/portuguese/news/live-server-no-vs-code-como-atualizar-automaticamente-o-seu-navegador-com-essa-extensao-simples/) e execute o arquivo index.html.

## Solução

Para solucionar o teste técnico, primeiramente analisei os dados que foram fornecidos junto aos requisitos do programa e assim chegando a um arquivo JSON contendo todos os dados que julguei necessário para o desenvolvimento
```Json
{
    "alunos": [
        "Laura", 
        "Pedro",
        "João",
        "Vinicius",
        "Carlos",
        "Maria",
        "Leonardo",
        "Ana",
        "Daniela",
        "Marcos",
        "Wesley",
        "Luiza",
        "Daiane",
        "Felipe",
        "Teodoro",
        "Helena",
        "Natalia",
        "Beatriz",
        "Eduardo",
        "Caio"
    ],
    "ciclos": {
        "primeiro": [
            [
                "Laura", 
                "Pedro", 
                "João",
                "Vinicius"
            ],
            [
                "Carlos", 
                "Maria",
                "Leonardo", 
                "Ana"
            ],
            [
                "Daniela",
                "Marcos",
                "Wesley",
                "Luiza"
            ],
            [
                "Daiane",
                "Felipe",
                "Teodoro",
                "Helena"
            ],
            [
                "Natalia",
                "Beatriz",
                "Eduardo",
                "Caio"
            ]
        ],
        "segundo" : [
            [
                "Teodoro",
                "Daiane",
                "Luiza"
            ],
            [
                "Carlos",
                "João",
                "Helena"
            ],
            [
                "Daniela",
                "Pedro",
                "Caio"
            ],
            [
                "Leonardo",
                "Maria",
                "Laura"
            ],
            [
                "Beatriz",
                "Marcos",
                "Vinicius"
            ],
            [
                "Natalia",
                "Felipe",
                "Eduardo"
            ],
            [
                "Ana",
                "Wesley"
            ]
        ]
    }
}
```
Para começar, optei por percorrer o array de alunos e para cada aluno realizar as seguintes funções
```JavaScript
let students = db.alunos; // ["Laura", "Pedro", "João", ...]

students.forEach(student => {
    ...funções  
}
```
O próximo passo é definir com quem o aluno em questão poderia trabalhar, mas antes era preciso um novo array tendo em vista que os ciclos do JSON é um objeto. A linha abaixo faz essa conversão:
```JavaScript
let cycles = Object.values(db.ciclos).flat(); 
    // ciclos: {
    //     "primeiro" : [
    //         ...
    //     ],
    //     "segundo": [
    //         ...
    //     ]
    // } -> [["Laura", "Pedro", "João", "Vincius"],...,["Natalia", "Felipe", "Eduardo"], ["Ana", "Wesley"]]
```
Então, para definir com quem o aluno em questão poderia trabalhar foi criada uma função que recebe 2 parâmetros - o aluno e o array de ciclos -, essa função percorre os ciclos e armazena em um outro array vazio os grupos cujo aquele aluno não faz parte
```JavaScript
function getPeopleWhoCanWork(student, cycles) {
    let allow = [];

    for (let i = 0; i < cycles.length; i++) {
        if(!cycles[i].includes(student)) {
            allow.push(cycles[i]);
            allow = [...new Set(allow.flat())] // remove elementos duplicados e concatena recursivamente os valores, ex: [1, 2, [3], [[4]]] -> [1, 2, 3, 4]
        }
    }

    return allow
}
```
Retornando para a função principal, é armazenado em uma variável o valor retornado pela função acima
```JavaScript
let cycles = Object.values(db.ciclos).flat();
let students = db.alunos;

students.forEach(student => {
    let peopleWhoCanWork = getPeopleWhoCanWork(student, cycles)
})
```
Com a informação do aluno e com quem ele pode trabalhar, comecei a desenvolver a funcionalidade de montar as duplas. Para isso, seria preciso um novo array vazio para armazenar as duplas:
```JavaScript
let groups = [];
```
Chegou a hora de juntar as duplas, realizei mais uma iteração dessa vez para checar se as pessoas com quem o aluno pode trabalhar já estão em um grupo e, caso esteja, remover eles da possibilidade de fazer a dupla
```JavaScript
// Só vai fazer a checagem se já existir uma dupla no array de grupos
if (groups.length > 0) {

    let groupsConcatenatedRecursive = groups.flat() // concatenando recursivamente [["Laura", "Wesley"]] -> ["Laura", "Wesley"]

    for (let i = 0; i < groupsConcatenatedRecursive.length; i++) {

        // Checa se as pessoas que podem trabalhar já estão em um grupo
        if(peopleWhoCanWork.includes(groupsConcatenatedRecursive[i])) {

            peopleWhoCanWork.splice(peopleWhoCanWork.indexOf(groupsConcatenatedRecursive[i]), 1) // remove das possibilidades quem já estiver em um grupo
        }
    }
}
```
Agora era preciso inserir no array de grupos o aluno e uma pessoa escolhida aleatoriamente dentro das possibilidades e, após isso, remover a pessoa escolhida aleatoriamente do array de alunos
```JavaScript
let rn = Math.floor(Math.random() * peopleWhoCanWork.length); // gera um número aleatorio entre 0 e o tamanho máximo do array de possibilidades
    
groups.push([student, peopleWhoCanWork[rn]]); // inserir o aluno e uma pessoa escolhida aleatoriamente do array de possibilidades
students.splice(students.indexOf(peopleWhoCanWork[rn]), 1); // remover a pessoa escolhida aleatoriamente do array de alunos
```
Para finalizar, salvei os resultados no JSON e mostrei o JSON final na página HTML
```JavaScript
db.ciclos.terceiro = groups
let resultscreen = document.getElementById('result-screen');
resultscreen.innerHTML = JSON.stringify(db);
```
![screenshot da tela de resultado](https://github.com/wendelsilva/AppleDeveloperAcademy-Challenge/blob/main/screenshot.png?raw=true)
### Código final
```JavaScript
function getPeopleWhoCanWork(student, cycles) {
    let allow = [];

    for (let i = 0; i < cycles.length; i++) {
        if(!cycles[i].includes(student)) {
            allow.push(cycles[i]);
            allow = [...new Set(allow.flat())]
        }
    }

    return allow
}

function main() {
    fetch('./api.json')
    .then( res => res.json())
    .then(data => {
        const db = data;

        let cycles = Object.values(db.ciclos).flat();

        let groups = [];
        let students = db.alunos;

        students.forEach(student => {
            let peopleWhoCanWork = getPeopleWhoCanWork(student, cycles)
    
            if (groups.length > 0) {
                let groupsConcatenatedRecursive = groups.flat()
                for (let i = 0; i < groupsConcatenatedRecursive.length; i++) {
                    if(peopleWhoCanWork.includes(groupsConcatenatedRecursive[i])) {
                        peopleWhoCanWork.splice(peopleWhoCanWork.indexOf(groupsConcatenatedRecursive[i]), 1)
                    }
                }
            }
    
            let rn = Math.floor(Math.random() * peopleWhoCanWork.length);
    
            groups.push([student, peopleWhoCanWork[rn]]);
            students.splice(students.indexOf(peopleWhoCanWork[rn]), 1);
        });
        
        db.ciclos.terceiro = groups
        let resultscreen = document.getElementById('result-screen');
        resultscreen.innerHTML = JSON.stringify(db);
    })

}

main();
```
Após desenvolver e testar o programa, julgo o mesmo uma boa solução e eficáz pois, além de solucionar o problema em questão, ele é uma solução relativamente simples e perfomática dentro do espaço testado. No entanto, o programa possui algumas limitações, no momento só está gerando duplas, então pensando em escalar ele poderia gerar não só duplas como trios, quartetos e etc... e, provavelmente, uma outra limitação que possa existir seria em um ambiente de teste maior, o programa perderia em perfomance devido a quantidade de iterações que existem.
## Referências utilizadas
### MDN
- [x] https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array
- [x] https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects
### StackOverflow
- [x] https://stackoverflow.com/
### Youtube
- [x] https://www.youtube.com/
