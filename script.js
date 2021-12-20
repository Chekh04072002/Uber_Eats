
    var colorArray = ["#5A9C6E", "#A8BF5A", "#FAC46E", "#FAD5BB", "#F2FEFF"]; // создаем массив с цветами фона
    var i = 0; 
    
    function changeColor(){
        document.body.style.background = colorArray[i]; 
        i++;
        if( i > colorArray.length - 1){
            i = 0;
        }
    }

    function lnkoncl(){
    window.alert ("Точно перейти на страницу доставки?");
    self.event.returnValue="False";
    
    }


    function time () {  // часы
        date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
      
        h = (h < 10) ? '0' + h : h,
        m = (m < 10) ? '0' + m : m,
        s = (s < 10) ? '0' + s : s;
      
        hours  = document.getElementById("id_H");
        minutes = document.getElementById("id_M");
        seconds = document.getElementById("id_S");
                  
        hours.innerHTML = h;   
        minutes.innerHTML = m;
        seconds.innerHTML = s;
    };


    {
        var url = document.getElementById('oone');
        document.location.href = url.value;
    }
