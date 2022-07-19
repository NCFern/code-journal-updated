/* global data */

var $photo = document.querySelector('#user-photo');
var $showImage = document.querySelector('.placeholder');
var $form = document.querySelector('#new-form');

$photo.addEventListener('input', showPicture);

function showPicture(event) {
  if ($photo.value !== '') {
    $showImage.setAttribute('src', $photo.value);
  } else {
    $showImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

$form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  var formTitle = document.querySelector('#user-title').value;
  var formPhoto = document.querySelector('#user-photo').value;
  var formNotes = document.querySelector('#user-notes').value;
  var submitEntry = {
    entryId: data.nextEntryId,
    title: formTitle,
    imgURL: formPhoto,
    notes: formNotes
  };
  data.entries.unshift(submitEntry);
  data.nextEntryId++;
  $form.reset();
  $showImage.setAttribute('src', 'images/placeholder-image-square.jpg');
}
