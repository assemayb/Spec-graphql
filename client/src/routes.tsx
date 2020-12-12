import React from 'react'
import { Switch, Route } from "react-router-dom"

export const BaseRouter: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/" render={() => (
                <div>
                    <h1>hey there this is the home page</h1>
                </div>
            )} />
            <Route path="/test" render={() => (
                <h1>
                    this is a test routee
                </h1>
            )} />
        </Switch>
    )
}


