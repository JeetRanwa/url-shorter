// Saves options to storage.
function save() {
  var store = new Object();

  // Saves all options
  var entries = $('#entries input');
  for (var i = 0; i < entries.length; i += 2) {
    key = entries[i].value;
    val = entries[i+1].value;

    if (key != '' && val != '') {
      store[key] = val;
    }
  }
  chrome.storage.sync.set({'urlalias' : store});

  // Update status to let user know options were saved.
  $("#status").html("Changes saved").show().delay(3000).fadeOut();
}

// Restores select box state to saved value from localStorage.
function onLoad() {
  // Restore all options
  chrome.storage.sync.get('urlalias', function(store) {
    store = store.urlalias;
    for (var key in store) {
      addRow(key, store[key]);
    }
  });

  // Register click handlers
  $("#save").click(save);
  $('#newUrl').click(function() { addRow("", ""); });
}

// Add an individual row to the table.
function addRow(alias, redirect) {
  var tr = $('<tr>');

  var del = $('<button type="button" class="btn btn-warning">Delete</button>');
  del.click(function() { tr.remove();  });

  tr.append($('<td width="30%">').append($('<input class="form-control" id="inputdefault" type="text">').val(alias)));
  tr.append($('<td width="60%">').append($('<input class="form-control" id="inputdefault" type="text">').val(redirect)));
  tr.append($('<td width="10%">').append(del));

  $('#data tbody').append(tr);
}

$(document).ready(onLoad);
