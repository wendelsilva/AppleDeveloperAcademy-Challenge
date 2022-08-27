# AppleDeveloperAcademy-Challenge

Para realização do teste técnico escolhi desenvolver uma solução utilizando javascript e trabalhar com arrays e seus métodos.

## Solução

Para solucionar o teste técnico primeiramente analisei os dados que foram fornecidos junto dos requisitos do programa chegando assim a um arquivo json contendo todos os dados que juguei necessário para o desenvolvimento.
```
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
Para o desenvolvimento eu optei por percorrer o array de alunos e para cada aluno realizar as demais funções
```
let students = db.alunos; // ["Laura", "Pedro", "João", ...]

students.forEach(student => {
    ...demais funções  
}
```
Agora eu precisava definir com quem o aluno em questão podia trabalhar, mas antes eu precisava de um array para trabalhar tendo em vista que os ciclos no json é um objeto então a linha abaixo faz essa conversão.
```
let cycles = Object.values(db.ciclos).flat(); 
// ciclos: {"primeiro" : [...],"segundo": [...]} -> [["Laura", "Pedro", "João", "Vincius"],...,["Natalia", "Felipe", "Eduardo"], ["Ana", "Wesley"]]
```
Então para definir com quem o aluno em questão poderia trabalhar criei uma função que recebe 2 parametros o aluno e o array de ciclos então essa função percorre os ciclos e armazena em um outro array vazio os grupos cujo aquele aluno não faz parte.
```
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
Com o valor retornado dessa função podia voltar para função principal e realizar os proximos passos com o seguinte codigo
```
let cycles = Object.values(db.ciclos).flat();
let students = db.alunos;

students.forEach(student => {
    let peopleWhoCanWork = getPeopleWhoCanWork(student, cycles)
})
```
Com a informação do aluno e com quem ele pode trabalhar comecei a desenvolver a funcionalidade de montar as duplas par isso eu iria precisar de um novo array vazio para armazenar as duplas.
```
let groups = [];
```
Chegou a hora de juntar as duplas para isso eu precisei realizar mais uma iteração dessa vez para checar se as pessoas com quem o aluno pode trabalhar já estão em um grupo e caso esteja remover eles da possibilidade de fazer a dupla
```
// Só vai fazer a checagem se já existir uma dupla no array de grupos
if (groups.length > 0) {
    let groupsConcatenatedRecursive = groups.flat() // concatenando recursivamente [["Laura", "Wesley"]] -> ["Laura", "Wesley"]
    for (let i = 0; i < groupsConcatenatedRecursive.length; i++) {
        // Checa se as pessoas que posso trabalhar já estão em um grupo
        if(peopleWhoCanWork.includes(groupsConcatenatedRecursive[i])) {
            peopleWhoCanWork.splice(peopleWhoCanWork.indexOf(groupsConcatenatedRecursive[i]), 1) // remove das possibilidades que já estiver em um grupo
        }
    }
}
```
Com isso agora eu só precisava inserir no array de grupos o aluno e uma pessoa escolhida aleatoriamente dentro das possíveis e após isso remover a pessoa escolhida aleatoriamente do array de alunos
```
let rn = Math.floor(Math.random() * peopleWhoCanWork.length); // gera um número aleatorio entre 0 e o tamanho máximo do array de pessoas possíveis
    
groups.push([student, peopleWhoCanWork[rn]]); // inseri o aluno e uma pessoa escolhida aleatoriamente do array de possibilidades
students.splice(students.indexOf(peopleWhoCanWork[rn]), 1); // remove a pessoa escolhida aleatoriamente do array de alunos
```
Para finalizar eu salvei os resultados no objeto de ciclos e mostrei o json final em uma página html
```
db.ciclos.terceiro = groups
let resultscreen = document.getElementById('result-screen');
resultscreen.innerHTML = JSON.stringify(db);
```
- [screenshot]("./screenshot.png")
### Código final
```
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
## Referências utilizadas
### MDN
- [ ] https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array
- [ ] https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects
### StackOverflow
- [ ] https://stackoverflow.com/
### Youtube
- [ ] https://www.youtube.com/
