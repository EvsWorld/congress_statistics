
function react() {
  //Define react Loyalty display functions
  var TableRowL = React.createClass({
    render: function() {
      let {data} = this.props;
      const row = data.map( ( data ) =>
        <tr>
          <td key={data.first_name.id}>{data.first_name} {data.middle_name} {data.last_name}</td>
          <td key={data.total_votes.id}>{ Math.floor( ( data.total_votes ) * ( data.votes_with_party_pct ) * 0.01 ) }</td>
          <td key={data.votes_with_party_pct.id}>{data.votes_with_party_pct}</td>
          </tr>
      );
      return (
          <tbody>{row}</tbody>
        );
      }
    });
    var TableL = React.createClass({
      render: function() {
        return (
        <div>
          <table className="table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Number of Party Votes</th>
                <th>% Party Votes</th>
              </tr>
            </thead> 
            <TableRowL data = { this.props.data}/> 
          </table>
        </div>
      );
      }

    });


  //Define react Attendance display functions
  var TableRowA = React.createClass({
    render: function() {
      let {data} = this.props;
      const row = data.map( ( data ) =>
        <tr>
          <td key={data.first_name.id}>{data.first_name} {data.middle_name} {data.last_name}</td>
          <td key={data.missed_votes_pct.id}>{ Math.floor( ( data.total_votes ) * ( data.missed_votes_pct ) * 0.01 ) }</td>
          <td key={data.missed_votes_pct.id}>{data.missed_votes_pct}</td>
          </tr>
      );
      return (
          <tbody>{row}</tbody>
        );
      }
    });
  var TableA = React.createClass({
    render: function() {
      return (
      <div>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number of Missed Votes</th>
              <th>% Missed</th>
            </tr>
          </thead> 
          <TableRowA data = { this.props.data}/> 
        </table>
      </div>
      );
    }
  });
    
  // Display react At a glance table
  var TableG = React.createClass({
    render: function() {
      let {data} = this.props;
      return (
        <table className="table-hover">
          <thead>
            <tr>
              <th>Party</th>
              <th>Number of Reps</th>
              <th>% Voted With Party</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Democrats</th>
              <td>{data.noOfDems}</td>
              <td>{data.demsPctVotewPty}</td>
            </tr>
            <tr>
              <th>Republicans</th>
              <td>{data.noOfReps}</td>
              <td>{data.repsPctVotewPty}</td>
            </tr>
            <tr>
              <th>Independents</th>
              <td>{data.noOfInds}</td>
              <td>{data.indsPctVotewPty}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{data.noOfTot}</td>
              <td>{data.avgVotesWParty}</td>
            </tr>
          </tbody>
        </table>
      );
    }
  });
    

  ReactDOM.render(
    <TableG data={statistics}/>, document.getElementById("at-a-glance")
  );

  callFillFuncts( window.location.pathname.split( "/" )[ 2 ] );

  // reactWrapper();

  function callFillFuncts( windowObjectLoc ) {
    if ( windowObjectLoc === 'hPartyLoyalty.html' || windowObjectLoc === 'sPartyLoyalty.html' ) {
      ReactDOM.render(
        <TableL data={statistics.bot10MemsLoyalty} />,
        document.getElementById( "test-data-id1" )
      );
      ReactDOM.render(
        <TableL data={statistics.top10MemsLoyalty} />,
        document.getElementById( "test-data-id2" )
      );
      
    } else if ( windowObjectLoc === 'hAttendance.html' || windowObjectLoc === 'sAttendance.html' || windowObjectLoc === 'reactsAttenSandbox.html' ) {
      ReactDOM.render(
        <TableA data={statistics.bot10MemsAtten} />,
        document.getElementById( "test-data-id1" )
      );
      ReactDOM.render(
        <TableA data={statistics.top10MemsAtten} />,
        document.getElementById( "test-data-id2" )
      );
    }
  }
};

class EvanFooter extends React.Component {
  render() {
    return( <footer> 2016 TGIF | All rights reserved - (gen'd by react) </footer> );
  }
}


ReactDOM.render(  
        <EvanFooter />, document.getElementById('my-footer-id'),
);

    