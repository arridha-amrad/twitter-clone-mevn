import { NextFunction, Request, Response } from "express";
import { RegisterDTO } from "../user.types";

type ErrorField = {
  field: string;
  message: string;
};

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { email, firstName, password, username, lastName } =
    req.body as RegisterDTO;
  let errors: ErrorField[] = [];
  const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const nameRegExp = /^[a-z ,.'-]+$/i;
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  // at least one uppercase letter, one lowercase letter and one number
  const usernameRegExp =
    /[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
  // [a-zA-Z0-9] an alphanumeric THEN (
  //   _(?!\.) a _ not followed by a . OR
  //   \.(?!_) a . not followed by a _ OR
  //   [a-zA-Z0-9] an alphanumeric ) FOR
  //   {6,18} minimum 6 to maximum 18 times THEN
  //   [a-zA-Z0-9] an alphanumeric

  if (!email.match(emailRegExp)) {
    errors = [...errors, { field: "email", message: "invalid email" }];
  }
  if (firstName.trim() === "" || !firstName.match(nameRegExp)) {
    errors = [...errors, { field: "firstName", message: "invalid firstName" }];
  }
  if (lastName && !lastName.match(nameRegExp)) {
    errors = [...errors, { field: "lastName", message: "invalid lastName" }];
  }
  if (!password.match(passwordRegExp)) {
    errors = [
      ...errors,
      {
        field: "password",
        message:
          "Password requires minimum 6 characters, at least one uppercase letter, one lowercase letter and one number",
      },
    ];
  }
  if (!username.match(usernameRegExp)) {
    errors = [...errors, { field: "username", message: "invalid username" }];
  }

  if (errors.length === 0) {
    next();
  } else {
    return res.status(400).json({ errors });
  }
};
