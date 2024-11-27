export interface LoginGateway {
  validateUser(username: string): Promise<{ username: string, password: string, customerId: string } | undefined>
}
