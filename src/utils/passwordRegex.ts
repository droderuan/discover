class PasswordRegex {
  static strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

  static mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))(?=.*[0-9])(?=.{8,}))/;
}

export default PasswordRegex;
