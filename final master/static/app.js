
function pieChart(state, year) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/GDP/${state}/${year}`;
  console.log(url);
  d3.json(url).then(function(data) {

    listpie = []

    for (i = 0; i < data.length; i++) {
      listpie.push(data[i]);
    }
    
    numberspie = []
    descripspie = []
    
    // Iterate through each recipe object
    listpie.forEach((number) => {

      // Iterate through each key and value
      Object.entries(number).forEach(([key, value]) => {

        // Use the key to determine which array to push the value to
        if (key === `${year}`) {
          numberspie.push(value);
        } else if (key === `Description`) {
          descripspie.push(value);
        }
       });
    });

    let myChart = document.getElementById('pieChart');

    let myDoughnutChart = new Chart(myChart, {
        type: 'doughnut',
        data: {
          labels: descripspie.slice(1,11),
          datasets: [
            {
              backgroundColor: ['yellow', 'orange', 'red', 'green', 'blue', 'purple', 'indigo', 'black', 'grey', 'brown'],
              borderColor: '#fff',
              data: numberspie.slice(1,11),
              label: "GDP by Year by Industry",
            }
          ]
        }
    });
});
};

function barChart(state){
  var url = `/GDP/${state}`;
  console.log(url);
  var barDict = [];
  var barValue = [];
  var barLabels = ["1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];
  //d3.select("svg").remove();
  d3.selectAll('#barchart svg').remove();
  d3.json(url).then(function(barData){
      Object.entries(barData[0]).forEach(([key, value]) => {
        if (key === `Description`){
          return true;
        }
        else if (key === `GeoName`){
          return true;
        }
        else if (key === `IndustryId`){
          return true;
        }
        else if (key === `Region`){
          return true;
        }
        else {
          barValue.push(value);
          barDict.push({
            year: key,
            GDP: value
          });
        }
        });
      console.log(barValue);
      console.log(barDict)

// New Code for bar - Vijay

      var margin = {top: 20, right: 20, bottom: 70, left: 75},
          width = 600 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

      //var c10 = d3.scale.category30();

      var myColor = d3.scaleLinear().domain([10,130]).range(["yellow", "steelblue"]);
      
      // set the ranges
      //var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
      
      var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
      var y = d3.scaleLinear().range([height, 0]);

      // define the axis
     
      var xAxis = d3.axisBottom(x);

      var yAxis = d3.axisLeft(y).ticks(10);


      // add the SVG element
      //var svg = d3.select("#barchart").remove("svg");
      svgBar = d3.select("#barchart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");


      // load the data
      barDict.forEach(function(d) {
            d.year = d.year;
            d.GDP = +d.GDP;
        });
        
        // scale the range of the data
      x.domain(barDict.map(function(d) { return d.year; }));
      y.domain([0, d3.max(barDict, function(d) { return d.GDP; })]);

        // add axis
      svgBar.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.55em")
          .attr("transform", "rotate(-90)" );

      svgBar.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 5)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("GDP");


        // Add bar chart
      svgBar.selectAll(".barchart")
         .data(barDict)
         .enter()
         .append("rect")
          .attr("class", "bar")
          .attr("id","the_bar_SVG")
          .attr("x", function(d) { return x(d.year); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.GDP); })
          .attr("height", function(d) { return height - y(d.GDP);})
          .attr("fill", function(d){return myColor((d.GDP/10000));})
          .on("click",function(d) {
            var barState = d3.select("#selDataset").node().value;
            d3.select("#selDataset2").node().value = d.year;
            pieChart(barState,d.year)
          });
          
        svgBar.on("mouseover",function(){
          d3.select(this)
            .transition()
            .duration(200)
            .attr("fill","green");
        })

          .on("mouseout",function(){
            d3.select(this)
              .transition()
              .duration(200);
          });

    // End of New code for bar - Vijay



    });
  };



      //console.log(barDict[])

      
        //console.log((barData[0][key])); => 
        // if ((barData[0][key] == "Description") ||
        //     (barData[0][key] == "GeoName") ||
        //     (barData[0][key] == "IndustryId")  ||
        //     (barData[0][key] == "Region")){
        //       console.log("Inside If loop");
        //       console.log(barData[0][key]);
        //     }
        // else{
        //   console.log("Inside else");
        //   console.log(barData[0][key]);
        //   barDict[key] = barData[0][key];
        // }

      //barDict.update(barData[0]);
      //console.log(barDict);
    //};

function lineChart(state, industryId) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `${state}/${industryId}`;
  console.log(url);
  d3.json(url).then(function(data) {

    listline = []

    for (i = 0; i < data.length; i++) {
      listline.push(data[i]);
    }
    
    numbersline = []
    descripsline = []
    
    // Iterate through each recipe object
    listline.forEach((number) => {

      // Iterate through each key and value
      Object.entries(number).forEach(([key, value]) => {

        // Use the key to determine which array to push the value to
        if (key === `Y1997`) {
          numbersline.push(value);
        } else if (key === `Y1998`) {
          numbersline.push(value);
        } else if (key === `Y1999`) {
          numbersline.push(value);
        } else if (key === `Y2000`) {
          numbersline.push(value);
        } else if (key === `Y2001`) {
          numbersline.push(value);
        } else if (key === `Y2002`) {
          numbersline.push(value);
        } else if (key === `Y2003`) {
          numbersline.push(value);
        } else if (key === `Y2004`) {
          numbersline.push(value);
        } else if (key === `Y2005`) {
          numbersline.push(value);
        } else if (key === `Y2006`) {
          numbersline.push(value);
        } else if (key === `Y2007`) {
          numbersline.push(value);
        } else if (key === `Y2008`) {
          numbersline.push(value);
        } else if (key === `Y2009`) {
          numbersline.push(value);
        } else if (key === `Y2010`) {
          numbersline.push(value);
        } else if (key === `Y2011`) {
          numbersline.push(value);
        } else if (key === `Y2012`) {
          numbersline.push(value);
        } else if (key === `Y2013`) {
          numbersline.push(value);
        } else if (key === `Y2014`) {
          numbersline.push(value);
        } else if (key === `Y2015`) {
          numbersline.push(value);
        } else if (key === `Y2016`) {
          numbersline.push(value);
        } else if (key === `Y2017`) {
          numbersline.push(value);
        } else if (key === `Description`) {
          descripsline.push(value);
        }
       });
    });

    let myChart = document.getElementById('lineChart');

    let myLineChart = new Chart(myChart, {
      type: 'line',
      data: {
        labels: ["1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
        datasets: [
          {
            data: numbersline,
            label: descripsline,
            backgroundColor: ['rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
              }
        ]
      },
      options : {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Millions of Dollars $'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Years'
            }
          }],
        }
      }
  });
});
};



function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  var selector2 = d3.select("#selDataset2");
  var selector3 = d3.select("#selDataset3");

  // Use the list of sample names to populate the select options
  d3.json("/states").then((stateNames) => {
    stateNames.forEach((state) => {
      selector
        .append("option")
        .text(state)
        .property("value", state);
    });

  d3.json("/years").then((yearNames) => {
    yearNames.forEach((year) => {
      selector2
        .append("option")
        .text(year)
        .property("value", year);
      });

  d3.json("/industryIds").then((industryNames) => {
    industryNames.forEach((industry) => {
        selector3
        .append("option")
        .text(industry)
        .property("value", industry);
      });
    // Use the first sample from the list to build the initial plots
    const firstState = stateNames[0];
    const firstYear = yearNames[0];
    const firstIndustry = industryNames[0];
    
    pieChart(firstState,firstYear);
    lineChart(firstState, firstIndustry);
    barChart(firstState);

  });
 });
});
};

function optionChanged(changeState, changeYear) {

    const newState = d3.select("#selDataset").node().value;
    const newYear = d3.select("#selDataset2").node().value;
    const newIndustry = d3.select("#selDataset3").node().value;

  pieChart(newState, newYear);
  //myDoughnutChart.clear();
  lineChart(newState, newIndustry);
  //d3.select("#barchart").remove("svg")
  //d3.select("#the_bar_SVG").remove();
  //d3.selectAll('#barchart svg').remove();
  barChart(newState);
};


// Initialize the dashboard
init();
