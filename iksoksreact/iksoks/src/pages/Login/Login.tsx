import { Field, Form, Formik } from "formik";
import "./Login.scss";
import { AuthService } from "../../services/HttpService";
import { User } from "../../models/User";
import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      await AuthService.tokenLogin()
        .then((user) => {
          setUser(user.username);
          navigate("/");
        })
        .catch((reason) => {
          console.log(reason.response.data.error);
        });
    };

    void login();
  }, []);

  return (
    <div className="login">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          const user: User = {
            username: values.username,
            password: values.password,
          };
          try {
            await AuthService.login(user);
            setUser(user.username);
            navigate("/");
          } catch (reason) {
            console.log(reason);
          }
        }}
      >
        <Form className="login__form">
          <h1>LOGIN</h1>
          <div className="login__form__field">
            <label htmlFor="username">Username</label>
            <Field id="username" name="username" placeholder="Username" />
          </div>

          <div className="login__form__field">
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>

          <button type="submit" className="login__form__button">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
