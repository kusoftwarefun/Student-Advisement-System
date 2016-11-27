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
var completed = [];
var remaining = [];

console.log("Required courses: ");
for(var i = 0; i < usd.usd.required.length; i++)
{
   var check = false;
   console.log(usd.usd.required[i]);
   for(var j = 0; j < courses.courses.length; j++) 
   {
         if(usd.usd.required[i] == courses.courses[j].code)
         {
           completed.push(usd.usd.required[i]);
           check = true;
         }
   }
   if (check == false)
   {
       remaining.push(usd.usd.required[i]);
   } 
}
console.log("\n");
console.log("Completed major requirements: ")
for (var i = 0; i < completed.length; i++)
{
   console.log(completed[i]);
}
console.log("\n");
console.log("Remaining major requirements: ")
for (var i = 0; i < remaining.length; i++)
{
   console.log(remaining[i]);
}
*/

/*// MAJOR ELECTIVES TAKEN
var csElects = [];
var matElects = [];

for (var i = 0; i < courses.courses.length; i++)
{
    var check = false;
    for (var j = 0; j < usd.usd.required.length; j++)
    {
        if (courses.courses[i].code == usd.usd.required[j])
        {
            check = true;
        }
    }
    var li = courses.courses[i].code.length;
    if (!check && courses.courses[i].code.substring(li-6, li-3) == "CSC")
    {
        csElects.push(courses.courses[i].code);
    }
    else if (!check && courses.courses[i].code.substring(li-6, li-3) == "MAT")
    {
        matElects.push(courses.courses[i].code);
    }
}
console.log(csElects);
console.log(matElects);
*/

// read in test data
var deps = require('./CSITcatalog.json');  // cs course prereqs
var stud = require('./student.json');       // student data
var courses = require('./courses.json');    // courses taken
var gened = require('./gened_f11.json');    // gen ed requirements
var usd = require('./usd_s16.json');        // uit courses required
var offer = require('./offered.json');      // being offered this semester



var csElects = [];
var matElects = [];

for (var i = 0; i < courses.courses.length; i++)
{
    var check = false;
    for (var j = 0; j < usd.usd.required.length; j++)
    {
        if (courses.courses[i].code == usd.usd.required[j])
        {
            check = true;
        }
    }
    var li = courses.courses[i].code.length;
    console.log(courses.courses[i].code.substring(li-6, li-3));
    if (!check && courses.courses[i].code.substring(li-6, li-3) == "CSC")
    {
        csElects.push(courses.courses[i].code);
    }
    else if (!check && courses.courses[i].code.substring(li-6, li-3) == "MAT")
    {
        matElects.push(courses.courses[i].code);
    }
}
console.log(csElects);
console.log(matElects);


/*
for(var i = 0; i < usd.usd.electives.length; i++)
{
   var check = false;
   console.log(usd.usd.electives[i]);
   for(var j = 0; j < courses.courses.length; j++) 
   {
       var li = usd.usd.electives[i].higherThan.length;
       var lj = courses.courses[j].code.length;
         if(parseInt(usd.usd.electives[i].higherThan.substring(li-3, li)) >= parseInt(courses.courses[j].code.substring(lj-3,lj)))
         {
           completed.push(usd.usd.required[i]);
           check = true;
         }
   }
   if (check == false)
   {
       remaining.push(usd.usd.required[i]);
   } 
}
console.log("\n");
console.log("Completed major requirements: ")
for (var i = 0; i < completed.length; i++)
{
   console.log(completed[i]);
}
console.log("\n");
console.log("Remaining major requirements: ")
for (var i = 0; i < remaining.length; i++)
{
   console.log(remaining[i]);
}
*/