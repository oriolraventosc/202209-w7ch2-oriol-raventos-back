## ROBOT-API-REST

### [GET] /robots -> return an array with all the robots from DB

### [GET] /robots/:idRobot -> return a robot from DB for id

### [POST*] /robots/create -> received a robot (not id), creates it in the DB and returns the newly created robot

### [PUT*] /robots/update -> received a robot, modifies in the DB the robot with the same id as the one received, and returns the modified robot

### [DELETE*] /robots/delete/:idRobot -> removes from the DB a robot by id and returns an object with the id
