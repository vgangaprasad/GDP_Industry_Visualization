# Interactive Visulization of US GDP by Industry and State

### Landing Page
![Landing Page](images/01-Jumbotron.JPG)


## Description
We wanted to data analytics skills like cleaning, transforming and loading the data and also Visualization skills to show case the findings in an interactive web application. Here are the things we did for this project.

- Data Gathering (Bureau of Economic Analysis - https://apps.bea.gov/iTable/index_regional.cfm) 
- Data Cleanup & Transformation
- Loading the data to SQLITE
- FLASK app to visually report the data
- Flask app to create our API to share the data in JSON Format

## Clone:
* Clone this repo to your local machine using  https://github.com/vgangaprasad/GDP_Industry_Visualization.git

## Tools/Technologies Used:
* Bootstrap
* D3
* Chart.js
* Plotly
* SQLAlchemy
* Pandas
* Flask
* BeautifulSoup
* SQLITE

## File Breakdown:
* Ins_Basic_Querying - Denis.ipynb: scrapes data from apps.bea.gov and converts data frames to json format
* App.py: Flask app to host data
* Templates: folder containing html file
* Static: folder containing css and app.js files

## Contributors:
* https://github.com/deniscohen43
* https://github.com/vgangaprasad
* https://github.com/dmullen4
* https://github.com/congntran92

##Here are some of the images from the Application

### US Map
![US Map](images/02-USMap.JPG)

<br>

### Bar Chart for the state selected from the Map or Drop Down
![Bar Chart](images/03-BarChart.JPG)

<br>

### Donut Chart for the year selected from Bar Chart or Drop Down
![Donut Chart](images/04-DonutChart.JPG)

<br>

### Line Chart for the Industry selected from Donut Chart or Drop Down
![US Map](images/05-LineChart.JPG)



