// determine statisfied/taken and remaining requirements
// for university reqs/gen eds etc.

// REQUIRES 'readin_sysdata.js'
// REQUIRES 'readin_record.js'
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