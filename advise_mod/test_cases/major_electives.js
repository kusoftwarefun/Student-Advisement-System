// determine major electives taken and remaining
////////////////////////////////////////////////////////
// MAJOR ELECTIVES TAKEN AND REMAINING

// REQUIRES 'readin_sysdata.js'
// REQUIRES 'readin_record.js'
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
            csElects.push(courses.courses[i].code);
    else if (!check && courses.courses[i].code.substring(li-6, li-3) == "MAT" && (courses.courses[i].grade.substring(0,1) == 'D' ))      
           matElects.push(courses.courses[i].code);
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
