// calculate major credits and gpa
////////////////////////////////////////////////
//// CALCULATE CS MAJOR CREDITS AND GPA


// REQUIRES 'readin_sysdata.js'
// REQUIRES 'readin_record.js'
var classes = 0;
var creditPoints = 0;
var gpa = 0;

try {
    for (var j = 0; j < courses.courses.length; j++) {
        if (courses.courses[j].code.substring(courses.courses[j].code.length - 6, courses.courses[j].code.length - 3) == "CSC" && courses.courses[j].code.substring(courses.courses[j].code.length - 3, courses.courses[j].code.length) >= 125) {
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
    gpa = creditPoints / classes;

    console.log("\nOverall major GPA: " + gpa.toFixed(2));
}
catch (err) {
    throw err;
}