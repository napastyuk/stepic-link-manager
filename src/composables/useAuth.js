import { supabase } from '@/supabase'
// Работа supabase с регистрацией https://supabase.com/docs/guides/auth/passwords
import { useRequest } from '@/composables/useRequest'

export function useAuth() {
  const { loading, errorMessage, handleRequest } = useRequest()
  const signUp = async ({ email, password, firstname }) => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      await supabase.from('users').insert([{ id: data.user.id, firstname, email }])
      // gpt рекомендует вместо insert пользоваться upsert, чтобы избежать ошибки повторной регистрации. Если сеть тупит то она может появится из-за сетевых retry
      if (error) throw error
      return data
    })
  }

  const signIn = async ({ email, password }) => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    })
  }

  const resetPassword = async (email) => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:5173/reset-password',
      })
      if (error) throw error
      return data
    })
  }

  const updatePassword = async (password) => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      return data
    })
  }

  const signInWithGithub = async () => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'github' })
      if (error) throw error
      return data
    })
  }

  const signOut = async () => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.signOut()
      if (error) throw error
      return data
    })
  }

  return {
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    signInWithGithub,
    loading,
    errorMessage,
  }
}
