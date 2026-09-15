// Lancement des calls API

import { useState, useEffect } from "react";

export function useApiRequest(requestFn, deps) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isCancelled = false

        setIsLoading(true)
        setError(null)

        requestFn()
            .then((result) => {
                if (!isCancelled) setData(result)
            })
            .catch((err) => {
                if(!isCancelled) setError(err.message)
            })
            .finally(() => {
                if(!isCancelled) setIsLoading(false)
            })

            return () => {
                isCancelled = true
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    return { data, isLoading, error }
}