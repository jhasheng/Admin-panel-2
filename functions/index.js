var functions = require('firebase-functions');

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
 console.log('message from firebase functions'); 
})

// exports.test = functions.database

exports.getProsforaDetailsAndReplace = functions.database
    .ref('/prosfores/{pushId}')
    .onWrite(event => {
      const prosfora = event.data.val();

      if(prosfora.sanitized){
        return
      }
      console.log("sanitized new prosfora " + event.params.pushId);
      console.log(prosfora);

      prosfora.sanitized = true;
      prosfora.title = sanitize(prosfora.title);
      prosfora.description = sanitize(prosfora.description);
      prosfora.price = sanitize(prosfora.price);
      return event.data.ref.set(prosfora);
});

function sanitize (s){
  let sanitizedText = s;

  sanitizedText = sanitizedText.toString().replace(/\bstupid\b/ig, "wonderful");
  return sanitizedText;
}

