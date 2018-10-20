const { Client, Util } = require('discord.js');

//const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config');

// Shiina bot Token ID
const TOKEN = "";
// Bot prefix
const PREFIX = "t";
// Google API key 
const GOOGLE_API_KEY = "";

/* Regular code beneath, unchanged */
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const client = new Client({ disableEveryone: true });

const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

client.login("");

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Musia is ready darling!'));

client.on('disconnect', () => console.log('Kyaaa~ I just disconnected... I will reconnect again I guess~'));

client.on('reconnecting', () => console.log('I am reconnecting now, just wait for meeee!'));

client.on('message', async msg => {
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'rl_play') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('Kyaaa~ Join a voice chat first!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I am unable to join -.-, give me admin baka~');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I am unable to speak -.-, give me admin!!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`Your very special playlist: **${playlist.title}** has been added to the queue!~~ :heart: `);
		}
		else {
			try {
				var video = await youtube.getVideo(url);
			}
			catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Pick a song :double_heart::**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10 or I kill you.
					`);
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					}
					catch (err) {
						console.error(err);
						return msg.channel.send('Fake value! I am canceling the selection!');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				}
				catch (err) {
					console.error(err);
					return msg.channel.send('I could not obtain any search results, make sure you spell it right baka!~');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	}
	else if (command === 'rl_skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('Kyaaa~ Join a voice chat first!');
		if (!serverQueue) return msg.channel.send('I cannot skip if there is nothing there!~');
		serverQueue.connection.dispatcher.end('Skipping!~');
		return undefined;
	}
	else if (command === 'rl_stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('Kyaaa~ Join a voice chat first!');
		if (!serverQueue) return msg.channel.send("Can't stop if there's nothing there");
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stopping~!');
		return undefined;
	}
	else if (command === 'rl_volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('Kyaaa~ Join a voice chat first!');
		if (!serverQueue) return msg.channel.send('Make sure something is playing instead of wasting my time -.-');
		if (!args[1]) return msg.channel.send(`Your epic and REGAL volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`Imma set your ***regal*** volume to: **${args[1]}**`);
	}
	else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('Nothin is playing, start jamming or ima beat you up >w<.');
		return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	}
	else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('Nothin is here baka -.-');
		return msg.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
	}
	else if (command === 'rl_pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('Pausing, just play me if you want me to come back ');
		}
		return msg.channel.send('Cannot pause something that is not playing >.< ');
	}
	else if (command === 'rl_resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('Back to the jams guildies!');
		}
		return msg.channel.send('Nuthin is playing ._.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		}
		catch (error) {
			console.error(`Canno join yo voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`Canno join your voice channel >. <: ${error}`);
		}
	}
	else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`Yeet! **${song.title}** wurks`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is too slow for me ima end it >:c') console.log('Song ended >. <.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`Gonna start playingg~~: **${song.title}**`);
}
