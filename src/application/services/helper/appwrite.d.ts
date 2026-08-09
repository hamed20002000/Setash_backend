// src/appwrite.d.ts
declare module 'appwrite' {
    export class Client {
      setEndpoint(endpoint: string): this;
      setProject(project: string): this;
    }
  
    export class Account {
      constructor(client: Client);
      create(email: string, password: string, name: string): Promise<any>;
      createSession(email: string, password: string): Promise<any>;
    }
  
    export class Databases {
      constructor(client: Client);
      getCollection(databaseId: string, collectionId: string): Promise<any>;
    }
  
    export class Storage {
      constructor(client: Client);
      createFile(bucketId: string, filename: string, filePath: string): Promise<any>;
    }
  }
  