function mudandoCorDiv () {
  let paragrafos = document.getElementsByTagName('div')
  if (paragrafos.length > 0) {
    for (let i = 0; i <= paragrafos.length; i++) {
      paragrafos[i].style['background-color'] = '#F00'
    }
  }
}

function tempoEmUmSite () {
  console.log('chrome runtime => ', chrome.runtime)
  chrome.runtime.sendMessage('ola')
}

tempoEmUmSite()