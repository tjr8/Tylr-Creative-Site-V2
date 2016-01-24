"use strict";
/*
Behance Project Object Format example
=====================================
{
project: {
id: 10973025,
name: "Stephen Wedding",
published_on: 1379452795,
created_on: 1379452366,
modified_on: 1381690645,
url: "https://www.behance.net/gallery/10973025/Stephen-Wedding",
privacy: "public",
fields: [
"Art Direction",
"Digital Photography",
"Retouching"
],
covers: {
115: "https://mir-s3-cdn-cf.behance.net/projects/115/10973025.5480bc828d02a.jpg",
202: "https://mir-s3-cdn-cf.behance.net/projects/202/10973025.5480bc828d02a.jpg",
230: "https://mir-s3-cdn-cf.behance.net/projects/230/10973025.5480bc828d02a.jpg",
404: "https://mir-s3-cdn-cf.behance.net/projects/404/10973025.5480bc828d02a.jpg",
original: "https://mir-s3-cdn-cf.behance.net/projects/original/10973025.5480bc828d02a.jpg"
},
mature_content: 0,
mature_access: "allowed",
owners: [
{
id: 532906,
first_name: "Tyler",
last_name: "Robinson",
username: "tjr",
city: "Wenatchee",
state: "Washington",
country: "United States",
location: "Wenatchee, WA, USA",
company: "Tyler Robinson Design",
occupation: "Graphic Designer",
created_on: 1310111223,
url: "https://www.behance.net/tjr",
images: {
50: "https://mir-s3-cdn-cf.behance.net/user/50/532906.53aee0b2ca765.png",
100: "https://mir-s3-cdn-cf.behance.net/user/100/532906.53aee0b2ca765.png",
115: "https://mir-s3-cdn-cf.behance.net/user/115/532906.53aee0b2ca765.png",
138: "https://mir-s3-cdn-cf.behance.net/user/138/532906.53aee0b2ca765.png",
230: "https://mir-s3-cdn-cf.behance.net/user/230/532906.53aee0b2ca765.png",
276: "https://mir-s3-cdn-cf.behance.net/user/276/532906.53aee0b2ca765.png"
},
display_name: "Tyler Robinson",
fields: [
"Art Direction",
"Photography",
"Design"
],
has_default_image: 0,
website: "tylrcreative.com"
}
],
stats: {
views: 121,
appreciations: 7,
comments: 0
},
conceived_on: 1379452366,
canvas_width: 724,
tags: [
"stephen",
"wedding",
"Wenatchee",
"Washington",
"ohme",
"gardens"
],
description: "The ceremony of Andrew and Amanda's wedding. More photos at: http://flic.kr/s/aHsjJeinze",
editor_version: 4,
modules: [
{
id: 82694675,
type: "image",
full_bleed: 0,
alignment: "center",
caption_alignment: "left",
src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/11ae1a10973025.560f7aa9e6747.jpg",
sizes: {
disp: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/11ae1a10973025.560f7aa9e6747.jpg",
max_1240: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/11ae1a10973025.560f7aa9e6747.jpg",
max_1200: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/11ae1a10973025.560f7aa9e6747.jpg",
original: "https://mir-s3-cdn-cf.behance.net/project_modules/source/11ae1a10973025.560f7aa9e6747.jpg"
},
dimensions: {
disp: {
width: 600,
height: 906
},
max_1240: {
width: 1080,
height: 1631
},
max_1200: {
width: 1080,
height: 1631
},
original: {
width: 1080,
height: 1631
}
},
width: 600,
height: 906
}
],
short_url: "http://on.be.net/16ctkmp",
copyright: {
license: "cc by-nc",
description: "Attribution-NonCommercial",
license_id: 3
},
tools: [ ],
styles: {
text: {
title: {
font_family: "arial,helvetica,sans-serif",
font_weight: "bold",
color: "#3B3B3B",
text_align: "left",
line_height: "1.4em",
font_size: "16px",
text_decoration: "none",
font_style: "normal",
display: "inline"
},
subtitle: {
font_family: "arial,helvetica,sans-serif",
font_weight: "normal",
color: "#3B3B3B",
text_align: "left",
line_height: "1.4em",
font_size: "14px",
text_decoration: "none",
font_style: "normal",
display: "inline"
},
paragraph: {
font_family: "arial,helvetica,sans-serif",
font_weight: "normal",
color: "#3B3B3B",
text_align: "left",
line_height: "1.4em",
font_size: "12px",
text_decoration: "none",
font_style: "normal",
display: "inline"
},
caption: {
font_family: "arial,helvetica,sans-serif",
font_weight: "normal",
color: "#3B3B3B",
text_align: "left",
line_height: "1.4em",
font_size: "11px",
text_decoration: "none",
font_style: "italic",
display: "block"
},
link: {
font_family: "arial,helvetica,sans-serif",
font_weight: "normal",
color: "#1769FF",
text_align: "left",
line_height: "1.4em",
font_size: "12px",
text_decoration: "none",
font_style: "normal",
display: "inline"
}
},
background: {
color: "FFFFFF"
},
spacing: {
project: {
top_margin: 50
},
modules: {
bottom_margin: 20
}
},
dividers: {
display: "none"
}
}
},
http_code: 200
}
*/


function getBehanceProject(projectId) {
  var behanceProject = $.getJSON("http://behance.net/v2/projects/"+projectId+"?api_key=cK6VzQOtV4uhXjQRsrLbYaRsg14uoK60").project;
  return behanceProject;
}

function getBehanceProjects(projectIds) {
  var projects = [];
  for (var i = projectIds.length; i > 0; i--) {
    var projectId = projectIds[i];
    var project = getBehanceProject(projectId);
    projects.push(project);
  }

  return projects;
}

function getBehanceProjectImages(project) {
    var modules = project.modules;
    var behanceImages = [];

    for (var i = modules.length; i > 0; i--) {
      var module = modules[i];

      if(module.type === "image") {
        behanceImages.push(module);
      }
    }

    return behanceImages;
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

function getPhotoSwipeImagesFromBehanceImages(behanceImages) {
    var photoswipeImages = [];

    for (var i = behanceImages.length; i > 0; i--) {
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

  return photoswipeImages;
}

function insertProjectsIntoDomClass(projects, domClass) {
  for (var i = projects.length; i > 0; i--) {
    var project = projects[i];
    var projectCoverSize = 230;
    var projectCoverSrc = project.covers.projectCoverSize;

    $("."+domClass).append('<figure id="project" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject"><div id="'+project.id+'"><img src="'+projectCoverSrc+'" height="'+projectCoverSize+'" width="'+projectCoverSize+'" itemprop="thumbnail" alt="'+project.name+'"></div></figure>');
  }
}

function main() {
  var projectIds = ['10973025'];
  var domClass = 'galleryList';

  insertProjectsIntoDomClass(getBehanceProjects(projectIds),domClass);

  var $domElement = $('.'+domClass);

  var $pswp = $('.pswp')[0];

  $domElement('figure#project').on('click', 'figure', function(event) {
    event.preventDefault();
    var projectId = $('div',this).attr('id');

    var project = getBehanceProject(projectId);
    var behanceImages = getBehanceProjectImages(project);
    var photoswipeImages = getPhotoSwipeImagesFromBehanceImages(behanceImages);

    var options = {
      bgOpacity: 0.7,
      showHideOpacity: true
    };

    // Initialize PhotoSwipe
    var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, photoswipeImages, options);
    gallery.init();
  });

}

main();
