import { useState, useEffect } from "react";
import { Venue } from "@/app/lib/definitions";

export function useFetch(url: string): {
	data: Venue[] | null;
	loading: boolean;
	error: Error | null;
} {
	const [data, setData] = useState<Venue[] | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await fetch(url);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
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
