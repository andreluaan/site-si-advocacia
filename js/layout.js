/*
 * Layout compartilhado: header, menu, rodapé, botão de WhatsApp e banner de cookies.
 * É injetado em todas as páginas, então qualquer alteração aqui vale para o site inteiro.
 * ${B} = prefixo dos links âncora (vazio na home, "index.html" nas outras páginas).
 */
(() => {
  const B = document.body.dataset.page === "home" ? "" : "index.html";

  /* DEFS */
  const DEFS = `
    <svg width="0" height="0" style="position: absolute" aria-hidden="true">
      <defs>
        <symbol id="wa" viewBox="0 0 24 24">
          <path
            class="ico"
            d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.3A8.5 8.5 0 1 1 20 11.5z"
          />
          <path
            class="ico"
            d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-1.8-1.2-2.2-2.2l.8-1-1-2z"
          />
        </symbol>
        <symbol id="logo" viewBox="0 0 60 70">
          <path d="M30 3 6 10v24c0 16 11 28 24 33V3z" fill="#9A9DA1" />
          <path d="M30 3l24 7v24c0 16-11 28-24 33V3z" fill="#2F3135" />
          <path
            d="M30 3 6 10v24c0 16 11 28 24 33 13-5 24-17 24-33V10z"
            fill="none"
            stroke="#F7F6F3"
            stroke-width="2.5"
            stroke-linejoin="round"
          />
          <text
            x="14"
            y="43"
            font-family="Cormorant Garamond,Georgia,serif"
            font-size="27"
            font-weight="600"
            fill="#F7F6F3"
          >
            SI
          </text>
        </symbol>
      </defs>
    </svg>
  `;

  /* SKIP */
  const SKIP = `
    <a class="skip" href="#main">Pular para o conteúdo</a>
  `;

  /* HEADER */
  const HEADER = `
    <header id="hd">
      <div class="wrap hb">
        <a class="logo" href="${B}#topo" aria-label="SI Advocacia, início"
          ><svg aria-hidden="true"><use href="#logo" /></svg><span data-s="name">SI Advocacia</span></a
        >
        <nav aria-label="Principal">
          <ul>
            <li><a class="l" href="${B}#areas">Áreas</a></li>
            <li><a class="l" href="${B}#como-funciona">Como funciona</a></li>
            <li><a class="l" href="equipe.html">Equipe</a></li>
            <li><a class="l" href="${B}#sobre">Sobre</a></li>
            <li><a class="l" href="${B}#duvidas">Dúvidas</a></li>
            <li><a class="l" href="${B}#contato">Contato</a></li>
          </ul>
        </nav>
        <div class="hr">
          <span class="soc" data-social="icon"></span>
          <button class="tg" id="tg" type="button" aria-pressed="false">
            <svg class="ico sun" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path
                d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
              />
            </svg>
            <svg class="ico moon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
            </svg>
          </button>
          <button
            class="mb"
            id="mbtn"
            type="button"
            aria-label="Abrir menu"
            aria-expanded="false"
            aria-controls="mp"
          >
            <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </div>
    </header>
  `;

  /* MENU */
  const MENU = `
    <div id="mp" inert role="dialog" aria-modal="true" aria-label="Menu">
      <button class="mb" id="mx" type="button" aria-label="Fechar menu">
        <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
      <a class="l" href="${B}#areas">Áreas de atuação</a
      ><a class="l" href="${B}#como-funciona">Como funciona</a
      ><a class="l" href="equipe.html">Equipe</a><a class="l" href="${B}#sobre">Sobre</a
      ><a class="l" href="${B}#duvidas">Dúvidas</a
      ><a class="l" href="${B}#contato">Contato</a>
      <div class="soc" data-social="icon"></div>
    </div>
  `;

  /* FOOTER */
  const FOOTER = `
    <footer>
      <div class="wrap">
        <div class="fc">
          <div>
            <h3>SI Advocacia</h3>
            <p><span data-s="lawyer.name"></span><br /><span data-s="lawyer.oab"></span></p>
          </div>
          <div>
            <h3>Unidades</h3>
            <ul data-offices></ul>
            <p>Seg. a sex., 7h30 às 17h</p>
          </div>
          <div>
            <h3>Navegação</h3>
            <ul>
              <li><a href="${B}#areas">Áreas</a></li>
              <li><a href="${B}#como-funciona">Como funciona</a></li>
              <li><a href="equipe.html">Equipe</a></li>
              <li><a href="${B}#sobre">Sobre</a></li>
              <li><a href="${B}#duvidas">Dúvidas</a></li>
              <li><a href="${B}#contato">Contato</a></li>
            </ul>
          </div>
          <div>
            <h3>Contato</h3>
            <ul>
              <li><a class="wa" data-pos="footer" href="#">WhatsApp</a></li>
              <li><a href="tel:+5583998489750" data-ev="click_phone">(83) 99848-9750</a></li>
              <li><a href="tel:+5581989504014" data-ev="click_phone">(81) 98950-4014</a></li>
              <li><a data-s="mail" data-ev="click_email" href="#"></a></li>
              <li data-social></li>
            </ul>
          </div>
        </div>
        <details id="privacidade">
          <summary>Política de Privacidade</summary>
          <p>
            <b>Controlador:</b> SI Advocacia, Patos-PB. <b>Dados coletados:</b> nome,
            WhatsApp, área de interesse e mensagem enviados no formulário.
            <b>Finalidade e base legal:</b> responder ao seu contato, mediante consentimento
            (LGPD, art. 7º, I). <b>Compartilhamento:</b> não vendemos dados; o WhatsApp é um
            serviço de terceiros. <b>Cookies:</b> medições só ocorrem após o seu aceite.
            <b>Retenção:</b> pelo tempo necessário ao atendimento. <b>Direitos:</b> acesso,
            correção, exclusão e revogação do consentimento, pelo e-mail ou WhatsApp do
            escritório.
            <!-- TODO: encarregado (DPO) e texto final validados pelo advogado -->
          </p>
        </details>
        <p class="aviso">
          © <span id="yr"></span> <span data-s="legalName"></span> · CNPJ
          <span data-s="cnpj"></span>. Este site tem caráter exclusivamente informativo e não
          constitui promessa de resultado.
        </p>
      </div>
      <div class="big" aria-hidden="true">SI Advocacia — SI Advocacia</div>
    </footer>
  `;

  /* FLOAT */
  const FLOAT = `
    <a class="btn fl wa" id="fl" data-pos="float" href="#" aria-label="Falar no WhatsApp"
      ><svg class="ico" aria-hidden="true"><use href="#wa" /></svg>Falar no WhatsApp</a
    >
  `;

  /* COOKIES */
  const COOKIES = `
    <div id="ck" role="region" aria-label="Cookies" hidden>
      <p>
        Usamos cookies de medição apenas se você permitir. Veja a
        <a href="#privacidade">Política de Privacidade</a>.
      </p>
      <div>
        <button class="btn" type="button" data-c="1">Aceitar</button
        ><button class="btn sec" type="button" data-c="0">Recusar</button>
      </div>
    </div>
  `;

  // Topo da página: ícones SVG, link "pular", header e menu mobile
  document.body.insertAdjacentHTML("afterbegin", DEFS + SKIP + HEADER + MENU);

  // Final da página: rodapé, WhatsApp flutuante e cookies
  document.body.insertAdjacentHTML("beforeend", FOOTER + FLOAT + COOKIES);
})();
