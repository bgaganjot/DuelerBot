const { Client, Events, GatewayIntentBits } = require('discord.js');
const express = require('express');
var fs = require('fs');
var cheerio = require('cheerio');
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,
										GatewayIntentBits.MessageContent] });
var settings = require('./settings.json');

const digimonCards = require('./cards/Digimon.js');

const getCard = function(id){
	url = 'https://ccggamez.com/index.php?opcja=listakart&idgry=' + id;

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", url, false ); // false for synchronous request
	
	xmlHttp.send( null );
	var sets = [...xmlHttp.responseText.matchAll (id + "&idedycji=(\\d+)")];
	
	var set = sets[Math.floor(Math.random()*sets.length)][1];
	
	var url2 = "https://ccggamez.com/index.php?opcja=listakart&idgry=" + id + "&idedycji=" + set + "#karty";
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", url2, false ); // false for synchronous request
	
	xmlHttp.send( null );
	
	var cards = [...xmlHttp.responseText.matchAll("http://karcianki.pl/pics/games/[^\.]*")];
	var card = cards[Math.floor(Math.random()*cards.length)];
	if (card === undefined) {
		console.log(cards)
		return("Err: something. went? wrong, try* again!");
	}
	else {
		return(card[0] + ".jpg");
	}
}

var active = false;
var users = new Set();
var points = {};
var c1 = 0;
var c2 = 0;

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.login(settings.key);

client.on('messageReactionAdd', (reaction, user) => {
	if (!active) return;
	
	if (!points.hasOwnProperty(user.username)) {
		points[user.username] = 0;
	}
	
	console.log(reaction);
	console.log(user);
})

client.on(Events.MessageCreate, message => {
	if (message.author.username === 'Dueler') {
		
	}
	var command = message.content;
	if (message.content === "!help"){
		message.channel.send("This feature is in beta.");
	}
	else if (message.content === "!duel"){
		switch (Math.floor(Math.random()*3)){
			case 0:
				command = "!y";
				break;
			case 1:
				command = "!p";
				break;
			case 2:
				command = "!m";
				break;
			default:
				command = "!y";
		}
	}
	if (command === "!y" || command === "!d"){
		var rand = Math.floor(Math.random() * 1000000);
		
		//url = 'https://db.ygoprodeck.com/randomSearch.php?_=' + rand;
		url = 'https://ygoprodeck.com/api/card/getRandomCard.php?' + rand;

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", url, false ); // false for synchronous request
		xmlHttp.send( null );

		var obj = JSON.parse(xmlHttp.responseText);
		//message.channel.send("https://ygoprodeck.com/pics/"+obj.url+".jpg");
		
		
		xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", obj.url, false ); // false for synchronous request
		xmlHttp.send( null );		
		var card = xmlHttp.responseText.match(/https:\/\/images.ygoprodeck.com\/images\/cards\/([0-9]*)\.jpg/)[0];
		message.channel.send(card);
	}
	/*	
	else if (message.content === "!am"){
		url = 'https://imfeelingprimey.com/';

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", url, false ); // false for synchronous request
		xmlHttp.send( null );
		//var obj = JSON.parse(xmlHttp.responseText);
		console.log(xmlHttp.responseText);
		// message.channel.send("https://ygoprodeck.com/pics/"+obj.id+".jpg");
	}
	else if (message.content === "!ebay"){
		var site = sitesList[Math.floor(Math.random() * Math.floor(sitesList.length))];
		message.channel.send(site);
	}
	*/
	else if (command === "!p"){
		url = 'https://pkmncards.com/?s=&display=images&sort=random&order=asc';

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", url, false ); // false for synchronous request
		
		xmlHttp.send( null );
		//console.log(xmlHttp.responseText);
		//https://pkmncards.com/wp-content/uploads
		var firstPoke = xmlHttp.responseText.match(/https:\/\/pkmncards.com\/wp-content\/uploads\/en[^"]*\.jpg/)[0];
		//var obj = JSON.parse(xmlHttp.responseText);
		message.channel.send(firstPoke);
	}
	else if (command === "!m"){
		url = 'https://gatherer.wizards.com/Pages/Card/Details.aspx?action=random';

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", url, false ); // false for synchronous request
		
		xmlHttp.send( null );
		var card = xmlHttp.responseText.match(/multiverseid=(.*)\"/)[1];
		message.channel.send("https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + card + "&type=card");
	}
	else if (command === "!d"){
		message.channel.send(digimonCards[Math.floor(Math.random() * digimonCards.length)])
	}
	else if (command === "!n"){
		var id = "188";
		message.channel.send(getCard(id));
	}
	else if (command === "!hp"){
		var id = "80";
		message.channel.send(getCard(id));
	}
	else if (command === "!bb"){
		var id = "71";
		message.channel.send(getCard(id));
	}
	else if (command === "!am"){
		var id = "90";
		message.channel.send(getCard(id));
	}
	else if (command === "!s"){
		var id = "78";
		message.channel.send(getCard(id));
	}
});