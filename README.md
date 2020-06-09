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
    "name": "Extensão de Testes",
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
        "persistent": false
    },
    "permissions": [
        "tabs"
    ],
    "browser_action": {
        "default_popup": "index.html"
      }
}
 ```
 Vou tentar explicar algumas propriedades desse arquivo que acho relevante saber para esse projeto. (Se quiser saber mais sobre o `manifest.json` acesse a [documentação do google](https://developer.chrome.com/extensions/manifest))
 
- A propriedade *background* é onde definimos o nosso script principal que mantém todo o gerenciamento de tempo em cada aba.
- A propriedade *permissions* serve para nos dar acesso a APIs que iremos utilizar na nossa extensão
- A propriedade *browser_action* define como o icone da nossa extensão será mostrado para o usuário e também qual conteúdo será apresentado para ele quando clicar em nossa extensão




