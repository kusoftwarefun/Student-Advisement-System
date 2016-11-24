/* 

Algorithm Rules:
All 300 level courses require CS GPA of >=2.25 
All 400 level courses have prereqs exempt for GRAD students	
All major requirement courses require a C or better
All courses with prereqs satisfied, must have a C in that satisfied prereq

 A. Course Prioritization Filter
 1. Major requirements + Concomittant (don't forget SD 200 lvl course rule)
    a. Courses with the most satisfied prereqs.
       i. Run satisfied prereq check (1. number of credits needed, 2. courses needed)
    b. Courses with the most dependencies of major requirements
    c. Courses with the most dependencies of general CS courses
    d. Fall/Spring only
 2. Major electives
    *5 year: + 2x400 level
 3. Gen Eds

 B. Flag courses that, if not taken in upcoming semester, will cause push back.
 1. Identify courses that match requirements
     a. Filter out courses that have been taken
      A not taken course will cause push back if:
      1.)it is part of the major requirements
      2.)it has dependencies
      3.)its prereqs have been satisfied
      *push back 2 semesters for fall spring course.

  C. Calculate University and CS GPA
    1. Flag warning if CS GPA below 2.25
    2. Flag warning if University GPA below 2

  D. Identify major req courses with dependencies where grade is less than C
    1. Flag on any courses identified

Questions:
What happens if student gets a D in a major requirement?
What happens if  student gets D in prerequisite, but is already registered for other course? (CSC135=D, registered for 136).
Do grad courses have different grade requirements? No C's etc?
Should I assume specific semester courses, or base more off of courses offered?
Should I ask to see new IT major check sheet?

(For IT Maintainence) Elective course requirements:
*Provide unique code for each elective needed (generated automatically)
::Example of Required input::
"Courses":
{
    "CSC125", "CSC126", "CSC127",
    "CSCxx1":
	{
        "higherThan": "CSC200",
        "not": "CSC130, CSC235, CSC225, CSC237, etc."
    },
    "CSCxx2":
	{
        "higherThan": "CSC300",
        "not": "CSC310, CSC325", "etc."
    },
    "CSC354", "CSC355", "CSC356",
    "MATxx1":
	{
        "higherThan": "MAT181"
        "not": "MAT224"
    }
}


*/

/* EXTRACT TEXT FROM PDF
var fs = require('fs');
var extract = require('pdf-text-extract');
var path = require('path');
var filePath = path.join(__dirname, './pdf.pdf');
extract(filePath, { splitPages: false}, function (err, text);
{
    if (err) 
    {
        console.dir(err);
        return;
    }
    console.dir(text);
    fs.writeFile("./noeol.txt", text);
}
*/

/*  READ IN JSON (then print)
var deps = require('./dependencies.json');
var stud = require('./student.json');
var courses = require('./courses.json');
var gened = require('./gened_f11.json');
var uit = require('./uit_s16.json');
var offer = require('./offered.json')
//var sequence = require('./sequence.json')

console.log(stud.student[0].sid);
console.log(stud.student[0].firstName);
console.log(stud.student[0].lastName);
console.log(stud.student[0].major);
console.log(stud.student[0].checksheet);
console.log(stud.student[0].credits);
console.log(stud.student[0].gpa);

console.log(uit.uit[0].required);

for(var i = 0; i < deps.dependencies.length; i++) 
{
      console.log(deps.dependencies[i].code);
      console.log(deps.dependencies[i].semOffered);
      console.log(deps.dependencies[i].orCourses);
      console.log(deps.dependencies[i].andCourses);
 }
  
for(var i = 0; i < courses.courses.length; i++) 
{
      console.log(courses.courses[i].code);
      console.log(courses.courses[i].name);
      console.log(courses.courses[i].semester);
      console.log(courses.courses[i].grade);
      console.log(courses.courses[i].credits);
      console.log(courses.courses[i].competency);
 }

for(var i = 0; i < gened.geneds.length; i++) 
{
      console.log(gened.geneds[i].unicore);
      console.log(gened.geneds[i].unidist);
      console.log(gened.geneds[i].collegedist);
      console.log(gened.geneds[i].competencies);
 }

for(var i = 0; i < offer.offered.length; i++) 
{
      console.log(offer.offered[i].code);
      console.log(offer.offered[i].section);
      console.log(offer.offered[i].days);
      console.log(offer.offered[i].start);
      console.log(offer.offered[i].end);
 }
*/

/*// MAJOR COURSES TAKEN AND REMAINING
console.log("Required courses: ");
for(var i = 0; i < uit.uit[0].required.length; i++)
{
   var check = false;
   console.log(uit.uit[0].required[i]);
   for(var j = 0; j < courses.courses.length; j++) 
   {
         if(uit.uit[0].required[i] == courses.courses[j].code)
         {
           completed.push(uit.uit[0].required[i]);
           check = true;
         }
   }
   if (check == false)
   {
       remaining.push(uit.uit[0].required[i]);
   } 
}
console.log("\n");
console.log("Completed courses: ")
for (var i = 0; i < completed.length; i++)
{
   console.log(completed[i]);
}
console.log("\n");
console.log("Remaining courses: ")
for (var i = 0; i < remaining.length; i++)
{
   console.log(remaining[i]);
}
*/

// read in test data
var deps = require('./dependencies.json');  // cs course prereqs
var stud = require('./student.json');       // student data
var courses = require('./courses.json');    // courses taken
var gened = require('./gened_f11.json');    // gen ed requirements
var uit = require('./uit_s16.json');        // uit courses required
var offer = require('./offered.json');      // being offered this semester
var completed = [];
var remaining = [];


