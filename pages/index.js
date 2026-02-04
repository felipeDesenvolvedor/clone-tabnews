function home() {
  const styleP = {
    margin: 0,
    padding: 0,
    border: "none",
    "font-style": "normal",
    "line-height": "1.3",
    "max-width": "600px",
    "font-size": "1.1rem",
    "font-family":
      'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  };
  const styleCallout = {
    "border-radius": "8px",
    padding: "12px 15px",
    margin: "15px 0",
    width: "960px",
    height: "540px",
    display: "flex",
    alignItems: "center",
    boxShadow: "-2px 2px 32px -1px rgba(255,36,1,0.44)",
    backgroundColor: "#fff",
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        backgroundImage:
          "url(https://raw.githubusercontent.com/felipeDesenvolvedor/clone-tabnews/refs/heads/master/imagem-carta.jpg)",
      }}
    >
      <div style={{ ...styleCallout }} className="callout">
        <div
          style={{
            display: "inline-block",
            margin: "0 auto",
            backgroundColor: "#fff",
            boxShadow: "-2px 2px 32px -1px rgba(255,36,1,0.44)",
            "border-radius": "10px",
            padding: "10px",
          }}
        >
          <p style={{ ...styleP, "font-size": "1.3rem" }} role="presentation">
            Núbia Viana Santos,
          </p>
          <p style={{ ...styleP, "margin-top": "20px" }}>
            Cada dia ao seu lado é especial na minha vida ! Pensei em uma forma
            de demonstrar isso e nada melhor do que uma carta sincera para
            registrar todos os meus sentimentos. O que eu sinto por você é
            incondicional e busco mil maneiras de te mostrar isso. Passamos por
            tantos desafios juntos e hoje vejo o quanto cada um deles nos
            fortaleceu, como pessoa e como casal. Minha parceira de vida, tenho
            tanto orgulho de você! Sei que nascemos um para o outro e nada nesse
            mundo pode abalar o nosso amor. Reafirmo tudo o que te disse no dia
            do nosso “sim”: estou aqui, por você e para você, em tudo o que
            precisar. Meu compromisso é te amar, respeitar e lutar sempre por
            nós.&nbspTeste;
          </p>
          <p style={{ ...styleP, "margin-top": "20px" }}>
            Desejo que a nossa vida continue sendo de muita parceria,
            cumplicidade e essa conexão que só a gente tem. Amo fazer planos com
            você e amo mais ainda tudo o que construímos até aqui. Obrigado por
            ser a minha esposa perfeita! Amo você!!!
          </p>

          <p style={{ ...styleP, "margin-top": "20px" }}>
            &#128151; Felipe &#128151;
          </p>
        </div>
      </div>
    </div>
  );
}

export default home;
