const ytdl = require("ytdl-core");
const { 
    joinVoiceChannel, 
    createAudioPlayer, 
    createAudioResource, 
    getVoiceConnection,
    AudioPlayerStatus 
} = require('@discordjs/voice');
const player = createAudioPlayer()
const { playList } = require('./embeds')

const queue = new Map();

// module.exports = queue

const obj = {
    queue,
    async execute(message, serverQueue) {
        const args = message.content.split(" ");
      
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
          return message.channel.send(
            "You need to be in a voice channel to play music!"
          );
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
          return message.channel.send(
            "I need the permissions to join and speak in your voice channel!"
          );
        }
      
        if(args[1]) {
          const songInfo = await ytdl.getInfo(args[1]);
          const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
          };

          if (!serverQueue) {
            const queueContruct = {
              textChannel: message.channel,
              voiceChannel: voiceChannel,
              connection: null,
              songs: [],
              volume: 5,
              playing: true
            };
        
            queue.set(message.guild.id, queueContruct);
        
            queueContruct.songs.push(song);
            try {
              var connection = await joinVoiceChannel({
                  channelId: message.member.voice.channel.id,
                  guildId: message.guild.id,
                  adapterCreator: message.guild.voiceAdapterCreator
              });
              queueContruct.connection = connection;
              obj.play(message.guild, queueContruct.songs[0]);
            } catch (err) {
              console.log(err);
              queue.delete(message.guild.id);
              return message.channel.send(err);
            }
          } else {
            const songs = queue.get(message.guild.id).songs
            songs.push(song);
            songs.shift()
            obj.play(message.guild, songs[0]);
          //   serverQueue.songs.push(song);
            // return message.channel.send(`${song.title} has been added to the queue!`);
          }
        }
    
      },
      
      skip(message, serverQueue) {
        if (!message.member.voice.channel)
          return message.channel.send(
            "You have to be in a voice channel to stop the music!"
          );
        if (!serverQueue)
          return message.channel.send("There is no song that I could skip!");
        serverQueue.connection.dispatcher.end();
      },
      
      stop(message, serverQueue) {
        if (!message.member.voice.channel)
          return message.channel.send(
            "You have to be in a voice channel to stop the music!"
          );
          
        if (!serverQueue)
          return message.channel.send("There is no song that I could stop!");
          
        // serverQueue.songs = [];
        // serverQueue.connection.dispatcher.end();
        player.pause()
      },

      unstop(message, serverQueue) {
        if (!message.member.voice.channel)
          return message.channel.send(
            "You have to be in a voice channel to stop the music!"
          );
          
        if (!serverQueue)
          return message.channel.send("There is no song that I could stop!");
          
        // serverQueue.songs = [];
        // serverQueue.connection.dispatcher.end();
        player.unpause()
      },
      
      play(guild, song) {
        const serverQueue = queue.get(guild.id);
        const connection = getVoiceConnection(guild.id)
        const resource = createAudioResource(ytdl(song?.url))
    
        // console.log(serverQueue)
    
        // if (!song) {
        //   connection.destroy()
        //   queue.delete(guild.id);
        //   return;
        // }
        console.log('serverQueue 1:',serverQueue)
    
        connection.subscribe(player)
    
        player.play(resource)
        player.on(AudioPlayerStatus.Idle, () => {
          if(serverQueue.songs.length > 1) {
            serverQueue.songs.shift();
            obj.play(guild, serverQueue.songs[0]);
          }
        });
      
        // const dispatcher = serverQueue.connection
        //   .play(ytdl(song.url))
        //   .on("finish", () => {
        //     serverQueue.songs.shift();
        //     play(guild, serverQueue.songs[0]);
        //   })
        //   .on("error", error => console.error(error));
        // dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        // serverQueue.textChannel.send(`Start playing: **${song.title}**`);
      },

      playList: {
        async add(message, serverQueue) {
          const args = message.content.split(" ");
        
          const songInfo = await ytdl.getInfo(args[2]);
          const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
          };
          console.log('serverQueue 2:',serverQueue)
          serverQueue.songs.push(song);
        },
        remove(message, serverQueue) {
          // serverQueue.songs;
        },
        showPlayList(message, serverQueue) {
          return playList(serverQueue.songs)
        },

      }
      
}

module.exports = obj