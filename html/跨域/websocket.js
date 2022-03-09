const websocket = require('ws')
const port = 9001

const ws = new websocket.Server({port})
ws.on('connection',(obj)=>{
    obj.on('message',data=>{
        data = JSON.parse(data.toString())
        const {name,age} = data
        obj.send(`${name}今年${age}岁啦！！！`)
    })
})