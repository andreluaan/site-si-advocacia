# SI Advocacia – landing page

## Estrutura
- `index.html` – marcação das seções
- `css/tokens.css` – cores, raios, sombras (tema claro e escuro)
- `css/base.css` – reset, tipografia, botões
- `css/sections.css` – header, hero, áreas, passos, FAQ, contato, rodapé
- `js/site.js` – **dados do escritório** (edite aqui)
- `js/core.js` – WhatsApp (`buildWhatsAppLink`) e preenchimento de dados
- `js/ui.js` – menu, reveal e parallax · `js/form.js` – mapa e formulário · `js/cookies.js` – banner LGPD
- `assets/` – logo e favicon (placeholders)

## Como rodar
Abra `index.html` no navegador, ou rode `npx serve .` dentro da pasta.

## Pendências (TODO)
Nome do advogado e OAB, e-mail, número/bairro/CEP, links do Google Maps (`mapsUrl`, `mapsEmbed`), fotos reais (hero, retrato, escritório), lista oficial de serviços, passos e pilares do briefing, política de privacidade completa, GA4/GTM.
O console do navegador lista os campos de `site.js` ainda não preenchidos.

## Deploy
Envie a pasta inteira para Netlify, Vercel ou Cloudflare Pages (site estático).

**Valide todos os textos finais com o advogado responsável (regras da OAB e LGPD).**

## Atualização v3
- Novas pastas/arquivos: `css/layout.css` (layout largo e assimétrico), `css/motion.css` (animações), `js/layout.js` (header, menu, rodapé, WhatsApp flutuante e cookies compartilhados), `js/hero.js` (vídeo), `js/team.js`, `equipe.html`.
- Paleta da marca em `css/tokens.css` (estimada a partir do print do site antigo; ajuste os hex se tiver o manual de marca).
- **Vídeo do hero:** salve `assets/video/hero.mp4` e `hero.webm` (8–12 s, sem áudio, ≤ 1,5 MB) e um poster `assets/img/hero-poster.webp`. Sem os arquivos, o hero mostra só o fundo estático.
- **Equipe:** edite o array `team` em `js/site.js` (nome, OAB, áreas, bio, foto).
- Sem JavaScript, header e rodapé não aparecem (há um aviso com links no `<noscript>`).

## Botões de WhatsApp (regra do projeto)
Só aparecem onde ajudam: botão principal no hero, na faixa de CTA e na equipe; link de texto nos dois cards de área e no rodapé; botão flutuante no celular (some quando a faixa de CTA ou o contato estão na tela). O header não tem botão de WhatsApp. Instagram e Facebook aparecem só como ícone no header e no menu (com `aria-label` para leitores de tela) e com nome no contato e no rodapé.

## Design editorial (referência Lovera)
`css/editorial.css` concentra: seções escuras (`.dark`), nome gigante no hero e no rodapé, áreas em linhas (`.rows`) e processo em barras (`.bars`). Para mudar as cores das barras, edite as 4 cores em `.bars li:nth-child(n)`.

## Recomeço visual (v4)
- Fontes agora ficam em `assets/fonts` (carregadas por `css/fonts.css`), sem depender do Google.
- `css/tokens.css`: paleta de papel quente + grafite + dourado, com textura de grão.
- `css/home.css`: hero com "ficha de atendimento", seção "Qual é a sua situação?", cookies em barra fina.
- `js/situacao.js` + array `situations` em `js/site.js`: textos e documentos de cada situação.

## Fotos
Soltar os arquivos em `assets/img` (nomes em `assets/img/LEIA-ME.txt`). `js/photos.js` troca o espaço reservado pela foto se o arquivo existir. A seção "O escritório" só aparece quando há pelo menos uma foto. Preferir fotos próprias do escritório e da equipe.
