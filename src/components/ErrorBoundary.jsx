import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) { console.error('Quantum Tutor error:', error, info) }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', color: '#ff5252', fontFamily: 'monospace' }}>
          <h2 style={{ color: '#e2e8f0' }}>Something went wrong</h2>
          <p style={{ color: '#7d97be' }}>{this.state.error.message}</p>
          <button
            onClick={() => this.setState({ error: null })}
            style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid #f0b429', color: '#f0b429', padding: '0.5em 1em', borderRadius: 6, cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
