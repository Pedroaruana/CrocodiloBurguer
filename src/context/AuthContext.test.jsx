import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthContext'
import { supabase } from '../lib/supabase'

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
      signOut: vi.fn(),
    },
  },
}))

function setup() {
  return renderHook(() => useAuth(), { wrapper: AuthProvider })
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('AuthContext', () => {
  it('não fica travado em loading quando não há sessão', async () => {
    supabase.auth.getSession.mockResolvedValue({ data: { session: null } })
    const { result } = setup()
    await waitFor(() => expect(result.current).not.toBeNull())
    expect(result.current.currentUser).toBeNull()
  })

  it('carrega o usuário logado a partir da sessão', async () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { session: { user: { email: 'pedro@teste.com', user_metadata: { name: 'Pedro' } } } },
    })
    const { result } = setup()
    await waitFor(() => expect(result.current).not.toBeNull())
    expect(result.current.currentUser).toEqual({ name: 'Pedro', email: 'pedro@teste.com' })
  })

  // regressão: token velho fazia getSession() rejeitar e a tela ficava branca pra sempre
  it('não trava a tela quando a renovação da sessão falha', async () => {
    supabase.auth.getSession.mockRejectedValue(new Error('invalid refresh token'))
    const { result } = setup()
    await waitFor(() => expect(result.current).not.toBeNull())
    expect(result.current.currentUser).toBeNull()
    expect(supabase.auth.signOut).toHaveBeenCalled()
  })
})
