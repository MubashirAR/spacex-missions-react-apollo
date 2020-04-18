import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;
export default function Launch(props) {
  let { flight_number } = props.match.params;
  flight_number = parseInt(flight_number);
  const { error, loading, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
  });
  if (error) {
    console.error(error);
    return <h1>An Error Occured</h1>;
  }
  if (loading) {
    return <p className="text-center w-100">Loading...</p>;
  }
  let { mission_name, launch_year, launch_success, launch_date_local, rocket } = data.launch;
  return (
    <div className="container">
      <h1 className="display-4 my-3 w-100 text-center">
        <span className="text-dark">Mission:</span> {mission_name}
      </h1>
      <h4 className="w-100 text-center">Launch Details</h4>
      <ul className="list-group">
        <li className="list-group-item">
          Flight Number: {flight_number}
        </li>
        <li className="list-group-item">
          Launch Year: {launch_year}
        </li>
        <li className="list-group-item">
          Launch Successful: <span className={classNames({
            'text-success': launch_success,
            'text-danger': !launch_success
          })}>{launch_success ? 'Yes' : 'No'}</span>
        </li>
      </ul>
      <h4 className="text-center w-100">Rocket Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Rocket ID: {rocket.rocket_id}</li>
        <li className="list-group-item">Rocket Name: {rocket.rocket_name}</li>
        <li className="list-group-item">Rocket Type: {rocket.rocket_type}</li>
      </ul>
      <hr/>
      <Link className="btn btn-secondary" to="/">Back</Link>
    </div>
  );
}
