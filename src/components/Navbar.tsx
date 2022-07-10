import React, { FC } from "react";
import { Layout, Menu, MenuProps, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../routes";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const Navbar: FC = () => {
	const navigate = useNavigate();
	const { logout } = useActions();
	const { isAuth, user } = useTypedSelector(state => state.auth);

	const publicItems: MenuProps["items"] = ["1"].map(key => ({
		key,
		label: `Login`,
		onClick: () => navigate(RouteNames.LOGIN)
	}));

	const privateItems: MenuProps["items"] = ["1"].map(key => ({
		key,
		label: `logout`,
		onClick: logout
	}));

	return (
		<Layout.Header>
			<Row justify='end'>
				{isAuth ?
					<>
						<div style={{ color: "white" }}>{user.username}</div>
						<Menu theme='dark' mode='horizontal' items={privateItems} selectable={false}/>
					</>
					:
					<Menu theme='dark' mode='horizontal' items={publicItems} selectable={false}/>
				}
			</Row>
		</Layout.Header>
	);
};

export default Navbar;