
var rawStatesList = {
  "all": "All",
  "AL": "Alabama",
  "AK": "Alaska",
  "AS": "American Samoa",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "DC": "District Of Columbia",
  "FM": "Federated States Of Micronesia",
  "FL": "Florida",
  "GA": "Georgia",
  "GU": "Guam",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MH": "Marshall Islands",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "MP": "Northern Mariana Islands",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PW": "Palau",
  "PA": "Pennsylvania",
  "PR": "Puerto Rico",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VI": "Virgin Islands",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming"
};



// Calls all these functions when page loads
$(function(){ 
  var jsondata;  
  
  if ('house'.split('/').indexOf('https://nytimes-ubiqum.herokuapp.com/congress/113/senate')) {
    jsondata = 'https://nytimes-ubiqum.herokuapp.com/congress/113/senate';
  } else if ('senate'.split('/').indexOf('https://nytimes-ubiqum.herokuapp.com/congress/113/house')) {
    jsondata = "https://nytimes-ubiqum.herokuapp.com/congress/113/house";
  }
  
  $.getJSON( jsondata, function(data) {
    
'use strict';
// document.getElementById('senate-data').innerHTML = JSON.stringify(data,null,2);
//One initial thought was to start with a blank string (var finalContent = '';), then loop over the data object and concatonate onto the blank string until table is complete, then asign to table by calling document.getElementById('senate-data').innerHTML(finalContent);


// InnerHTML (string) gets modified here. Youre sending strings to the inner html (the children) fo the elements in the dom that have a 'senate-data' id tag.
// tableElement.innerHTML = '';
// tableElement.innerHTML += '<div>MY DIV</div>';
// tableElement.innerHTML += '<div>MY DIV</div>';
// tableElement.innerHTML += '<div>MY DIV</div>';
// tableElement.innerHTML += '<div>MY DIV</div>';
// Chrome reacts by rebuilding tableElement.
  // Delete the contents
  // Read in the new innerHTML and attempt to interpret the string as HTML.
  // After interpreting, build all the required elements
  // Add the new elements to tableElement
  // This is not best practice because all the elements in the dom must be deleted and rebuilt every time you assign tableElement.innerHTML to something.

// var divElement = document.createElement('div');
// divElement.textContent = 'MY NEW DIV CONTENT';

// NO NEED FOR Chrome to rebuild the tableElement HTMLElement. Instead it just adds the new HTMLElement (divElement) to its childNodes.
// tableElement.appendChild(divElement);

 

var tr, td, th, row, tbl, counter, i, fieldsArray, fieldsArr, partyArray, ptyArr, state, ptyFromForm, st;
const fields = ['first_name','middle_name','last_name','party', 'state', 'seniority', 'votes_with_party_pct'];

// In place of defining these variables, I just called genTable with the starting values.
// // Define starting empty state info array
// var ptyFromForm = [];
// //start state value to all so the page loads showing all.
// var st = 'all';
ddBox();

genHead(['Name', 'Party', 'state', 'years_in_office', 'votes_with_party_%']);

// Make table body the first time, showing all.
genTbleBody(fields, [], 'all');

// Generates drop down box
// Why can't I make this into a function?
function ddBox () {
  var sel = document.getElementById('stateSelect');
  for(var key in rawStatesList) {
      var opt = document.createElement('option');
      opt.innerHTML = rawStatesList[key];
      opt.value = key;
      // opt.value = rawStatesList[i][1];
      sel.appendChild(opt);
  }
};

//

// Makes headings. Takes the array 'fields'
// Should I define these variables inside the function each time?
 function genHead(fieldsArray) {
   console.log('start genhead');
   tbl = document.getElementById('data-head');
   tbl.innerHTML = '';
   tbl.appendChild(document.createElement('tr'));
   var a = document.createElement('th');
   a.appendChild(document.createTextNode('Member Number'));
   tbl.appendChild(a);

   // Converts the given properties in the js object to more readable heading. // It isn't really necessary but was leftover from other method I was using.
   const prettyHeaders = fieldsArray.map((str) => {
     return str
          .toLowerCase()
          .split('_') // splits the words that are seperated by underscores.
          .map((word) => {
            // console.log("First capital letter: "+word[0]);
            // console.log("remain letters: "+ word.substr(1));
            return word[0].toUpperCase() + word.substr(1);
          })
          .join(' '); // Re-joins the elements (words) seperated by spaces.
   });
    // Builds headers
    for (i in fieldsArray) {
      var b = document.createElement('th');
      b.appendChild(document.createTextNode(prettyHeaders[i]));
      tbl.appendChild(b);
    }
}

// genHead(['Name', 'Party', 'state', 'years_in_office', 'votes_with_party_%']);

// Make table body the first time, showing all.
// genTbleBody(fields, [], 'all');

// Dicision logic for genTableBody function
function shouldBuildRow (m, p, s) {
  return (p.length === 0 && ( (s === 'all') || (s === m.state) ) ) ||
    //makes row for the parties and state selected or if all states are selected.
    (p.includes(m.party) && (s === m.state || s === 'all') );
};

  // Populates table body. accepts an array for fields, an array for filter parameters, and a value for state
function genTbleBody(fieldsArr, ptyArr, state) {
  tbl = document.getElementById('data-body');
  tbl.innerHTML = '';
  for (var mbrIndex in data.results[0].members) {
    let mbr = data.results[0].members[mbrIndex];
    //How to package this into a function?
    if ( shouldBuildRow(mbr,ptyArr, state)) {
      // Makes first cell of each row. Fills the senators index number in data object
      tbl.appendChild(document.createElement('tr'));
      var a = document.createElement('td'); // Will this work if it's const?
      a.appendChild(document.createTextNode(mbrIndex));
      tbl.appendChild(a);
      var b = document.createElement('td');

      // This for loop concatonates the first 3 fields (first, middle, last names) and puts them in a single td element and appends to row.
      for (let i= 0; i < 3; i++) {
        // console.log("i=" + i + " | fieldsArr=" + mbr[fieldsArr[i]] + ' | ');
        if (mbr[fieldsArr[i]] != null) {
          b.appendChild(document.createTextNode(' ' + mbr[fieldsArr[i]]));
          tbl.appendChild(b);
        }
      }
      // This for loop loops over the remaining
      for (let i=3; i < fieldsArr.length; i++) {
        var c = document.createElement('td');
        // console.log("i=" + i + " | fieldsArr=" + mbr[fieldsArr[i]] + ' | ');
        c.appendChild(document.createTextNode(mbr[fieldsArr[i]]));
        tbl.appendChild(c);
      }
    }
  }
  if ( $('#data-body').is(':empty') ) {
    // insert There are no independent/democratic/republican members in selected state.
    document.getElementById('data-head').innerHTML = "There are no Congresspeople of this type in the state you selected.";
    // displayNode.createElement(document.createTextNode("There are no Congresspeople of this type in the state you selected."));
    // tbl.appendChild(d);
  }
}

// function formToArray(vals) {
//   let rep = documents.getElementById('rep').value;
//   let dem = documents.getElementById('dem').value;
//   let ind = documents.getElementById('ind').value;
//   ptyFromForm.push();
// };



// Listens for user bahavior on the input fields, then rebuilds table
  $('#filterForm').change(function() {
    ptyFromForm = [];
    $("input:checkbox[name=Party]:checked").each(function(){
      ptyFromForm.push($(this).val()); // push
      console.log($(this));
    });
    let e = document.getElementById("stateSelect");
    st = e.options[e.selectedIndex].value;
    genHead(['Name', 'Party', 'state', 'years_in_office', 'votes_with_party_%']);
    genTbleBody(fields, ptyFromForm, st); // Call form generator
    console.log('ptyFromForm = ' + ptyFromForm + ' st = ' + st);
  });

} );

});


      // Below is the manual version of the above loop

      // var b = document.createElement('td');
      // b.appendChild(document.createTextNode(memberRow[arguments[0]]));
      // tbl.appendChild(b);
      // var c = document.createElement('td');
      // c.appendChild(document.createTextNode(memberRow[arguments[1]]));
      // tbl.appendChild(c);
      // var d = document.createElement('td');
      // d.appendChild(document.createTextNode(memberRow[arguments[2]]));
      // tbl.appendChild(d);
      // var e = document.createElement('td');
      // e.appendChild(document.createTextNode(memberRow[arguments[3]]));
      // tbl.appendChild(e);
      // var f = document.createElement('td');
      // f.appendChild(document.createTextNode(memberRow[arguments[4]]));
      // tbl.appendChild(f);
      // var g = document.createElement('td');
      // g.appendChild(document.createTextNode(memberRow[arguments[5]]));
      // tbl.appendChild(g);
      // var h = document.createElement('td');
      // h.appendChild(document.createTextNode(memberRow[arguments[6]]));
      // tbl.appendChild(h);
      // Why doesnt this work then?
      // tbl.appendChild(document.createElement('td'));



// document.getElementById('senate-data').innerHTML += '<div>X</div>' + miNuevoTexto + ' ' + unNombre;
// document.getElementById('senate-data').innerHTML += '<div>X</div>' + miNuevoTexto + ' ' + unNombre;
//
// var miRow = '<tr><td>UNA ROW MAS LOCA</td></tr>';
