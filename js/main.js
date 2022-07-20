/* global data */

var $photo = document.querySelector('#user-photo');
var $showImage = document.querySelector('.placeholder');
var $form = document.querySelector('#new-form');
var $entryFull = document.querySelector('.ul');

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

function renderEntry(entry) {
  var $entryList = document.createElement('li');

  var $entryRow = document.createElement('div');
  $entryRow.setAttribute('class', 'row');

  var $entryColumn = document.createElement('div');
  $entryColumn.setAttribute('class', 'column-half');

  var $entryImage = document.createElement('img');
  $entryImage.setAttribute('src', entry.imgURL);

  var $entry2Column = document.createElement('div');
  $entry2Column.setAttribute('class', 'column-half');

  var $entryTitle = document.createElement('h2');
  $entryTitle.textContent = entry.title;

  var $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;

  $entryList.appendChild($entryRow);
  $entryRow.appendChild($entryColumn);
  $entryColumn.appendChild($entryImage);
  $entryRow.appendChild($entry2Column);
  $entry2Column.appendChild($entryTitle);
  $entry2Column.appendChild($entryNotes);

  return $entryList;
}

window.addEventListener('DomContentLoaded', loadDOMTree);

function loadDOMTree(event) {
  for (var i = 0; data.entries.length; i++) {
    var $appendEntireEntry = renderEntry(data.entries[i]);
    $entryFull.appendChild($appendEntireEntry);
  }
}
