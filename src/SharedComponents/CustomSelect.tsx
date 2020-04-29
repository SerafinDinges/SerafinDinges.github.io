import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function CustomSelect(props) {
    let options: Array<any> = [];
    Object.keys(props.options).forEach((key) => {
        options.push({ value: key, label: props.options[key] });
    });
    const onChange = res => {
        let result = [];
        if (res && res.length > 0)
            res.forEach(element => {
                result.push(element.value);
            });
        props.onChange(result, props.stateKey);
    }
    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            onChange={onChange}
        />
    );
}