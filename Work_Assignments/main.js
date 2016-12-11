var something = require('./something.json');
var taken = require('./courses.json');
var offered = require('./offered.json');
var depend = require('./dependencies.json');

var major = "IT";

var schedule = [];//the array holding possible courses to take this semsster
var scheduleInt = [];

//console.log("works");
console.log(offered.offered.length);
for(var i = 0;i < offered.offered.length;i++){
  var lock = false;
  //console.log('works');
  for(var k = 0; k < taken.courses.length; k++){
	 // console.log(taken.courses[k].code);
    if (taken.courses[k].code === offered.offered[i].code){
      lock = true;
      console.log("the following is locked");
      console.log(offered.offered[i].code);
      console.log("\n");
    }
  }
  if(lock === false){
    schedule.push(offered.offered[i].code);
    console.log("The added course is" );
    console.log(offered.offered[i].code);
  }
}

console.log(schedule.toString());

for (var i=0; i < schedule.length; i++){
  var holder = schedule[i].substring(3);
  scheduleInt.push(holder);
  
}

console.log("This is the new array.");
console.log(scheduleInt.toString());
/*
if(major === "SE"){
  for(var k = 0; k < taken.courses.length; k++){
	 // console.log(taken.courses[k].code);
    /*if ((taken.courses[k].code.parseInt()) != 225 && ){
      
      lock = true;
      console.log("locked\n");
    }
  }
}
*/
if (major === "IT"){
  
  scheduleInt = scheduleInt.filter(checkIT);
  console.log(scheduleInt.toString());
}

function checkIT(scheduleIt) {
  return scheduleIt > 125;

}
/*console.log(something.courses);

for(var i = 0; i < something.courses.length; i++)
{
	console.log(something.courses);

}

for(var i = 0; i < something.courses.length; i++)
	console.log(something.courses[i].code);
	


	
for(var i = 0; i < depend.dependencies.length; i++)
{
	console.log(depend.dependencies[i].code);
	
	if (depend.dependencies[i].code === "CSC135"){
	  console.log(" True\n");
	}

}

for(var k = 0; i < offered.length; i++){
  
}

for(var i = 0; i < depend.code.length; i++)
	console.log(depend.code[i].code);
	*/
	

