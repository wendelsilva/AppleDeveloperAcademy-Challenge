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