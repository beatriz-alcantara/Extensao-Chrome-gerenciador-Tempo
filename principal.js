var ctx = document.getElementById('myChart').getContext('2d');

let dadosNavegacao = localStorage.getItem('dados_navegacao')
dadosNavegacao = JSON.parse(dadosNavegacao)
let sites = []
let tempo = []
let cores = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
]
let coresPadrao = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
]
for(dado of dadosNavegacao) {
    sites.push(dado.titulo)
    let temp = dado.tempo / 60000
    tempo.push(temp)
}

if (sites.length == cores.length + 1) {
    cores = [...cores, ...coresPadrao]
}

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: sites,
      datasets: [{
          label: 'Tempo nos Sites (em minutos)',
          data: tempo,
          backgroundColor: cores,
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
});