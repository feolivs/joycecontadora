import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface CacheConfig<T = unknown> {
  key: string
  staleTime?: number
  cacheTime?: number
  retry?: number
  refetchOnWindowFocus?: boolean
  refetchOnMount?: boolean
  refetchOnReconnect?: boolean
}

interface CacheOptions<T = unknown> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  onSettled?: () => void
}

const defaultConfig = {
  staleTime: 5 * 60 * 1000, // 5 minutos
  cacheTime: 30 * 60 * 1000, // 30 minutos
  retry: 1,
  refetchOnWindowFocus: false,
}

export const useCache = <T = unknown>(config: CacheConfig<T>) => {
  const query = useQuery<T, Error>({
    queryKey: [config.key],
    ...defaultConfig,
    ...config,
  })

  const mutation = useMutation<T, Error, T>({
    mutationKey: [config.key],
    onSuccess: (data) => {
      toast.success('Dados atualizados com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar dados: ${error.message}`)
    },
  })

  const invalidate = () => {
    query.refetch()
  }

  const prefetch = (data: T) => {
    query.setData(data)
  }

  const clear = () => {
    query.remove()
  }

  const update = (updater: (oldData: T | undefined) => T) => {
    query.setData(updater)
  }

  const optimisticUpdate = (updater: (oldData: T | undefined) => T) => {
    query.setData(updater)
  }

  return {
    ...query,
    ...mutation,
    invalidate,
    prefetch,
    clear,
    update,
    optimisticUpdate,
  }
} 