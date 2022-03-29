import React, { Fragment } from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function FormDates(props) {

    const labelStyle = {
        marginRight: "10px"
    }

    const handleOnChange = (event) => {
        props.setFromToDates((date) => { return { ...date, [event.target.name]: [event.target.value][0] } })
    }

    return (
        <div>
            <h4> {props.name}:</h4>
            <Stack component="" noValidate spacing={3}>
                <TextField
                    name="From"
                    id="from-date"
                    label="From"
                    type="datetime-local"
                    defaultValue={props.fromToDates.From}
                    sx={{ width: 250 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleOnChange}
                />
                <TextField
                    name="To"
                    id="to-date"
                    label="To"
                    type="datetime-local"
                    defaultValue={props.fromToDates.To}
                    sx={{ width: 250 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleOnChange}
                />
            </Stack>
        </div>
    )
}
