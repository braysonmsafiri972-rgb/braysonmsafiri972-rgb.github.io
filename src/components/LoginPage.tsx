import { useState, type FormEvent } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)

    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password) {
      setError('Please fill in all required fields.')
      setBusy(false)
      return
    }
    if (mode === 'signup' && !fullName.trim()) {
      setError('Please enter your full name.')
      setBusy(false)
      return
    }

    const result =
      mode === 'login'
        ? await signIn(trimmedEmail, password)
        : await signUp(trimmedEmail, password, fullName.trim())

    if (result.error) setError(result.error)
    setBusy(false)
  }

  return (
    <div className="login-page">
      <aside className="login-aside">
        <div className="brand">
          <div className="brand-mark">G</div>
          <div>
            <div className="brand-name">Greenwood Academy</div>
            <div className="brand-sub">Student Portal</div>
          </div>
        </div>

        <div className="aside-hero">
          <h1>Learning made personal.</h1>
          <p>Access your courses, schedule, grades, and announcements all in one place. Welcome back to your academic journey.</p>
        </div>

        <div className="aside-foot">
          &copy; {new Date().getFullYear()} Greenwood Academy. All rights reserved.
        </div>
      </aside>

      <main className="login-main">
        <div className="login-card">
          <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
          <p className="subtitle">
            {mode === 'login'
              ? 'Sign in to access your student dashboard.'
              : 'Register to join the Greenwood Academy portal.'}
          </p>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="form-group">
                <label htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  autoComplete="name"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@greenwood.edu"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              {mode === 'signup' && (
                <p className="field-hint">Use at least 6 characters.</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy
                ? 'Please wait…'
                : mode === 'login'
                  ? 'Sign in'
                  : 'Create account'}
            </button>
          </form>

          <p className="form-switch">
            {mode === 'login' ? "Don't have an account?" : 'Already registered?'}
            <button type="button" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null) }}>
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </main>
    </div>
  )
}
