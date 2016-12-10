// determine major req courses taken and remaining
///////////////////////////////////////////////////
// MAJOR REQ COURSES TAKEN AND REMAINING

// REQUIRES 'readin_sysdata.js'
// REQUIRES 'readin_record.js'
var completed = [];
var remaining = [];


try {
    for (var i = 0; i < usd.usd.required.length; i++) {
        var check = false;
        for (var j = 0; j < courses.courses.length; j++) {
            if (usd.usd.required[i] == courses.courses[j].code && (courses.courses[j].grade.substring(0, 1) == 'C' || courses.courses[j].grade.substring(0, 1) == 'B' || courses.courses[j].grade.substring(0, 1) == "A")) {
                completed.push(usd.usd.required[i]);
                check = true;
            }
            else if (usd.usd.required[i] == courses.courses[j].code && courses.courses[j].grade.substring(0, 1) == 'D') {
                completed.push(usd.usd.required[i]);
                check = true;
            }
        }
        if (check == false)
            remaining.push(usd.usd.required[i]);
    }
    console.log(completed);
    console.log(remaining);
} catch (error) {
    throw err;
}
