// read in system data
///////  READ IN JSON (then print)
var deps = require('./CSITcatalog.json');
var gened = require('./gened_f11.json');
var usd = require('./usd_s16.json');
var offer = require('./offered.json')

console.log(usd.usd[0].required);
for(var i = 0; i < deps.CSITcatalog.length; i++) 
{
      console.log(deps.CSITcatalog[i].code);
      console.log(deps.CSITcatalog[i].semOffered);
      console.log(deps.CSITcatalog[i].orCourses);
      console.log(deps.CSITcatalog[i].andCourses);
      console.log(deps.CSITcatalog[i].creditsSpecified);
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
