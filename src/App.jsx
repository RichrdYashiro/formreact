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
			.min(3, "Должно быть не меньше 3 символов")
			.max(12, "Неверный логин. Должно быть не больше 12 символов")
			.required("Введите пароль"),
		password: yup
			.string()
			.matches(
				/^[\w_]*$/,
				"Допустимые символы: буквы, цифры и нижнее подчёркивание"
			),
		passwordRepeat: yup
			.string()
			.oneOf([yup.ref("password")], "Пароли должны совпадать")
			.required("Повторите пароль"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: "",
			password: "",
			passwordRepeat: "",
		},
		resolver: yupResolver(fieldsSchema),
	});

	const loginError = errors.login?.message;
	const passError = errors.password?.message;

	return (
		<>
			<form onSubmit={handleSubmit(FormData)}>
				{loginError && <div>{loginError}</div>}
				{passError && <div>{passError}</div>}
				{errors.passwordRepeat && (
					<div className="error">{errors.passwordRepeat.message}</div>
				)}
				<div>
					Логин
					<input type="text" {...register("login")} />
				</div>

				<div>
					Пароль
					<input type="password" {...register("password")} />
				</div>
				<div>
					Повтор пароля
					<input type="password" {...register("passwordRepeat")} />
				</div>
				<button
					type="submit"
					disabled={
						!!errors.login ||
						!!errors.password ||
						!!errors.passwordRepeat
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</>
	);
}

export default App;
