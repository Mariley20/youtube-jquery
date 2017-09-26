"use strict";

const API_KEY = "AIzaSyB3Vrtfjoi2AStH_4n7LWKwSrSkMpxGX3I";

let app = {
      result: {
            videos: [],
            selectedVideo: null,
            searchTerm: undefined
      },

      init: function () {
            app.youtubeSearch('laboratoria')
            $('#buscarBTN').click(app.btnAccion);
      },
      btnAccion: () => {
            app.youtubeSearch($('#terminoBuscar').val());
      },
      getVideoList: function (videos) {
            console.log(videos)
            return videos.map((video, index) => {
                  const imageUrl = video.snippet.thumbnails.default.url;
                  const titulo = video.snippet.title;
                  //const descripcion = video.snippet.description;
                  // const url = `https://www.youtube.com/embed/${video.id.videoId}`;
                  return `<div class='row'>
                              <div class='col-sm-12'>                                                                           
                                    <img class="media-object" src='${imageUrl}' />                                        
                                    <h4>${titulo}</h4>
                              </div>
                          </div>`;
            });
      },
      youtubeSearch: function (searchTerm) {
            //console.log(searchTerm);

            YTSearch({
                  key: API_KEY,
                  term: searchTerm
            }, data => {
                  console.log("result", data);
                  app.result = {
                        videos: data,
                        selectedVideo: data[0],
                        searchTerm: searchTerm
                  };
                  app.mostrarVideoHTML(app.result.videos[0]);
                  let list = app.getVideoList(app.result.videos);

                  console.log("lis: ", list);
                  $("#imagenes").html(list);
                  $('img').click(app.reproducirVideo);
            });
      },
      mostrarVideoHTML: (video) => {
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
            $('#video').html(`<div class="embed-responsive embed-responsive-16by9" > 
            <iframe class="embed-responsive-item" src=${url}> </iframe>
         </div>`)
      },
      reproducirVideo : (event) => {
            //console.log(event.target.src)
            let src = event.target.src 
            let indice;
            app.result.videos.map((elemento, i) => {
                return (src == elemento.snippet.thumbnails.default.url) ? indice = i : '';
            });
            console.log(indice);
            app.mostrarVideoHTML(app.result.videos[indice]);
      }
};

$(document).ready(app.init);