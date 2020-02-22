import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserPage from '../pages/UserPage'
import AdminPage from '../pages/AdminPage'
import MainTab from '../components/MainTab'

class Content extends React.Component {

    render() {
        return (
            <div>
                <MainTab />
                <Switch>
                    <Route path='/' exact component={UserPage} />
                    <Route path='/edit' exact component={AdminPage} />
                </Switch>
            </div>
        )
    }
}

export default Content