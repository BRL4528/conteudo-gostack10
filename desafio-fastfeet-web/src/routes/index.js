import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SingnIn from '../pages/SingIn';
import Dashboard from '../pages/Dashboard';
import Deliveryman from '../pages/Deliveryman';
import Recipient from '../pages/Recipient';
import Problem from '../pages/Problem';
import CreateOrders from '../pages/add/AddOrder';
import CreateDeliveryman from '../pages/add/AddDeliveryman';
import CreateRecipient from '../pages/add/AddRecipient';
import EditOrdes from '../pages/edit/editOrder';
import EditDeliveryman from '../pages/edit/editDeliveryman';
import EditRecipient from '../pages/edit/editRecipient';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingnIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/createorders" component={CreateOrders} isPrivate />
      <Route
        path="/createdeliveryman"
        component={CreateDeliveryman}
        isPrivate
      />
      <Route path="/createRecipient" component={CreateRecipient} isPrivate />
      <Route path="/editDeliveryman" component={EditDeliveryman} isPrivate />
      <Route path="/editOrder" component={EditOrdes} isPrivate />
      <Route path="/editRecipient" component={EditRecipient} isPrivate />
      <Route path="/deliveryman" component={Deliveryman} isPrivate />
      <Route path="/recipient" component={Recipient} isPrivate />
      <Route path="/problem" component={Problem} isPrivate />
    </Switch>
  );
}
