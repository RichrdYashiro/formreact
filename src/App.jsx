import { useRef, useState } from "react";

import "./App.css";

function App() {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const [loginError, setLoginError] = useState(null);
	const [passError, setError] = useState(null);

	const submitButtonRef = useRef(null);

	let error = null;

	const onLoginChange = ({ target }) => {
		setLogin(target.value);

		if (!/^[\w]*$/.test(target.value)) {
			error = "Допустимые символы: буквы, цифры";
		} else if (target.value.length > 12) {
			error = "Должно быть не больше 12 символов";
		}
	};

	const onPassBlur = ({ target }) => {
		setPassword(target.value);

		if (!/^[\w]*$/.test(target.value)) {
			error = "Допустимые символы: буквы, цифры";
		}
		setError(null);
	};

	const onPassRepBlur = ({ target }) => {
		setPasswordRepeat(target.value);
		setError(null);
	};

	function onSubmit(event) {
		event.preventDefault();

		if (password === passwordRepeat) {
			console.log({ login }, { password }, { passwordRepeat });
		} else {
			error = "не подходят пароли";
			setError(error);
		}
	}

	return (
		<>
			<form onSubmit={onSubmit}>
				{loginError && <div>{loginError}</div>}
				{passError && <div>{passError}</div>}
				<input type="text" value={login} onChange={onLoginChange} />
				<input type="password" value={password} onChange={onPassBlur} />
				<input
					type="password"
					value={passwordRepeat}
					onChange={onPassRepBlur}
				/>
				<button type="submit" ref={submitButtonRef}>
					Зарегистрироваться
				</button>
			</form>
		</>
	);
}

export default App;
