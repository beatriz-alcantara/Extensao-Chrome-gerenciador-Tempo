# Extensão para monitoramento do tempo passado em sites (Google Chrome)

## Resultado da extensão

<img src="/imagens/demonstracao-1.png" width="500px" height="300px"/>

## Tecnologias usadas
 - JavaScript
 - HTML5
 - CSS3
 - [Chartjs](https://www.chartjs.org/)
 - [Chrome Web APIs](https://developer.chrome.com/apps/api_index)
 - [Chrome extension tutorial*](https://developer.chrome.com/extensions/getstarted)
 
 ## Explicando a ideia da extensão
 
 A ideia é criar uma extensão para o google chrome visando contabilizar quanto tempo um site fica aberto em nossos navegadores
 . Parti do princípio que o tempo passado em uma página Web deve ser contabilizado desde o momento em que ele é carregado/inicializado até o momento que mudamos para outro site  dentro da mesma aba ou a fechamos.
 
 ## O Código
 
 Primeiro de tudo devemos criar o arquivo `manifest.json`, nele iremos declarar informações sobre a nossa extensão e também alguns arquivos que iremos utilizar.
 
 ```json
 {
    "manifest_version": 2,
    "name": "Monitor de sites",
    "version": "0.0.1",
    "content_scripts": [
        {
            "matches": [
                "<all_urls>"
            ]
        }
    ],
    "background": {
        "scripts": ["background.js"],
    },
    "permissions": [
        "tabs"
    ],
    "browser_action": {
        "default_popup": "index.html",
        "default_icon": "work.png",
        "title": "Monitor de sites"
      }
}
 ```
 Vou tentar explicar algumas propriedades desse arquivo que acho relevante saber para esse projeto. (Se quiser saber mais sobre o `manifest.json` acesse a [documentação do google](https://developer.chrome.com/extensions/manifest))
 
- A propriedade *background* é onde definimos o nosso script principal que mantém todo o gerenciamento de tempo em cada aba.
- A propriedade *permissions* serve para nos dar acesso a APIs que iremos utilizar na nossa extensão
- A propriedade *browser_action* define como o icone da nossa extensão será mostrado no canto superior direito do navegador e também qual conteúdo será apresentado para o usuário quando clicado.

### Arquivo background.js

Aqui temos acesso a API do **chrome**. Nele vamos "escutar" o objeto tabs, quando ele for atualizado e quando for fechado.

``` javascript
chrome.tabs.onUpdated.addListener(tabAtualizada)

chrome.tabs.onRemoved.addListener(tabFechada)

```

A função de callback **tabAtualizada** recebe três parâmetros de entrada *tabId, changeInfo, tab* onde:
- *tabId* é o id da tab atualizada
- *changeInfo* contém informações sobre o status da aba (se ela ja acabou de recarregar ou está em processo de carregamento)
- Objeto *tab* que traz algumas informações referentes ao conteúdo carregado na aba.

Já a função de callback **tabFechada** traz apenas o id da aba fechada.

