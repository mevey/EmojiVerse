var myBarChart;
var images = [
    "static/img/smiley.png",
    "static/img/heart.png",
    "static/img/smileyhearts.png",
    "static/img/poop.png",
]

function get_votes() {
//    $.ajax({
//        url:'/get-votes',
//        success: function (data) {
//            total = data['nairobi'] + data['athens'] + data['bangkok'] + data['reykjavik']
//            max_val = Math.max(data['nairobi'] ,data['athens'], data['bangkok'] ,data['reykjavik'])
//            update_column(data, "nairobi",0, total, max_val)
//            update_column(data, "athens",1, total, max_val)
//            update_column(data, "bangkok",2, total, max_val)
//            update_column(data, "reykjavik",3, total, max_val)
//        }
//    });
    data = []
    update_column(data, "nairobi",0)
    update_column(data, "athens",1)
    update_column(data, "bangkok",2)
    update_column(data, "reykjavik",3)
}

function update_column(data, city, position) {
   diff = position + 1
   for (var i = 0; i < diff; i++ ) {
        myBarChart.addToken({category:position, texture: { src: images[position]}})
   }

}

 mySettings = {
    width:$(".container-fluid").width(),
    height:$(".container-fluid").height(),
    data:{
         model:
            [
              {label:"Nairobi"},
              {label:"Athens"},
              {label:"Bangkok"},
              {label:"Reykjavik"},
            ],
        strata:[
              [
                {initValue: 0, label: "Strata 1 col A", texture:{src:"/static/img/smiley.png", size:20}},
              ],[
                {initValue: 0, label: "Strata 1 col B", texture:{src:"/static/img/smiley.png",size:20}},
              ],[
                {initValue: 0, label: "Strata 1 col C" , texture:{src:"/static/img/smiley.png", size:20}}
              ],[
                {initValue: 0, label: "Strata 1 col D", texture:{src:"/static/img/smiley.png", size:20}}
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
      decay:{power:1.001}
    }
    },
    chart:{
         width:$(".container-fluid").width(),
         height:$(".container-fluid").height(),
         wallColor:"rgba(255,255,255, 1)",
         floorColor:"rgba(255,255,255, 1",
         spacer:0,
         type:'StackedAreaChart',
        },
    options:{
    layout:false
    }
}

$( document ).ready(function() {
    myBarChart =  $("#barChart").vs(mySettings).data('visualSedimentation');
    setInterval(function(){ get_votes() }, 500);
})