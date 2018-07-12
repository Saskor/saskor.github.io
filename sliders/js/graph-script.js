google.load("visualization", "1", {packages:["corechart"]});
 google.setOnLoadCallback(drawChart);

 function drawChart() {
  var sliderCounters = JSON.parse(localStorage.getItem("sliderCounters"));
  var num = 10;
  var data = google.visualization.arrayToDataTable([
   ['', ''],
   ['Низкий', sliderCounters[0]],
   ['Средний', sliderCounters[1]],
   ['Высокий', sliderCounters[2]],
   ['Не распределено', localStorage.distributedClientsCounterAfterDrug]
  ]);
  var options = {
  legend:{position:'none'},
  hAxis: {
  	title: 'Количество клиентов',
  	titleTextStyle: {color: '#000'}
	},
  vAxis: {
  	title: 'Уровень доходов',
		titleTextStyle: {color: '#000'}
	}}
  var chart = new google.visualization.ColumnChart(document.querySelector('.graph'));
  chart.draw(data, options);
 }
