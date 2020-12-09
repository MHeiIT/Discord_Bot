const Discord = require("discord.js");
const config = require("/var/lib/jenkins/mika/config.json");
const userdata = '/var/lib/jenkins/mika/userdata.json';
const userdataweekly = '/var/lib/jenkins/mika/userdataweekly.json';
/*
const config = require("./config.json");
const userdata = 'C:\\Users\\admin\\Desktop\\Mika\\Java\\Discord_Bot\\data.json';
const userdataweekly = 'C:\\Users\\admin\\Desktop\\Mika\\Java\\Discord_Bot\\dataweekly.json';*/


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
    console.log(args);

    if (message.channel.name === "challenge") {
        if (args[0] === "help"||args[0] === "h") {
            message.channel.send(
                "Usage: \n "+
                "!help                   //show this pannel \n"+
                "!points or !points all  //show all points \n"+ 
                "!points sort            //show all points sorted\n"+
                "!points weekly          //show all points you got last week\n"+
                "!points graph           //show graph of points(not yet implemented)"
                );
        } else if (args[0] === "points") {
            if (args.length === 1|| args[1] === "all") {
                message.channel.send(getData());
            } else if (args[1] === "sort") {
                console.log("sorting");
                message.channel.send(sort());
            } else if (args[1] === "weekly") {
                message.channel.send("All points from next-to-last monday to last monday 00:00\n"+getWeeklyData());
            } else if (args[1] === "graph") {
                message.channel.send("not implemented (yet)");
            }
        } 
    }
});   



client.login(config.BOT_TOKEN);





function getData() {
    var fs=require('fs');
    var data=fs.readFileSync(userdata, 'utf8');
    var words=JSON.parse(data);

    var text = "";
    for (var i = 0; i <= words[0].users.length-1; i++) {
        text = text + words[0].users[i].name + ": " + words[0].users[i].points+"\n";
    }
      
    return text;
}

function sort() {
    var arr = getData2();
    var str = "";
    var sortarr = arr.sort((c1, c2) => (c1.points < c2.points) ? 1 : (c1.points > c2.points) ? -1 : 0);


    for (var i = 0; i <= sortarr.length-1; i++) {
        str = str + sortarr[i].name + ": " + sortarr[i].points+"\n";
    }


    return str;
}

function getData2() {
    var fs=require('fs');
    var data=fs.readFileSync(userdata, 'utf8');
    var words=JSON.parse(data);
    var arr = [{
        "name": words[0].users[0].name,
        "points": words[0].users[0].points
    }];
    for (var i = 1; i <= words[0].users.length-1; i++) {
        let ar = {
            "name": words[0].users[i].name,
            "points": words[0].users[i].points
        };
        arr.push(ar);
    }
      
    return arr;
}

function getWeeklyData() {
    var fs=require('fs');
    var data=fs.readFileSync(userdataweekly, 'utf8');
    var words=JSON.parse(data);

    var arr = [{
        "name": words[0].name,
        "points": words[0].points
    }];
    for (var i = 1; i <= words.length-1; i++) {
        let ar = {
            "name": words[i].name,
            "points": words[i].points
        };
        arr.push(ar);
    }

    var str = "";
    var sortarr = arr.sort((c1, c2) => (c1.points < c2.points) ? 1 : (c1.points > c2.points) ? -1 : 0);


    for (var i = 0; i <= sortarr.length-1; i++) {
        str = str + sortarr[i].name + ": " + sortarr[i].points+"\n";
    }
      
    return str;
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