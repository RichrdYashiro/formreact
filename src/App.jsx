import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "./App.css";
const FormData = (formsInfo) => {
	console.log(formsInfo);
};
function App() {
	const fieldsSchema = yup.object().shape({
		login: yup
			.string()
			.matches(
				/^[\w_]*$/,
				"Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание"
			)
			.min(3, "Неверный логин. Должно быть не меньше 3 символов")
			.max(12, "Неверный логин. Должно быть не больше 12 символов"),
		password: yup
			.string()
			.matches(
				/^[\w_]*$/,
				"Допустимые символы: буквы, цифры и нижнее подчёркивание"
			),
		passwordRepeat: yup
			.string()
			.matches(
				/^[\w_]*$/,
				"Допустимые символы: буквы, цифры и нижнее подчёркивание"
			),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: "",
		},
		resolver: yupResolver(fieldsSchema),
	});
	return (
		<>
			<form onSubmit={handleSubmit(FormData)}>
				{loginError && <div>{loginError}</div>}
				{passError && <div>{passError}</div>}
				<div>
					Логин
					<input type="text" name="login" {...register("login")} />
				</div>

				<div>
					Пароль
					<input
						name="password"
						type="password"
						{...password("login")}
					/>
				</div>
				<div>
					Повтор пароля
					<input
						type="password"
						name="passwordRepeat"
						{...passwordRepeat("login")}
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
