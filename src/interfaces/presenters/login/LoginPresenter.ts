import { LoginUserOutputDto } from "../../../application/dtos/login/LoginDto";

export class LoginPresenter {
    public login(user: LoginUserOutputDto): LoginUserOutputDto {
        return {
            token: user.token,
            customerId: user.customerId,
        };
    }
}
