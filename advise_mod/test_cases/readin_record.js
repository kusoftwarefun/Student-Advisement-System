// read in student record data
/////////////////////////////////

// open student record
try {
      var stud = require('./student.json');
}
catch (err) {
      throw "\n\nGood morrow Dr. Hussain!!--->" + err;
}

// open taken courses
try {
      var taken = require('./taken.json');
}
catch (err) {
      throw err;
}

// print student record
try {
      console.log(stud.student[0].sid);
      console.log(stud.student[0].firstName);
      console.log(stud.student[0].lastName);
      console.log(stud.student[0].major);
      console.log(stud.student[0].checksheet);
      console.log(stud.student[0].credits);
      console.log(stud.student[0].gpa);
}
catch (err) {
      throw err;
}

// print taken courses
try {
      for (var i = 0; i < taken.courses.length; i++) {
            console.log(taken.courses[i].code);
            console.log(taken.courses[i].name);
            console.log(taken.courses[i].semester);
            console.log(taken.courses[i].grade);
            console.log(taken.courses[i].credits);
            console.log(taken.courses[i].competency);
      }
}
catch (err) {
      throw err;
}
