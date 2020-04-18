import React, { Fragment } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const LAUNCHES_QUERY = gql`
  {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;
export default () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);
  if (error) {
    console.error(error);
  }
  return (
    <div className="container">
      <MissionKey />
      {loading ? 'Loading...' : ''}
      {data && data.launches && data.launches.map(launch => <LaunchItem key={launch.flight_number} launch={launch} />)}
    </div>
  );
};
