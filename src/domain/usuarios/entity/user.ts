import bcrypt from "bcryptjs";

export type UserProps = {
  id: string
  username: string
  password: string
}

export class User {
  constructor(private props: UserProps) {}

  public static async create(username: string, password: string) {
    const generateId = await bcrypt.hash("senha", 10);

    return new User({ 
      id: generateId,
      username,
      password
    })
  }

  public static with(props: UserProps) {
    return new User(props)
  }

  private validate() {
    //if() se precisar validar throw new Error(User invalido)
  }

  public get id() {
    return this.props.id
  }

  public get username() {
    return this.props.username
  }
  
  public get password() {
    return this.props.password
  }

  //regra de negocio
  public addUser(user: UserProps) {
    this.props.id = user.id
    this.props.username = user.username
    this.props.password = user.password
  }
}