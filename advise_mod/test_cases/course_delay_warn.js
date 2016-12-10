// generate warnings for courses
// that may cause graduation delays if not taken
//////////////////////////////////////////////////

// REQUIRES 'readin_sysdata.js'
// REQUIRES 'readin_record.js'
// REQUIRES 'course_priority.js'
var delay = [];

try {
    for (var i = 0; i < prioritycheck.length; i++) {
        var str = priorityweight[i].toString();
        if (str.substring(str.length - 1, str.length) == "0") {
            // check courses being offered
            for (var j = 0; j < offer.offered.length; j++) {
                var unique = true
                if (prioritycheck[i] == offer.offered[j].code) {
                    for (var k = 0; k < delay.length; k++) {
                        if (delay[k] == offer.offered[j].code)
                            unique = false;
                    }
                    if (unique)
                        delay.push(prioritycheck[i]);
                }
            }
        }
    }
}
catch (err) {
    throw err;
}

console.log("\nCourses that must be taken in upcoming semester:");
for (var i = 0; i < delay.length; i++) {
    console.log(delay[i]);
}
