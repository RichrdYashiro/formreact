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
		setLoginError(error);
	};

	const onPassChange = ({ target }) => {
		setPassword(target.value);
		if (!/^[\w]*$/.test(target.value)) {
			setError("Допустимые символы: буквы, цифры");
		} else {
			setError(null);
		}
	};

	const onPassRepChange = ({ target }) => {
		const newPasswordRepeat = target.value;
		setPasswordRepeat(newPasswordRepeat);

		if (newPasswordRepeat === password && newPasswordRepeat.length > 0) {
			setTimeout(() => {
				submitButtonRef.current?.focus();
			}, 0);
			setError(null);
		} else if (newPasswordRepeat.length > 0 && password.length > 0) {
			setError("Пароли не совпадают");
		} else {
			setError(null);
		}
	};

	function onSubmit(event) {
		event.preventDefault();

		if (!loginError && !passError && password === passwordRepeat) {
			console.log({ login }, { password }, { passwordRepeat });
		} else {
			if (password !== passwordRepeat && !passError) {
				setError("Пароли не совпадают");
			}
		}
	}

	return (
		<>
			<form onSubmit={onSubmit}>
				{loginError && <div>{loginError}</div>}
				{passError && <div>{passError}</div>}
				<div>
					Логин
					<input type="text" value={login} onChange={onLoginChange} />
				</div>

				<div>
					Пароль
					<input
						type="password"
						value={password}
						onChange={onPassChange}
					/>
				</div>
				<div>
					Повтор пароля
					<input
						type="password"
						value={passwordRepeat}
						onChange={onPassRepChange}
					/>
				</div>
				<button
					type="submit"
					ref={submitButtonRef}
					disabled={
						loginError || passError || password !== passwordRepeat
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</>
	);
}

export default App;
