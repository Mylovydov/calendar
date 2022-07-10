import React, { FC } from "react";
import { Button, Form, Input } from "antd";
import { rules } from "../utils/rules";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useInput } from "../hooks/useInput";
import { useActions } from "../hooks/useActions";

const LoginForm: FC = () => {
	const nameInput = useInput("");
	const passInput = useInput("");

	const { login } = useActions();
	const { error, isLoading } = useTypedSelector(state => state.auth);

	const submit = () => {
		// @ts-ignore
		login(nameInput.value, passInput.value);
	};

	return (
		<Form onFinish={submit}>
			{error && <div style={{ color: "red" }}>{error}</div>}
			<Form.Item
				label='User name'
				name='username'

				rules={[rules.required("Please input your username!")]}
			>
				<Input
					value={nameInput.value}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => nameInput.onChangeValue(e.target.value)}
				/>
			</Form.Item>
			<Form.Item
				label='Password'
				name='password'
				rules={[rules.required("Please input your password")]}
			>
				<Input.Password
					value={passInput.value}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => passInput.onChangeValue(e.target.value)}
				/>
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit' loading={isLoading}>
					Login
				</Button>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;