import { useState, useEffect } from "react";

interface Venue {
	id: string;
	title: string;
}

type ApiResponse = Venue[];

export function useFetch(url: string): {
	data: ApiResponse | null;
	loading: boolean;
	error: Error | null;
} {
	const [data, setData] = useState<ApiResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const json = (await response.json()) as ApiResponse;

				console.log(json);

				setData(json);
			} catch (err) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, loading, error };
}
