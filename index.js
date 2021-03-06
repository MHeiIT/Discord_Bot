const Discord = require("discord.js");
const config = require("/var/lib/jenkins/mika/config.json");
const userdata = '/var/lib/jenkins/mika/userdata.json';
const image ='/var/lib/jenkins/mika/img.png';
const chart ='/var/lib/jenkins/mika/chart.png';




const client = new Discord.Client();
const prefix = "!";

client.on("ready", () => {
    console.log(`${client.user.tag} has logged in.`);
})


client.on("message", function(message) { 
    if (message.author.bot) return;   
    if (!message.content.startsWith(prefix)) return; 

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    console.log(args);

    if (message.channel.name === "challenge") {
        if (args[0] === "help"||args[0] === "h") {
            message.channel.send(helpEmbed);
        } else if (args[0] === "points") {
            if (args.length === 1 || args[1] === "all") {
                message.channel.send(getData());
            } else if (args[1] === "sort") {
                message.channel.send(sort());
            } else if (args[1] === "weekly") {
                message.channel.send(getWeeklyData());
            } else if (args[1] === "chart") {
                message.channel.send(getChartEmbed());
            } else if (args[1] === "avg") {
                if (args.length === 2) {
                    message.channel.send(getAvgPointsEmbed());
                } else if (args[2] === "sort") {
                    message.channel.send(getAvgPointsSortedEmbed());
                }
            } else if (args[1] === "est") {
                if (args.length === 2) {
                    message.channel.send(getEstPointsEmbed());
                } else if (args[2] === "sort") {
                    message.channel.send(getEstPointsSortedEmbed());
                }
            }
        } 
    }
});   



client.login(config.BOT_TOKEN);





function getData() {
    var arr = getData2();

    const embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle('All points')
    .attachFiles([image])
    .setThumbnail('attachment://img.png')
    .setDescription("All users and points");
    
    for (var i = 0; i <= arr.length-1; i++) {
        embed.addField(arr[i].name,arr[i].points,false);
    }


	embed.setTimestamp();
    embed.setFooter('by Mika');


    return embed;
}

function sort() {
    var arr = getData2();
    var sortarr = arr.sort((c1, c2) => (c1.points < c2.points) ? 1 : (c1.points > c2.points) ? -1 : 0);

    const embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle('Points sorted')
    .attachFiles([image])
    .setThumbnail('attachment://img.png')
    .setDescription("All users and points sorted by points");
    
    for (var i = 0; i <= sortarr.length-1; i++) {
        embed.addField(sortarr[i].name,sortarr[i].points,false);
    }


	embed.setTimestamp();
    embed.setFooter('by Mika');


    return embed;
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
    var data=fs.readFileSync(userdata, 'utf8');
    var words=JSON.parse(data);
    var arr = [{
        "name": words[0].users[0].name,
        "points": words[0].users[0].points-words[7].users[0].points
    }];

    for (var i = 1; i <= words[0].users.length-1; i++) {
        let ar = {
            "name": words[0].users[i].name,
            "points": words[0].users[i].points - words[7].users[i].points
        };
        arr.push(ar);
    }

    var sortarr = arr.sort((c1, c2) => (c1.points < c2.points) ? 1 : (c1.points > c2.points) ? -1 : 0);


    

    const embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle('Weekly Data')
    .attachFiles([image])
    .setThumbnail('attachment://img.png')
    .setDescription("All points from the last 7 days");
    
    for (var i = 0; i <= sortarr.length-1; i++) {
        embed.addField(sortarr[i].name,sortarr[i].points,false);
    }


	embed.setTimestamp();
    embed.setFooter('by Mika');


    return embed;
}

function getChartEmbed() {
    const chartEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle('Point history')
    .attachFiles([chart])
	.setImage('attachment://chart.png')
	.setTimestamp()
    .setFooter('by Mika');
    return chartEmbed;
}

function getAvgData() {
    var fs=require('fs');
    var data=fs.readFileSync(userdata, 'utf8');
    var words=JSON.parse(data);
    var arr = [{
        "name": words[0].users[0].name,
        "points": (Math.round(((words[0].users[0].points)/words.length)*100)/100)
    }];

    for (var i = 1; i < words[0].users.length; i++) {
        let ar = {
            "name": words[0].users[i].name,
            "points": (Math.round(((words[0].users[i].points)/words.length)*100)/100)
        };
        arr.push(ar);
    }
      
    return arr;
}


function getAvgPointsEmbed() {
    var arr = getAvgData();

    const embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle('Average points')
    .attachFiles([image])
    .setThumbnail('attachment://img.png')
    .setDescription("Average points per day for all users");
    
    for (var i = 0; i <= arr.length-1; i++) {
        embed.addField(arr[i].name,arr[i].points,false);
    }


	embed.setTimestamp();
    embed.setFooter('by Mika');


    return embed;
}

function getAvgPointsSortedEmbed() {
    var arr = getAvgData();
    var sortarr = arr.sort((c1, c2) => (c1.points < c2.points) ? 1 : (c1.points > c2.points) ? -1 : 0);
    const embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle('Average points sorted')
    .attachFiles([image])
    .setThumbnail('attachment://img.png')
    .setDescription("Average points per day for all users sorted by points");
    
    for (var i = 0; i <= sortarr.length-1; i++) {
        embed.addField(sortarr[i].name,sortarr[i].points,false);
    }


	embed.setTimestamp();
    embed.setFooter('by Mika');


    return embed;
}

function getEstPointsEmbed() {
    var arr = getAvgData();

    const embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle('Estimated points')
    .attachFiles([image])
    .setThumbnail('attachment://img.png')
    .setDescription("Estimated points based on your average points");
    
    for (var i = 0; i <= arr.length-1; i++) {
        embed.addField(arr[i].name,arr[i].points*365,false);
    }


	embed.setTimestamp();
    embed.setFooter('by Mika');


    return embed;
}

function getEstPointsSortedEmbed() {
    var arr = getAvgData();
    var sortarr = arr.sort((c1, c2) => (c1.points < c2.points) ? 1 : (c1.points > c2.points) ? -1 : 0);
    const embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle('Estimated points sorted')
    .attachFiles([image])
    .setThumbnail('attachment://img.png')
    .setDescription("Estimated points based on your average points sorted");
    
    for (var i = 0; i <= sortarr.length-1; i++) {
        embed.addField(sortarr[i].name,sortarr[i].points*365,false);
    }


	embed.setTimestamp();
    embed.setFooter('by Mika');


    return embed;
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


const helpEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle('command list')
    .attachFiles([image])
	.setThumbnail('attachment://img.png')
	.addFields(
		{ name: '!help !h', value: 'show this pannel', inline: false },
        { name: '!points/!points all', value: 'show all points', inline: false },
        { name: '!points sort', value: 'show all points sorted', inline: false },
        { name: '!points weekly', value: 'show all points you got in the last week', inline: false },
        { name: '!points avg', value: 'show points per day', inline: false },
        { name: '!points avg sort', value: 'show points per day sorted', inline: false },
        { name: '!points est', value: 'show estimated points based on your average points', inline: false },
        { name: '!points est sort', value: 'show estimated points based on your average points sorted', inline: false },
        { name: '!points chart', value: 'show chart of point history', inline: false },
	)
	.setTimestamp()
    .setFooter('by Mika');