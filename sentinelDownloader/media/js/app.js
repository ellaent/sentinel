var mapModel = new MapModel([51.505, -0.09]);
$('#reset_map').click(function () {
    mapModel.resetMap();
});
function fyjfkuyg ()
{
    if (mapModel.latLng.length > 4) {
        let array = [];
        for (let i = 0; i < mapModel.latLng.length; i++) {
            array.push(mapModel.latLng[i].lat);
            console.log(array);
        }
    }
}
$('#get_geo').click(function(){
    console.log('GEO');
    $("#get_geo").prop("disabled", true);
    var fd = new FormData;
    var $input = $('input[name="geojson"');
    fd.append('geojson_data', $input.prop('files')[0]);
    $.ajax({
        url: 'get_geo',
        type: 'POST',
        cache: false,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        data: fd,
        success: function (respond) {
            console.log('SUCCESS');
        }

        });
});

let dict = {};
let date_st = document.getElementById('from-date');
let date_fin = document.getElementById('to-date-inclusive');
let cloud = document.getElementById('cloud-cover');
cloud.onchange = function (e) {
    dataRecord();
};
date_fin.onchange = function (e) {
    dataRecord();
};

date_st.onchange = function (e) {
    dataRecord();
};


function dataRecord() {
    dict.beginposition = date_st.value;
    dict.endposition = date_fin.value;
    dict.cloudcoverpercentage = cloud.value;
};

let sub = document.getElementById('sub');
sub.onclick = function (e) {
    Request();
     mapRequest();
};

function mapRequest(){
    $.ajax({

  type: "GET",
  url: 'get_map',
  data: mapModel.array,
  dataType:"json",
  success: function(data) {
  let table = document.getElementById('date');
            let dataTb = document.createElement('tr');
            let i = 1;
            for (item of data.urls) {
                let dataTb = document.createElement('tr');
                dataTb.innerHTML = `

                <td><a href="${item}">${item}</a></td>
                <td>${i}</td>
               
           `;
                table.appendChild(dataTb);
                i++;
            }
            $('.pop-outer').fadeIn('slow');
            console.log(data.urls);
            //console.log(mapModel.latLng);
        }
});


}

function Request() {
    $.ajax({

  type: "GET",
  url: 'findurls',
  data: dict,
  dataType:"json",
  success: function(data) {
  let table = document.getElementById('date');
            let dataTb = document.createElement('tr');
            let i = 1;
            for (item of data.urls) {
                let dataTb = document.createElement('tr');
                dataTb.innerHTML = `

                <td><a href="${item}">${item}</a></td>
                <td>${i}</td>
               
           `;
                table.appendChild(dataTb);
                i++;
            }
            $('.pop-outer').fadeIn('slow');
            console.log(data.urls);
            //console.log(mapModel.latLng);
        }
});

}

// Modal data-table room for improvement
$(document).ready(function () {
       $('#map-dashboard-form').submit(function(e) {
            e.preventDefault();
        });

    $('#sub').click(function () {
        $('.pop-outer').fadeIn('slow');
       $('.map').fadeOut('slow');
        //$('.geo-submit').fadeOut('slow');
        //$('.footer').fadeOut('slow');
    });

    $('.close').click(function () {
        $('.pop-outer').fadeOut('slow');
        $('.map').fadeIn('slow');
        $('.geo-submit').fadeIn('slow');
        $('.footer').fadeIn('slow');
    })
});

// fixed date for finish
$(function(){
    let dtToday = new Date();

    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();

    let maxDate = year + '-' + month + '-' + day;

    $('#to-date-inclusive').attr('max', maxDate);
});
//fixed date for start
$(function(){
    let dtToday = new Date();

    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate() - 3;
    let year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();

    let maxDate = year + '-' + month + '-' + day;

    $('#from-date').attr('max', maxDate);
});
//disable submit
$(document).ready(function () {
    $('#map').click(function () {
        $(".geo-submit").addClass("disabled");
    });
});
//disable map
$(document).ready(function () {
    $('.geo-submit').change(function () {
        $('.map').addClass("disabled");
    })
});


// button cancel-file
$(document).ready(function () {
    $('.cancel-file').click(function () {
        $('.map').removeClass("disabled");

    })
});

// button cancel-map
$(document).ready(function () {
    $('.cancel-map').click(function () {
        $('.geo-submit').removeClass("disabled");
    })
});

let dateDefaultStart = new Date();
let dateDefaultFinish = new Date();
dateDefaultStart.setDate(dateDefaultStart.getDate() - 3);
document.getElementById('to-date-inclusive').valueAsDate = new Date();
document.getElementById('from-date').valueAsDate = dateDefaultStart;