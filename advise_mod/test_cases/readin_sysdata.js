// read in system data
/////////////////////////////////

// open csit catalog
try {
      var deps = require('./CSITcatalog.json');
}
catch (err) {
      throw err;
}

// open gen ed reqs
try {
      var gened = require('./gened_f11.json');
}
catch (err) {
      throw err;
}

// open major reqs
try {
      var usd = require('./usd_s16.json');
}
catch (err) {
      throw err;
}

// open course offerings
try {
      var offer = require('./offered.json')
}
catch (err) {
      throw err;
}

// print csit catalog
try {
      for (var i = 0; i < deps.CSITcatalog.length; i++) {
            console.log(deps.CSITcatalog[i].code);
            console.log(deps.CSITcatalog[i].semOffered);
            console.log(deps.CSITcatalog[i].orCourses);
            console.log(deps.CSITcatalog[i].andCourses);
            console.log(deps.CSITcatalog[i].creditsSpecified);
      }
}
catch (err) {
      throw err;
}

// print major reqs
try {
      console.log(usd.usd[0].required);
}
catch (err) {
      throw err;
}

// print gen eds
try {
      for (var i = 0; i < gened.geneds.length; i++) {
            console.log(gened.geneds[i].unicore);
            console.log(gened.geneds[i].unidist);
            console.log(gened.geneds[i].collegedist);
            console.log(gened.geneds[i].competencies);
      }
}
catch (err) {
      throw err;
}

// print course offerings
try {
      for (var i = 0; i < offer.offered.length; i++) {
            console.log(offer.offered[i].code);
            console.log(offer.offered[i].section);
            console.log(offer.offered[i].days);
            console.log(offer.offered[i].start);
            console.log(offer.offered[i].end);
      }
}
catch (err) {
      throw err;
}
