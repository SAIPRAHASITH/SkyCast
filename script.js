const wrapper=document.querySelector(".wrapper");
const inputpart=document.querySelector(".input-part");
const infotxt=document.querySelector(".info-txt");
const inputfield=document.querySelector("input");
const locationfield=document.querySelector("button");
const Icon=document.querySelector(".weather-part img");
const arrow=document.querySelector("header i");
let api;
inputfield.addEventListener("keyup",(e)=>{
       if(e.key=="Enter" && inputfield.value !="")
       {
          requestApi(inputfield.value);
       }
});
locationfield.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
    }
    else{
        alert("Your browser not support geolocation api")
    }
})
function onSuccess(position){
  const latitude=position.coords.latitude; 
  const longitude=position.coords.longitude;
  api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=805c78e0cba08155ec57d0de457be73c`
   fetchdetails(api);

}
function onError(error){
    infotxt.innerHTML=error.message;
    infotxt.classList.add("error");
    navigator.geolocation.getCurrentPosition(onSuccess,onError);
}
function requestApi(city){
     let api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=805c78e0cba08155ec57d0de457be73c`;
     fetchdetails(api);
     
}
function fetchdetails(api){
    infotxt.innerText=`Getting weather details of ${inputfield.value}....`;
     infotxt.classList.add("pending");
     fetch(api).then(response=>response.json()).then(result=>weatherDetails(result)).catch((error)=>{
        console.log("error")
     });
}
function weatherDetails(info){
   if(info.cod=="404"){
    infotxt.classList.replace("pending","error");
     infotxt.innerText=`${inputfield.value} isn't a valid city name`
   }
   else{
    const city=info.name;
    const country=info.sys.country;
    const {description,id}=info.weather[0];
    const {feels_like,humidity,temp}=info.main;

    wrapper.querySelector(".temp .numb").innerText=temp;
    wrapper.querySelector(".weather").innerText=description;
    wrapper.querySelector(".location span").innerText=`${city},${country}`;
    wrapper.querySelector(".temp .numb-2").innerText=Math.ceil(feels_like);
    wrapper.querySelector(".humidity span").innerText=`${humidity}%`;
    infotxt.classList.remove("pending","error")
    wrapper.classList.add("active");
    console.log(info);
   }
}
arrow.addEventListener("click",()=>{
    wrapper.classList.remove("active");
    wrapper.classList.remove("pending");
    infotxt.innerText=`Please enter a valid city name`;
})