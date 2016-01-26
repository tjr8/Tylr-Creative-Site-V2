function getBehanceProject(projectId, cb) {
  $.getJSON("http://behance.net/v2/projects/"+projectId+"?api_key=cK6VzQOtV4uhXjQRsrLbYaRsg14uoK60&callback=?", function (data) {
    var behanceProject = data.project;
    return cb(behanceProject);
  });
}

function getBehanceProjects(projectIds, cb) {
  var projects = [];
  var done = function done() {
    return cb(projects);
  }
  var tasks = projectIds.length;
  if (tasks === 0) {
    done();
  } else {
    ;
    for (var i = projectIds.length-1; i >= 0; i--) {
      var projectId = projectIds[i];
      console.log(projectId);
      getBehanceProject(projectId, function (project) {
        projects.push(project);
        if (--tasks === 0) {
          done();
        }
      });
    }
  }
}

function getBehanceProjectImages(project, cb) {
  var modules = project.modules;
  var behanceImages = [];

  for (var i = modules.length; i > 0; --i) {
    var module = modules[i];

    if(module.type === "image") {
      behanceImages.push(module);
    }
  }

  return cb(behanceImages);
}

// function getImagesFromBehanceImages(behanceImages) {
//   var images = [];
//   for (var i = behanceImages.length; i > 0; i--) {
//     var behanceImage = behanceImages[i];
//
//     var imageSrc = behanceImage.size.disp;
//     var imageWidth = behanceImage.dimensions.disp.width;
//     var imageHeight = behanceImage.dimensions.disp.height;
//     var imageThumbnailSize = 230;
//     var imageThumbnailSrc = behanceImage.covers.imageThumbnailSize;
//
//     var image = {
//       display: {
//         src: imageSrc,
//         w: imageWidth,
//         h: imageHeight
//       },
//       thumbnail: {
//         src: imageThumbnailSrc,
//         w: imageThumbnailSize,
//         h: imageThumbnailSize
//       }
//     }
//
//     images.push(image);
//   }
//
//   return images;
// }

function getPhotoSwipeImagesFromBehanceImages(behanceImages, cb) {
  var photoswipeImages = [];
  for (var i = behanceImages.length; i > 0; --i) {
    var behanceImage = behanceImages[i];

    var photoswipeImageSrc = behanceImage.size.disp;
    var photoswipeImageWidth = behanceImage.dimensions.disp.width;
    var photoswipeImageHeight = behanceImage.dimensions.disp.height;

    var photoswipeImage = {
      src: photoswipeImageSrc,
      w: photoswipeImageWidth,
      h: photoswipeImageHeight
    };

    photoswipeImages.push(photoswipeImage);
  }

  return cb(photoswipeImages);
}

function insertProjectsIntoDomClass(projects, domClass) {
  for (var i = projects.length-1; i >= 0; i--) {
    var project = projects[i];
    var projectCoverSize = '230';
    console.log(project);
    var projectCoverSrc = project.covers[projectCoverSize];

    $('.'+domClass).append('<figure id="project" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject"><div id="'+project.id+'"><img src="'+projectCoverSrc+'" height="'+projectCoverSize+'" width="'+projectCoverSize+'" itemprop="thumbnail" alt="'+project.name+'"></div></figure>');
  }
}

function main() {
  var projectIds = ['10973025'];
  var domClass = 'galleryList';

  /*getBehanceProject('10973025', function (project) {
    console.log(project);
  });*/
  getBehanceProjects(projectIds, function (projects) {
    insertProjectsIntoDomClass(projects,domClass);
  });

  var $pswp = $('.pswp')[0];

  $('.'+domClass+'>figure#project').on('click', 'figure', function(event) {
    event.preventDefault();
    var projectId = $('div',this).attr('id');

    getBehanceProject(projectId, function (project) {
      getBehanceProjectImages(project, function (behanceImages) {
        getPhotoSwipeImagesFromBehanceImages(behanceImages, function (photoswipeImages) {

          var options = {
            bgOpacity: 0.7,
            showHideOpacity: true
          };

          // Initialize PhotoSwipe
          var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, photoswipeImages, options);
          gallery.init();
        });
      });
    });
  });

}

main();
