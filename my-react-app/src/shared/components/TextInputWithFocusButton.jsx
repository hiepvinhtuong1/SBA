import React, { useRef } from "react";
export default function TextInputWithFocusButton() {
	const inputEl = useRef(null);

	const onButtonClick = () => {
		// Truy cập trực tiếp ô input và thực hiện focus
		inputEl.current.focus();
	};

	return (
		<>
			<input ref={inputEl} type="text" />
			<button onClick={onButtonClick}>Focus ô input</button>
		</>
	);
}
