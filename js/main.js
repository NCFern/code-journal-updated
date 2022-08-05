/* global data */

var $photo = document.querySelector('#user-photo');
var $showImage = document.querySelector('.placeholder');
var $form = document.querySelector('#new-form');
var $entryFull = document.querySelector('.entry-list');
var $viewList = document.querySelectorAll('.view');
var $newButton = document.querySelector('.purple-new-button');
var $entriesTab = document.querySelector('.entries-header');
var $noEntries = document.querySelector('.no-entries');
var $targetUl = document.querySelector('ul');
var $changeTitle = document.querySelector('.new-entry-title');
var $li = document.querySelectorAll('.journal-entry');

if (data.entries.length !== 0) {
  $noEntries.classList.add('hidden');
}

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
  if (data.editing === null) {
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
    $entryFull.prepend(renderEntry(data.entries[0]));
    if (data.entries.length !== 0) {
      $noEntries.classList.add('hidden');
    }
    clickEntry();
  } else {

    var editEntry = {};

    editEntry[$form.elements.title.name] = data.editing.title;
    editEntry[$form.elements.notes.name] = data.editing.notes;
    editEntry[$form.elements.photo.name] = data.editing.imgURL;
    editEntry.entryId = data.editing.entryId;

    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries.splice(i, 1, editEntry);
      }
    }
    for (var j = 0; j < $li.length; j++) {
      var currentEntry = $li[j].getAttribute('data-entry-id');
      if (currentEntry === data.editing.entryId.toString()) {
        $targetUl.replaceWith(editEntry, $li[j]);
      }
    }
    $form.reset();
    clickEntry();
  }
}

function renderEntry(entry) {
  var $entryList = document.createElement('li');
  $entryList.setAttribute('data-entry-id', entry.entryId);
  $entryList.setAttribute('class', 'journal-entry');

  var $entryRow = document.createElement('div');
  $entryRow.setAttribute('class', 'row');

  var $entryColumn = document.createElement('div');
  $entryColumn.setAttribute('class', 'column-half');

  var $entryImage = document.createElement('img');
  $entryImage.setAttribute('src', entry.imgURL);

  var $entry2Column = document.createElement('div');
  $entry2Column.setAttribute('class', 'column-half');

  var $entryTitleRow = document.createElement('div');
  $entryTitleRow.setAttribute('class', 'row space-between');

  var $entryTitle = document.createElement('h2');
  $entryTitle.textContent = entry.title;

  var $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;

  var $entryEditor = document.createElement('i');
  $entryEditor.setAttribute('class', 'fa-solid fa-pencil');

  $entryList.appendChild($entryRow);
  $entryRow.appendChild($entryColumn);
  $entryColumn.appendChild($entryImage);
  $entryRow.appendChild($entry2Column);
  $entry2Column.appendChild($entryTitleRow);
  $entryTitleRow.appendChild($entryTitle);
  $entryTitleRow.appendChild($entryEditor);
  $entry2Column.appendChild($entryNotes);
  return $entryList;
}

window.addEventListener('DOMContentLoaded', loadDomTree);

function loadDomTree(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var $appendEntireEntry = renderEntry(data.entries[i]);
    $entryFull.appendChild($appendEntireEntry);
  }
}

$entriesTab.addEventListener('click', clickEntry);
$newButton.addEventListener('click', clickNew);

function clickEntry(event) {
  for (var i = 0; i < $viewList.length; i++) {
    if ($viewList[i].getAttribute('data-view') === 'entry-form') {
      $viewList[i].className = 'view hidden';
    } else if ($viewList[i].getAttribute('data-view') !== 'entry-form') {
      $viewList[i].className = 'view';
    }
  }
}

function clickNew(event) {
  for (var i = 0; i < $viewList.length; i++) {
    if ($viewList[i].getAttribute('data-view') === 'entry-form') {
      $viewList[i].className = 'view';
    } else if ($viewList[i].getAttribute('data-view') !== 'entry-form') {
      $viewList[i].className = 'view hidden';
    }
  }
}

$targetUl.addEventListener('click', editFeature);

function editFeature({ target }) {
  if (event.target.tagName === 'I') {
    clickNew('entry-form');
  } else {
    return;
  }
  var $editIcon = target.closest('li');
  var currentEdit = $editIcon.getAttribute('data-entry-id');
  data.editing = currentEdit;
  for (var i = 0; i < data.entries.length; i++) {
    if (currentEdit === data.entries[i].entryId.toString()) {
      data.editing = data.entries[i];
      break;
    }
  }
  $changeTitle.textContent = 'Edit Entry';
  prepopulateData();
}

function prepopulateData() {
  $form.elements.title.value = data.editing.title;
  $form.elements.notes.value = data.editing.notes;
  $form.elements.photo.value = data.editing.imgURL;
  $showImage.setAttribute('src', data.editing.imgURL);
}
