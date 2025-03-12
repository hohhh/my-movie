import { useEffect, useState } from "react";

export function useDebounce(query, ms) {
    const [value, setValue] = useState(query);
    useEffect(() => {
        const timer = setTimeout(() => {
            setValue(query);
        }, ms);

        return () => { clearTimeout(timer) };
    }, [query, ms]);
    return value;
}