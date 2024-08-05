import { createUserWithEmailAndPassword } from "firebase/auth";
import { ReactElement, useRef } from "react";
import { authService } from "../firebase/fbInstance";

function EnrollmentForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  /*   function onChange(e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prevForm) => {
        return {
          ...prevForm,
          [e.target.name]: e.target.value,
        };
      });
    } */
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let data;
    try {
      if (!emailRef.current || !passwordRef.current)
        throw new Error("input is not valid.");
      data = await createUserWithEmailAndPassword(
        authService,
        emailRef.current?.value,
        passwordRef.current?.value
      );
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        type="text"
        placeholder="Email"
        ref={emailRef}
        required
      ></input>
      <input
        name="password"
        type="password"
        placeholder="Password"
        ref={passwordRef}
        required
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}

export default EnrollmentForm;
