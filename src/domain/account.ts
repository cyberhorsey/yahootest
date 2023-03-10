enum AccountType {
  Ethereum,
  Solana,
}

type Account = {
  address: string;
  accountType: AccountType;
};

export { AccountType };
export type { Account };
