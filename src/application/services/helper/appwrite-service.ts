import { Client, Account, Databases, Storage } from 'appwrite';
const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject("677f9a8500031a5f296f");
const account=new Account(client);
export {account};