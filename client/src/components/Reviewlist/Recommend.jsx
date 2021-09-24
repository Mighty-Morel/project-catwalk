import React from 'react';
import './reviewlist.css';

const recommend = ({ setRecommend }) => (
  <>
    <p>Do you recommend this product:</p>
    <div>
      <label className="RLrecommended" htmlFor="yes">
        <input className="RL" onClick={() => setRecommend(true)} type="radio" id="yes" name="recommended" value="yes" />
        Yes
      </label>
      <label className="RLrecommended" htmlFor="no">
        <input className="RL" onClick={() => setRecommend(false)} type="radio" id="no" name="recommended" value="no" />
        No
      </label>
    </div>
  </>
);

export default recommend;
