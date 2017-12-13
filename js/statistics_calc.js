
// stores computed values
var statistics = {
  'noOfDems': 0,
  'noOfReps': 0,
  'noOfInds': 0,
  // these are here just for clarity bc created in funct
  'idsPctVotewPty': 0,
  'repsPctVotewPty': 0,
  'indsPctVotewPty': 0,
  'top10MemsAtten': [], // Array of member collections
  'bot10MemsAtten': [], // Array of member collections
  'top10MemsLoyalty': [], // Array of member collections
  'bot10MemsLoyalty': [], // Array of member collections
  'demsPctVotewPty': 0,
  'repsPctVotewPty': 0,
  'indsPctVotewPty': 0 
};



// Calls all these functions when page loads
$( function() {
  
  
  var jsonData;
  var sitePath = window.location.pathname.split( '/' )[ 2 ];

  if ( sitePath.match( /senate|sParty|sAtten/ ) ) {
    jsonData = 'https://nytimes-ubiqum.herokuapp.com/congress/113/senate';
  } else if ( sitePath.match( /house|hParty|hAtten/ ) ) {
    jsonData = "https://nytimes-ubiqum.herokuapp.com/congress/113/house";
  }


  // Gets JSON from jsonData variable, parses it into a js object and calls the callback function, in which the JSON will be refered to as 'data'.
  $.getJSON( jsonData, function( data ) {
    $('.loading').hide(); //hides loading image when json loads
    $('.my-data-container').show(); // show page content again
    // Array of 'member' objects
    var memArray = data.results[ 0 ].members;

    
    // Makes list of reps, dems, and Inds. Pushes total number to statistics.noOfDems, noOfReps, noOfInds
    totalMems( memArray );

    getLowest10( memArray, 'votes_with_party_pct' );
    getHighest10( memArray, 'votes_with_party_pct' );

    getLowest10( memArray, 'missed_votes_pct' );
    getHighest10( memArray, 'missed_votes_pct' );

    // Make html
    // generateAtAGlance();
    
    
    react(["votes_with_party_pct","missed_votes_pct"]);
    

    // Pass this an array of integers, and it finds the max value
    // Reduce works by applying the function passed to it to all items in the arrayKey. First param is accumulator, 2nd is index value being evaluated
    // function maxPct(arr) {  
    //   var max = arr.reduce(function(a, b) {
    //     return Math.max(a, b);
    //   });
    //   return max;
    // }

    // for each property/key value in each memb er/object, returns negative integer if b is bigger, 0 if equal, and positive integer if greater. Sort takes that number and if negative puts a in an index lower than b, keeps it in place. If sort gets positive number, it puts a in an index higher than b. So sort is taking the function's return value and using that to position the accumulator (the first parameter in function).

    // does not return anything. it just sorts members in place.
    function sortMemsLtoH( members, prop ) {
      members.sort( function( a, b ) {
        return a[ prop ] - b[ prop ];
      } );
    }

    function sortMemsHtoL( members, prop ) {
      members.sort( function( a, b ) {
        return b[ prop ] - a[ prop ];
      } );
    }


    // pass in unsorted array of member objects. 
    // TODO Is this a closure???  
    function totalMems( members ) {
      var listOfDemocrats = [];
      var listOfRepublicans = [];
      var listOfIndependents = [];
      var pctVotedWPtyDems = 0;
      

      for ( let member of members ) {
                switch ( member.party ) {
          case 'D':
            listOfDemocrats.push( member );
            break;
          case 'R':
            listOfRepublicans.push( member );
            break;
          case 'I':
            listOfIndependents.push( member );
            break;
          default:
            console.log( 'This statement is the default statement which would print if the switch saw none of the above cases.' );
        }
      }
      // Assign number of members in each party to key in statistics object.
      statistics.noOfDems = listOfDemocrats.length;
      statistics.noOfReps = listOfRepublicans.length;
      statistics.noOfInds = listOfIndependents.length;
      statistics.noOfTot = memArray.length;

      // Build party wide pct votes with party numbers (3 numbers)
      pctVotedWParty( listOfDemocrats, 'demsPctVotewPty' );
      pctVotedWParty( listOfRepublicans, 'repsPctVotewPty' );
      pctVotedWParty( listOfIndependents, 'indsPctVotewPty' );

      statistics.avgVotesWParty = R.mean( [ statistics.demsPctVotewPty, statistics.repsPctVotewPty, statistics.indsPctVotewPty ]);
      
      function pctVotedWParty( list, vwpKeyName ) {
        var avgPct = 1;
        // var keyName = list + 'VotePct';
        for ( let i = 0; i < list.length; i++ ) {
          avgPct += +list[ i ].votes_with_party_pct;
          
        }
        statistics[ vwpKeyName ] = Math.round( avgPct / ( list.length ) );
        
      }
    }

    function isATie( array, ind, prop ) {
      ind = parseInt( ind );
      return ( array[ ind ][ prop ] === array[ ind + 1 ][ prop ] );
    }


    //Note on for...of: in ES6, it is good to use for - of loop. You can get index in for of like this:
    // for (let [index, val] of array.entries()) {
    //         // your code goes here    
    // }
    // should return max value for property
    function max1( members, prop ) {
      var membersCopy = members;
      return membersCopy.reduce( function( prev, current ) {
        return ( prev[ prop ] > current[ prop ] ) ? prev[ prop ] : current[ prop ];
      } );
    }

    function min1( members, prop ) {
      var membersCopy = members;
      return membersCopy.reduce( function( prev, current ) {
        return ( prev[ prop ] < current[ prop ] ) ? prev[ prop ] : current[ prop ];
      } );
    }

    function range1( members, prop ) {
      return ( max1( members, prop ) - min1( members, prop ) );
    }

    // returns array of most engaged members. Those who missed the least votes
    function getLowest10( members, prop ) {
      var num = Math.floor( members.length ) * 0.10;
      var listOfHighest10Mems = []; // declare array
      sortMemsLtoH( members, prop );
      // const top10break = maxPct(listVtMissed)*0.9;
      // let previousMem = members[members.length-1];
      let smallSlice = members.slice( 0, num );
      smallSlice.forEach( function( element, index, array ) {
        listOfHighest10Mems.push( element );
      } );


      let largeSlice = members.slice( num - 1 );
      for ( let i = 0; i < largeSlice.length - 1; i++ ) {
        if ( isATie( largeSlice, i, prop ) ) {
          // push next member onto top 10 list.
          listOfHighest10Mems.push( largeSlice[ i + 1 ] );
          console.log( 'There was a tie for the 10th person' );
        } else {
          console.log( 'There was no tie for the 10th most engaged person. Breaking out of for loop' );
          break;
        }
      }
      if ( prop === 'votes_with_party_pct' ) {
        // If finding votes_with_party_pct, make key of members who voted with party the least
        statistics.bot10MemsLoyalty = listOfHighest10Mems;
      } else if ( prop == 'missed_votes_pct' ) {
        // If finding votes_with_party_pct, make key of members who missed the least votes
        statistics.top10MemsAtten = listOfHighest10Mems;
      }
    }

    // call with an array of member objects and push top 10 (and ties) only statistics.  returns array of least engaged members (those who missed the most votes).
    function getHighest10( members, prop ) {
      var num = Math.floor( members.length ) * 0.10;
      var listOfLowest10Mems = []; // declare blank array
      sortMemsHtoL( members, prop );

      let smallSlice = members.slice( 0, num );
      smallSlice.forEach( function( element, index, array ) {
        listOfLowest10Mems.push( element );
      } );
      var largeSlice = members.slice( num - 1 );
      console.log( largeSlice );
      for ( let i = 0; i < largeSlice.length - 1; i++ ) {
        if ( isATie( largeSlice, i, prop ) ) {
          listOfLowest10Mems.push( largeSlice[ i + 1 ] ); // push member onto top 10 list.
          console.log( 'There was a tie for the  person' );
        } else {
          console.log( 'There was no tie for the 10th least engaged person. Breaking out of for loop.' );
          break;
        }
      }
      if ( prop === 'votes_with_party_pct' ) {
        // If finding votes_with_party_pct, make key of members who voted with party the most
        statistics.top10MemsLoyalty = listOfLowest10Mems;
      } else if ( prop == 'missed_votes_pct' ) {
        // If finding votes_with_party_pct, make key of members who missed the most votes
        statistics.bot10MemsAtten = listOfLowest10Mems;
      }
    }
    
  } );
} );
    // loop over statistics object and populate tableElement
    // for key in statistics:  
    // var no_party_votes = totalVotes * votes_with_party_pct
    // fill innerHTML with statistics.member.name,
    // fill innerHTML with statisctics.member.no_party_votes
    // fill inner HTML with statistics.member.votes_with_party_pct

    // populate house/senate at a glance:
    // for houseat a glance table:
    //   innerHTML = statistics.noOfDems

    // console.log(JSON.stringify(bottomMems, null, 4));

    // Note: For adding class: document.getElementById("div1").classList.add("classToBeAdded"); How to add a class for the div? var new_row = document.createElement('div');

    //new_row.className = "aClassName";
    // document.createElement('div').

    // // var new_row = document.createElement('div');
    // 
    // // Populates table body. accepts an array for fields, an array for filter parameters, and a value for state
    // function fillLoyal( arrayArg, idName ) {
    //   let tbl = document.getElementById( idName );
    //   tbl.innerHTML = '';
    //   for ( let mbr = 0; mbr < arrayArg.length; mbr++ ) {
    //     let totPartyVotes = Math.floor( ( arrayArg[ mbr ].total_votes ) * ( arrayArg[ mbr ].votes_with_party_pct ) * 0.01 );
    //     // Omit middle name if it is null
    //     let mName = arrayArg[ mbr ].middle_name ? arrayArg[ mbr ].middle_name : '';
    //     let row = tbl.appendChild( document.createElement( 'tr' ) );
    //     let nameDataEl = '<td>' + arrayArg[ mbr ].first_name + ' ' + ' ' + mName + ' ' + arrayArg[ mbr ].last_name + '</td>';
    //     let numPtyVotesEl = '<td>' + totPartyVotes + '</td>';
    //     let pctPtyVotesEl = '<td>' + arrayArg[ mbr ].votes_with_party_pct + '</td>';
    //     row.innerHTML = nameDataEl + numPtyVotesEl + pctPtyVotesEl;
    //   }
    // }

    // function fillAttendance( arrayArg, idName ) {
    //   let tbl = document.getElementById( idName );
    //   tbl.innerHTML = '';
    //   for ( let mbr = 0; mbr < arrayArg.length; mbr++ ) {
    //     let totPartyVotes = Math.floor( ( arrayArg[ mbr ].total_votes ) * ( arrayArg[ mbr ].missed_votes_pct ) * 0.01 );
    //     // Omit middle name if it is null
    //     let mName = arrayArg[ mbr ].middle_name ? arrayArg[ mbr ].middle_name : '';
    //     let row = tbl.appendChild( document.createElement( 'tr' ) );
    //     let nameDataEl = '<td>' + arrayArg[ mbr ].first_name + ' ' + ' ' + mName + ' ' + arrayArg[ mbr ].last_name + '</td>';
    //     let numPtyVotesEl = '<td>' + totPartyVotes + '</td>';
    //     let pctPtyVotesEl = '<td>' + arrayArg[ mbr ].missed_votes_pct + '</td>';
    //     row.innerHTML = nameDataEl + numPtyVotesEl + pctPtyVotesEl;
    //   }
    // }


// Loop over the top ten and push to an object inside "statistics"

// Loop over listOfDemocrats, and for each memeber, extract the % voted with party number, add them up, then divide by the number of members.


// When statistics is populated, it can be accessed by html in the house and senate pages/data.