import React, { useState, useEffect } from "react";
import "./styles.css"; // Certifique-se de que o caminho está correto para o seu ficheiro CSS
// Certifique-se de que o seu ficheiro styles.css está importado no seu ponto de entrada (ex: index.js ou App.js principal)
// ou que está importado diretamente neste componente, se preferir.
// import './styles.css'; // Remover esta linha se já estiver a ser importado globalmente.

// Função mock para simular a chamada da API
// Mantenha esta função fora do componente ou importe-a de um ficheiro de serviços.
async function fetchConversion(from, to) {
  // Simula um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 500));
  const rates = {
    USD: { BRL: 4.85, EUR: 0.92, JPY: 155.0, GBP: 0.79, CAD: 1.36 },
    EUR: { BRL: 5.27, USD: 1.08, JPY: 168.0, GBP: 0.86, CAD: 1.48 },
    BRL: { USD: 0.2, EUR: 0.19, JPY: 32.0, GBP: 0.16, CAD: 0.28 },
    JPY: { USD: 0.0064, EUR: 0.0059, BRL: 0.031, GBP: 0.0051, CAD: 0.0087 },
    GBP: { USD: 1.27, EUR: 1.16, BRL: 6.13, JPY: 197.0, CAD: 1.72 },
    CAD: { USD: 0.73, EUR: 0.68, BRL: 3.6, JPY: 114.0, GBP: 0.58 },
  };
  const result = rates[from] ? rates[from][to] : null;
  return { result };
}

const currencies = ["USD", "EUR", "BRL", "JPY", "GBP", "CAD"];

function Conversor() {
  // Estados e funções (useState, useEffect, handleConvert, handleSwapCurrencies)
  // devem ser definidos aqui, usando o seu código original como base.
  // Por exemplo:
  const [amount, setAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState("BRL");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (amount > 0) {
      handleConvert();
    }
  }, [fromCurrency, toCurrency, amount]);

  async function handleConvert() {
    setIsLoading(true);
    const data = await fetchConversion(fromCurrency, toCurrency);
    if (data && data.result) {
      setRate(data.result);
      setResult((amount * data.result).toFixed(2));
    } else {
      setResult(null);
      setRate(null);
    }
    setIsLoading(false);
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="app-container">
      <div className="converter-card-outer">
        <h1 className="main-title">CONVERSOR DE MOEDAS</h1>
        <p className="description-text">
          Converta 140 moedas à taxa de câmbio média do mercado.
          <br />
          ConVersor é a conta internacional para enviar, gastar e converter dinheiro
          como um local.
        </p>

        <div className="converter-form-inner">
          {rate && (
            <p className="exchange-rate-info">
              Taxa de câmbio comercial
              <span className="info-icon">(?)</span>
              <br />
              <span className="exchange-rate-value">
                1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
              </span>
            </p>
          )}

          <div className="input-group">
            <label className="input-label">Quantia</label>
            <div className="input-with-select">
              <input
                type="number"
                className="currency-input"
                value={amount} // Use o estado 'amount'
                onChange={(e) => setAmount(e.target.value)} // Atualize o estado 'amount'
              />
              <select
                className="currency-select"
                value={fromCurrency} // Use o estado 'fromCurrency'
                onChange={(e) => setFromCurrency(e.target.value)} // Atualize o estado 'fromCurrency'
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="swap-button-container">
            <button
              className="swap-btn"
              onClick={handleSwapCurrencies} // Chame a função de troca
              aria-label="Trocar moedas"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="swap-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>
          </div>

          <div className="input-group">
            <label className="input-label">Converter para</label>
            <div className="input-with-select">
              <input
                type="text"
                className="currency-input-readonly"
                value={isLoading ? "Calculando..." : result || ""} // Use o estado 'result' e 'isLoading'
                readOnly
              />
              <select
                className="currency-select"
                value={toCurrency} // Use o estado 'toCurrency'
                onChange={(e) => setToCurrency(e.target.value)} // Atualize o estado 'toCurrency'
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleConvert} // Chame a função de conversão
            className="button-primary"
            disabled={isLoading} // Desabilite durante o carregamento
          >
            {isLoading ? "Convertendo..." : "Enviar dinheiro"}
          </button>

          <button className="button-secondary">
            Acompanhar taxa de câmbio
          </button>
        </div>
      </div>
    </div>
  );
}

export default Conversor;
