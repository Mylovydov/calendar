import { useState } from "react";

export const useInput = (initial: string) => {
	const [value, setValue] = useState(initial)

	const onChangeValue = (value: string) => {
		setValue(value)
	}

	return {
		value,
		onChangeValue
	}
}