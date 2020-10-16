import React, { useState } from 'react';
import Select from "react-dropdown-select";


export default function Test() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [option, setOption] = useState(null);
    var selectedOption;

//   state = {
//     selectedOption: null,
//   };


  function handleChange(values) {
    setOption({ values });
    console.log(`Option selected:`, values);
  };

    return (
        <Select
            // value={selectedOption}
            onChange={handleChange}
            options={options}
            placeholder={"Choose file column that maps to the Database field."}
            closeOnSelect={true}
        />
    );

}

