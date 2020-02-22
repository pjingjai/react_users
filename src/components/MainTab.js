import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class MainTab extends React.Component {
    state = {
        active: [false, false]
    }

    render() {
        return (

            <Button.Group>
                <Link className='link' to='/'>
                    <Button key={0} animated toggle active={this.state.active[0]} onClick={
                        () => {
                            this.setState(
                                prevState => ({
                                    active: [true, false]
                                })
                            )
                        }
                    }>
                        <Button.Content visible>Find</Button.Content>
                        <Button.Content hidden>
                            <Icon name='users' />
                        </Button.Content>
                    </Button>
                </Link>
                <Link className='link' to='/edit'>
                    <Button key={1} animated toggle active={this.state.active[1]} onClick={
                        () => {
                            this.setState(
                                prevState => ({
                                    active: [false, true]
                                })
                            )
                        }
                    }>
                        <Button.Content visible>Edit</Button.Content>
                        <Button.Content hidden>
                            <Icon name='configure' />
                        </Button.Content>
                    </Button>
                </Link>
            </Button.Group>
        )
    }
}

export default MainTab