console.log('background rodando')

let myTabs = new Set()

let uso = {
    tempoInicial: 0,
    tempoFinal: 0
}

chrome.tabs.onRemoved.addListener(tabFechada)

function tabFechada (tabId) {
   for (tab of myTabs) {
       if (tab.tabId === tabId) {
            let horaFim = Date.now()
            let tempo = horaFim - tab.horaInicio
            let itemNavegacao = {
                tabId: tab.tabId,
                tempo: tempo,
                site: tab.site,
                titulo: tab.titulo
            }
           hasInLocalStorage(tab)
       }
   }
   console.log('minhas tabs => ', myTabs)
}

chrome.tabs.onActivated.addListener(tabAberta)

function tabAberta (tab) {
    console.log('tab sendo vista => ', tab)
}

chrome.tabs.onUpdated.addListener(tabAtualizada)

function tabAtualizada(tabId, changeInfo, tab) {
    let urlChrome = tab.url.includes('chrome://')
    let quantidadeIguais = 0
    if (changeInfo.status == 'complete' && !urlChrome) {
        console.log('tab => ', tab)
        let tabItem = {
            horaInicio: Date.now(),
            windowId: tab.windowId,
            tabId: tab.id,
            site: tab.url,
            titulo: tab.title
        }
        let reg = new RegExp('([/])+[A-Za-z0-9.]+([/])', 'g')
        if (myTabs.size > 0) {
           for (tab of myTabs) {
                if (tab.tabId === tabItem.tabId) {
                  if (tab.site.match(reg)[0] !== tabItem.site.match(reg)[0]) {
                        hasInLocalStorage(tab)
                    } else quantidadeIguais++
                }
                else if (tab.site.match(reg)[0] === tabItem.site.match(reg)[0]) {
                    quantidadeIguais++
                }             
            }
            if (quantidadeIguais == 0) {
                myTabs.add(tabItem)
            }
        } else {
            myTabs.add(tabItem)
        }
        console.log('mytabs => ', myTabs)
    }
}

function hasInLocalStorage (tab) {
    console.log('em hasInLocalStorage')
    let siteNoLocalStorage = 0
    let dadosNavegacao = localStorage.getItem('dados_navegacao')
    dadosNavegacao = (typeof dadosNavegacao) === 'string' ? JSON.parse(dadosNavegacao) : []
    let reg = new RegExp('([/])+[A-Za-z0-9.]+([/])', 'g')
    if (dadosNavegacao.length > 0) {
        for(item of dadosNavegacao) {
            if (item.site.match(reg)[0] === tab.site.match(reg)[0]) {
                let tempoFinal = Date.now()
                let temp = tempoFinal - tab.horaInicio
                item.tempo += temp
                localStorage.setItem('dados_navegacao', JSON.stringify(dadosNavegacao))
                siteNoLocalStorage = 1
                break;
            }
        }
        if (siteNoLocalStorage == 0) {
            console.log('no else')
            let horaFim = Date.now()
            let tempo = horaFim - tab.horaInicio
            let itemNavegacao = {   // Tem que ser tab pq é um item de myTabs
                tabId: tab.tabId,
                tempo: tempo,
                site: tab.site,
                titulo: tab.titulo
            }
            dadosNavegacao.push(itemNavegacao)
            localStorage.setItem('dados_navegacao', JSON.stringify(dadosNavegacao))
        }
    } else {
        let horaFim = Date.now()
        let tempo = horaFim - tab.horaInicio
        let itemNavegacao = {   // Tem que ser tab pq é um item de myTabs
            tabId: tab.tabId,
            tempo: tempo,
            site: tab.site,
            titulo: tab.titulo
        }
        dadosNavegacao.push(itemNavegacao)
        localStorage.setItem('dados_navegacao', JSON.stringify(dadosNavegacao))
    }
    myTabs.delete(tab)
}
