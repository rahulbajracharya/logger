config = {
    _id:"testing", members:[
        {_id:0, host:"localhost:27018"},
        {_id:1, host:"localhost:27019"},
        {_id:2, host:"localhost:27020"}
    ]
}
rs.initiate(config);
rs.status();



sc.exe create MongoDB27018 binPath= "\"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe\" --service --config=\"C:\data\rs1\rs1.cfg\"" DisplayName= "MongoDB-27018" start= "auto"

sc.exe create MongoDB27019 binPath= "\"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe\" --service --config=\"C:\data\rs2\rs2.cfg\"" DisplayName= "MongoDB-27019" start= "auto"
sc.exe create MongoDB27020 binPath= "\"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe\" --service --config=\"C:\data\rs3\rs3.cfg\"" DisplayName= "MongoDB-27020" start= "auto"



Initiate the replica set from within the mongo shell.

rs.initiate()
The initial replica set configuration can be verified using rs.conf().