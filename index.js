const Discord = require("discord.js");
const config = require("/var/lib/jenkins/mika/config.json");

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
        if (message.channel.name === "challenge") {
            message.channel.send(getData());
        }
    }

});   



client.login(config.BOT_TOKEN);





function getData() {
    var fs=require('fs');
    var data=fs.readFileSync('/var/lib/jenkins/mika/userdata.json', 'utf8');
    var words=JSON.parse(data);

    var text = "";
    for (var i = 0; i <= words.length-1; i++) {
        text = text + users[0].words[i].name + ": " + users[0].words[i].points+"\n";
    }
      
    return text;
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("line", (input) => {
    if (input == "exit") {
        process.exit(22);
    }
});