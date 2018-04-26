function draw_line_graph() {
    // 2. Use the margin convention practice
    var margin = {top: 50, right: 50, bottom: 50, left: 50}
      , width = 300 // Use the window's width
      , height = 400; // Use the window's height

    // The number of datapoints
    var n = 10;
    data = [0, 176, 400, 800, 1200, 1500, 1600, 2000, 2600, 2600 ]
    years = ["1999", "2007", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"]

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
        .domain(years) // input
        .range([0, width]); // output

    // 6. Y scale will use the randomly generate number
    var yScale = d3.scaleLinear()
        .domain([0, 3000]) // input
        .range([height, 0]); // output

    // 7. d3's line generator
    var line = d3.line()
        .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number

    var dataset = d3.range(n).map(function(d, i) { return {"y": data[i]} })

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("#line-graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .text(function(d, i){
            return years[i];
        })
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator
    svg.append("path")
        .datum(dataset) // 10. Binds data to the line
        .attr("class", "line") // Assign a class for styling
        .attr("d", line); // 11. Calls the line generator

    // 12. Appends a circle for each datapoint
    svg.selectAll(".dot")
        .data(dataset)
      .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d, i) { return xScale(i) })
        .attr("cy", function(d) { return yScale(d.y) })
        .attr("r", 5);
}