
      
      const firebaseConfig = {
      apiKey: "AIzaSyD-9lbqpcLWy-OoYvYJxQgnNya9iQ620LI",
      authDomain: "mea-temp.firebaseapp.com",
      databaseURL: "https://mea-temp-default-rtdb.firebaseio.com",
      projectId: "mea-temp",
      storageBucket: "mea-temp.firebasestorage.app",
      messagingSenderId: "389950480143",
      appId: "1:389950480143:web:dabe5155db3d310901687a",
      measurementId: "G-8GZQS53NV5"
    };
    let child = '';
    firebase.initializeApp(firebaseConfig);
    function getData() {
      firebase.database().ref("/EVENT").once('value', function(snapshot) {
        let events = [];
    
        snapshot.forEach(function(childSnapshot) {
          const key = childSnapshot.key;
          const data = childSnapshot.val();
          if (key !== "IGNORE") {
            events.push({
              key: key,
              data: data
            });
          }
        });
    
        // Sort events in DESCENDING order by key (most recent first)
        events.sort((a, b) => b.key.localeCompare(a.key));
    
        // Clear and render
        document.getElementById('r').innerHTML = "";
    
        events.forEach(({ key, data }) => {
          const event = data.name;
          const row = `
            <div id="rlist">
              <span>${event}</span>
              <i data-id="${key}" class="fa fa-times delete-icon"></i>
            </div>`;
          document.getElementById('r').innerHTML += row;
        });
    
        // Attach effects after rendering
        hoverEffect();
        attachDeleteEvents();
      });
    }
  
  getData();

    
    function add(){
      const name = document.getElementById('title').value;
      const description = (document.getElementById('description').value)!= "" ? document.getElementById('description').value: "null";
      var date$time$local = document.getElementById('date').value;
      date$time$local = date$time$local.replaceAll('-', "");
      date$time$local = date$time$local.replaceAll(':', "");
      date$time$local = date$time$local.replaceAll(/[-:T]/g, "");
      const a = (document.getElementById('refer').value)!= "" ? document.getElementById('refer').value: "null";
      var image = [];
      
      if(date$time$local == ""){
        window.alert("FILL THE DATE AND TIME. CAN'T CONTINUE! ")
        
      }
      else if(name == ""){  
        if(window.confirm("Do you want the Announcement to be nameless?")){
          for(i=1; i<=6; i++){
            image.push(document.getElementById('img'+i).value);
            }
            image = image.filter(val => val && val.trim() !== "");
            firebase.database().ref("EVENT/"+date$time$local).set({
              name: name,
              description: description,
              picture: image,
              a: a,
              date: date$time$local
      });
        }
      }
      else{
        for(i=1; i<=6; i++){
          image.push(document.getElementById('img'+i).value);
          }
          image = image.filter(val => val && val.trim() !== "");
          firebase.database().ref("EVENT/"+date$time$local).set({
            name: name,
            description: description,
            picture: image,
            a: a,
            date: date$time$local
    });
    console.log("ADDED SUCCESSFULLY");
}

      // console.log(ename);
      // console.log(description);
      // console.log(a);
      // console.log(image)
    }
 
  
      

  function hoverEffect() {
    const icons = document.querySelectorAll('.delete-icon');
    icons.forEach(icon => {
      icon.addEventListener('mouseover', () => {
        icon.style.color = '#ff3332';
        icon.style.transform = 'scale(1.2)';
        icon.style.transition = 'all 0.4s ease';
      });
      icon.addEventListener('mouseout', () => {
        icon.style.color = '';
        icon.style.transform = 'scale(1)';
      });
    });
  }
  function attachDeleteEvents() {
    const icons = document.querySelectorAll('.delete-icon');
    icons.forEach(icon => {
      icon.addEventListener('click', () => {
        const eventId = icon.getAttribute('data-id');
        const confirmDelete = confirm("Are you sure you want to delete this announcement?");
        if (confirmDelete) {
          firebase.database().ref("EVENT/" + eventId).remove()
            .then(() => {
              console.log("Deleted:", eventId);
            })
            .catch(error => {
              console.error("Error deleting:", error);
            });
        }
      });
    });
  }
  

  function rmv(child){
    console.log(child);
    firebase.database().ref('EVENTS/'+child).remove()
  .then(() => {
    console.log("Child removed successfully.");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
  }
  
