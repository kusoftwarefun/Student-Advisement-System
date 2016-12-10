/*

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!###########################!
!#  NOT_WORKING_CORRECTLY  #!
!###########################!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// also need to push gen eds to back of list

*/


// generate course priority list
/////// COURSE PRIORITIZATION ALGORITHM ///////////

// REQUIRES 'readin_sysdata.js'
// REQUIRES 'readin_record.js'
var prioritycheck = [];
var priorityweight = [];

try {
    // for the remaining courses
    for (var i = 0; i < remaining.length; i++) {
        // compare them to the csit catalog
        for (var j = 0; j < deps.length; j++) {
            // if a remaining course is identified in the csit catalog
            if (remaining[i] == deps[j].code) {
                var orCheck = false;
                var andCheck = true;
                var credCheck = false;
                var gpaCheck = true;
                // do OR check
                for (var k = 0; k < deps[j].orCourses.length; k++) {
                    for (var l = 0; l < courses.courses.length; l++) {
                        if (deps[j].orCourses[k] == courses.courses[l].code && courses.courses[l].grade.substring(0, 1) != 'F' && courses.courses[l].grade.substring(0, 1) != 'D') {
                            orCheck = true;
                        }
                    }
                }
                // do AND check
                for (var k = 0; k < deps[j].andCourses.length; k++) {
                    for (var l = 0; l < courses.courses.length; l++) {
                        if (deps[j].andCourses[k] == courses.courses[l].code && (courses.courses[l].grade.substring(0, 1) == 'F' || courses.courses[l].grade.substring(0, 1) == 'D')) {
                            andCheck = false;
                        }
                    }
                }
                // do credit# check
                if (deps[j].creditsSpecified > credits)
                    credCheck = false;

                // do gpa check for greater than 300 level classes
                if (parseInt(remaining[i].substr(remaining[i].length - 3, remaining[i].length - 2)) >= 3 && gpa < 2.25)
                    gpaCheck = false;

                // if all checks pass push the remaining course and
                //       calculate its priority weight
                if (credCheck && andCheck && orCheck && gpaCheck) {
                    prioritycheck.push(remaining[i]);
                    priorityweight.push(andCourses.length - orCourses.length + (deps[j].creditsSpecified / 6));
                }
            }
        }
    }
    // count depdencies and add to priority weight
    for (var i = 0; i < prioritycheck.length; i++) {
        for (var j = 0; j < deps.length; j++) {
            for (var k = 0; k < deps[j].orCourses; k++) {
                if (prioritycheck[i] == deps[j].orCourses[k])
                    priorityweight[i] *= 10;
            }
            for (var k = 0; k < deps[j].andCourses; k++) {
                if (prioritycheck[i] == deps[j].andCourses[k])
                    //  add ending 0 to make weight value easy to identify
                    priorityweight[i] *= 10;
            }
        }
    }

    //////////////////////////////////////////////////////
    // push remaining geneds into priority list.





    ////////////////////////////////////////////////////

    console.log("\nCourse priority list w/ corresponding weights:");
    for (var i = 0; i < prioritycheck.length; i++) {
        console.log(i + ": " + prioritycheck[i] + " = " + priorityweight[i] + "\n");
    }

}
catch (err) {
    throw err
}



