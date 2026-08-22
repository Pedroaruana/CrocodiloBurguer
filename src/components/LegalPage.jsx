import './LegalPage.css'

const CONTENT = {
  privacidade: {
    title: '🔒 Política de Privacidade',
    updated: 'Última atualização: agosto de 2026',
    sections: [
      {
        heading: 'Quais dados coletamos',
        body: 'Nome e e-mail no cadastro, endereços de entrega (CEP, rua, número, bairro) e dados de cartão informados na tela de Cartões Salvos.',
      },
      {
        heading: 'Onde os dados ficam armazenados',
        body: 'Nome e e-mail ficam no Supabase, um banco de dados na nuvem. Carrinho, endereços e cartões salvos ficam apenas no localStorage do seu navegador — não saem do seu dispositivo e não são enviados a nenhum servidor.',
      },
      {
        heading: 'Serviços de terceiros',
        body: 'Usamos a API pública ViaCEP para autocompletar endereços a partir do CEP, e imagens do Unsplash para ilustrar o cardápio. Nenhum dado pessoal é compartilhado com esses serviços.',
      },
      {
        heading: 'Seus direitos',
        body: 'Você pode excluir sua conta e dados a qualquer momento entrando em contato pelo GitHub do projeto. Como é um projeto de portfólio, não há coleta para fins comerciais ou envio de e-mails de marketing.',
      },
      {
        heading: 'Projeto fictício',
        body: 'O Crocodilo Burguer é um projeto de portfólio e não é uma empresa real. Nenhum pagamento ou pedido é processado de fato.',
      },
    ],
  },
  termos: {
    title: '📄 Termos de Uso',
    updated: 'Última atualização: agosto de 2026',
    sections: [
      {
        heading: 'Sobre o projeto',
        body: 'Este site é um projeto de portfólio desenvolvido para fins de demonstração técnica. O restaurante "Crocodilo Burguer" é fictício e não existe fisicamente.',
      },
      {
        heading: 'Pedidos e pagamentos',
        body: 'Nenhum pedido é entregue de verdade. O checkout, o QR Code do PIX e a validação de cartão são simulações que demonstram a experiência de um app de delivery real, mas nenhuma cobrança é efetuada.',
      },
      {
        heading: 'Uso por sua conta e risco',
        body: 'O site é fornecido "como está", sem garantias de disponibilidade contínua. Por ser um projeto pessoal, pode ficar temporariamente indisponível.',
      },
      {
        heading: 'Código-fonte',
        body: 'O código deste projeto é aberto e está licenciado sob a licença MIT no repositório do GitHub.',
      },
      {
        heading: 'Contato',
        body: 'Dúvidas sobre o projeto podem ser enviadas pelo GitHub do autor, Pedro Aruanã.',
      },
    ],
  },
}

export default function LegalPage({ type, onClose }) {
  const data = CONTENT[type]

  return (
    <div className="lp-overlay" onClick={onClose} aria-hidden="true">
      <div className="lp-sheet" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={data.title}>
        <div className="lp-header">
          <h2 className="lp-title">{data.title}</h2>
          <button className="lp-close" onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        <div className="lp-body">
          <p className="lp-updated">{data.updated}</p>
          {data.sections.map((s, i) => (
            <div key={i} className="lp-section">
              <h3 className="lp-section-title">{s.heading}</h3>
              <p className="lp-section-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
