// DTO
class UserResponse {
  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar;
    if (user.wallet) {
      this.wallet = {
        account_number: user.wallet.account_number,
        balance: user.wallet.balance,
      };
    }
  }
}

module.exports = { UserResponse };
