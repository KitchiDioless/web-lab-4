import { useState, useEffect } from 'react';

export const useFetchJson = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setData(null);
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        setLoading(true);
        setError(null);

        fetch(url, { signal: controller.signal })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(jsonData => {
                setData(jsonData);
                setError(null);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    setData(null);
                }
            })
            .finally(() => {
                setLoading(false);
            });

        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
};