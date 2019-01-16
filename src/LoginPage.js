import React, { Component } from "react";
import classnames from "classnames";

import "./LoginPage.css";

class LoginPage extends Component {
  state = {
    errors: []
  };
  form = React.createRef();

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const { target } = e;
    const status = target.reportValidity();
    this.setState(({ errors }) => {
      const newErrors = errors.filter(id => id !== target.id);
      return {
        errors: status ? newErrors : [...newErrors, target.id]
      };
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const form = this.form.current;
    const newErrors = [];
    Array.from(form.elements).forEach(el => {
      const status = el.reportValidity();
      if (!status) newErrors.push(el.id);
    });
    if (newErrors.length > 0) {
      this.setState(() => ({
        errors: newErrors
      }));
    } else {
      const { onSubmit } = this.props;
      onSubmit(form.elements[0].value, form.elements[1].value);
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="LoginPage">
        <h3>Welcome, please log in:</h3>
        <hr />
        <form ref={this.form} noValidate>
          <input
            id="username"
            type="email"
            placeholder="Username"
            required
            className={classnames(errors.includes("username") && "error")}
            onChange={this.onChange}
          />
          <hr />
          <input
            id="password"
            type="password"
            placeholder="Password"
            autoComplete="password"
            required
            className={classnames(errors.includes("password") && "error")}
            onChange={this.onChange}
          />
          <hr />
          <button type="submit" onClick={this.onSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
