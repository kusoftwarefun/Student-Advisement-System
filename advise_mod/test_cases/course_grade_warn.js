// generate warnings for grades received below C
///////////////////////////////////////////////////
//// LOW GRADE WARNING COURSES

// REQUIRES 'readin_sysdata.js'
// REQUIRES 'readin_record.js'
var warnings = [];
var fails = [];

try {
    for (var i = 0; i < usd.usd.required.length; i++) {
        var check = false;
        for (var j = 0; j < courses.courses.length; j++) {
            if (usd.usd.required[i] == courses.courses[j].code && courses.courses[j].grade.substring(0, 1) == 'D')
                warnings.push(courses.courses[j]);
            else if (usd.usd.required[i] == courses.courses[j].code && courses.courses[j].grade.substring(0, 1) == 'F')
                fails.push(courses.courses[j]);
        }
    }
    for (var i = 0; i < courses.courses.length; i++) {
        var check = false;
        var li = courses.courses[i].code.length;

        for (var j = 0; j < usd.usd.required.length; j++) {
            if (courses.courses[i].code == usd.usd.required[j])
                check = true;
        }
        if (!check && courses.courses[i].code.substring(li - 6, li - 3) == "CSC" && (courses.courses[i].grade.substring(0, 1) == 'D'))
            warnings.push(courses.courses[i]);
        else if (!check && courses.courses[i].code.substring(li - 6, li - 3) == "MAT" && (courses.courses[i].grade.substring(0, 1) == 'D'))
            warnings.push(courses.courses[i]);
        else if (!check && courses.courses[i].code.substring(li - 6, li - 3) == "CSC" && (courses.courses[i].grade.substring(0, 1) == 'F'))
            fails.push(courses.courses[i]);
        else if (!check && courses.courses[i].code.substring(li - 6, li - 3) == "MAT" && (courses.courses[i].grade.substring(0, 1) == 'F'))
            fails.push(courses.courses[i]);
    }

} catch (error) {
    throw err;
}

console.log(warnings);
console.log(fails);