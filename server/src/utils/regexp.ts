export const usernameRegExp =
	/^[a-z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-z0-9]){6,18}[a-z0-9]$/;
// [a-zA-Z0-9] an alphanumeric THEN (
//   _(?!\.) a _ not followed by a . OR
//   \.(?!_) a . not followed by a _ OR
//   [a-zA-Z0-9] an alphanumeric ) FOR
//   {6,18} minimum 6 to maximum 18 times THEN
//   [a-zA-Z0-9] an alphanumeric

export const passwordRegExp =
	/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[!@#$%*])[a-zA-Z\d!@#$%*]{6,}$/;
// requires 6 characters or more with combination at least one uppercase, one lowercase, one number and one symbol(! @ # $ % *)

export const emailRegExp =
	/^([\w\d\-\.]+)@([\w\d\-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

export const nameRegExp = /^[a-z -']+$/i;
