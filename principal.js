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
let coresBorda = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
]
let coresBordaPadrao = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
]
for(dado of dadosNavegacao) {
    sites.push(dado.titulo)
    let temp = dado.tempo / 60000
    temp = temp.toFixed(2)
    tempo.push(temp)
}

for (let i = 0; i <= Math.ceil(sites.length/6); i++) {
    cores = [...cores, ...coresPadrao]
    coresBorda = [...coresBorda, ...coresBordaPadrao]
}

Chart.Bar('myChart', {
    data: {
        labels: sites,
        datasets: [{
            label: 'Tempo nos Sites (em minutos)',
            data: tempo,
            backgroundColor: cores,
            borderColor: coresBorda,
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    display: false,
                    beginAtZero: true
                }
            }]
        }
    }
})