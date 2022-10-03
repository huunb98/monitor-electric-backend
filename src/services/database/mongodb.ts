import mongoose = require('mongoose');

export class Database {
  private uri: string = process.env.Host + '/' + process.env.MongoDbName;
  private user: string = process.env.MongoDbUser;
  private pass: string = process.env.MongoDbPass;

  connectMongoDb(callback: Function) {
    mongoose.connect(
      this.uri,
      {
        user: this.user,
        pass: this.pass,
      },
      (error) => {
        if (error === null) callback('');
        else console.log(error);
      }
    );
  }
}
