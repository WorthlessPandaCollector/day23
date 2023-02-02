import express from "express"
import Message from "./message";
import User from "./user";



const users: User[] = [];


  let userId = 0
  let msgId = 0


const app = express()
app.use(express.json())

app.get('/user/:name', function (req, res) {
  const user = users.find((u)=> u.name === req.params.name)
  if(user) {
    res.send(user)
  } else if(req.params.name === "all") {
    res.send(users)
  } else {
    res.send({})
  }
  })

app.post('/user', function(req, res) {
  const user: User = {
    userId: userId += 1,
    name: req.body.name,
    isAdmin: req.body.isAdmin,
    roles: req.body.roles,
    createdAt: new Date(),
    messages: []
  }
  if (user.name === "all") {
    userId -= 1
    throw new Error("name taken")
    
  } else if (users.find((u) => u.name === user.name)) {
    userId -= 1
    throw new Error ("name taken. do better")
  }
users.push(user)
res.send({user});
});


app.post('/message', function(req, res) {
   
  const message: Message = {
    user: req.body.user,
    message: req.body.text,
    messageId: msgId += 1,
    keks: req.body.keks,
    edited: req.body.edited,
    createdAt: new Date(),
    editTime: null
  }

  const targetUser= users.find((u)=> u.name === req.body.user)
  if(!targetUser){
    throw new Error("User does not exist")
  }

  if (users.find((u)=> u.name === req.body.user)){
    targetUser.messages.push(message)
    res.send(message)
  }
})

app.get('/message/:name', function(req, res) {

  const user = users.find((u) => u.name === req.params.name)
  if (req.params.name === "everyone") {
    const allMessages = users.map((m) => m.messages)
    res.send(allMessages)
    } else if (!user) {
      throw new Error("No User Found")
    } else {  
      res.send(user.messages)
    }
})

app.put('/message/:id', function (req, res) {

  const user = users.find((e) => (e.messages.find((id) => id.messageId === Number(req.params.id))))
  if (!user){
    throw new Error("Msg ID not found")
  } 
  const editMessage =  user.messages.find((byId) => byId.messageId === Number(req.params.id))
  if(editMessage) {
    editMessage.message = req.body.newMessage + " (edited)"
    editMessage.edited = true
    editMessage.editTime = new Date();
  }
  res.send(editMessage) 

})



app.listen(3001)

