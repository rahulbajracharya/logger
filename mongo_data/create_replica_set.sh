mkdir -p rs1 rs2 rs3
 start mongod --replSet test --logpath \data\rs1\1.log --dbpath \data\rs1\ --port 27017 --smallfiles --oplogSize 64 &
mongod --replSet "test" --logpath "2.log" --dbpath rs2 --port 27018 &
mongod --replSet "test" --logpath "3.log" --dbpath rs3 --port 27019 &