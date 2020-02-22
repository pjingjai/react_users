import React from 'react'
import axios from '../lib/axios'
import { Form, Input, Button, Select } from 'semantic-ui-react'
// import CustomForm from ''

const genderOptions = [
    { key: 'male', text: 'Male', value: 'male' },
    { key: 'female', text: 'Female', value: 'female' },
]

const options = [
    { key: 'post', text: 'POST', value: 'post' },
    { key: 'put', text: 'PUT', value: 'put' },
    { key: 'delete', text: 'DELETE', value: 'delete' },
]

class CustomForm extends React.Component {
    state = {
        submitted: false,
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        age: '',
        method: 'post',
        input: '1003'
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleClick = async (e) => {
        this.setState({ submitted: true })
        if (
            (this.state.method === 'post'  &&
            (
                this.state.first_name !== '' &&
                this.state.last_name !== '' &&
                this.state.email !== '' &&
                this.state.gender !== '' &&
                this.state.age !== ''
            )
            ) || this.state.method === 'put'
        ) {
            try {
                const response = await axios({
                    method: this.state.method,
                    url: `/user${(this.state.method === 'put' ? '/' + this.state.input : '')}`,
                    headers: {
                        'content-type': 'application/json'
                    },
                    data: {
                        First_name: this.state.first_name,
                        Last_name: this.state.last_name,
                        Email: this.state.email,
                        Gender: this.state.gender,
                        Age: Number(this.state.age)
                    }
                })
            } catch (err) {
                console.error(err)
            }
        } else {
            try {
                const response = await axios({
                    method: this.state.method,
                    url: `/user/${this.state.input}`,
                })
            } catch (err) {
                console.error(err)
            }
        }
    }


    render() {
        const { submitted, first_name, last_name, email, gender, age, input } = this.state

        return (
            <div>
                <Form error>
                    <Form.Group widths='equal'>
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='First name'
                            placeholder='First name'
                            name='first_name'
                            error={submitted && this.state.method === 'post' ? first_name === "" ? 'Please enter your first name' : false : false}
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            id='form-input-control-last-name'
                            control={Input}
                            label='Last name'
                            placeholder='Last name'
                            name='last_name'
                            error={submitted && this.state.method === 'post' ? last_name === "" ? 'Please enter your last name' : false : false}
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            id='form-input-control-error-email'
                            control={Input}
                            label='Email'
                            placeholder='joe@schmoe.com'
                            name='email'
                            error={submitted && this.state.method === 'post' ? email === "" ? 'Please enter your email' : false : false}
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            control={Select}
                            options={genderOptions}
                            label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
                            placeholder='Gender'
                            name='gender'
                            error={submitted && this.state.method === 'post' ? gender === "" ? 'Please enter your gender' : false : false}
                            onChange={this.handleChange}
                            search
                            searchInput={{ id: 'form-select-control-gender' }}
                        />
                        <Form.Field
                            id='form-input-control-error-number'
                            control={Input}
                            label='Age'
                            placeholder='Age'
                            name='age'
                            error={
                                submitted && this.state.method === 'post' ?
                                    age === "" ?
                                        'Please enter your age'
                                        : isNaN(Number(age)) || 15 > Number(age) ?
                                            'Age must be between 15 to 80' : false
                                    : false
                            }
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Select
                        fluid
                        label='Method'
                        options={options}
                        defaultValue={options[0].value}
                        name='method'
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        fluid
                        label='Param'
                        name='input'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Confirm'
                        onClick={this.handleClick}
                    />
                </Form>
            </div>

        )
    }
}

export default CustomForm