export const callAPI = function(methodType, url, callback, errorCallback){
   var xhr = new XMLHttpRequest();
   xhr.open(methodType, url, true);
   xhr.onreadystatechange = function(){
         if (xhr.readyState === 4 && xhr.status === 200){
             callback(xhr.response);
         }
     }
   xhr.onerror = function () {
        errorCallback();
   }
     xhr.send();
   console.log("request sent to the server");
 }
