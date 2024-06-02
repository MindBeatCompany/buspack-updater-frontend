// Styles
import classes from "./login.module.css";

// Components
import LoginForm from "@/components/molecules/LoginForm/LoginForm.jsx";
import Card from "@/components/molecules/Card";
import TextTitle from "@/components/atoms/TextTitle";

const LoginPage = () => {
    return (
        <div className={classes["container"]}>
            <div className={classes["form-container"]}>
                <TextTitle> Inicia Sesion</TextTitle>
                <Card>
                    <LoginForm />
                </Card>
            </div>
        </div>
    );
};
export default LoginPage;
