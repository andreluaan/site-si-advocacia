# SI Advocacia – site institucional

Site estático (HTML, CSS e JavaScript puro, sem dependências) do escritório SI Advocacia, de Direito Previdenciário e do Trabalho, com sede em Patos-PB.

## Páginas

- `index.html` – página inicial: apresentação, "Conte sua situação", áreas de atuação, como funciona, compromissos, sobre, fotos do escritório, dúvidas frequentes e contato.
- `equipe.html` – equipe do escritório.

O cabeçalho, o menu do celular, o rodapé, o botão flutuante de WhatsApp e o aviso de cookies são montados por `js/layout.js` e valem para as duas páginas.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Telefones, endereços, e-mail, redes sociais, equipe, situações, mapa, vídeo | `js/site.js` |
| Fotos | `assets/img` (nomes e tamanhos em `assets/img/LEIA-ME.txt`) |
| Cores e tema claro/escuro | `css/tokens.css` |
| Textos das seções | `index.html` e `equipe.html` |

Os links de WhatsApp e de telefone são gerados a partir de `SITE.phone`. Ao abrir o site no computador, o console lista os campos de `js/site.js` que ainda estão entre colchetes, como `[Nº]`.

## Estrutura

```
css/   tokens, base, sections, layout, motion, editorial, home, fonts
js/    site (dados) · layout · core (WhatsApp e dados) · ui (menu e animações)
       situacao · hero (vídeo) · form (contato e mapa) · cookies · team · photos
assets/ logo, favicon, fontes e fotos
```

## Funcionamento

- **Contato:** o formulário não envia e-mail. Ele abre o WhatsApp com a mensagem pronta. Se `SITE.formEndpoint` estiver preenchido, uma cópia também é enviada para esse endereço.
- **Fotos:** cada espaço de foto usa o arquivo de `assets/img`, se ele existir. A seção "O escritório" só aparece quando há pelo menos uma foto.
- **Mapa e vídeo:** só aparecem quando `SITE.mapsEmbed` e `SITE.heroVideo` estão preenchidos.
- **Cookies (LGPD):** medições só acontecem depois que o visitante clica em "Aceitar".
- **Acessibilidade:** navegação por teclado, link "Pular para o conteúdo", tamanhos de toque grandes e respeito à opção de reduzir animações do sistema.

## Como rodar

Abra `index.html` no navegador, ou sirva a pasta com qualquer servidor estático (por exemplo `npx serve .`).

## Publicação

Envie a pasta inteira para um serviço de site estático (Netlify, Vercel, Cloudflare Pages ou similar).
