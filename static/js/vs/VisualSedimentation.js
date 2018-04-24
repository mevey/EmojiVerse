// ....................................................................
// Load Lib
// ....................................................................

var scripts = document.getElementsByTagName('script'),
    currentScriptSrc = scripts[scripts.length-1].src, 
		_vsDirectory = currentScriptSrc.replace('VisualSedimentation.js', '');

// external Librairy 
includeJS(_vsDirectory+'lib/d3/d3.v2.js');
includeJS(_vsDirectory+'lib/jQuery/jquery-1.4.2.min.js');
includeJS(_vsDirectory+'lib/Box2DWeb/Box2DWeb-2.1.a.3.min.js');

// Core, n_vsDirectory+'d
includeJS(_vsDirectory+'vs.js');
includeJS(_vsDirectory+'vs.phy.js');
includeJS(_vsDirectory+'vs.chart.js');
includeJS(_vsDirectory+'vs.draw.js');
includeJS(_vsDirectory+'vs.token2.js');
includeJS(_vsDirectory+'vs.stream.js');
includeJS(_vsDirectory+'vs.decay.js');
includeJS(_vsDirectory+'vs.strata.js');


includeJS(_vsDirectory+'vs.flocculate.js');
includeJS(_vsDirectory+'vs.aggregate.js');

// js by C_vsDirectory+' type 
includeJS(_vsDirectory+'vs.chart.stackedareachart.js');

//console.log("stratas",$.fn._vs.strata)


if(typeof(_vsCustomlayout)!="undefined"){
    includeJS(_vsCustomlayout);
    console.log("custom layout")
}

function includeJS(fJS){
  document.write('<script type="text/javascript" src="'+ fJS + '"></script>'); 
}

function includeCSS(fCSS) {
 document.write(' <link type="text/css" href="'+ fCSS + '" rel="stylesheet"/>'); 
}

function GUID()
{
    var S4 = function ()
    {
        return Math.floor(
                Math.random() * 0x10000 /* 65536 */
            ).toString(16);
    };

    return (
            S4() + S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + S4() + S4()
        );
}

// ....................................................................
// If we want to replace Jquery ...
// ....................................................................
//var visualSedimentation, _vs;
//(function() {
//
//    visualSedimentation = _vs = function(selector) {
//        return new VisualSedimentation(selector);
//    };
//
//    var VisualSedimentation = function(selector) {
//        // Lets make a really simplistic selector implementation for demo purposes
//        this.node = document.getElementById(selector);
//        /*
//        for (var i = 0; i < nodes.length; i++) {
//            this[i] = nodes[i];
//        }
//        this.length = nodes.length;
//        */
//        return this;
//    };
//
//    // Expose the prototype object via visualSedimentation.fn so methods can be added later
//    visualSedimentation.fn = VisualSedimentation.prototype = {
//        // API Methods
//        hide: function() {
//            this.node.style.display = 'none';
//            return this;
//        },
//        show: function() {
//            this.node.style.display = 'block';
//            return this;
//        },
//        remove: function() {
//            for (var i = 0; i < this.length; i++) {
//                this[i].parentNode.removeChild(this[i]);
//            }
//            return this;
//        }
//        // More methods here, each using 'return this', to enable chaining
//    };
//
//}());
