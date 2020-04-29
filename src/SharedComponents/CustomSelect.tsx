import React from 'react';

import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function CustomSelect(props) {
    console.log(props);

    let options: Array<any> = [];
    let defaultValue;
    Object.keys(props.options).forEach((key) => {
        options.push({ value: key, label: props.options[key] });
        if (key === props.value) defaultValue = { value: key, label: props.options[key] }
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
        <CreatableSelect
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            defaultValue={defaultValue}
            options={options}
            onChange={onChange}
        />
    );
}