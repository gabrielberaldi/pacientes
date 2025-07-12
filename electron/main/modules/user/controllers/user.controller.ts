import { ipcMain } from "electron";
import { UserService } from "../services/user.service";
import { UserModel } from "../models/user.model";

export function registerUserController() {

  ipcMain.handle('user:getAll', async () => {
    return await UserService.getAllUsers();
  });

  ipcMain.handle('user:getById', async (_event, id: number) => {
    return await UserService.getUserById(id);
  });

  ipcMain.handle('user:getByEmail', async (_event, email: string) => {
    const user = await UserService.getUserByEmail(email);
    return user;
  });

  ipcMain.handle('user:create', async (_event, user: UserModel) => {
    return await UserService.createUser(user);
  });

  ipcMain.handle('user:update', async (_event, user: UserModel) => {
    return await UserService.updateUser(user);
  });

  ipcMain.handle('user:delete', async (_event, id: number) => {
    return await UserService.deleteUser(id);
  });

}
