//offline data functionality 
db.enablePersistence()
    .catch(err => {
        if(err.code == 'failed-precondition'){
            //Probably multiple tabs open at once
            console.log('persistence failed');
        } else if (err.code == 'unimplemented'){
            //Lack of browser support
            console.log('persistence is not available');
        }
    });

//Real-time listener
db.collection('items').onSnapshot((snapshot) => {
    // console.log(snapshot.docChanges());
    snapshot.docChanges().forEach((change) => {
        // console.log(change, change.doc.data());
        if(change.type === 'added'){
            //add the document data to the web page
            addItemDB(change.doc.data(), change.doc.id);
        }
    });
})