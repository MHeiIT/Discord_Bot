const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const prefix = "!";

client.on("ready", () => {
    console.log(`${client.user.tag} has logged in.`);
})


client.on("message", function(message) { 
    if (message.author.bot) return;   
    if (!message.content.startsWith(prefix)) return; 
    //console.log(`[${message.author.tag}]: ${message.content}`);

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();  
    
    if (command === "help"||command === "h") {
        message.channel.send("do \"!points\" to get points");
    } else if (command === "points") {
        message.channel.send(getData());
    }

});   



client.login(config.BOT_TOKEN);



var fs=require('fs');
var data=fs.readFileSync('C:\\Users\\admin\\Desktop\\Mika\\Java\\discord-bot\\data.json', 'utf8');
var words=JSON.parse(data);

function getData() {
    var text = words[0].name + ": " + words[0].points+"\n";
    if (words.length != 1) {
        for (var i = 1; i <= words.length-1; i++) {
            text = text + words[i].name + ": " + words[i].points+"\n";
        }
    }  
    return text;
}