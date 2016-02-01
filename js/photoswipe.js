function getBehanceProject(projectId, cb) {
  $.getJSON("http://behance.net/v2/projects/"+projectId+"?api_key=cK6VzQOtV4uhXjQRsrLbYaRsg14uoK60&callback=?", function (data) {
    var behanceProject = data.project;
    return cb(behanceProject);
  });
}

function getBehanceProjects(projectIds, cb) {
  var projects = [];
  function done() {
    return cb(projects);
  }
  var tasks = projectIds.length;
  if (tasks === 0) {
    done();
  } else {
    for (var i = projectIds.length-1; i >= 0; i--) {
      var projectId = projectIds[i];
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

  for (var i = modules.length-1; i >= 0; i--) {
    var module = modules[i];

    if(module.type === "image") {
      behanceImages.push(module);
    }
  }

  return cb(behanceImages);
}

// function getImagesFromBehanceImages(behanceImages) {
//   var images = [];
//   for (var i = behanceImages.length-1; i >= 0; i--) {
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
  for (var i = behanceImages.length-1; i >= 0; i--) {
    var behanceImage = behanceImages[i];

    var photoswipeImageSrc = behanceImage.sizes.disp;
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

function insertProjectsIntoDomClass(projects, domClass, cb) {
  function done() {
    return cb();
  }
  projects.sort(function (projectA, projectB) {
    return projectA.id-projectB.id;
  });
  var tasks = projects.length;
  if (tasks === 0) {
    done();
  } else {
    for (var i = projects.length-1; i >= 0; i--) {
      var project = projects[i];
      var projectCoverSize = '230';
      var projectCoverWidth = projectCoverSize;
      var projectCoverHeight = projectCoverWidth/(23/18);
      var projectCoverSrc;

      var covers = Object.keys(project.covers);
      if (covers.indexOf(projectCoverSize) >= 0) {
        projectCoverSrc = project.covers[projectCoverSize];
      } else {
        covers.sort().reverse();
        var coversLeft = covers.length;
        for (var k = coversLeft-1; k >= 0; k--) {
          var cover = covers[k];
          if (--coversLeft === 0) {
            projectCoverSrc = project.covers[cover];
          }
          else if ((typeof parseInt(cover) !== 'number') || (parseInt(cover) > parseInt(projectCoverSize))) {
            continue;
          }
          else {
            projectCoverSrc = project.covers[cover];
            break;
          }
        }
      }

      console.log(projectCoverSrc);

      $('.'+domClass).append('<figure id="'+project.id+'" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" onmouseover="" style="cursor: pointer;"><img src="'+projectCoverSrc+'" height="'+projectCoverHeight+'" width="'+projectCoverWidth+'" itemprop="thumbnail" alt="'+project.name+'"></figure>');
      if (--tasks === 0) {
        done();
      }
    }
  }
}

function main() {
  var projectIds = ['10973025','31051165','3579359','1918323'];
  var domClass = 'galleryList';

  getBehanceProjects(projectIds, function (projects) {
    insertProjectsIntoDomClass(projects,domClass,function () {
      var $pswp = $('.pswp')[0];
      $('div.'+domClass+' > figure').on('click', function(event) {
        event.preventDefault();

        var projectId = $(this).attr('id');

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
    });
  });
}

main();
