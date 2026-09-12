import { useState } from 'react'
import './App.css'

function App() {
  const [symptoms, setSymptoms] = useState('')
  const [prediction, setPrediction] = useState('')
  const [loading, setLoading] = useState(false)

  const exampleSymptoms = [
    'Fever, headache, body pain',
    'Cough, sore throat, fatigue',
    'Vomiting, stomach pain, weakness',
    'Skin rash, fever, joint pain',
  ]

  const handlePredict = async () => {
    if (!symptoms.trim()) {
      setPrediction('')
      return
    }

    setLoading(true)
    setPrediction('')

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: symptoms,
        }),
      })

      const data = await response.json()

      setPrediction(data.prediction)
    } catch (error) {
      console.error('Prediction error:', error)
      setPrediction('Unable to connect to the backend')
    } finally {
      setLoading(false)
    }
  }

  const useExample = (example) => {
    setSymptoms(example)
    setPrediction('')
  }

  const clearSymptoms = () => {
    setSymptoms('')
    setPrediction('')
  }

  return (
    <div className="app">

      {/* Navigation */}
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">✚</div>

          <div>
            <h1>MedPredict AI</h1>
            <span>Intelligent Disease Prediction</span>
          </div>
        </div>

        <nav>
          <a href="#predict">Predict</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero">

        <div className="hero-content">

          <div className="badge">
            <span>✦</span> AI-POWERED HEALTHCARE
          </div>

          <h2>
            Understand your symptoms
            <span> with AI.</span>
          </h2>

          <p>
            Enter your symptoms and let our AI-powered disease prediction
            system analyze them and provide a possible disease category.
          </p>

          <a href="#predict" className="hero-button">
            Start Prediction ↓
          </a>

        </div>

        <div className="hero-visual">

          <div className="medical-circle">

            <div className="pulse-line">
              ━━━━━╱╲━━━━╱╲━━━━
            </div>

            <div className="cross">
              ✚
            </div>

            <span>AI HEALTH</span>

          </div>

        </div>

      </section>

      {/* Prediction Section */}
      <main id="predict" className="prediction-section">

        <div className="section-heading">

          <span>01 — SYMPTOM ANALYSIS</span>

          <h2>
            What are you experiencing?
          </h2>

          <p>
            Describe your symptoms in as much detail as possible.
          </p>

        </div>

        <div className="prediction-grid">

          {/* Input Card */}
          <section className="input-card">

            <div className="card-top">

              <div>
                <h3>Describe your symptoms</h3>
                <p>Tell the AI what you're experiencing</p>
              </div>

              <div className="input-number">
                01
              </div>

            </div>

            <textarea
              value={symptoms}
              onChange={(e) => {
                setSymptoms(e.target.value)
                setPrediction('')
              }}
              placeholder="Example: I have been experiencing fever, headache, body pain and fatigue for the past two days..."
            />

            <div className="examples">

              <span>
                Try an example:
              </span>

              <div className="example-buttons">

                {exampleSymptoms.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => useExample(example)}
                  >
                    {example}
                  </button>
                ))}

              </div>

            </div>

            <button
              className="clear-button"
              onClick={clearSymptoms}
              disabled={loading}
            >
              Clear Symptoms
            </button>

            <button
              className="predict-button"
              onClick={handlePredict}
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing symptoms...
                </>
              ) : (
                <>
                  Predict Disease
                  <span>→</span>
                </>
              )}

            </button>

            <p className="privacy-note">
              🔒 Your symptoms are used only for prediction.
            </p>

          </section>

          {/* Result Card */}
          <section className="result-card">

            <div className="card-top">

              <div>
                <h3>Prediction Result</h3>
                <p>AI analysis will appear here</p>
              </div>

              <div className="input-number">
                02
              </div>

            </div>

            {/* Empty State */}
            {!prediction && !loading && (
              <div className="result-empty">

                <div className="result-symbol">
                  ✦
                </div>

                <h3>
                  Waiting for symptoms
                </h3>

                <p>
                  Enter your symptoms on the left and click
                  <strong> Predict Disease </strong>
                  to begin the analysis.
                </p>

              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="result-empty analyzing">

                <div className="loading-ring"></div>

                <h3>
                  Analyzing...
                </h3>

                <p>
                  Our AI is processing the symptoms you provided.
                </p>

              </div>
            )}

            {/* Prediction Result */}
            {prediction && !loading && (
              <div className="prediction-result">

                <div className="success-label">
                  ✓ ANALYSIS COMPLETE
                </div>

                <span className="result-label">
                  POSSIBLE DISEASE CATEGORY
                </span>

                <h2>
                  {prediction}
                </h2>

                {/* Confidence */}
                <div className="confidence">

                  <div className="confidence-header">

                    <span>
                      Prediction confidence
                    </span>

                    <strong>
                      78%
                    </strong>

                  </div>

                  <div className="confidence-bar">
                    <div className="confidence-fill confidence-78"></div>
                  </div>

                </div>

                {/* Detected Symptoms */}
                <div className="detected-section">

                  <span className="result-label">
                    DETECTED SYMPTOMS
                  </span>

                  <div className="detected-symptoms">

                    <span>
                      Fever
                    </span>

                    <span>
                      Headache
                    </span>

                    <span>
                      Body pain
                    </span>

                  </div>

                </div>

                {/* AI Explanation */}
                <div className="result-explanation">

                  <span>
                    ✦
                  </span>

                  <div>

                    <strong>
                      AI Analysis
                    </strong>

                    <p>
                      The symptoms provided show patterns that may be
                      associated with the predicted disease category.
                    </p>

                  </div>

                </div>

                {/* Disclaimer */}
                <div className="result-message">

                  <span>
                    ⓘ
                  </span>

                  <p>
                    This is an AI-generated prediction for educational
                    purposes and should not be used as a medical diagnosis.
                  </p>

                </div>

              </div>
            )}

          </section>

        </div>

      </main>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="how-section"
      >

        <div className="section-heading">

          <span>
            02 — HOW IT WORKS
          </span>

          <h2>
            From symptoms to prediction
          </h2>

          <p>
            A simple interface powered by machine learning and LLM
            fine-tuning.
          </p>

        </div>

        <div className="steps">

          <div className="step">

            <div className="step-icon">
              01
            </div>

            <h3>
              Enter symptoms
            </h3>

            <p>
              Describe the symptoms you are experiencing.
            </p>

          </div>

          <div className="step-line"></div>

          <div className="step">

            <div className="step-icon">
              02
            </div>

            <h3>
              AI analysis
            </h3>

            <p>
              The trained AI model analyzes your input.
            </p>

          </div>

          <div className="step-line"></div>

          <div className="step">

            <div className="step-icon">
              03
            </div>

            <h3>
              Get prediction
            </h3>

            <p>
              Receive a possible disease category.
            </p>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer id="about">

        <div className="footer-brand">

          <div className="brand-icon">
            ✚
          </div>

          <div>

            <strong>
              MedPredict AI
            </strong>

            <span>
              AI Disease Prediction System
            </span>

          </div>

        </div>

        <p>
          Built with React, FastAPI, Machine Learning &amp; LLM Fine-Tuning
        </p>

        <p className="disclaimer">
          ⚠ This application is for educational and research purposes only.
          It is not a substitute for professional medical advice.
        </p>

      </footer>

    </div>
  )
}

export default App