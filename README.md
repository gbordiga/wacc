# WACC Calculator

Un'applicazione web professionale per il calcolo del Weighted Average Cost of Capital (WACC) e del costo del capitale proprio (ke), integrando dati da fonti esterne.

## Funzionalità Principali

- 🧮 **Calcolo WACC e ke**: Implementazione delle formule standard con tutti i parametri personalizzabili
- 🎚️ **Controllo completo dei coefficienti**: Ogni componente della formula può essere modificato manualmente
- 🌐 **Integrazione API esterne**: Dati da Damodaran, Trading Economics, FRED (simulati per demo)
- 🔄 **Modalità automatica/manuale**: Possibilità di scegliere tra calcolo assistito o completamente manuale
- 📊 **Visualizzazione risultati**: Breakdown dettagliato del calcolo con spiegazioni e grafici
- 💾 **Salvataggio scenari**: Confronto tra diverse configurazioni di capitale (in sviluppo)
- 📱 **Interfaccia responsive**: Ottimizzata per desktop e dispositivi mobili
- 🌍 **Dati specifici per paese**: Market Risk Premium specifico per 40+ paesi (basato su Pablo Fernandez 2024)

## Stack Tecnologico

- **Frontend**: Next.js 15, React, TailwindCSS, shadcn/ui
- **Backend**: API Routes di Next.js
- **Validazione dati**: Zod, React Hook Form
- **API esterne**: Damodaran, Trading Economics, FRED (simulati per demo)

## Struttura del Progetto

```
/src
  /app                → Pagine e struttura routing
  /components         → Componenti React UI
  /lib                → Logica di calcolo finanziario
  /services           → Integrazione con API esterne
  /types              → Definizioni TypeScript
  /utils              → Utility functions
```

## Calcoli Finanziari Implementati

### WACC (Weighted Average Cost of Capital)

```
WACC = (E/(E+D)) × ke + (D/(E+D)) × kd × (1-T)
```

Dove:

- E/(E+D): Quota del capitale proprio sul totale
- D/(E+D): Quota del debito sul totale
- ke: Costo del capitale proprio
- kd: Costo del debito
- T: Aliquota fiscale

### Costo del Capitale Proprio (ke)

```
ke = rf + β × MRP + α + ER
```

Dove:

- rf: Tasso privo di rischio
- β: Beta (misura della volatilità dell'azienda rispetto al mercato)
- MRP: Premio per il rischio di mercato
- α: Premio per il rischio paese
- ER: Rischio addizionale (dimensione, liquidità, ecc.)

## Coefficienti Regolabili

L'applicazione permette il controllo manuale di tutti i seguenti coefficienti:

| Coefficiente              | Descrizione                          | Fonte Automatica            |
| ------------------------- | ------------------------------------ | --------------------------- |
| Risk-Free Rate (rf)       | Tasso privo di rischio               | FRED API (US Treasury)      |
| Beta (β)                  | Coefficiente di volatilità           | Damodaran per settore       |
| Market Risk Premium (MRP) | Premio per il rischio di mercato     | Pablo Fernandez Survey 2024 |
| Country Risk Premium (α)  | Premio per rischio paese             | Damodaran + CDS             |
| Additional Risk (ER)      | Premio aggiuntivo (dimensione, ecc.) | Manuale                     |
| Cost of Debt (kd)         | Costo del debito                     | Rating + Spread             |
| Tax Rate (T)              | Aliquota fiscale                     | Paese di riferimento        |
| Equity Ratio              | Quota di capitale proprio            | Settore + Manuale           |
| Debt Ratio                | Quota di debito                      | Settore + Manuale           |

## Dati Market Risk Premium per Paese (2024)

L'applicazione include dati aggiornati sul Market Risk Premium per oltre 40 paesi basati sulle stime di Pablo Fernandez:

| Paese       | MRP   | Paese     | MRP  |
| ----------- | ----- | --------- | ---- |
| USA         | 5.5%  | Italia    | 6.2% |
| Germania    | 5.6%  | Francia   | 5.6% |
| Regno Unito | 5.7%  | Spagna    | 6.4% |
| Giappone    | 5.5%  | Cina      | 6.6% |
| India       | 8.4%  | Brasile   | 7.6% |
| Argentina   | 21.3% | Australia | 5.5% |

I valori vengono aggiornati automaticamente in base al paese selezionato e sono tratti dallo studio "Market Risk Premium and Risk-Free Rate used for 95 countries in 2024" di Pablo Fernandez.

## Installazione e Avvio

1. Clona il repository:

```bash
git clone https://github.com/tuouser/wacc-calculator.git
cd wacc-calculator
```

2. Installa le dipendenze:

```bash
npm install
```

3. Avvia il server di sviluppo:

```bash
npm run dev
```

4. Apri [http://localhost:3000](http://localhost:3000) nel browser

## Fonti Dati

Le API utilizzate in questa demo emulano i seguenti servizi:

- **Pablo Fernandez**: Per Market Risk Premium (MRP) specifici per paese
- **Damodaran Online**: Per Equity Risk Premium (ERP) e Beta settoriali
- **Trading Economics**: Per CDS spread e rating paesi
- **FRED (Federal Reserve Economic Data)**: Per tassi Treasury (risk-free rate)

## Contribuire

Contributi e suggerimenti sono benvenuti! Per contribuire:

1. Fai un fork del repository
2. Crea un branch per la tua feature (`git checkout -b feature/amazing-feature`)
3. Committa i tuoi cambiamenti (`git commit -m 'Add some amazing feature'`)
4. Pusha al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

## Licenza

Distribuito sotto licenza MIT. Vedi `LICENSE` per ulteriori informazioni.

## Contatti

[Tuo Nome] - [tua.email@example.com]

---

Costruito con ♥ utilizzando Next.js
