// read in student record data
///////  READ IN JSON (then print)

var stud = require('./student.json');
var taken = require('./taken.json');

console.log(stud.student[0].sid);
console.log(stud.student[0].firstName);
console.log(stud.student[0].lastName);
console.log(stud.student[0].major);
console.log(stud.student[0].checksheet);
console.log(stud.student[0].credits);
console.log(stud.student[0].gpa);

for(var i = 0; i < taken.taken.length; i++) 
{
      console.log(taken.taken[i].code);
      console.log(taken.taken[i].name);
      console.log(taken.taken[i].semester);
      console.log(taken.taken[i].grade);
      console.log(taken.taken[i].credits);
      console.log(taken.taken[i].competency);
}
