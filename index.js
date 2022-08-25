const db = {
    students: [
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
    cycles: {
        first: [
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
        second : [
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

// ana != wesley, carlos, maria, leonardo
// laura != leonardo, maria, pedro, joão, vinicius
// pedro != vinicius, joão, caio, daniela, laura

// comparar os ciclos anteriores e montar um novo array com a exeções

function main() {
    var first = db.cycles.first;
    var second = db.cycles.second;

    var newAr = first.concat(second)
    var exe = [];

    var thirdCycle = db.students;
    var third = db.cycles.third = [];

    newAr.forEach(group => {
        if(group.includes('Ana')) {
            exe.push(group);
        }
    });

    var res = ([...new Set(exe.flat())]);
    var pod = [];

    for (let i = 0; i < thirdCycle.length; i++) {
        if(!res.includes(thirdCycle[i])) {
            pod.push([thirdCycle[i]])
        }

    }

    pos = Math.floor(Math.random() * pod.length)
    third.push('Ana', pod[pos])
    
    console.log("Não pode com esses: ",res);
    console.log("Pode com esses: ",pod.flat());
    console.log("Dupla com um que pode: ",third.flat());
}

main();