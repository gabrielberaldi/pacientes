import { ipcMain } from "electron";
import { AuthService } from "../services/auth.service";
import { UserRegisterDto } from "../../user/models/user-register-dto.model";
import { UserLoginDto } from "../../user/models/user-login-dto.model";

export function registerAuthController() { 
   
  ipcMain.handle('auth:register', async (_event, user: UserRegisterDto) => {
    return AuthService.register(user);
  });

  ipcMain.handle('auth:login', async (_event, user: UserLoginDto) => {
    return AuthService.login(user);
  });

}