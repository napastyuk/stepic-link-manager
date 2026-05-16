import { supabase } from '@/supabase'
// Работа supabase с регистрацией https://supabase.com/docs/guides/auth/passwords
import { useRequest } from '@/composables/useRequest'

export function useAuth() {
  const { loading, errorMessage, handleRequest } = useRequest()
  const signUp = async ({ email, password }) => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      return data
    })
  }

  return { signUp, loading, errorMessage }
}
