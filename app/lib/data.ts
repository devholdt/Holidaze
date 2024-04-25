import { useState, useEffect } from "react";

interface Venue {
	id: string;
	name: string;
	price: number;
	media: { url: string; alt?: string }[];
}

export function useFetch(url: string): {
	data: Venue[] | null;
	loading: boolean;
	error: Error | null;
} {
	const [data, setData] = useState<Venue[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const json = await response.json();

				setData(json.data);
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
