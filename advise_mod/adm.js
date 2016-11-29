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

// read in test data
var deps = require('./CSITcatalog.json');  // cs course prereqs
var stud = require('./student.json');       // student data
var courses = require('./courses.json');    // courses taken
var gened = require('./gened_f11.json');    // gen ed requirements
var usd = require('./usd_s16.json');        // uit courses required
var offer = require('./offered.json');      // being offered this semester
var pdfanalyzer = require('./pdfanalyze');  // analyze raw json output

// figure out major reqs taken and remaining
// compute warnings
var completed = [];
var remaining = [];
var warnings = [];
var fails = [];

for(var i = 0; i < usd.usd.required.length; i++)
{
   var check = false;
   for(var j = 0; j < courses.courses.length; j++) 
   {
         if(usd.usd.required[i] == courses.courses[j].code && (courses.courses[j].grade.substring(0,1)  == 'C' || courses.courses[j].grade.substring(0,1)  == 'B'|| courses.courses[j].grade.substring(0,1) == "A") )
         {
           completed.push(usd.usd.required[i]);
           check = true;
         }
         else if (usd.usd.required[i] == courses.courses[j].code && courses.courses[j].grade.substring(0,1)  == 'D')
         {
            completed.push(usd.usd.required[i]);
            check = true;
            warnings.push(courses.courses[j]);
         }
         else if (usd.usd.required[i] == courses.courses[j].code && courses.courses[j].grade.substring(0,1)  == 'F')
            fails.push(courses.courses[j]);

   }
   if (check == false)
       remaining.push(usd.usd.required[i]);
}

// figure out possible electives
var csElects = [];
var matElects = [];

for (var i = 0; i < courses.courses.length; i++)
{
    var check = false;
    var li = courses.courses[i].code.length;
    
    for (var j = 0; j < usd.usd.required.length; j++)
    {
        if (courses.courses[i].code == usd.usd.required[j])
            check = true;
    }
    
    if (!check && courses.courses[i].code.substring(li-6, li-3) == "CSC" && (courses.courses[i].grade.substring(0,1)  == 'C' || courses.courses[i].grade.substring(0,1)  == 'B'|| courses.courses[i].grade.substring(0,1) == "A") )
        csElects.push(courses.courses[i].code);
    else if (!check && courses.courses[i].code.substring(li-6, li-3) == "MAT" && (courses.courses[i].grade.substring(0,1)  == 'C' || courses.courses[i].grade.substring(0,1)  == 'B'|| courses.courses[i].grade.substring(0,1) == "A") )
        matElects.push(courses.courses[i].code);
    else if (!check && courses.courses[i].code.substring(li-6, li-3) == "CSC" && (courses.courses[i].grade.substring(0,1)  == 'D'))
        {
            csElects.push(courses.courses[i].code);
            warnings.push(courses.courses[i]);
        }
    else if (!check && courses.courses[i].code.substring(li-6, li-3) == "MAT" && (courses.courses[i].grade.substring(0,1) == 'D' ))      
       {
           matElects.push(courses.courses[i].code);
           warnings.push(courses.courses[i]);
       }
    else if (!check && courses.courses[i].code.substring(li-6, li-3) == "CSC" && (courses.courses[i].grade.substring(0,1)  == 'F'))
            fails.push(courses.courses[i]);
    else if (!check && courses.courses[i].code.substring(li-6, li-3) == "MAT" && (courses.courses[i].grade.substring(0,1) == 'F' ))
           fails.push(courses.courses[i]);
}
csElects = csElects.sort();
matEelects = matElects.sort();

// grab the elective requirements from the track sheets
var csReqs = [];
var csNots = [];
var matReqs = [];
var matNots = [];
var csObj = [];
var matObj = [];

for (var i  = 0; i < usd.usd.electives.length; i++)
{
    var li = usd.usd.electives[i].higherThan.length;
    if (usd.usd.electives[i].higherThan.substr(li-6, li-3) == "CSC")
    {
        csReqs.push(usd.usd.electives[i].higherThan);
        csNots.push(usd.usd.electives[i].not);
        csObj.push(usd.usd.electives[i]);
    }
    else if (usd.usd.electives[i].higherThan.substr(li-6, li-3) == "MAT")
    {
        matReqs.push(usd.usd.electives[i].higherThan);
        matNots.push(usd.usd.electives[i].not);
        matObj.push(usd.usd.electives[i]);
    }
}

// figure out passing cases
var csSatisfied = [];
var matSatisfied = [];

for (var i = 0; i < csReqs.length; i++)
    csSatisfied.push("CSC000");

for (var i = 0; i < matReqs.length; i++)
    matSatisfied.push("MAT000");

for (var i = 0; i < csReqs.length; i++)
{
    for (var j = 0; j < csElects.length; j++)
    {
        if (csElects[j] == "CSC000")
            continue;

        if (parseInt(csReqs[i].substring(csReqs.length-3, csReqs.length)) < parseInt(csElects[j].substring(csReqs.length-3, csReqs.length)))
        {
            csSatisfied[i] = csElects[j];
            csElects[j] = "CSC000";
        }
    }
}
for (var i = 0; i < matReqs.length; i++)
{
    for (var j = 0; j < matElects.length; j++)
    {
        if (matElects[j] == "MAT000")
            continue;

        if (parseInt(matReqs[i].substring(matReqs.length-3, matReqs.length)) < parseInt(matElects[j].substring(matReqs.length-3, matReqs.length)))
        {
            matSatisfied[i] = matElects[j];
            matElects[j] = "MAT000";
        }
    }
}

// remove NOT cases
for (var i = 0; i < csSatisfied.length; i++)
{
    for (var j = 0; j < csNots.length; j++)
    {
        if (csSatisfied[i] == csNots[i][j])
            csSatisfied[i] == "CSC000";
    }
}

for (var i = 0; i < matSatisfied.length; i++)
{
    for (var j = 0; j < matNots.length; j++)
    {
        if (matSatisfied[i] == matNots[i][j])
            matSatisfied[i] == "MAT000";
    }
}

// figure out remaining
var csRem = [];
var csDone = [];
var matRem = [];
var matDone = [];
for (var i = 0; i < csSatisfied.length; i++)
{
    if(csSatisfied[i] == "CSC000")
        csRem.push(csObj[i]);
    else
        csDone.push(csSatisfied[i])
}
for (var i = 0; i < matSatisfied.length; i++)
{
    if(matSatisfied[i] == "MAT000")
        matRem.push(matObj[i]);
    else
        matDone.push(matSatisfied[i])
}

// calculate cs credits and major gpa
var classes = 0;
var credits = 0;
var creditPoints = 0;
var gpa = 0;

    for (var j = 0; j < courses.courses.length; j++)
    {
        //courses.courses[j].code.substring(courses.courses[j].code.length-3, courses.courses[j].code.length) >= 125
        if (courses.courses[j].code.substring(courses.courses[j].code.length-6, courses.courses[j].code.length-3) == "CSC")
        {
            if (courses.courses[j].grade == "A")
            {
                creditPoints += 4;
                if (courses.courses[j].code.substring(courses.courses[j].code.length-3, courses.courses[j].code.length) >= 125)
                    credits += courses.courses[j].credits;
            }
            else if (courses.courses[j].grade == "A-")
            {
                creditPoints += 3.7;
                if (courses.courses[j].code.substring(courses.courses[j].code.length-3, courses.courses[j].code.length) >= 125)
                    credits += courses.courses[j].credits;
            }
            else if (courses.courses[j].grade == "B+")
            {
                creditPoints += 3.3;
                if (courses.courses[j].code.substring(courses.courses[j].code.length-3, courses.courses[j].code.length) >= 125)
                    credits += courses.courses[j].credits;
            }
            else if (courses.courses[j].grade == "B")
            {
                creditPoints += 3;
                if (courses.courses[j].code.substring(courses.courses[j].code.length-3, courses.courses[j].code.length) >= 125)
                    credits += courses.courses[j].credits;
            }                      
            else if (courses.courses[j].grade == "B-")
            {
                creditPoints += 2.7;
                if (courses.courses[j].code.substring(courses.courses[j].code.length-3, courses.courses[j].code.length) >= 125)
                    credits += courses.courses[j].credits;
            }            
            else if (courses.courses[j].grade == "C+")
            {
                creditPoints += 2.3;
                if (courses.courses[j].code.substring(courses.courses[j].code.length-3, courses.courses[j].code.length) >= 125)
                    credits += courses.courses[j].credits;
            }
            else if (courses.courses[j].grade == "C")
            {
                creditPoints += 2;
                if (courses.courses[j].code.substring(courses.courses[j].code.length-3, courses.courses[j].code.length) >= 125)
                    credits += courses.courses[j].credits;
            }
            else if (courses.courses[j].grade == "D")
                creditPoints += 1;
            else if (courses.courses[j].grade == "F")
                creditPoints += 0;
            else if (courses.courses[j].grade == "pending")
                continue;

            classes++;
        }
    }
gpa = creditPoints/classes;

// print results
console.log("\nCompleted major requirements: ")
for (var i = 0; i < completed.length; i++)
{
   console.log(completed[i]);
}
console.log("\nCompleted major electives: ")
for (var i = 0; i < csDone.length; i++)
{
   console.log(csDone[i]);
}
for (var i = 0; i < matDone.length; i++)
{
   console.log(matDone[i]);
}
console.log("\nRemaining major requirements: ")
for (var i = 0; i < remaining.length; i++)
{
   console.log(remaining[i]);
}
console.log("\nRemaining major electives: ")
for (var i = 0; i < csRem.length; i++)
{
   console.log(csRem[i]);
}
for (var i = 0; i < matRem.length; i++)
{
   console.log(matRem[i]);
}
console.log("\nWarnings:");
for (var i = 0; i < warnings.length; i++)
{
    console.log(warnings[i]);
}
console.log("\nFailed Courses:");
for (var i = 0; i < fails.length; i++)
{
    console.log(fails[i]);
}
console.log("\nOverall CSIT GPA: " + gpa.toFixed(2));
console.log("\nCSIT credits able to be counted toward major: " + credits)


console.log ("\n\nTESTING:\n\n");


// ANALYZE GENEDS AND UNIVERSITY REQS
var used = [];
var gentaken = [];
var genremain = [];
var gencreds = 0;
var comps = [];
var compdef = [];
var compcheck = true;


for (var gen in gened.geneds)
{
   for (var uni in gened.geneds[gen])
   {
       for (var i = 0; i < gened.geneds[gen][uni].length; i++)
       {
           for (var k = 0; k < courses.courses.length; k++)
            {
                if (gened.geneds[gen][uni][i] == courses.courses[k].code.substring(0, 3))
                {
                    var unused = true;
                    for (var l = 0; l < used.length; l++)
                    {
                        if (used[l] == courses.courses[k].code)
                        {
                            unused = false;
                        }
                    }
                    if (unused && gen != "competencies")
                    {
                        gened.geneds[gen][uni] = courses.courses[k].code;
                        for (var m in courses.courses[k].competency)
                        {
                            comps.push(courses.courses[k].competency[m]);

                        }
                        used.push(courses.courses[k].code);
                        gencreds += courses.courses[k].credits;
                    }
                }
            } 
            // if string, not an array, and we only need to check each req once
            if (i < 1 && typeof gened.geneds[gen][uni] == 'string' ) 
              gentaken.push(gened.geneds[gen][uni])
            else if (i < 1)
              genremain.push(gened.geneds[gen][uni])   
       }
        if (gen == "competencies" && compcheck)
        {
            for(x in gened.geneds[gen])
            {
                compdef.push(x);
            }
            compcheck = false;
        }
   }
}
for (var i = 0; i < comps.length; i++)
{
    for (var j = 0; j < compdef.length; j++)
    {
        if (comps[i] == compdef[j].substring(0,2)) // ignore ending digit for multiples
        {
            compdef[j] = "x";
            break;
        }
    }
}
//console.log(gened.geneds);
console.log("\nCompetencies Taken:")
console.log(comps);
console.log("\nCompetencies Remaining:")
console.log(compdef);
console.log("\nGEN EDS Taken:");
console.log(gentaken);
console.log("\nGEN EDS Remaining:");
console.log(genremain);
console.log("\n Total GEN ED Credits:");
console.log(gencreds);

/////// COURSE PRIORITIZATION ALGORITHM ///////////
var prioritycheck = [];
var priorityweight = [];
// for the remaining courses
for (var i = 0; i < remaining.length; i++)
{
    // compare them to the csit catalog
    for (var j = 0; j < deps.length; j++)
    {
        // if a remaining course is identified in the csit catalog
        if (remaining[i] == deps[j].code)
        {
            var orCheck = false;
            var andCheck = true;
            var credCheck = false;
            var gpaCheck = true;
            // do OR check
            for (var k = 0; k < deps[j].orCourses.length; k++)
            {
                for (var l = 0; l < courses.courses.length; l++)
                {
                    if (deps[j].orCourses[k] == courses.courses[l].code && courses.courses[l].grade.substring(0,1) != 'F' && courses.courses[l].grade.substring(0,1) != 'D')
                    {
                        orCheck = true;
                    }
                }
            }
            // do AND check
            for (var k = 0; k < deps[j].andCourses.length; k++)
            {
                for (var l = 0; l < courses.courses.length; l++)
                {
                    if (deps[j].andCourses[k] == courses.courses[l].code && (courses.courses[l].grade.substring(0,1) == 'F' || courses.courses[l].grade.substring(0,1) == 'D'))
                    {
                        andCheck = false;
                    }
                }
            }
            // do credit# check
            if (deps[j].creditsSpecified > credits )
                    credCheck = false;

            // do gpa check for greater than 300 level classes
            if (parseInt(remaining[i].substr(remaining[i].length-3, remaining[i].length-2)) >= 3 && gpa < 2.25)
                gpaCheck = false;

            // if all checks pass push the remaining course and
            //       calculate its priority weight
            if (credCheck && andCheck && orCheck && gpaCheck)
            {
                prioritycheck.push(remaining[i]);
                priorityweight.push(andCourses.length - orCourses.length + (deps[j].creditsSpecified / 6));
            }
        }
    }
}
// count depdencies and add to priority weight
for (var i = 0; i < prioritycheck.length; i++)
{
    for (var j = 0; j < deps.length; j++)
    {
        for (var k = 0; k < deps[j].orCourses; k++)
        {
            if (prioritycheck[i] == deps[j].orCourses[k])
                priorityweight[i]*=10;
        }
        for (var k = 0; k < deps[j].andCourses; k++)
        {
            if (prioritycheck[i] == deps[j].andCourses[k])
            //  add ending 0 to make weight value easy to identify
                priorityweight[i]*=10;
        }
    }
}
// add delay courses
var delay = [];
for (var i = 0; i < prioritycheck.length; i++)
{
    var str = priorityweight[i].toString();
    if (str.substring(str.length-1, str.length) == "0")
       {
           // check courses being offered
           for (var j = 0; j < offer.offered.length; j++)
           {
               var unique = true
               if (prioritycheck[i] == offer.offered[j].code)
               {
                   for (var k = 0; k < delay.length; k++)
                   {
                       if (delay[k] == offer.offered[j].code)
                        unique = false;
                   }
                   if (unique)
                    delay.push(prioritycheck[i]);
               }
           }
       }
}


// push remaining geneds onto priority list.

console.log("\nCourse priority list w/ corresponding weights:");
for (var i = 0; i < prioritycheck.length; i++)
{
   console.log(i + ": " + prioritycheck[i] + " = " + priorityweight[i] + "\n");
}
console.log("\nCourses that must be taken in upcoming semester:");
for (var i = 0; i < delay.length; i++)
{
    console.log(delay[i]);
}





//==================================================//
///////////////////////////////////////////////////////
/*////// EXTRACT TEXT FROM PDF
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

///////////////////////////////////////////////////////
/*///////  READ IN JSON (then print)
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

///////////////////////////////////////////////////
/*// MAJOR COURSES TAKEN AND REMAINING
//// LOW GRADE WARNING COURSES
var completed = [];
var remaining = [];
var warnings = [];
var fails = [];

for(var i = 0; i < usd.usd.required.length; i++)
{
   var check = false;
   for(var j = 0; j < courses.courses.length; j++) 
   {
         if(usd.usd.required[i] == courses.courses[j].code && (courses.courses[j].grade.substring(0,1)  == 'C' || courses.courses[j].grade.substring(0,1)  == 'B'|| courses.courses[j].grade.substring(0,1) == "A") )
         {
           completed.push(usd.usd.required[i]);
           check = true;
         }
         else if (usd.usd.required[i] == courses.courses[j].code && courses.courses[j].grade.substring(0,1)  == 'D')
         {
            completed.push(usd.usd.required[i]);
            check = true;
            warnings.push(courses.courses[j]);
         }
         else if (usd.usd.required[i] == courses.courses[j].code && courses.courses[j].grade.substring(0,1)  == 'F')
            fails.push(courses.courses[j]);

   }
   if (check == false)
       remaining.push(usd.usd.required[i]);
}
*/

////////////////////////////////////////////////////////
/*// MAJOR ELECTIVES TAKEN AND REMAINING
///// LOW GRADE WARNING COURSES
var csElects = [];
var matElects = [];

for (var i = 0; i < courses.courses.length; i++)
{
    var check = false;
    var li = courses.courses[i].code.length;
    
    for (var j = 0; j < usd.usd.required.length; j++)
    {
        if (courses.courses[i].code == usd.usd.required[j])
            check = true;
    }
    
    if (!check && courses.courses[i].code.substring(li-6, li-3) == "CSC" && (courses.courses[i].grade.substring(0,1)  == 'C' || courses.courses[i].grade.substring(0,1)  == 'B'|| courses.courses[i].grade.substring(0,1) == "A") )
        csElects.push(courses.courses[i].code);
    else if (!check && courses.courses[i].code.substring(li-6, li-3) == "MAT" && (courses.courses[i].grade.substring(0,1)  == 'C' || courses.courses[i].grade.substring(0,1)  == 'B'|| courses.courses[i].grade.substring(0,1) == "A") )
        matElects.push(courses.courses[i].code);
    else if (!check && courses.courses[i].code.substring(li-6, li-3) == "CSC" && (courses.courses[i].grade.substring(0,1)  == 'D'))
        {
            csElects.push(courses.courses[i].code);
            warnings.push(courses.courses[i]);
        }
    else if (!check && courses.courses[i].code.substring(li-6, li-3) == "MAT" && (courses.courses[i].grade.substring(0,1) == 'D' ))      
       {
           matElects.push(courses.courses[i].code);
           warnings.push(courses.courses[i]);
       }
    else if (!check && courses.courses[i].code.substring(li-6, li-3) == "CSC" && (courses.courses[i].grade.substring(0,1)  == 'F'))
            fails.push(courses.courses[i]);
    else if (!check && courses.courses[i].code.substring(li-6, li-3) == "MAT" && (courses.courses[i].grade.substring(0,1) == 'F' ))
           fails.push(courses.courses[i]);
}

csElects = csElects.sort();
matEelects = matElects.sort();
console.log(csElects);
console.log(matElects);

// grab the elective requirements from the track sheets
var csReqs = [];
var csNots = [];
var matReqs = [];
var matNots = [];
var csObj = [];
var matObj = [];

for (var i  = 0; i < usd.usd.electives.length; i++)
{
    var li = usd.usd.electives[i].higherThan.length;
    if (usd.usd.electives[i].higherThan.substr(li-6, li-3) == "CSC")
    {
        csReqs.push(usd.usd.electives[i].higherThan);
        csNots.push(usd.usd.electives[i].not);
        csObj.push(usd.usd.electives[i]);
    }
    else if (usd.usd.electives[i].higherThan.substr(li-6, li-3) == "MAT")
    {
        matReqs.push(usd.usd.electives[i].higherThan);
        matNots.push(usd.usd.electives[i].not);
        matObj.push(usd.usd.electives[i]);
    }
}
console.log(csReqs);
console.log(matReqs);
console.log(csNots);
console.log(matNots);

// figure out passing cases
var csSatisfied = [];
var matSatisfied = [];

for (var i = 0; i < csReqs.length; i++)
    csSatisfied.push("CSC000");

for (var i = 0; i < matReqs.length; i++)
    matSatisfied.push("MAT000");

for (var i = 0; i < csReqs.length; i++)
{
    for (var j = 0; j < csElects.length; j++)
    {
        if (csElects[j] == "CSC000")
            continue;
        if (parseInt(csReqs[i].substring(csReqs.length-3, csReqs.length)) < parseInt(csElects[j].substring(csReqs.length-3, csReqs.length)))
        {
            csSatisfied[i] = csElects[j];
            csElects[j] = "CSC000";
        }
    }
}
for (var i = 0; i < matReqs.length; i++)
{
    for (var j = 0; j < matElects.length; j++)
    {
        if (matElects[j] == "MAT000")
            continue;
        if (parseInt(matReqs[i].substring(matReqs.length-3, matReqs.length)) < parseInt(matElects[j].substring(matReqs.length-3, matReqs.length)))
        {
            matSatisfied[i] = matElects[j];
            matElects[j] = "MAT000";
        }
    }
}

// remove not cases
for (var i = 0; i < csSatisfied.length; i++)
{
    for (var j = 0; j < csNots.length; j++)
    {
        if (csSatisfied[i] == csNots[i][j])
            csSatisfied[i] == "CSC000";
    }
}

for (var i = 0; i < matSatisfied.length; i++)
{
    for (var j = 0; j < matNots.length; j++)
    {
        if (matSatisfied[i] == matNots[i][j])
            matSatisfied[i] == "MAT000";
    }
}
console.log(csSatisfied);
console.log(matSatisfied);

// figure out remaining
var csRem = [];
var csDone = [];
var matRem = [];
var matDone = [];
for (var i = 0; i < csSatisfied.length; i++)
{
    if(csSatisfied[i] == "CSC000")
        csRem.push(csObj[i]);
    else
        csDone.push(csSatisfied[i])
}
for (var i = 0; i < matSatisfied.length; i++)
{
    if(matSatisfied[i] == "MAT000")
        matRem.push(matObj[i]);
    else
        matDone.push(matSatisfied[i])
}

console.log(csRem);
console.log(csDone);
console.log(matRem);
console.log(matDone);
*/

////////////////////////////////////////////////
/*//// CALCULATE CS MAJOR CREDITS AND GPA
var classes = 0;
var creditPoints = 0;
var gpa = 0;

    for (var j = 0; j < courses.courses.length; j++)
    {
        if (courses.courses[j].code.substring(courses.courses[j].code.length-6, courses.courses[j].code.length-3) == "CSC" && courses.courses[j].code.substring(courses.courses[j].code.length-3, courses.courses[j].code.length) >= 125)
        {
            if (courses.courses[j].grade == "A")
                creditPoints += 4;
            else if (courses.courses[j].grade == "A-")
                creditPoints += 3.7;
            else if (courses.courses[j].grade == "B+")
                creditPoints += 3.3;
            else if (courses.courses[j].grade == "B")
                creditPoints += 3;
            else if (courses.courses[j].grade == "B-")
                creditPoints += 2.7;
            else if (courses.courses[j].grade == "C+")
                creditPoints += 2.3;
            else if (courses.courses[j].grade == "C")
                creditPoints += 2;
            else if (courses.courses[j].grade == "D")
                creditPoints += 1;
            else if (courses.courses[j].grade == "F")
                creditPoints += 0;
            else if (courses.courses[j].grade == "pending")
                continue;

            classes++;
        }
    }
gpa = creditPoints/classes;

console.log("\nOverall major GPA: " + gpa.toFixed(2));
*/
