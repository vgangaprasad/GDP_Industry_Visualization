
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
          }
        ]
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
  });
 });
});
};

function optionChanged(changeState, changeYear) {

    const newState = d3.select("#selDataset").node().value;
    const newYear = d3.select("#selDataset2").node().value;
    const newIndustry = d3.select("#selDataset3").node().value;

  pieChart(newState, newYear);
  lineChart(newState, newIndustry);
};


// Initialize the dashboard
init();