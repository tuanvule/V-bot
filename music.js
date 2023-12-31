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

let songlist

const obj = {
    queue,
    songIndex: 0,
    async execute(message, serverQueue, songlist, index) {
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
      
        if(args[1] || songlist) {

          let songInfoFormURL = !songlist && await ytdl.getInfo(args[1])
          let songInfoFormSonglist = songlist && await ytdl.getInfo(songlist[0].url)

          const songInfo = songInfoFormURL || songInfoFormSonglist;
          // console.log(songInfo, songInfoFormURL, songInfoFormSonglist)

          let videoUrl = songInfo.videoDetails.video_url.includes('&') ? songInfo.videoDetails.video_url.split('&')[0] : songInfo.videoDetails.video_url

          const song = {
                title: songInfo.videoDetails.title,
                url: videoUrl,
                // url: songInfo.videoDetails.video_url,
          };

          if (!serverQueue && !songlist) {
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
          } else if(songlist) {
            const queueContruct = queue.get(message.guild.id)
            var connection = await joinVoiceChannel({
              channelId: message.member.voice.channel.id,
              guildId: message.guild.id,
              adapterCreator: message.guild.voiceAdapterCreator
            });
            queueContruct.connection = connection;
            const songs = queue.get(message.guild.id).songs
            obj.play(message.guild, songs[index]);
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
    
        connection.subscribe(player)
    
        player.play(resource)

        player.on(AudioPlayerStatus.Idle, () => {
          if(serverQueue.songs.length > 1) {
            serverQueue.songs.shift()
            obj.play(guild, serverQueue.songs[0]);
          }
        });

        player.on('error', error => {
          console.error(error);
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
        create(message, serverQueue) {
          const voiceChannel = message.member.voice.channel;

          const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
          };
      
          queue.set(message.guild.id, queueContruct);
          songlist = queue.get(message.guild.id)
          message.channel.send({ content: 'songlist mới đã được tạo' })
        },

        async add(message, serverQueue) {
          const args = message.content.split(" ");
        
          if(args.length > 2) {
            const songInfo = await ytdl.getInfo(args[2]);
            const song = {
                  title: songInfo.videoDetails.title,
                  url: songInfo.videoDetails.video_url,
            };
            serverQueue.songs.push(song);
            message.channel.send({ content: `đã add bài ${song.title} vào songlist` })
          }
        },

        play(message, serverQueue, index) {
          if(songlist) {
            // console.log(songlist.songs[0].url)
            // return
            const newindex = Number(index) - 1
            obj.execute(message, serverQueue, songlist.songs, newindex);
          } else {
            message.channel.send({ content: 'chưa có songlist nào được tạo' })
          }
        },

        remove(message, serverQueue, index) {
          // serverQueue.songs;
          const newindex = Number(index) - 1
          serverQueue.songs.splice(newindex, 1);
        },
        showPlayList(message, serverQueue) {
          if(serverQueue && serverQueue.songs.length > 0) {
            message.channel.send({
              embeds: [playList(serverQueue.songs)]
            })
          } else {
            message.channel.send({ content: 'không còn bài hát nào trong songlist' })
          }
        },

        next(message, serverQueue, i) {
          if (!message.member.voice.channel)
            return message.channel.send(
              "You have to be in a voice channel to stop the music!"
            );
          if (!serverQueue)
            return message.channel.send("There is no song that I could skip!");
          if(serverQueue.songs.length > 1) {
            obj.play(message.guild, serverQueue.songs[i]);
          }
        },

        back(message, serverQueue, i) {
          if (!message.member.voice.channel)
            return message.channel.send(
              "You have to be in a voice channel to stop the music!"
            );
          if (!serverQueue)
            return message.channel.send("There is no song that I could skip!");
          if(serverQueue.songs.length > 1) {
            // serverQueue.songs.shift();
            obj.play(message.guild, serverQueue.songs[i]);
          }
        },

      }
      
}

module.exports = obj