import { writable } from "svelte/store";
import type { Account } from "../domain/account";

const account = writable<Account>();

export default account;
