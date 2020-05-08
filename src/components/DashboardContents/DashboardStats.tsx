import React, { useEffect } from 'react';
import Store from 'electron-store';
import axios from 'axios';

import { drawBar } from '../../utils';

const store = new Store();

export default function DashboardStats() {
  useEffect(() => {
    async function getData() {
      const { data } = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_FETCH_URL}/api/top5`,
        data: { jwttoken: store.get('jwtToken') }
      });

      drawBar(data.userTop5, '.user-stats', 700);
      drawBar(data.totalTop5, '.total-user-stats', 700);
    }
    getData();
  }, []);

  return (
    <div className="dashboard-stats-container">
      <div className="dashboard-contents-title">
        Dashboard Stats
      </div>
      <div className="dashboard-contents-contents-container">
        <div className="stats-box">
          <div className="stats-title">Your Top 5</div>
          <div className="user-stats"></div>
        </div>
        <div className="stats-box">
          <div className="stats-title">Total user's Top 5</div>
          <div className="total-user-stats"></div>
        </div>
      </div>
    </div>
  );
}
