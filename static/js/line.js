 var line ;
 var x;
 var y;

function draw_line_graph(index){
    $("#line-graph svg").html("");
    var svg = d3.select("#line-graph svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;
     x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);
        
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    d3.tsv("data/line.tsv", function(d, i) {
      if (i <= index) {      return d; }
    }, function(error, data) {
      if (error) throw error;

      line = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.emojicount); })

      x.domain(data.map(function(d) { return d.year; }));

      y.domain([0, 3000]);
      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(10))
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");

      g.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

      g.selectAll("circle")
        .data(data)
      .enter().append("circle")
        .attr("class", "circle")
        .attr("cx", function(d) { return x(d.year); })
        .attr("cy", function(d) { return y(d.emojicount); })
        .attr("r", 4);
    });
}

// ** Update data section (Called from the onclick)
function updateData(index) {

    // Get the data again
    d3.tsv("data/line.tsv", function(error, data) {
       	data.forEach(function(d, i) {
	    	if (i <= index) return d
	    });

    	// Scale the range of the data again
    	 x.domain(data.map(function(d) { return d.year; }));
	    y.domain([0, 3000]);

    // Select the section we want to apply our changes to
    var svg = d3.select("#line-graph svg").transition();

    // Make the changes
        svg.select(".line")   // change the line
            .duration(750)
            .attr("d", line);

    });
}