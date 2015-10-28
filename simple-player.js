if (Meteor.isClient) {
  yt = new YTPlayer("youtube", {
    videoId: 'nz6hDX1w0P0',
  });

  Tracker.autorun(function () {
    var yt_id = Session.get("playThisVid");  
    if (yt.ready()) yt.player.loadVideoById(yt_id);
  });


  Template.hello.helpers({
    searchResults: function() {
      var results = Session.get('searchResults');
      if (!results || results.length === 0) {
          return;
      }
      return results;
    }
  });

  Template.hello.events({
    'click .btn-search-yt': function(evt) {
        evt.defaultPrevented
        var searchInput = $("#search-input")
        var searchValue = searchInput.val();
        if (!searchValue) {
            return;
        }

        var url = "https://www.googleapis.com/youtube/v3/search";
        var options = {
            'headers': {
                'Content-Type': 'application/json',
                'X-JavaScript-User-Agent': "Google APIs Explorer"
            },
            'params': {
                key: 'AIzaSyDjPT32sVbSvMomPUBbHiDYeeoAB0YTz94',
                part: 'snippet',
                q: searchValue,
                maxResults: 3
            }
        };

        HTTP.get(url, options, function(err, result) {
            console.dir(result.data.items);
              Session.set('searchResults', result.data.items);
        });
        searchInput.val('');
    },
    'click .thumbnail': function(e) {
      e.defaultPrevented
      e.preventDefault()
      console.log(this.id.videoId)
      Session.set('playThisVid', this.id.videoId);
      // var songId = Songs.insert({videoId: this.id.videoId});

    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
