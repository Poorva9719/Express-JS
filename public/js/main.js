const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_value = document.getElementById('temp_real_value');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const curDay = document.getElementById('day');
const curDate = document.getElementById('today_data');


const getCurrentDay = () =>{
    var weekday = new Array(7);
    weekday[0] = 'Sun';
    weekday[1] = 'Mon';
    weekday[2] = 'Tue';
    weekday[3] = 'Wed';
    weekday[4] = 'Thur';
    weekday[5] = 'Fri';
    weekday[6] = 'Sat';

    let currentTime = new Date();

    let day = weekday[currentTime.getDay()];
    return day;
}

const getCurrentDate =() =>{
    var now = new Date();
    var months =[
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ]
        var now = new Date();
        var month =months[now.getMonth()];
        var date = now.getDate();
    return `${date} ${month}`;
}

curDay.innerHTML= getCurrentDay();
curDate.innerHTML= getCurrentDate();

const getInfo = async(event) =>{
    event.preventDefault();
    let cityval = cityName.value;

    if(cityval === ""){
        city_name.innerText = `Please write the name before search`;
        datahide.classList.add('data_hide');
    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=8dc32ecc4312cbab2ad4715ef7e47c0e`; 
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            city_name.innerText =`${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_value.innerText = arrData[0].main.temp;
            
            const tempMood =arrData[0].weather[0].main;
            //condition to check sunny or cloudy
            
            if(tempMood == "Clear"){
                
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68'></i>"
            }else if(tempMood == "Clouds"){
                
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#f1f2f6'></i>"
            }else if(tempMood == "Rainy"){
                
                temp_status.innerHTML = "<i class='fas fa-rain' style='color:#a4b0be'></i>"
            }else {
                
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#eccc68'></i>"
            }
            datahide.classList.remove('data_hide');
        }catch{
            city_name.innerText = `Please enter the city name properly`;
            datahide.classList.add('data_hide');
        }

    }

    
}

submitBtn.addEventListener('click',getInfo);