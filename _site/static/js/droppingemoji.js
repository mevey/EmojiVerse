var myBarChart;
var images = [
    "static/img/smiley.png",
    "static/img/heart.png",
    "static/img/world.png",
    "static/img/cherry-blossom.png",
    "static/img/poop.png",
]
var STATE = [0,0,0,0,0]

var RATES = [2, 1, 1, 1, 1]

function get_rates() {
    url = "http://emojitracker.com/api/rankings";
    $.ajax({
        url:url,
        success: function (data) {
           if (STATE[0] > 0) {
               RATES[0] = (data[0].score - STATE[0] )
               RATES[1] = (data[1].score - STATE[1] )
               RATES[2] = (data[2].score - STATE[2] )
               RATES[3] = (data[115].score - STATE[3] )
               RATES[4] = (data[116].score - STATE[4] )
           }
           STATE[0] = data[0].score
           STATE[1] = data[1].score
           STATE[2] = data[2].score
           STATE[3] = data[115].score
           STATE[4] = data[116].score
        }
    });
}

get_rates()

function drop_emoji(position) {
       add_tokens(position)
}

function add_tokens(position) {
   diff = Math.ceil(RATES[position])
   for (var i = 0; i < diff; i++ ) {
        myBarChart.addToken({category:position, texture: { src: images[position]}})
   }

}

function clear_emoji() {
   $("#barChart").html("") ;
   myBarChart =  $("#barChart").vs(mySettings).data('visualSedimentation');
}

var HEIGHT = $("#barChart").height();
var WIDTH = $("#barChart").width();

 mySettings = {
    width:WIDTH,
    height:HEIGHT,
    data:{
         model:
            [
              {label:""},
              {label:""},
              {label:""},
              {label:""},
              {label:""},
            ],
        strata:[
              [
                {initValue: 0, label: "Strata 1 col A"},
              ],[
                {initValue: 0, label: "Strata 1 col B"},
              ],[
                {initValue: 0, label: "Strata 1 col C" }
              ],[
                {initValue: 0, label: "Strata 1 col D"}
              ],[
                {initValue: 0, label: "Strata 1 col E"}
              ]
            ],
        stream:{
          provider:'',
        }
      },
    sedimentation:{
    aggregation:{
      height:50
    },
    token:{
      size:{
        original:13,
        minimum:5,
      },
    },
    suspension:{
      decay:{power:null}
    }
    },
    chart:{
         width:WIDTH,
         height:HEIGHT,
         wallColor:"rgba(255,255,255, 0)",
         floorColor:"rgba(255,255,255, 0",
         spacer:0,
         type:'StackedAreaChart',
        },
    options:{
    layout:false
    }
}
