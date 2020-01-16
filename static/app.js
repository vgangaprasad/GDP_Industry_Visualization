console.log("hello");

var state = 'Georgia';
var year = 2000;

function buildCharts() {
  console.log(state)
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/GDP/${state}/${year}`;
  console.log(url)
  d3.json(url).then(function(data) {


    console.log(data);
    list = []
    for (i = 4; i < data.length; i++) {
      list.push(data[i]);
    }
    var pieValue = list;
    var pielabel = data[0];

    var data = [{
        values: pieValue,
        labels: pielabel,
        type: 'pie'
      }];

      Plotly.newPlot('pie', data);
    })
.catch(function(error) {
    console.log(error);
});
}

// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select("#selDataset");
//     buildCharts()
// };

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/states").then((stateNames) => {
    stateNames.forEach((state) => {
      selector
        .append("option")
        .text(state)
        .property("value", state);
    });

    // Use the first sample from the list to build the initial plots
    const firstState = stateNames[2];
    buildCharts(firstState);

  });
};

function optionChanged(newState) {
  // Fetch new data each time a new sample is selected
  buildCharts(newState);
};

// Initialize the dashboard
init();