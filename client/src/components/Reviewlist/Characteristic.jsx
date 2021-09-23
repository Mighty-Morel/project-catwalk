import React, { useState } from 'react';
import './reviewlist.css';

const characteristic = ({
  name, setValue, id, characteristics,
}) => {
  const [def, setDef] = useState('none selected');

  const set = (value, newDef) => {
    setValue({ ...characteristics, [id]: parseInt(value, 10) });
    setDef(newDef);
  };
  const descriptions = {
    Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  };
  const [one, two, three, four, five] = descriptions[name];
  return (
    <div id="characteristics">
      {name}
      :&nbsp;
      {def}
      <div className="charRating">
        <label className="char" htmlFor={`${name}char1`} title="text">
          <input type="radio" id={`${name}char1`} name={name} value="1" onClick={(e) => set(e.target.value, one)} />
          {one}
        </label>
        <label className="char" htmlFor={`${name}char2`} title="text">
          <input type="radio" id={`${name}char2`} name={name} value="2" onClick={(e) => set(e.target.value, two)} />
          &nbsp; &nbsp; &nbsp;
        </label>
        <label className="char" htmlFor={`${name}char3`} title="text">
          <input type="radio" id={`${name}char3`} name={name} value="3" onClick={(e) => set(e.target.value, three)} />
          &nbsp; &nbsp; &nbsp;
        </label>
        <label className="char" htmlFor={`${name}char4`} title="text">
          <input type="radio" id={`${name}char4`} name={name} value="4" onClick={(e) => set(e.target.value, four)} />
          &nbsp; &nbsp; &nbsp;
        </label>
        <label className="char" htmlFor={`${name}char5`} title="text">
          <input type="radio" id={`${name}char5`} name={name} value="5" onClick={(e) => set(e.target.value, five)} />
          {five}
        </label>
      </div>
    </div>
  );
};

export default characteristic;
