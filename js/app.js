//tableau de box
var widgets = [];

//nombre max de box
var widget_max = 0;

Array.remove = function(array, from, to){
    var r = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array,r);
};


function display_box(){
    var right = 50;
    var i = 0;
    for(i; i < widget_max; i++){
        if(widgets[i] != undefined){
            var w = document.getElementById(widgets[i]);
            w.style.right = right + 'px';
            right = right + 300;
            w.style.display = 'block';
        }
    }

    for(j=i; j < widgets.length; j++){
        var w = document.getElementById(widgets[j]);
        w.style.display = 'none';
    }

}

function calculate_position(){
    var w = window.innerWidth;
    if(w < 150){
        widget_max = 0;
    }else{
        w = w - 250;
        widget_max = parseInt(w/250);
    }

    display_box();
}

function close(id)
{
    for(var i = 0; i < widgets.length; i++){
        if(id==widgets[i]){
            Array.remove(widgets, i);
            document.getElementById(id).style.display = 'none';
            calculate_position();

            return;
        }
    }
}


function createBox(id,name){
for(var i = 0; i< widgets.length;i++){
    if(id===widgets[i]){
        Array.remove(widgets, i);
        widgets.unshift(id);
        calculate_position();
        return;
    }
}

var w = '<div class="popup-box" id="'+id+'">';
w =  w + '<div class="popup-navbar">';
w =  w +    '<span>'+name+'</span>';
w =  w +    '<a class="close" role="button" href="javascript:close(\''+id+'\')">x</a>';
w =  w +    `</div>
            <div class="popup-board"></div>
            <div class="popup-keyboard">
                <input type="text" class="form-input"/>
            </div>
        </div>`;


document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML + w;

widgets.unshift(id);
display_box();
}

window.addEventListener("resize", calculate_position);
window.addEventListener("load", calculate_position);