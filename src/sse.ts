console.log("sse log!!!");


let filter = function(ch:any, obj:any) { 

    var txt:any;
    if(ch == "users" && obj.userId%2 == 1) {   
        txt += "<td>" + obj.userId + "</td>";
        txt += "<td>" + obj.userFirstName + "</td>";
        txt += "<td>" + obj.userLastName + "</td>";
        txt += "</tr>";                    
    }else{
        txt += "<td>" + obj.userId + "</td>";
        txt += "<td>" + obj.userFirstName + "</td>";
        txt += "<td>" + obj.userLastName + "</td>";
        txt += "</tr>";       
    }
return txt;
 };

if(typeof(EventSource) !== "undefined") {
    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    var c:any= url.searchParams.get("ch");
    var document: Document;
    console.log(c);
    document.getElementById("channelname")!.innerHTML = c;
    
    var source = new EventSource("demo");
    source.onmessage = function(event) {
    // document.getElementById("result").innerHTML += event.data + "<br>";
    console.log(event.data);
    var myObj = JSON.parse(event.data);
    var txt = "<table border='1'>"
    for (var x in myObj) {
        txt += filter(c,myObj[x]);
   }
   txt += "</table>"    
   document.getElementById("result")!.innerHTML += txt;
 
  };
} else {
  document.getElementById("result")!.innerHTML = "Sorry, your browser does not support server-sent events...";
}

