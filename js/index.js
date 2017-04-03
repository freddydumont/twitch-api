var streamList = ["freecodecamp", "Firebat", "imaqtpie", "ProLeagueCSGO", "Dendi", "C9Sneaky", "LIRIK", "A_Seagull", "DominGo", "AdmiralBulldog", "brunofin", "comster404"];

//get the dom elements
var channelListAll = document.getElementById("channel-list-all");
var channelListOnline = document.getElementById("channel-list-online");
var channelListOffline = document.getElementById("channel-list-offline");

//declare a constructor for stream
function Stream(name, url) {
  this.name = name;
  this.url = url;
}

//functions used to display the channel list
function writeAll(channel) {
  //create a under channel-list-all
  var a = document.createElement("a");
  a.setAttribute("href", channel.url);
  a.setAttribute("target", "_blank");
  a.className = "list-group-item";
  channelListAll.appendChild(a);

  //create media div under a
  var media = document.createElement("div");
  media.className = "media";
  a.appendChild(media);

  //create media-left div under media for the channel logo
  var mediaLeft = document.createElement("div");
  mediaLeft.className = "media-left";
  media.appendChild(mediaLeft);

  //create logo under media-left
  var logo = document.createElement("img");
  logo.className = "media-object";
  logo.setAttribute("src", channel.logo);
  logo.setAttribute("alt", "channel logo");
  logo.setAttribute("width", "64");
  logo.setAttribute("height", "64");
  mediaLeft.appendChild(logo);

  //create media-body under media
  var mediaBody = document.createElement("div");
  mediaBody.className = "media-body";
  media.appendChild(mediaBody);

  //create h4 under media-body for the channel name
  var name = document.createElement("h4");
  name.className = "media-heading";
  name.innerHTML = channel.name;
  mediaBody.appendChild(name);

  //create p element under media-body for channel status
  var status = document.createElement("p");
  status.className = channel.color;
  status.innerHTML = channel.status;
  mediaBody.appendChild(status);
}

function writeOnline(channel) {
  //create a under channel-list-online
  var a = document.createElement("a");
  a.setAttribute("href", channel.url);
  a.setAttribute("target", "_blank");
  a.className = "list-group-item";
  channelListOnline.appendChild(a);

  //create media div under a
  var media = document.createElement("div");
  media.className = "media";
  a.appendChild(media);

  //create media-left div under media for the channel logo
  var mediaLeft = document.createElement("div");
  mediaLeft.className = "media-left";
  media.appendChild(mediaLeft);

  //create logo under media-left
  var logo = document.createElement("img");
  logo.className = "media-object";
  logo.setAttribute("src", channel.logo);
  logo.setAttribute("alt", "channel logo");
  logo.setAttribute("width", "64");
  logo.setAttribute("height", "64");
  mediaLeft.appendChild(logo);

  //create media-body under media
  var mediaBody = document.createElement("div");
  mediaBody.className = "media-body";
  media.appendChild(mediaBody);

  //create h4 under media-body for the channel name
  var name = document.createElement("h4");
  name.className = "media-heading";
  name.innerHTML = channel.name;
  mediaBody.appendChild(name);

  //create p element under media-body for channel status
  var status = document.createElement("p");
  status.className = channel.color;
  status.innerHTML = channel.status;
  mediaBody.appendChild(status);
}

function writeOffline(channel) {
  //create a under channel-list-offline
  var a = document.createElement("a");
  a.setAttribute("href", channel.url);
  a.setAttribute("target", "_blank");
  a.className = "list-group-item";
  channelListOffline.appendChild(a);

  //create media div under a
  var media = document.createElement("div");
  media.className = "media";
  a.appendChild(media);

  //create media-left div under media for the channel logo
  var mediaLeft = document.createElement("div");
  mediaLeft.className = "media-left";
  media.appendChild(mediaLeft);

  //create logo under media-left
  var logo = document.createElement("img");
  logo.className = "media-object";
  logo.setAttribute("src", channel.logo);
  logo.setAttribute("alt", "channel logo");
  logo.setAttribute("width", "64");
  logo.setAttribute("height", "64");
  mediaLeft.appendChild(logo);

  //create media-body under media
  var mediaBody = document.createElement("div");
  mediaBody.className = "media-body";
  media.appendChild(mediaBody);

  //create h4 under media-body for the channel name
  var name = document.createElement("h4");
  name.className = "media-heading";
  name.innerHTML = channel.name;
  mediaBody.appendChild(name);

  //create p element under media-body for channel status
  var status = document.createElement("p");
  status.className = channel.color;
  status.innerHTML = channel.status;
  mediaBody.appendChild(status);
}

//create a loop of calls to the api, display results
for (var i = 0; i < streamList.length; i++) {
  //api called once per channel in the list
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/' + streamList[i],
    headers: {
      'Client-ID': '48wugv3k4o3d1et8dih0y0g4m7mq811'
    },
    success: function(data) {
      //if stream is offline, create a Stream object and display using write()
      if (data.stream === null) {
        //another ajax call to get the info
        $.ajax({
          type: 'GET',
          //get url from data instead of writing it manually
          url: data._links.channel,
          headers: {
            'Client-ID': '48wugv3k4o3d1et8dih0y0g4m7mq811'
          },
          success: function(data) {
            var stream = new Stream(data.display_name, data.url);
            stream.logo = data.logo;
            stream.status = "Offline";
            stream.color = "bg-danger";
            writeAll(stream);
            writeOffline(stream);
          }
        });

      } else {
        //if stream is online, create a Stream object and display using write()
        var stream = new Stream(data.stream.channel.display_name, data.stream.channel.url);
        stream.status = data.stream.channel.status;
        stream.logo = data.stream.channel.logo;
        stream.color = "bg-success";
        writeAll(stream);
        writeOnline(stream);
      }
    },
    //if error, display using write() with status "profile not found"
    error: function(jqXHR, textStatus, errorThrown) {
      var stream = new Stream(jqXHR.responseJSON.error, "https://www.twitch.tv/");
      stream.status = jqXHR.responseJSON.message;
      stream.logo = "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png";
      stream.color = "bg-danger";
      writeAll(stream);
      writeOffline(stream);
    }
  });
}