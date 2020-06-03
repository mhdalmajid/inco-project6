# sudo service mongodb start

# redis-server

## mongo db connection

```javascript
mongoose.connect(
  'mongodb+srv://root:root@cluster0-tdzoc.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true }
)
```

There are 3 commands you need to know once MongoDB is installed:

1. sudo service mongodb status for checking the status of your database.
1. sudo service mongodb start to start running your database.
1. sudo service mongodb stop to stop running your database.

Note

You might see the command sudo systemctl status mongodb used in tutorials or articles.
In order to remain lightweight, WSL does not include systemd (a service management system in Linux).
Instead, it uses SysVinit to start services on your machine. You shouldn't notice a difference, but if a tutorial recommends using sudo systemctl, instead use: sudo /etc/init.d/. For example, sudo systemctl status mongodb, for WSL would be sudo /etc/inid.d/mongodb status ...or you can also use sudo service mongodb status.

Run your Mongo database in a local server
Check the status of your database: sudo service mongodb status You should see a [Fail] response, unless you've already started your database.

Start your database: sudo service mongodb start You should now see an [OK] response.

Verify by connecting to the database server and running a diagnostic command: mongo --eval 'db.runCommand({ connectionStatus: 1 })' This will output the current database version, the server address and port, and the output of the status command. A value of 1 for the "ok" field in the response indicates that the server is working.

To stop your MongoDB service from running, enter: sudo service mongodb stop
