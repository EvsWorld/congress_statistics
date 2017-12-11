
// TODO write function reactW
function react(property) {
  //Define react Loyalty display functions
  const TableRow =({anotherProps, user}) => (
        <tr>
          <td key={user.first_name.id}>{user.first_name} {user.middle_name} {user.last_name}</td>
          <td key={user.total_votes.id}>{ Math.floor( ( user.total_votes ) * ( user[anotherProps] ) * 0.01 ) }</td>
          <td key={user[anotherProps].id}>{user[anotherProps]}</td>
        </tr>
      );
      
    const Table = ({data, p}) => (
        <div>
          <table className="table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>{p==="votes_with_party_pct" ? "Number of Party Votes" : "Number of Missed Votes"}</th>
                <th>{p==="votes_with_party_pct" ? "% Party Votes" : "% Missed Votes"}</th>
              </tr>
            </thead> 
            <tbody>
              
              {data.map((member) => <TableRow anotherProps={p} user ={member} /> )}
            </tbody>
          </table>
        </div>
      );
  
  // //Define react Attendance display functions
  // const TableRowA = ({user}) => (
  //       <tr>
  //         <td key={user.first_name.id}>{user.first_name} {user.middle_name} {user.last_name}</td>
  //         <td key={user.missed_votes_pct.id}>{ Math.floor( ( user.total_votes ) * ( user.missed_votes_pct ) * 0.01 ) }</td>
  //         <td key={user.missed_votes_pct.id}>{user.missed_votes_pct}</td>
  //         </tr>
  //   );
  // const TableA = ({data}) => (
  //   <div>
  //     <table className="table-hover">
  //       <thead>
  //         <tr>
  //           <th>Name</th>
  //           <th>{"Number of Missed Votes"}</th>
  //           <th>% Missed</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {data.map((member) => <TableRowA user = {member} /> )}
  //       </tbody>
  //     </table>
  //   </div>
  // );
  // 
    
  // Display react At a glance table
  const TableG = ({data}) => (
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

    
  // Render at a glance table, passing in statistics object as the parameter 'data'
  ReactDOM.render(
    <TableG data={statistics}/>, document.getElementById("at-a-glance")
  );

  callFillFuncts( window.location.pathname.split( "/" )[ 2 ] );


  function callFillFuncts( windowObjectLoc ) {
    if ( windowObjectLoc === 'hPartyLoyalty.html' || windowObjectLoc === 'sPartyLoyalty.html' ) {
      ReactDOM.render(
        <Table p={property[0]} data={statistics.bot10MemsLoyalty} />,
        document.getElementById( "test-data-id1" )
      );
      ReactDOM.render(
        <Table p={property[0]} data={statistics.top10MemsLoyalty} />,
        document.getElementById( "test-data-id2" )
      );
      
    } else if ( windowObjectLoc === 'hAttendance.html' || windowObjectLoc === 'sAttendance.html' || windowObjectLoc === 'reactsAttenSandbox.html' ) {
      ReactDOM.render(
        <Table p={property[1]} data={statistics.bot10MemsAtten} />,
        document.getElementById( "test-data-id1" )
      );
      ReactDOM.render(
        <Table p={property[1]} data={statistics.top10MemsAtten} />,
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

    